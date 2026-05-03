import { Home, PlusSquare, Scroll, Package, Settings, Sword } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

const navItems = [
  { id: 'home', icon: Home, label: 'Dashboard' },
  { id: 'log', icon: PlusSquare, label: 'Log Activity' },
  { id: 'quests', icon: Scroll, label: 'Quest Log' },
  { id: 'inventory', icon: Package, label: 'Inventory' },
  { id: 'dungeons', icon: Sword, label: 'Dungeons' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  const { activeTab, setActiveTab, setModal } = useStore();

  return (
    <nav className="fixed left-0 top-0 bottom-0 w-20 bg-[#02060c]/95 border-r border-purple-900/50 flex flex-col items-center py-8 z-50">
      <div className="mb-12 text-purple-400">
        <Sword size={32} className="filter drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
      </div>

      <ul className="flex flex-col gap-8">
        {navItems.map((item) => (
          <li
            key={item.id}
            className={cn(
              "relative cursor-pointer transition-all duration-300 group",
              activeTab === item.id ? "text-purple-400" : "text-slate-500 hover:text-purple-300"
            )}
            onClick={() => {
              if (item.id === 'log') {
                setModal('log');
              } else {
                setActiveTab(item.id as any);
              }
            }}
          >
            <item.icon size={24} />
            {activeTab === item.id && (
              <motion.div
                layoutId="active-nav"
                className="absolute -left-6 top-1/2 -translate-y-1/2 w-1 h-6 bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,1)]"
              />
            )}
            
            {/* Tooltip */}
            <div className="absolute left-20 top-1/2 -translate-y-1/2 px-3 py-1 bg-slate-900 border border-purple-900 text-purple-400 text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {item.label}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
}
