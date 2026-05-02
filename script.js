document.addEventListener('DOMContentLoaded', () => {
    // --- State Management ---
    let state = {
        level: 1,
        exp: 0,
        totalPower: 0,
        workouts: [],
        lastWorkoutDate: null,
        streak: 0
    };

    // Load from localStorage
    const savedState = localStorage.getItem('solo_leveling_state');
    if (savedState) {
        state = JSON.parse(savedState);
    }

    // --- DOM Elements ---
    const elements = {
        // Modals
        logModal: document.getElementById('log-modal'),
        feedModal: document.getElementById('feed-modal'),
        closeLogBtn: document.getElementById('close-log-modal'),
        closeFeedBtn: document.getElementById('close-feed-modal'),
        
        // Triggers
        cardLog: document.getElementById('card-log'),
        cardFeed: document.getElementById('card-feed'),
        navLog: document.getElementById('nav-log'),
        navFeed: document.getElementById('nav-feed'),
        enterDungeonBtn: document.getElementById('enter-dungeon-btn'),
        viewStatsBtn: document.getElementById('view-stats-btn'),

        // Form
        form: document.getElementById('workout-form'),
        
        // Stats Display
        statLevel: document.getElementById('stat-level'),
        navLevel: document.getElementById('nav-level-display'),
        statRank: document.getElementById('stat-rank'),
        expPercent: document.getElementById('exp-percent'),
        expFill: document.getElementById('exp-fill'),
        statPower: document.getElementById('stat-power'),
        statWorkouts: document.getElementById('stat-workouts'),
        statCalories: document.getElementById('stat-calories'),
        statVolume: document.getElementById('stat-volume'),
        statStreak: document.getElementById('stat-streak'),
        
        // Feed
        activityList: document.getElementById('activity-list'),
        feedCount: document.getElementById('feed-count'),
        clearLogBtn: document.getElementById('clear-log'),
        
        // Notifications
        levelUpNotif: document.getElementById('levelup-notif'),
        levelUpText: document.getElementById('levelup-text'),
        
        // Visuals
        powerBars: document.querySelectorAll('.power-bars .bar')
    };

    // --- Core Functions ---

    function saveState() {
        localStorage.setItem('solo_leveling_state', JSON.stringify(state));
    }

    function calculateRank(level) {
        if (level >= 50) return 'S';
        if (level >= 40) return 'A';
        if (level >= 30) return 'B';
        if (level >= 20) return 'C';
        if (level >= 10) return 'D';
        return 'E';
    }

    function getExpThreshold(level) {
        return level * 1000;
    }

    function showLevelUp(newLevel) {
        elements.levelUpText.innerText = `You reached Level ${newLevel}!`;
        elements.levelUpNotif.classList.add('show');
        setTimeout(() => {
            elements.levelUpNotif.classList.remove('show');
        }, 3000);
    }

    function updateUI() {
        const threshold = getExpThreshold(state.level);
        const expPercentage = (state.exp / threshold) * 100;
        const rank = calculateRank(state.level);
        
        // Level & Rank
        elements.statLevel.innerText = state.level;
        elements.navLevel.innerText = `LV. ${state.level}`;
        elements.statRank.innerText = rank;
        
        // EXP
        elements.expPercent.innerText = `${Math.floor(expPercentage)}%`;
        elements.expFill.style.width = `${expPercentage}%`;
        
        // Stats
        elements.statPower.innerText = state.totalPower.toLocaleString();
        elements.statWorkouts.innerText = state.workouts.length;
        
        const totalVolume = state.workouts.reduce((acc, w) => acc + (w.sets * w.reps * w.weight), 0);
        elements.statVolume.innerText = `${totalVolume.toLocaleString()} kg`;
        
        // Simplified calorie estimation: 0.1 kcal per kg moved
        const totalCalories = Math.floor(totalVolume * 0.1);
        elements.statCalories.innerText = `${totalCalories.toLocaleString()} kcal`;
        
        elements.statStreak.innerText = `${state.streak} Days`;

        // Power Bars
        elements.powerBars.forEach((bar, index) => {
            if (index < Math.min(state.level / 5, 5)) {
                bar.classList.add('active');
            } else {
                bar.classList.remove('active');
            }
        });

        renderFeed();
    }

    function renderFeed() {
        elements.activityList.innerHTML = '';
        elements.feedCount.innerText = `${state.workouts.length} exercises logged total`;

        if (state.workouts.length === 0) {
            elements.activityList.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-ghost"></i>
                    <p>No exercises logged yet.<br>Get to work, Hunter!</p>
                </div>`;
            return;
        }

        [...state.workouts].reverse().forEach(w => {
            const li = document.createElement('li');
            li.className = 'feed-item';
            const volume = w.sets * w.reps * w.weight;
            
            li.innerHTML = `
                <div class="feed-item-info">
                    <h4>${w.name}</h4>
                    <p>${w.group} Workout • ${new Date(w.date).toLocaleDateString()}</p>
                </div>
                <div class="feed-item-stats">
                    <div class="volume">${volume > 0 ? volume + ' kg' : 'Bodyweight'}</div>
                    <div class="details">${w.sets}x${w.reps} @ ${w.weight}kg</div>
                </div>
            `;
            elements.activityList.appendChild(li);
        });
    }

    // --- Event Listeners ---

    // Modal Toggles
    const openLog = () => elements.logModal.classList.add('active');
    const closeLog = () => elements.logModal.classList.remove('active');
    const openFeed = () => elements.feedModal.classList.add('active');
    const closeFeed = () => elements.feedModal.classList.remove('active');

    elements.cardLog.addEventListener('click', openLog);
    elements.navLog.addEventListener('click', openLog);
    elements.enterDungeonBtn.addEventListener('click', openLog);

    elements.cardFeed.addEventListener('click', openFeed);
    elements.navFeed.addEventListener('click', openFeed);
    elements.viewStatsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openFeed();
    });

    elements.closeLogBtn.addEventListener('click', closeLog);
    elements.closeFeedBtn.addEventListener('click', closeFeed);

    // Close on overlay click
    window.addEventListener('click', (e) => {
        if (e.target === elements.logModal) closeLog();
        if (e.target === elements.feedModal) closeFeed();
    });

    // Form Submission
    elements.form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const workout = {
            id: Date.now(),
            date: new Date().toISOString(),
            group: document.getElementById('muscle-group').value,
            name: document.getElementById('exercise-name').value,
            sets: parseInt(document.getElementById('sets').value),
            reps: parseInt(document.getElementById('reps').value),
            weight: parseFloat(document.getElementById('weight').value)
        };

        const volume = workout.sets * workout.reps * workout.weight;
        const gainedExp = Math.max(10, Math.floor(volume / 5));
        
        state.workouts.push(workout);
        state.exp += gainedExp;
        state.totalPower += Math.floor(volume / 100);

        // Handle Level Up
        while (state.exp >= getExpThreshold(state.level)) {
            state.exp -= getExpThreshold(state.level);
            state.level++;
            showLevelUp(state.level);
        }

        // Handle Streak
        const today = new Date().toDateString();
        if (state.lastWorkoutDate !== today) {
            const lastDate = state.lastWorkoutDate ? new Date(state.lastWorkoutDate) : null;
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (lastDate && lastDate.toDateString() === yesterday.toDateString()) {
                state.streak++;
            } else if (!lastDate || lastDate.toDateString() !== today) {
                state.streak = 1;
            }
            state.lastWorkoutDate = today;
        }

        saveState();
        updateUI();
        closeLog();
        elements.form.reset();
    });

    // Clear Logs
    elements.clearLogBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear your journey history? This will NOT reset your level.')) {
            state.workouts = [];
            saveState();
            updateUI();
        }
    });

    // Mouse Glow Effect for cards
    document.querySelectorAll('.action-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(168, 85, 247, 0.15) 0%, rgba(10, 5, 20, 0.75) 50%)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.background = 'rgba(10, 5, 20, 0.75)';
        });
    });

    // Initialize
    updateUI();
});
