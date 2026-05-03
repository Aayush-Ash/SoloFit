'use client';

import { useStore, MuscleGroup } from '@/store/useStore';
import { motion } from 'framer-motion';
import { Target, Zap, Activity } from 'lucide-react';

const tierColors = {
  S: 'text-purple-400 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]',
  A: 'text-blue-400 border-blue-400',
  B: 'text-green-400 border-green-400',
  C: 'text-yellow-400 border-yellow-400',
  D: 'text-slate-500 border-slate-700',
};

const getProgress = (volume: number, tier: string) => {
  if (tier === 'S') return 100;
  if (tier === 'A') return ((volume - 25000) / 25000) * 100;
  if (tier === 'B') return ((volume - 10000) / 15000) * 100;
  if (tier === 'C') return ((volume - 5000) / 5000) * 100;
  return (volume / 5000) * 100;
};

export default function MuscleMastery() {
  const { muscleStats } = useStore();

  return (
    <div className="glass-panel p-6 flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <h2 className="text-sm font-bold tracking-[3px] text-purple-400 uppercase flex items-center gap-2">
          <Target size={16} /> Muscle Intelligence
        </h2>
        <span className="text-[10px] text-slate-500 uppercase tracking-widest">Tier-Based Analysis</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(Object.entries(muscleStats) as [MuscleGroup, any][]).map(([muscle, data]) => {
          const progress = getProgress(data.volume, data.tier);
          
          return (
            <div key={muscle} className="bg-slate-900/40 border border-white/5 p-4 rounded-sm flex flex-col gap-3 group hover:border-purple-500/30 transition-all">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">{muscle}</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-tighter">Volume: {data.volume.toLocaleString()} kg</span>
                </div>
                <div className={`w-8 h-8 rounded-sm border flex items-center justify-center font-black text-lg ${tierColors[data.tier]}`}>
                  {data.tier}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                    className="h-full bg-purple-500"
                  />
                </div>
                <div className="flex justify-between text-[8px] text-slate-500 uppercase tracking-widest">
                  <span>Growth</span>
                  <span>{Math.floor(progress)}% to next rank</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-auto pt-4 border-t border-white/5 flex flex-col gap-3">
        <div className="bg-purple-950/10 border border-purple-900/20 p-3 rounded-lg flex gap-3 items-start">
          <Zap size={14} className="text-purple-400 mt-0.5 shrink-0" />
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">System Insight</span>
            <p className="text-[9px] text-slate-400 leading-relaxed uppercase tracking-tighter">
              {Object.values(muscleStats).find(m => m.tier === 'D') 
                ? "Warning: Critical imbalances detected. Prioritize Tier D muscle groups to ensure balanced growth."
                : "Excellent balance. Continue distributing volume evenly to maintain S-Rank proficiency."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
