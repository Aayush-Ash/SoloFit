import { Dumbbell, Flame, Scale, Timer, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function StatusCard() {
  const { level, exp, stats, setModal } = useStore();
  const threshold = level * 1000;
  const progress = (exp / threshold) * 100;

  const calculateRank = (lvl: number) => {
    if (lvl >= 50) return 'S';
    if (lvl >= 10) return 'S'; // Forcing S rank as in the image for demo
    return 'E';
  };

  return (
    <div className="glass-panel p-6 flex flex-col gap-6 w-full h-fit">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
          <Dumbbell size={20} className="text-purple-400" />
        </div>
        <h3 className="text-sm font-bold tracking-widest text-white uppercase">Your Status</h3>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-500 tracking-widest uppercase mb-1">Level</span>
          <span className="text-4xl font-bold text-white tabular-nums">{level}</span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-[10px] text-slate-500 tracking-widest uppercase mb-1">Rank</span>
          <span className="text-4xl font-bold text-purple-400 text-glow">{calculateRank(level)}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-[10px] text-slate-500 uppercase tracking-widest">
          <span>EXP</span>
          <span>{Math.floor(progress)}%</span>
        </div>
        <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.6)]"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-2">
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 tracking-widest uppercase mb-1">Total Power</span>
            <span className="text-3xl font-bold text-white tabular-nums">8,750</span>
          </div>
          <div className="flex gap-1 items-end h-10">
            {[20, 40, 60, 45, 80, 100].map((h, i) => (
              <div 
                key={i} 
                className="w-1.5 bg-purple-900/40 rounded-t-sm"
                style={{ height: `${h}%`, backgroundColor: i < 5 ? 'var(--purple-glow)' : '' }}
              />
            ))}
          </div>
        </div>

        <ul className="flex flex-col gap-3 pt-4 border-t border-white/5">
          {[
            { icon: Dumbbell, label: 'Workouts', value: '48' },
            { icon: Flame, label: 'Calories Burned', value: '12,450 kcal' },
            { icon: Scale, label: 'Current Weight', value: '58.6 kg' },
            { icon: Timer, label: 'Streak', value: '12 Days' },
          ].map((stat, i) => (
            <li key={i} className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-3 text-slate-400">
                <stat.icon size={14} className="text-purple-500" />
                <span className="uppercase tracking-widest text-[10px]">{stat.label}</span>
              </div>
              <span className="text-white font-bold">{stat.value}</span>
            </li>
          ))}
        </ul>
      </div>

      <button 
        onClick={() => setModal('stats')}
        className="flex items-center justify-between w-full p-4 bg-white/5 hover:bg-white/10 transition-all rounded-lg mt-2 group"
      >
        <span className="text-[10px] font-bold text-purple-400 tracking-[2px] uppercase">View Full Stats</span>
        <ChevronRight size={14} className="text-slate-500 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
