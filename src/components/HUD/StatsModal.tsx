'use client';

import { useStore, Stats } from '@/store/useStore';
import { X, Shield, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const statLabels: Record<keyof Stats, string> = {
  str: 'Strength',
  agi: 'Agility',
  vit: 'Vitality',
  int: 'Intelligence',
  sen: 'Sense',
};

export default function StatsModal() {
  const { activeModal, setModal, stats, level } = useStore();

  return (
    <AnimatePresence>
      {activeModal === 'stats' && (
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
            className="glass-panel w-full max-w-lg p-8 relative z-10 border-purple-500/50"
          >
            <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
              <h2 className="text-xl font-black tracking-[4px] text-white uppercase italic flex items-center gap-3">
                <Shield className="text-purple-400" /> Character Attributes
              </h2>
              <button onClick={() => setModal(null)} className="text-slate-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col gap-6">
                {(Object.entries(stats) as [keyof Stats, number][]).map(([key, value]) => (
                  <div key={key} className="flex flex-col gap-1">
                    <div className="flex justify-between text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                      <span>{statLabels[key]}</span>
                      <span className="text-purple-400">Lv. {Math.floor(value / 10)}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-white w-12">{value}</span>
                      <div className="flex-1 h-1.5 bg-slate-900 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" 
                          style={{ width: `${(value % 10) * 10}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-6 bg-purple-950/10 p-6 rounded-lg border border-purple-900/20">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-2">Overall Proficiency</span>
                  <div className="text-4xl font-black text-purple-400 tabular-nums">
                    {Math.floor(Object.values(stats).reduce((a, b) => a + b, 0) / 5)}
                  </div>
                </div>
                
                <div className="flex flex-col gap-4 mt-auto">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <Activity size={14} className="text-purple-500" />
                    <span>Total Exercises: 48</span>
                  </div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-tight leading-relaxed italic">
                    "Your potential is limitless. Every drop of sweat is a point added to your existence."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
