import React from 'react';
import { Home, Trophy, Palette, ShoppingBag, Clock, GraduationCap, Image as ImageIcon } from 'lucide-react';
import { ActiveTab } from '../types';
import { playSound } from '../utils/sound';

interface LeftSidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenImageModal: () => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ activeTab, onSelectTab, onOpenImageModal }) => {
  const menuItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Beranda', icon: <Home className="w-5 h-5" /> },
    { id: 'achievements', label: 'Pencapaian', icon: <Trophy className="w-5 h-5" />, badge: '5' },
    { id: 'creations', label: 'Ruang Karya', icon: <Palette className="w-5 h-5" /> },
    { id: 'shop', label: 'Toko Koin', icon: <ShoppingBag className="w-5 h-5" /> },
    { id: 'class_timer', label: 'Siklus 30 Menit', icon: <Clock className="w-5 h-5" />, badge: 'PAUD' },
    { id: 'teacher_dashboard', label: 'Guru & Observasi', icon: <GraduationCap className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-full lg:w-56 shrink-0 flex flex-row lg:flex-col gap-2 p-2 bg-gradient-to-b from-amber-100/80 via-orange-50/80 to-amber-100/80 rounded-3xl border-2 border-amber-300 shadow-md">
      {/* Wooden Frame Title in Sidebar */}
      <div className="hidden lg:block wood-banner p-2.5 rounded-2xl text-center text-white font-game shadow-sm mb-1">
        <span className="text-[10px] uppercase tracking-wider text-amber-200 font-bold block">
          Menu Petualang
        </span>
        <span className="text-sm font-bold text-amber-100">WAWI Hub</span>
      </div>

      {/* Buttons List */}
      <div className="flex flex-row lg:flex-col gap-1.5 w-full overflow-x-auto lg:overflow-visible pb-1 lg:pb-0">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                playSound('click');
                onSelectTab(item.id);
              }}
              className={`px-3.5 py-2.5 rounded-2xl font-game font-bold text-xs flex items-center justify-between gap-2 transition cursor-pointer whitespace-nowrap shrink-0 lg:w-full ${
                isActive
                  ? 'game-btn-wood-active scale-102'
                  : 'game-btn-wood text-white hover:text-amber-100'
              }`}
            >
              <div className="flex items-center gap-2">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-amber-900 text-amber-200' : 'bg-white/20 text-white'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Concept Modal Button */}
      <div className="hidden lg:block mt-auto pt-2 border-t border-amber-200">
        <button
          onClick={() => {
            playSound('pop');
            onOpenImageModal();
          }}
          className="w-full py-2 px-3 rounded-xl bg-white hover:bg-amber-50 border border-amber-300 text-slate-700 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
        >
          <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
          <span>Lihat Konsep Desain</span>
        </button>
      </div>
    </aside>
  );
};
