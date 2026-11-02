import React, { useState } from 'react';
import { Volume2, VolumeX, Bell, Sparkles, Star, ChevronDown, Check, User, Shield } from 'lucide-react';
import { AgeLevel, AGE_CONFIGS, StudentProfile } from '../types';
import { playSound, setSoundEnabled, getSoundEnabled } from '../utils/sound';

interface HeaderHUDProps {
  currentProfile: StudentProfile;
  ageLevel: AgeLevel;
  onSelectAgeLevel: (level: AgeLevel) => void;
  onOpenShop: () => void;
  onOpenAchievements: () => void;
  onOpenTeacherDashboard: () => void;
  onOpenTimer: () => void;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({
  currentProfile,
  ageLevel,
  onSelectAgeLevel,
  onOpenShop,
  onOpenAchievements,
  onOpenTeacherDashboard,
  onOpenTimer,
}) => {
  const [soundOn, setSoundOn] = useState(getSoundEnabled());
  const [showAgeMenu, setShowAgeMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playSound('coin');
  };

  const xpPercent = Math.min(100, Math.round((currentProfile.xp / currentProfile.maxXp) * 100));

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-amber-200 shadow-sm px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Player Profile Badge & Title */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          {/* Avatar & Level Card */}
          <div className="flex items-center gap-2.5 bg-gradient-to-r from-amber-50 to-orange-50 p-1.5 pr-3 rounded-2xl border-2 border-amber-300 shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-b from-amber-400 to-orange-500 border-2 border-white flex items-center justify-center text-2xl shadow">
              👦
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-game font-bold text-xs text-slate-800">
                  Explorer WAWI
                </span>
                <span className="text-[10px] bg-amber-400 text-amber-950 font-black px-1.5 py-0.2 rounded-md">
                  Lv. 12
                </span>
              </div>
              <div className="w-24 bg-slate-200 h-2 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-gradient-to-r from-emerald-400 to-green-500 h-full rounded-full transition-all"
                  style={{ width: `${xpPercent}%` }}
                ></div>
              </div>
              <span className="text-[9px] text-slate-500 font-mono">
                {currentProfile.xp} / {currentProfile.maxXp} XP
              </span>
            </div>
          </div>

          {/* Logo Lockup */}
          <div className="hidden lg:flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl">👑</span>
              <span className="font-game font-black text-lg text-amber-600 tracking-tight">
                WAWI Problem Quest
              </span>
              <span className="text-sm">🔍</span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium -mt-1">
              Dari melihat masalah menjadi mencoba solusi.
            </span>
          </div>
        </div>

        {/* Center / Right: Age Selector, Currencies & Quick Utilities */}
        <div className="flex flex-wrap items-center gap-2 justify-end w-full md:w-auto">
          {/* Age Adaptation Pill Selector */}
          <div className="relative">
            <button
              onClick={() => {
                playSound('pop');
                setShowAgeMenu(!showAgeMenu);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs font-bold flex items-center gap-1.5 transition text-slate-700"
            >
              <span>🎯 Usia:</span>
              <span className="text-amber-700 font-extrabold">{AGE_CONFIGS[ageLevel].ageRange}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {showAgeMenu && (
              <div className="absolute right-0 mt-1.5 w-60 bg-white rounded-2xl shadow-xl border-2 border-amber-300 p-2 z-50 flex flex-col gap-1">
                <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Tingkat Perkembangan Adaptif
                </div>
                {(Object.keys(AGE_CONFIGS) as AgeLevel[]).map((lvl) => {
                  const cfg = AGE_CONFIGS[lvl];
                  const isSelected = ageLevel === lvl;
                  return (
                    <button
                      key={lvl}
                      onClick={() => {
                        playSound('click');
                        onSelectAgeLevel(lvl);
                        setShowAgeMenu(false);
                      }}
                      className={`p-2 rounded-xl text-left flex items-start justify-between text-xs transition ${
                        isSelected
                          ? 'bg-amber-100 font-bold text-amber-900 border border-amber-300'
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <div>
                        <div className="font-bold flex items-center gap-1">
                          <span>{cfg.name}</span>
                          <span className="text-[10px] text-slate-500 font-normal">({cfg.ageRange})</span>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5 leading-snug">{cfg.focus}</div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Currencies: Coins & Gems */}
          <button
            onClick={() => {
              playSound('click');
              onOpenShop();
            }}
            className="flex items-center gap-1 bg-amber-50 hover:bg-amber-100 border border-amber-300 px-3 py-1.5 rounded-xl transition text-xs font-game font-bold text-amber-900 shadow-sm cursor-pointer"
            title="Buka Toko Koin"
          >
            <span>🪙</span>
            <span>{currentProfile.coins.toLocaleString('id-ID')}</span>
            <span className="text-[10px] text-amber-600 bg-amber-200/80 px-1 rounded ml-0.5">+</span>
          </button>

          <button
            onClick={() => {
              playSound('click');
              onOpenShop();
            }}
            className="flex items-center gap-1 bg-purple-50 hover:bg-purple-100 border border-purple-300 px-3 py-1.5 rounded-xl transition text-xs font-game font-bold text-purple-900 shadow-sm cursor-pointer"
            title="Permata Ajaib"
          >
            <span>💎</span>
            <span>{currentProfile.gems}</span>
            <span className="text-[10px] text-purple-600 bg-purple-200/80 px-1 rounded ml-0.5">+</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
            title={soundOn ? 'Matikan Suara' : 'Nyalakan Suara'}
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => {
                playSound('pop');
                setShowNotifications(!showNotifications);
              }}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition relative"
              title="Notifikasi Misi"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                3
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 text-xs">
                <div className="font-bold text-slate-800 mb-2 border-b pb-1">Kabar Petualangan:</div>
                <div className="space-y-2 text-slate-600 text-[11px]">
                  <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-200">
                    🌱 <strong>Taman Kehidupan</strong> menunggumu untuk memilah sampah bersih!
                  </div>
                  <div className="p-2 bg-sky-50 rounded-lg border border-sky-200">
                    🏙️ Jembatan Kota siap diuji dengan balok stik es krim!
                  </div>
                  <div className="p-2 bg-amber-50 rounded-lg border border-amber-200">
                    💡 Rekomendasi guru baru tersedia di Growth Tracker.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
