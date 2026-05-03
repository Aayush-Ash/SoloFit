'use client';

import Sidebar from '@/components/HUD/Sidebar';
import StatusCard from '@/components/HUD/StatusCard';
import MissionCard from '@/components/HUD/MissionCard';
import ProgressChart from '@/components/HUD/ProgressChart';
import FeatureGrid from '@/components/HUD/FeatureGrid';
import LogWorkoutModal from '@/components/HUD/LogWorkoutModal';
import StatsModal from '@/components/HUD/StatsModal';
import MuscleMastery from '@/components/HUD/MuscleMastery';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useStore } from '@/store/useStore';
import { ChevronRight } from 'lucide-react';

export default function Home() {
  const { activeTab, setModal } = useStore();

  return (
    <div className="flex min-h-screen relative overflow-hidden bg-[#020105]">
      {/* Background Image Layer */}
      <div className="fixed inset-0 z-0">
        <Image 
          src="/solo_leveling_bg_1777801158855.png" 
          alt="Sung Jinwoo Background" 
          fill
          className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000 duration-700"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020105]/40 via-transparent to-[#020105]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020105] via-transparent to-[#020105]/40" />
      </div>

      <Sidebar />
      <LogWorkoutModal />
      <StatsModal />
      
      <main className="flex-1 ml-20 relative z-10 flex flex-col p-12 max-w-[1600px] mx-auto w-full">
        {/* Top Nav Mock */}
        <nav className="flex items-center justify-between mb-12">
          <div className="flex flex-col">
            <h1 className="text-2xl font-black tracking-[4px] text-white uppercase italic">Level Up</h1>
            <span className="text-[10px] text-slate-500 tracking-[3px] uppercase">Gym Tracker</span>
          </div>
          <ul className="hidden xl:flex items-center gap-10 text-[10px] font-bold text-slate-400 uppercase tracking-[2px]">
            <li className="text-purple-400 border-b border-purple-500 pb-1">Home</li>
            <li className="hover:text-white cursor-pointer transition-colors">Dashboard</li>
            <li className="hover:text-white cursor-pointer transition-colors">Workouts</li>
            <li className="hover:text-white cursor-pointer transition-colors">Progress</li>
            <li className="hover:text-white cursor-pointer transition-colors">Analytics</li>
          </ul>
          <div className="flex items-center gap-4">
            <div className="text-right flex flex-col">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Sung Jinwoo</span>
              <span className="text-[10px] text-purple-400 font-bold uppercase">Lv. 27</span>
            </div>
            <img src="https://ui-avatars.com/api/?name=Sung+Jinwoo&background=020105&color=a855f7&size=40" className="rounded-full border border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
          </div>
        </nav>

        <div className="flex flex-col xl:flex-row gap-12 flex-1">
          {/* Left Column: Hero & Secondary Info */}
          <div className="flex-1 flex flex-col justify-center gap-8">
            <div className="flex flex-col gap-4">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col"
              >
                <p className="text-sm italic text-slate-400 font-medium">"나는 노력한다, 고로 나는 강해진다"</p>
                <p className="text-[10px] uppercase tracking-[3px] text-slate-500 mt-1">I work, therefore I become strong</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-8xl font-black text-white uppercase tracking-tighter leading-[0.8]">
                  Level <span className="text-purple-500 text-glow">Up</span>
                </h2>
                <h3 className="text-4xl font-bold text-slate-300 uppercase mt-4 tracking-tight leading-none">
                  Your Strength.<br />Become Your Strongest.
                </h3>
              </motion.div>

              <p className="text-sm text-slate-400 max-w-md leading-relaxed mt-4">
                Track your workouts. Analyze your progress. Build discipline. Break your limits. 
                Every rep brings you closer to the best version of yourself.
              </p>

              <button 
                onClick={() => setModal('log')}
                className="btn-dungeon mt-6 w-fit flex items-center gap-4"
              >
                Enter Your Dungeon <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Right Column: Status HUD */}
          <div className="w-full xl:w-[380px] flex flex-col gap-6">
            <StatusCard />
            
            <div className="flex flex-col gap-2 items-center text-center opacity-40 mt-4">
              <div className="w-[1px] h-12 bg-gradient-to-b from-purple-500 to-transparent" />
              <p className="text-[10px] uppercase tracking-[4px] text-slate-500">
                Discipline is my weapon<br />Progress is my power
              </p>
            </div>
          </div>
        </div>

        {/* Middle Section: Missions & Analytics */}
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12"
            >
              <MissionCard />
              <MuscleMastery />
            </motion.div>
          )}

          {activeTab === 'quests' && (
            <motion.div 
              key="quests"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-12"
            >
              <h2 className="text-xl font-bold text-purple-400 mb-8 tracking-widest uppercase">Active Quests</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MissionCard />
                <div className="glass-panel p-8 flex items-center justify-center text-slate-500 italic">
                  More quests coming soon as you level up...
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Section: Features */}
        <FeatureGrid />

        <footer className="mt-20 mb-8 flex flex-col items-center gap-4 text-center">
          <div className="w-6 h-10 border-2 border-slate-700 rounded-full flex justify-center p-1">
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1 h-2 bg-slate-700 rounded-full"
            />
          </div>
          <p className="text-[10px] text-slate-600 uppercase tracking-[6px]">Scroll to begin your journey</p>
          <div className="mt-8 text-slate-700 max-w-2xl">
            <p className="text-[10px] uppercase tracking-[2px] leading-relaxed">
              "You can't level up in life without facing strong enemies."<br />
              Challenge today. Conquer tomorrow.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
