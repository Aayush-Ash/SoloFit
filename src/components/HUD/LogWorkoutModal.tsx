'use client';

import { useStore } from '@/store/useStore';
import { X, Plus, Dumbbell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function LogWorkoutModal() {
  const { activeModal, setModal, addWorkout } = useStore();
  const [name, setName] = useState('');
  const [volume, setVolume] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !volume) return;
    addWorkout(name, parseInt(volume));
    setName('');
    setVolume('');
    setModal(null);
  };

  return (
    <AnimatePresence>
      {activeModal === 'log' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModal(null)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="glass-panel w-full max-w-md p-8 relative z-10 border-purple-500/50 shadow-[0_0_50px_rgba(168,85,247,0.3)]"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black tracking-[4px] text-white uppercase italic flex items-center gap-3">
                <Dumbbell className="text-purple-400" /> Log Activity
              </h2>
              <button onClick={() => setModal(null)} className="text-slate-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Activity Name</label>
                <input
                  type="text"
                  placeholder="e.g. Push-ups, Squats, Run"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-slate-900/50 border border-purple-900/30 rounded-lg p-4 text-white outline-none focus:border-purple-500 transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Volume (Reps x Weight or Km)</label>
                <input
                  type="number"
                  placeholder="e.g. 100"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  className="bg-slate-900/50 border border-purple-900/30 rounded-lg p-4 text-white outline-none focus:border-purple-500 transition-all"
                />
              </div>

              <button type="submit" className="btn-dungeon w-full flex justify-center items-center gap-2 mt-4">
                Confirm Log <Plus size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
