'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { Check, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_QUESTS = [
  { id: '1', title: 'Daily Push-ups', description: 'Complete 100 push-ups total.', target: 100, current: 0 },
  { id: '2', title: 'Cardio Sprint', description: 'Run for 5km.', target: 5, current: 0, unit: 'km' },
  { id: '3', title: 'Leg Day Specialist', description: 'Complete 100 squats.', target: 100, current: 0 },
];

export default function QuestBoard() {
  const { addWorkout } = useStore();
  const [quests, setQuests] = useState(INITIAL_QUESTS);
  const [isLogging, setIsLogging] = useState(false);

  const handleQuickLog = (title: string, amount: number) => {
    addWorkout(title, amount * 10); // Volume calculation
    setQuests(prev => prev.map(q => {
      if (q.title === title) {
        const nextCurrent = Math.min(q.target, q.current + amount);
        return { ...q, current: nextCurrent };
      }
      return q;
    }));
  };

  return (
    <div className="glass-panel p-6 w-full flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-purple-900/30 pb-4">
        <h2 className="text-sm font-bold tracking-[3px] text-purple-400 uppercase">Daily Quest Board</h2>
        <button 
          onClick={() => setIsLogging(!isLogging)}
          className="text-purple-400 hover:text-purple-300 transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {quests.map((quest) => {
          const isCompleted = quest.current >= quest.target;
          const progress = (quest.current / quest.target) * 100;

          return (
            <div 
              key={quest.id}
              className="p-4 bg-slate-900/40 border border-purple-900/20 rounded-sm flex flex-col gap-3 relative overflow-hidden group"
            >
              <div className="flex justify-between items-start z-10">
                <div className="flex flex-col">
                  <h4 className={`text-sm font-semibold tracking-wide ${isCompleted ? 'text-slate-500 line-through' : 'text-purple-100'}`}>
                    {quest.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest">{quest.description}</p>
                </div>
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                  isCompleted ? 'bg-purple-400 border-purple-400 text-black' : 'border-purple-900 text-transparent'
                }`}>
                  <Check size={14} />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 z-10">
                <div className="flex justify-between text-[10px] text-slate-400 uppercase tabular-nums">
                  <span>{quest.current} / {quest.target} {quest.unit || ''}</span>
                  <span>{Math.floor(progress)}%</span>
                </div>
                <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-purple-400"
                  />
                </div>
              </div>

              {!isCompleted && (
                <button 
                  onClick={() => handleQuickLog(quest.title, quest.unit === 'km' ? 1 : 10)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-purple-950/40 border border-purple-400/50 p-2 text-purple-400 hover:bg-purple-400 hover:text-black"
                >
                  <Plus size={14} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
