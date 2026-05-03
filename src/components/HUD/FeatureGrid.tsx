'use client';

import { Dumbbell, BarChart3, LineChart, Target, ChevronRight } from 'lucide-react';
import { useStore } from '@/store/useStore';

const features = [
  { title: 'Log Workouts', desc: 'Track your sets, reps, weight and every move.', icon: Dumbbell },
  { title: 'Track Progress', desc: 'Visualize your gains. Break records. Level up.', icon: LineChart },
  { title: 'Analyze Performance', desc: 'Get smart insights to outwork your previous self.', icon: BarChart3 },
  { title: 'Stay Consistent', desc: 'Build streaks. Build habits. Become legendary.', icon: Target },
];

export default function FeatureGrid() {
  const { setModal } = useStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-8">
      {features.map((f, i) => (
        <div 
          key={i} 
          onClick={() => setModal('log')}
          className="glass-panel p-6 group cursor-pointer hover:bg-purple-950/20 relative overflow-hidden h-[200px] flex flex-col justify-end"
        >
          {/* Mock background aura */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0816] to-transparent z-10" />
          <div className="absolute inset-0 bg-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity z-0" />
          
          <div className="z-20 relative flex flex-col gap-2">
            <f.icon size={24} className="text-purple-400 mb-2" />
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">{f.title}</h4>
            <p className="text-[10px] text-slate-500 uppercase tracking-tighter leading-relaxed">
              {f.desc}
            </p>
            <div className="mt-2 text-slate-600 group-hover:text-purple-400 transition-colors">
              <ChevronRight size={14} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
