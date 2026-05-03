'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function MissionCard() {
  return (
    <div className="glass-panel p-6 flex flex-col gap-4 relative overflow-hidden h-full min-h-[350px]">
      <div className="z-10">
        <span className="text-[10px] text-purple-400 font-bold tracking-[3px] uppercase">Today's Mission</span>
        <h2 className="text-2xl font-bold text-white mt-2">Push Your Limits</h2>
        <p className="text-xs text-slate-400 mt-2 max-w-[200px]">
          The dungeon won't conquer itself. Train harder.
        </p>
      </div>

      <div className="mt-auto z-10">
        <div className="flex justify-between items-end mb-2">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest">Workouts Completed</span>
            <span className="text-xl font-bold text-white">1 / 2</span>
          </div>
        </div>
        <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/5">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '50%' }}
            className="h-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"
          />
        </div>
      </div>

      {/* Background Portal Image */}
      <div className="absolute right-[-20px] bottom-[-20px] w-full h-full opacity-60 z-0 pointer-events-none">
        <Image 
          src="/dungeon_portal_1777801243355.png" 
          alt="Dungeon Portal" 
          fill
          className="object-contain object-right-bottom mix-blend-lighten"
        />
      </div>
    </div>
  );
}
