'use client';

import { useStore, Stats } from '@/store/useStore';
import { motion } from 'framer-motion';

const statLabels: Record<keyof Stats, string> = {
  str: 'Strength',
  agi: 'Agility',
  vit: 'Vitality',
  int: 'Intelligence',
  sen: 'Sense',
};

export default function Attributes() {
  const { stats } = useStore();

  return (
    <div className="grid grid-cols-5 gap-4 w-full">
      {(Object.entries(stats) as [keyof Stats, number][]).map(([key, value]) => (
        <motion.div
          key={key}
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(168, 85, 247, 0.1)' }}
          className="bg-purple-950/20 border border-purple-900/30 p-4 rounded-sm flex flex-col items-center gap-1 transition-colors"
        >
          <span className="text-[10px] text-slate-500 uppercase tracking-widest">{statLabels[key]}</span>
          <span className="text-2xl font-bold text-purple-400 tabular-nums">{value}</span>
        </motion.div>
      ))}
    </div>
  );
}
