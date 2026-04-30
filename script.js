document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('workout-form');
    const activityList = document.getElementById('activity-list');
    const totalWorkoutsEl = document.getElementById('total-workouts-stat');
    const totalVolumeEl = document.getElementById('total-volume-stat');
    const clearLogBtn = document.getElementById('clear-log');

    let workouts = [];

    // Helper to format muscle group colors or icons
    const muscleIcons = {
        'Chest': '<i class="fa-solid fa-child-reaching"></i>',
        'Back': '<i class="fa-solid fa-person-arrow-up-from-line"></i>',
        'Legs': '<i class="fa-solid fa-person-walking"></i>',
        'Arms': '<i class="fa-solid fa-hand-fist"></i>',
        'Shoulders': '<i class="fa-solid fa-dumbbell"></i>',
        'Core': '<i class="fa-solid fa-child"></i>'
    };

    // Update UI Stats
    function updateStats() {
        totalWorkoutsEl.innerText = workouts.length;
        
        const volume = workouts.reduce((total, w) => {
            return total + (w.sets * w.reps * w.weight);
        }, 0);
        
        totalVolumeEl.innerText = volume.toLocaleString();
    }

    // Render the Feed
    function renderFeed() {
        activityList.innerHTML = '';
        
        if (workouts.length === 0) {
            activityList.innerHTML = '<div class="empty-state">No exercises logged today. Get to work!</div>';
            return;
        }

        // Render in reverse chronological order
        [...workouts].reverse().forEach((w, index) => {
            const li = document.createElement('li');
            li.className = 'feed-item';
            
            const totalItemVolume = w.sets * w.reps * w.weight;
            
            li.innerHTML = `
                <div class="feed-item-info">
                    <h4>${w.name}</h4>
                    <p>${muscleIcons[w.group] || ''} ${w.group} Workout</p>
                </div>
                <div class="feed-item-stats">
                    <div class="volume">${totalItemVolume > 0 ? totalItemVolume + ' kg' : 'Bodyweight'}</div>
                    <div class="details">${w.sets}x${w.reps} @ ${w.weight}kg</div>
                </div>
            `;
            
            activityList.appendChild(li);
        });
    }

    // Handle Form Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const group = document.getElementById('muscle-group').value;
        const name = document.getElementById('exercise-name').value;
        const sets = parseInt(document.getElementById('sets').value);
        const reps = parseInt(document.getElementById('reps').value);
        const weight = parseFloat(document.getElementById('weight').value);
        
        const workout = {
            id: Date.now(),
            group,
            name,
            sets,
            reps,
            weight
        };
        
        workouts.push(workout);
        
        // Reset form specific inputs
        document.getElementById('exercise-name').value = '';
        document.getElementById('weight').value = '0';
        
        updateStats();
        renderFeed();
    });

    // Clear logs
    clearLogBtn.addEventListener('click', () => {
        if(confirm('Are you sure you want to clear today\\'s log?')) {
            workouts = [];
            updateStats();
            renderFeed();
        }
    });
});
