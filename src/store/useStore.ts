import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Item {
  id: string;
  name: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
  slot: 'head' | 'chest' | 'hands' | 'legs' | 'weapon' | 'accessory';
  stats: Partial<Record<keyof Stats, number>>;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  maxLevel: number;
  description: string;
  type: 'Active' | 'Passive';
  unlocked: boolean;
}

export interface MuscleStat {
  volume: number;
  tier: 'S' | 'A' | 'B' | 'C' | 'D';
  lastWorked: string;
}

export type MuscleGroup = 'Chest' | 'Back' | 'Shoulders' | 'Biceps' | 'Triceps' | 'Legs' | 'Core';

export interface Stats {
  str: number;
  agi: number;
  vit: number;
  int: number;
  sen: number;
}

export interface Workout {
  id: string;
  name: string;
  date: string;
  volume: number;
}

interface GameState {
  level: number;
  exp: number;
  stats: Stats;
  muscleStats: Record<MuscleGroup, MuscleStat>;
  workouts: Workout[];
  inventory: Item[];
  equipment: Record<Item['slot'], Item | null>;
  skills: Skill[];
  streak: number;
  
  // UI State
  activeTab: 'home' | 'quests' | 'inventory' | 'dungeons' | 'settings';
  activeModal: 'log' | 'stats' | null;
  
  // Actions
  addWorkout: (name: string, volume: number) => void;
  equipItem: (item: Item) => void;
  unlockSkill: (skillId: string) => void;
  setActiveTab: (tab: GameState['activeTab']) => void;
  setModal: (modal: GameState['activeModal']) => void;
}

const INITIAL_SKILLS: Skill[] = [
  { id: 'tenacity', name: 'Tenacity', level: 1, maxLevel: 5, description: 'Increases Vitality gain by 10%', type: 'Passive', unlocked: true },
  { id: 'sprint', name: 'Sprint', level: 0, maxLevel: 5, description: 'Active: Boosts Agility for 1 hour', type: 'Active', unlocked: false },
];

export const useStore = create<GameState>()(
  persist(
    (set) => ({
      level: 1,
      exp: 0,
      stats: { str: 10, agi: 10, vit: 10, int: 10, sen: 10 },
      muscleStats: {
        Chest: { volume: 0, tier: 'D', lastWorked: '' },
        Back: { volume: 0, tier: 'D', lastWorked: '' },
        Shoulders: { volume: 0, tier: 'D', lastWorked: '' },
        Biceps: { volume: 0, tier: 'D', lastWorked: '' },
        Triceps: { volume: 0, tier: 'D', lastWorked: '' },
        Legs: { volume: 0, tier: 'D', lastWorked: '' },
        Core: { volume: 0, tier: 'D', lastWorked: '' },
      },
      workouts: [],
      inventory: [],
      equipment: { head: null, chest: null, hands: null, legs: null, weapon: null, accessory: null },
      skills: INITIAL_SKILLS,
      streak: 0,
      activeTab: 'home',
      activeModal: null,

      addWorkout: (name, volume) => set((state) => {
        const gainedExp = Math.floor(volume / 5);
        const newExp = state.exp + gainedExp;
        const threshold = state.level * 1000;
        
        let newLevel = state.level;
        let finalExp = newExp;
        if (newExp >= threshold) {
          newLevel++;
          finalExp = newExp - threshold;
        }

        const newStats = { ...state.stats };
        const newMuscleStats = { ...state.muscleStats };
        const workoutName = name.toLowerCase();
        const now = new Date().toISOString();

        // Muscle Mapping Logic
        const mapVolume = (muscle: MuscleGroup, factor = 1) => {
          const m = newMuscleStats[muscle];
          m.volume += volume * factor;
          m.lastWorked = now;
          
          // Tier Calculation Logic (Simple volume-based thresholds)
          if (m.volume >= 50000) m.tier = 'S';
          else if (m.volume >= 25000) m.tier = 'A';
          else if (m.volume >= 10000) m.tier = 'B';
          else if (m.volume >= 5000) m.tier = 'C';
          else m.tier = 'D';
        };

        if (workoutName.includes('bench') || workoutName.includes('chest') || workoutName.includes('push-up')) {
          mapVolume('Chest', 1);
          mapVolume('Triceps', 0.3);
          mapVolume('Shoulders', 0.2);
          newStats.str += 1;
        }
        if (workoutName.includes('deadlift') || workoutName.includes('row') || workoutName.includes('back') || workoutName.includes('pull-up')) {
          mapVolume('Back', 1);
          mapVolume('Biceps', 0.3);
          newStats.str += 1;
        }
        if (workoutName.includes('squat') || workoutName.includes('leg') || workoutName.includes('lunge')) {
          mapVolume('Legs', 1);
          mapVolume('Core', 0.2);
          newStats.vit += 1;
        }
        if (workoutName.includes('press') && workoutName.includes('shoulder')) {
          mapVolume('Shoulders', 1);
          mapVolume('Triceps', 0.3);
          newStats.str += 0.5;
        }
        if (workoutName.includes('curl')) {
          mapVolume('Biceps', 1);
          newStats.str += 0.2;
        }
        if (workoutName.includes('plank') || workoutName.includes('abs') || workoutName.includes('core') || workoutName.includes('sit-up')) {
          mapVolume('Core', 1);
          newStats.agi += 1;
        }
        if (workoutName.includes('run') || workoutName.includes('sprint')) {
          mapVolume('Legs', 0.5);
          mapVolume('Core', 0.3);
          newStats.agi += 1.5;
        }

        return {
          level: newLevel,
          exp: finalExp,
          stats: newStats,
          muscleStats: newMuscleStats,
          workouts: [...state.workouts, { id: Math.random().toString(), name, volume, date: now }]
        };
      }),

      equipItem: (item) => set((state) => ({
        equipment: { ...state.equipment, [item.slot]: item }
      })),

      unlockSkill: (skillId) => set((state) => ({
        skills: state.skills.map(s => s.id === skillId ? { ...s, unlocked: true } : s)
      })),

      setActiveTab: (tab) => set({ activeTab: tab }),
      setModal: (modal) => set({ activeModal: modal })
    }),
    { name: 'solo-leveling-storage' }
  )
);
