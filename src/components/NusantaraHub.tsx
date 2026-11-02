import React, { useState } from 'react';
import { Star, Lock, CheckCircle2, Volume2, VolumeX, Sparkles, ChevronRight, Home, Trophy, Palette, ShoppingBag, Settings } from 'lucide-react';
import { playSound } from '../utils/sound';
import { AgeLevel, AGE_CONFIGS } from '../types';

interface NusantaraHubProps {
  ageLevel: AgeLevel;
  onSelectGame: (gameId: 'game_eco' | 'game_bridge' | 'game_invention' | 'game_kindness') => void;
  onOpenAchievements: () => void;
  onOpenShop: () => void;
  onOpenTimer: () => void;
  onOpenTeacherDashboard: () => void;
  onOpenCreativeStudio: () => void;
  onOpenQRModal: () => void;
  coins: number;
  gems: number;
  xp: number;
  maxXp: number;
}

export const NusantaraHub: React.FC<NusantaraHubProps> = ({
  ageLevel,
  onSelectGame,
  onOpenAchievements,
  onOpenShop,
  onOpenTimer,
  onOpenTeacherDashboard,
  onOpenCreativeStudio,
  onOpenQRModal,
  coins,
  gems,
  xp,
  maxXp,
}) => {
  const [speechText, setSpeechText] = useState('Siap menjadi pemecah masalah hari ini?');
  const [activeNav, setActiveNav] = useState<'beranda' | 'pencapaian' | 'ruang_karya' | 'toko' | 'pengaturan'>('beranda');

  const speechQuotes = [
    'Siap menjadi pemecah masalah hari ini?',
    'Dari melihat masalah, menjadi mencoba solusi!',
    'Ayo bantu selamatkan Taman Kehidupan!',
    'Yuk susun balok jembatan bersama teman!',
    '15 Menit game, 15 Menit praktik nyata di kelas!',
    'Kegagalan adalah cara belajar yang hebat!',
  ];

  const handleSpeechClick = () => {
    playSound('pop');
    const nextIdx = (speechQuotes.indexOf(speechText) + 1) % speechQuotes.length;
    setSpeechText(speechQuotes[nextIdx]);
  };

  const xpPercent = Math.min(100, Math.round((xp / maxXp) * 100));

  return (
    <div className="w-full max-w-[1540px] mx-auto bg-gradient-to-b from-[#38bdf8] via-[#7dd3fc] to-[#bbf7d0] rounded-3xl p-3 sm:p-5 shadow-2xl border-4 border-amber-400 relative overflow-hidden text-slate-800 select-none">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER & HUD                                                       */}
      {/* ========================================================================= */}
      <div className="relative z-30 flex flex-col md:flex-row items-center justify-between gap-3 mb-3">
        {/* Top Left: Logo & Tagline */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2">
            {/* Crown on W */}
            <div className="relative flex items-center">
              <span className="text-3xl -mr-2 -mt-4 rotate-[-15deg] z-10 animate-bounce">👑</span>
              {/* 3D WAWI Typography */}
              <div className="flex items-center text-4xl sm:text-5xl font-black tracking-tight font-game text-[#fef08a] filter drop-shadow-[0_4px_4px_rgba(120,53,15,0.8)]">
                <span className="text-[#f59e0b] -rotate-2 inline-block">W</span>
                <span className="text-[#fbbf24] rotate-1 inline-block">A</span>
                <span className="text-[#f59e0b] -rotate-1 inline-block">W</span>
                <span className="text-[#f59e0b] rotate-2 inline-block">I</span>
              </div>
            </div>

            {/* Magnifying Glass */}
            <div className="w-10 h-10 rounded-full border-4 border-[#334155] bg-sky-200 shadow-md flex items-center justify-center relative rotate-12 -ml-1">
              <div className="w-4 h-4 rounded-full bg-white/70 absolute top-1 left-1"></div>
              <div className="w-2.5 h-6 bg-amber-900 rounded-sm absolute -bottom-4 -right-1 rotate-45 border border-amber-950"></div>
            </div>

            {/* Problem Quest Wooden Plaque */}
            <div className="ml-1 px-4 py-1.5 bg-gradient-to-b from-[#9a3412] to-[#451a03] rounded-xl border-2 border-[#ea580c] shadow-lg">
              <span className="font-game font-black text-sm sm:text-base text-amber-100 tracking-wider">
                Problem Quest
              </span>
            </div>
          </div>

          {/* Subtitle Parchment Banner */}
          <div className="mt-1 px-4 py-1 parchment-card rounded-full shadow-sm">
            <span className="text-xs sm:text-sm font-bold text-amber-950 font-game tracking-wide">
              Dari melihat masalah menjadi mencoba solusi.
            </span>
          </div>
        </div>

        {/* Top Right: Currencies & Notification */}
        <div className="flex items-center gap-2 sm:gap-3 self-end md:self-auto">
          {/* Gold Coin Capsule */}
          <button
            onClick={() => {
              playSound('coin');
              onOpenShop();
            }}
            className="flex items-center gap-1.5 bg-[#1e293b] hover:bg-[#0f172a] border-2 border-amber-400 px-4 py-1.5 rounded-full shadow-lg text-white font-game font-bold text-xs sm:text-sm cursor-pointer hover:scale-105 transition"
            title="Toko Koin"
          >
            <span className="text-lg">🪙</span>
            <span className="text-amber-300 font-mono tracking-wide">{coins.toLocaleString('id-ID')}</span>
            <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] flex items-center justify-center font-black ml-1">
              +
            </span>
          </button>

          {/* Purple Gem Capsule */}
          <button
            onClick={() => {
              playSound('star');
              onOpenShop();
            }}
            className="flex items-center gap-1.5 bg-[#1e293b] hover:bg-[#0f172a] border-2 border-purple-400 px-4 py-1.5 rounded-full shadow-lg text-white font-game font-bold text-xs sm:text-sm cursor-pointer hover:scale-105 transition"
            title="Permata Ajaib"
          >
            <span className="text-lg">💎</span>
            <span className="text-purple-300 font-mono tracking-wide">{gems}</span>
            <span className="w-4 h-4 rounded-full bg-purple-500 text-white text-[10px] flex items-center justify-center font-black ml-1">
              +
            </span>
          </button>

          {/* QR Code & Link Share Button */}
          <button
            onClick={() => {
              playSound('star');
              onOpenQRModal();
            }}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 border-2 border-white px-3 py-1.5 rounded-full shadow-lg text-slate-950 font-game font-bold text-xs sm:text-sm cursor-pointer hover:scale-105 transition active:scale-95 animate-pulse"
            title="Scan QR Code & Bagikan Link"
          >
            <span className="text-base">📱</span>
            <span className="hidden sm:inline">QR Code</span>
          </button>

          {/* Golden Notification Bell */}
          <button
            onClick={() => {
              playSound('pop');
              alert('🔔 Notifikasi Misi:\n1. Taman Kehidupan butuh pertolongan memilah sampah!\n2. Misi jembatan balok di kelas siap dimainkan!');
            }}
            className="w-10 h-10 rounded-full bg-gradient-to-b from-amber-400 to-yellow-500 border-2 border-amber-700 flex items-center justify-center text-lg shadow-lg relative hover:scale-110 transition cursor-pointer"
            title="Notifikasi"
          >
            <span>🔔</span>
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center border-2 border-white shadow">
              3
            </span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. ADVENTURE HUB STAGE: LEFT SIDEBAR + FLOATING CASTLE & SHRINES          */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-3">
        {/* Left Column: Player Profile + 5 Stacked Buttons */}
        <div className="lg:col-span-3 flex flex-col gap-2">
          {/* Player Profile Card */}
          <div className="bg-[#1e293b] border-2 border-slate-700 rounded-2xl p-3 shadow-lg flex flex-col gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-b from-amber-400 to-orange-500 border-2 border-white shadow flex items-center justify-center text-2xl relative">
                👦
                <span className="absolute -top-1 -right-1 text-xs">👑</span>
              </div>
              <div>
                <h4 className="font-game font-bold text-xs text-white">Explorer WAWI</h4>
                <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-2 py-0.2 rounded-md inline-block">
                  Lv. 12
                </span>
              </div>
            </div>

            {/* XP Bar */}
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700">
              <div
                className="bg-gradient-to-r from-yellow-400 to-amber-500 h-full rounded-full transition-all"
                style={{ width: `${xpPercent}%` }}
              ></div>
            </div>
            <div className="text-[10px] text-amber-200/80 font-mono text-center font-bold">
              {xp} / {maxXp} XP
            </div>
          </div>

          {/* 5 Stacked Wooden/Stone Navigation Buttons */}
          <div className="flex flex-row lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0">
            {/* 1. Beranda */}
            <button
              onClick={() => {
                playSound('click');
                setActiveNav('beranda');
              }}
              className={`px-3 py-2.5 rounded-2xl font-game font-bold text-xs flex items-center gap-2.5 transition cursor-pointer whitespace-nowrap shrink-0 lg:w-full ${
                activeNav === 'beranda' ? 'nav-wood-btn-active' : 'nav-wood-btn'
              }`}
            >
              <Home className="w-4 h-4 text-amber-700" />
              <span>Beranda</span>
            </button>

            {/* 2. Pencapaian */}
            <button
              onClick={() => {
                playSound('star');
                onOpenAchievements();
              }}
              className="px-3 py-2.5 rounded-2xl font-game font-bold text-xs flex items-center gap-2.5 nav-wood-btn transition cursor-pointer whitespace-nowrap shrink-0 lg:w-full"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Pencapaian</span>
            </button>

            {/* 3. Ruang Karya */}
            <button
              onClick={() => {
                playSound('click');
                onOpenCreativeStudio();
              }}
              className="px-3 py-2.5 rounded-2xl font-game font-bold text-xs flex items-center gap-2.5 nav-wood-btn transition cursor-pointer whitespace-nowrap shrink-0 lg:w-full"
            >
              <Palette className="w-4 h-4 text-emerald-400" />
              <span>Ruang Karya</span>
            </button>

            {/* 4. Toko Koin */}
            <button
              onClick={() => {
                playSound('coin');
                onOpenShop();
              }}
              className="px-3 py-2.5 rounded-2xl font-game font-bold text-xs flex items-center gap-2.5 nav-wood-btn transition cursor-pointer whitespace-nowrap shrink-0 lg:w-full"
            >
              <ShoppingBag className="w-4 h-4 text-yellow-400" />
              <span>Toko Koin</span>
            </button>

            {/* 5. Pengaturan */}
            <button
              onClick={() => {
                playSound('click');
                onOpenTeacherDashboard();
              }}
              className="px-3 py-2.5 rounded-2xl font-game font-bold text-xs flex items-center gap-2.5 nav-wood-btn transition cursor-pointer whitespace-nowrap shrink-0 lg:w-full"
            >
              <Settings className="w-4 h-4 text-purple-400" />
              <span>Pengaturan</span>
            </button>
          </div>
        </div>

        {/* Center / Right Stage: Floating Castle, Portal & Shrines */}
        <div className="lg:col-span-9 relative rounded-3xl overflow-hidden border-4 border-amber-300 shadow-2xl bg-gradient-to-b from-[#29b6f6] via-[#81d4fa] to-[#a5d6a7] p-4 flex flex-col justify-between min-h-[460px]">
          {/* Floating Clouds */}
          <div className="absolute top-4 left-1/4 opacity-80 text-4xl cloud-floating">☁️</div>
          <div className="absolute top-8 right-1/4 opacity-70 text-5xl cloud-floating" style={{ animationDelay: '1.5s' }}>☁️</div>

          {/* Floating Airship / Zeppelin in Top Right */}
          <div className="absolute top-4 right-6 z-10 airship-bobbing flex items-center gap-1">
            <div className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 border-2 border-amber-900 shadow-xl flex items-center gap-1.5 text-white font-game font-bold text-xs">
              <span className="text-xl">🛸</span>
              <span className="hidden sm:inline text-amber-100">Wahana Jelajah</span>
              <span className="text-xs">💨</span>
            </div>
          </div>

          {/* Waterfall & Mountain Silhouettes */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -left-6 top-12 w-40 h-56 bg-gradient-to-b from-emerald-600 to-emerald-800 rounded-3xl opacity-80 rotate-6"></div>
            <div className="absolute left-12 top-20 w-6 h-36 bg-gradient-to-b from-sky-100 via-white to-sky-200 waterfall-flow rounded-full blur-[1px]"></div>
            <div className="absolute -right-6 top-12 w-44 h-56 bg-gradient-to-b from-emerald-600 to-emerald-800 rounded-3xl opacity-80 -rotate-6"></div>
            <div className="absolute right-14 top-20 w-6 h-36 bg-gradient-to-b from-sky-100 via-white to-sky-200 waterfall-flow rounded-full blur-[1px]"></div>
          </div>

          {/* Nusantara Adventure Hub Wooden Sign & Magical Swirling Portal */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Curved Sign */}
            <div className="relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl z-20">👑</div>
              <div className="wood-banner-main px-8 py-2 rounded-2xl border-2 border-amber-950 shadow-xl text-center">
                <h2 className="font-game font-black text-base sm:text-lg text-amber-100 tracking-wide filter drop-shadow">
                  Nusantara Adventure Hub
                </h2>
              </div>
            </div>

            {/* Portal Core with Glowing Rings */}
            <div className="relative mt-2 w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-amber-300 bg-slate-900/80 shadow-[0_0_40px_rgba(56,189,248,0.8)] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-1 rounded-full border-2 border-dashed border-sky-300 portal-ring-glow"></div>
                <div className="absolute inset-2.5 rounded-full border-2 border-dotted border-purple-400 portal-ring-glow" style={{ animationDirection: 'reverse', animationDuration: '8s' }}></div>
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-sky-400 via-cyan-300 to-purple-500 shadow-[0_0_30px_#38bdf8] animate-pulse"></div>
              </div>
              <span className="relative z-10 text-xl animate-spin" style={{ animationDuration: '15s' }}>✨</span>
            </div>
          </div>

          {/* 5 Shrines Connected Across Bridge with Glowing Arrows */}
          <div className="relative z-10 my-2 flex items-center justify-center gap-1.5 sm:gap-2.5 w-full px-1">
            {/* Shrine 1: Taman Kehidupan */}
            <button
              onClick={() => {
                playSound('star');
                onSelectGame('game_eco');
              }}
              className="flex-1 p-2 rounded-2xl bg-white/95 border-3 border-emerald-400 shadow-lg hover:scale-105 transition cursor-pointer flex flex-col items-center gap-1 group text-center"
            >
              <div className="text-[9px] font-bold text-amber-950 bg-amber-100 px-1.5 py-0.2 rounded-full border border-amber-300 truncate w-full">
                1. Taman Kehidupan
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-emerald-100 to-green-200 border-2 border-emerald-400 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition">
                🌱
              </div>
              <div className="flex items-center gap-0.5 bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded-full text-[10px] font-bold border border-amber-300">
                <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                <span>0 / 15</span>
              </div>
            </button>

            <span className="text-base font-black text-purple-600 animate-pulse hidden sm:inline">➔</span>

            {/* Shrine 2: Kota Berkelanjutan */}
            <button
              onClick={() => {
                playSound('star');
                onSelectGame('game_bridge');
              }}
              className="flex-1 p-2 rounded-2xl bg-white/95 border-3 border-sky-400 shadow-lg hover:scale-105 transition cursor-pointer flex flex-col items-center gap-1 group text-center"
            >
              <div className="text-[9px] font-bold text-sky-950 bg-sky-100 px-1.5 py-0.2 rounded-full border border-sky-300 truncate w-full">
                2. Kota Berkelanjutan
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-sky-100 to-blue-200 border-2 border-sky-400 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition">
                🏙️
              </div>
              <div className="flex items-center gap-0.5 bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded-full text-[10px] font-bold border border-amber-300">
                <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                <span>0 / 15</span>
              </div>
            </button>

            <span className="text-base font-black text-purple-600 animate-pulse hidden sm:inline">➔</span>

            {/* Shrine 3: Lab Inovasi */}
            <button
              onClick={() => {
                playSound('star');
                onSelectGame('game_invention');
              }}
              className="flex-1 p-2 rounded-2xl bg-white/95 border-3 border-purple-400 shadow-lg hover:scale-105 transition cursor-pointer flex flex-col items-center gap-1 group text-center"
            >
              <div className="text-[9px] font-bold text-purple-950 bg-purple-100 px-1.5 py-0.2 rounded-full border border-purple-300 truncate w-full">
                3. Lab Inovasi
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-purple-100 to-indigo-200 border-2 border-purple-400 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition">
                🧪
              </div>
              <div className="flex items-center gap-0.5 bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded-full text-[10px] font-bold border border-amber-300">
                <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                <span>0 / 15</span>
              </div>
            </button>

            <span className="text-base font-black text-purple-600 animate-pulse hidden sm:inline">➔</span>

            {/* Shrine 4: Desa Nusantara */}
            <button
              onClick={() => {
                playSound('star');
                onSelectGame('game_kindness');
              }}
              className="flex-1 p-2 rounded-2xl bg-white/95 border-3 border-amber-400 shadow-lg hover:scale-105 transition cursor-pointer flex flex-col items-center gap-1 group text-center"
            >
              <div className="text-[9px] font-bold text-amber-950 bg-amber-100 px-1.5 py-0.2 rounded-full border border-amber-300 truncate w-full">
                4. Desa Nusantara
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-amber-100 to-orange-200 border-2 border-amber-400 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition">
                🏡
              </div>
              <div className="flex items-center gap-0.5 bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded-full text-[10px] font-bold border border-amber-300">
                <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                <span>0 / 15</span>
              </div>
            </button>

            <span className="text-base font-black text-purple-600 animate-pulse hidden sm:inline">➔</span>

            {/* Shrine 5: Planet Hijau (Locked) */}
            <button
              onClick={() => {
                playSound('snap');
                alert('🔒 Gerbang Planet Hijau Terkunci! Selesaikan 4 dunia sebelumnya untuk membuka.');
              }}
              className="flex-1 p-2 rounded-2xl bg-slate-300 border-3 border-slate-400 shadow-md flex flex-col items-center gap-1 text-center cursor-not-allowed opacity-80"
            >
              <div className="text-[9px] font-bold text-slate-700 bg-slate-200 px-1.5 py-0.2 rounded-full border border-slate-300 truncate w-full">
                5. Planet Hijau
              </div>
              <div className="w-12 h-12 rounded-xl bg-slate-400/40 border-2 border-slate-500 flex items-center justify-center text-xl shadow-inner text-slate-800">
                🔒
              </div>
              <span className="text-[8px] font-bold text-slate-700 leading-tight">
                Misi Sebelumnya!
              </span>
            </button>
          </div>

          {/* Character Wawi on the Stone Pathway with Speech Bubble */}
          <div className="relative z-20 flex flex-col items-center mt-1">
            {/* Speech Bubble */}
            <div
              onClick={handleSpeechClick}
              className="bg-white/95 text-slate-800 text-xs font-bold font-game px-3.5 py-1.5 rounded-2xl border-2 border-amber-400 shadow-xl mb-1 flex items-center gap-2 cursor-pointer hover:bg-amber-50 animate-bounce"
            >
              <span>💬</span>
              <span>"{speechText}"</span>
            </div>

            {/* Character Wawi with Green "W" Backpack */}
            <div
              onClick={handleSpeechClick}
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition"
            >
              <div className="w-14 h-10 bg-amber-950 rounded-t-full border-2 border-amber-900 -mb-2 z-20"></div>
              <div className="relative w-20 h-16 bg-white rounded-2xl border-2 border-slate-300 shadow-md flex items-center justify-center z-10">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-b from-emerald-500 to-green-700 border-2 border-emerald-900 shadow-inner flex items-center justify-center">
                  <span className="text-white font-black text-xl font-game filter drop-shadow">
                    W
                  </span>
                </div>
              </div>
              <div className="w-40 h-5 bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 rounded-full border-2 border-amber-400 shadow-md -mt-1.5 flex items-center justify-around px-2 text-[9px] text-amber-900 font-bold">
                <span>◆</span>
                <span>Jalan Petualang Nusantara</span>
                <span>◆</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. FITUR UNGGULAN WAWI (5 INTERACTIVE CARDS + PROGRESS WIDGET)            */}
      {/* ========================================================================= */}
      <div className="mt-2 flex flex-col gap-2.5">
        {/* Carved Wooden Banner */}
        <div className="wood-banner-main py-2 px-6 rounded-2xl text-center shadow-lg flex items-center justify-center gap-2 mx-auto max-w-md">
          <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
          <h3 className="font-game font-black text-base sm:text-lg text-amber-100 tracking-wide">
            Fitur Unggulan WAWI
          </h3>
          <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
        </div>

        {/* 5 Cards Grid + Right Progress Widget */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          {/* Card 1: Petualangan Problem-Solving */}
          <button
            onClick={() => {
              playSound('click');
              onSelectGame('game_eco');
            }}
            className="rounded-2xl overflow-hidden border-3 border-pink-400 bg-white shadow-md hover:shadow-xl hover:scale-102 transition text-left cursor-pointer flex flex-col justify-between"
          >
            <div className="w-full bg-gradient-to-r from-pink-500 to-rose-500 p-2 text-white font-game font-bold text-xs text-center">
              1. Petualangan Problem-Solving
            </div>
            <div className="p-3 bg-gradient-to-b from-pink-50 to-rose-100/60 flex flex-col items-center justify-center h-28">
              <span className="text-4xl">🔍🌳</span>
              <span className="text-[10px] text-rose-800 font-bold mt-1">Taman Bermain TK</span>
            </div>
            <div className="p-2.5 bg-pink-100/90 border-t border-pink-200 text-[11px] font-bold text-pink-950 flex items-center gap-1.5">
              <span>🔍</span>
              <span>Temukan masalah di lingkungan sekitar!</span>
            </div>
          </button>

          {/* Card 2: Mini Game Edukatif */}
          <button
            onClick={() => {
              playSound('click');
              onSelectGame('game_eco');
            }}
            className="rounded-2xl overflow-hidden border-3 border-amber-400 bg-white shadow-md hover:shadow-xl hover:scale-102 transition text-left cursor-pointer flex flex-col justify-between"
          >
            <div className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 p-2 text-amber-950 font-game font-bold text-xs text-center">
              2. Mini Game Edukatif
            </div>
            <div className="p-3 bg-gradient-to-b from-amber-50 to-yellow-100/60 flex flex-col items-center justify-center h-28 relative">
              <div className="flex items-center gap-1.5 text-2xl">
                <span>🟩</span>
                <span>🟦</span>
                <span>🟥</span>
              </div>
              <span className="text-xl absolute -bottom-1 right-8 animate-bounce">👆</span>
            </div>
            <div className="p-2.5 bg-amber-100/90 border-t border-amber-200 text-[11px] font-bold text-amber-950 flex items-center gap-1.5">
              <span>🧩</span>
              <span>Pilah, urutkan, dan selesaikan tantangan!</span>
            </div>
          </button>

          {/* Card 3: Kreativitas Tanpa Batas */}
          <button
            onClick={() => {
              playSound('click');
              onOpenCreativeStudio();
            }}
            className="rounded-2xl overflow-hidden border-3 border-emerald-400 bg-white shadow-md hover:shadow-xl hover:scale-102 transition text-left cursor-pointer flex flex-col justify-between"
          >
            <div className="w-full bg-gradient-to-r from-emerald-500 to-green-600 p-2 text-white font-game font-bold text-xs text-center">
              3. Kreativitas Tanpa Batas
            </div>
            <div className="p-3 bg-gradient-to-b from-emerald-50 to-green-100/60 flex flex-col items-center justify-center h-28">
              <span className="text-4xl">🏡🌻</span>
              <span className="text-[10px] text-emerald-800 font-bold mt-1">Desa Ramah Lingkungan</span>
            </div>
            <div className="p-2.5 bg-emerald-100/90 border-t border-emerald-200 text-[11px] font-bold text-emerald-950 flex items-center gap-1.5">
              <span>🧊</span>
              <span>Rancang solusi melalui Build & Create!</span>
            </div>
          </button>

          {/* Card 4: Belajar dari Cerita */}
          <button
            onClick={() => {
              playSound('click');
              onOpenTimer();
            }}
            className="rounded-2xl overflow-hidden border-3 border-purple-400 bg-white shadow-md hover:shadow-xl hover:scale-102 transition text-left cursor-pointer flex flex-col justify-between"
          >
            <div className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 p-2 text-white font-game font-bold text-xs text-center">
              4. Belajar dari Cerita
            </div>
            <div className="p-3 bg-gradient-to-b from-purple-50 to-indigo-100/60 flex flex-col items-center justify-center h-28">
              <span className="text-4xl">📖✨</span>
              <span className="text-[10px] text-purple-800 font-bold mt-1">Dongeng Interaktif</span>
            </div>
            <div className="p-2.5 bg-purple-100/90 border-t border-purple-200 text-[11px] font-bold text-purple-950 flex items-center gap-1.5">
              <span>📚</span>
              <span>Ubah ide menjadi karya & bagikan cerita!</span>
            </div>
          </button>

          {/* Card 5: Kolaborasi & Komunitas */}
          <button
            onClick={() => {
              playSound('click');
              onSelectGame('game_kindness');
            }}
            className="rounded-2xl overflow-hidden border-3 border-sky-400 bg-white shadow-md hover:shadow-xl hover:scale-102 transition text-left cursor-pointer flex flex-col justify-between"
          >
            <div className="w-full bg-gradient-to-r from-sky-400 to-blue-500 p-2 text-white font-game font-bold text-xs text-center">
              5. Kolaborasi & Komunitas
            </div>
            <div className="p-3 bg-gradient-to-b from-sky-50 to-blue-100/60 flex flex-col items-center justify-center h-28">
              <span className="text-4xl">🤝💬</span>
              <span className="text-[10px] text-sky-800 font-bold mt-1">Bermain Bersama Damai</span>
            </div>
            <div className="p-2.5 bg-sky-100/90 border-t border-sky-200 text-[11px] font-bold text-sky-950 flex items-center gap-1.5">
              <span>👥</span>
              <span>Diskusi, kerja sama & apresiasi!</span>
            </div>
          </button>

          {/* Card 6: Progress Anak Hebat */}
          <div className="parchment-card rounded-2xl p-3 flex flex-col justify-between shadow-md">
            <div>
              <h4 className="font-game font-black text-xs text-amber-950 border-b border-amber-300 pb-1 mb-2">
                Progress Anak Hebat
              </h4>
              <div className="space-y-1.5 text-[11px] text-emerald-900 font-bold">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Selesaikan misi 3/5</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Kumpulkan 100 Koin</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Raih 5 Bintang</span>
                </div>
              </div>

              <div className="mt-2 pt-1.5 border-t border-amber-200">
                <span className="text-[10px] font-bold text-amber-900 block">Hadiah Achievement:</span>
                <div className="flex items-center gap-2 text-xl mt-0.5">
                  <span>👑</span>
                  <span>📦</span>
                  <span>⭐</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                playSound('star');
                onOpenAchievements();
              }}
              className="btn-gold-3d mt-2 py-1.5 px-2 rounded-xl text-center font-game font-bold text-xs"
            >
              Lihat Detail &gt;
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. BOTTOM DOCK & MASCOT "LITTLE MINDS, BIG SOLUTIONS!"                    */}
      {/* ========================================================================= */}
      <div className="mt-4 flex flex-col lg:flex-row items-center justify-between gap-3 bg-white/95 backdrop-blur rounded-3xl p-3.5 border-3 border-amber-300 shadow-xl">
        {/* Left Vertical Sign: Fitur Pendukung */}
        <div className="wood-banner-main py-2 px-4 rounded-xl text-center text-xs font-game font-black text-amber-100 shadow shrink-0">
          ★ Fitur Pendukung untuk Perkembangan Optimal! ★
        </div>

        {/* 4 Pill Buttons in the Middle */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1 w-full">
          {/* 1. Ruang Belajar */}
          <button
            onClick={() => {
              playSound('click');
              onOpenTimer();
            }}
            className="p-2.5 rounded-2xl bg-sky-50 hover:bg-sky-100 border-2 border-sky-300 text-left transition cursor-pointer flex items-center gap-2"
          >
            <div className="w-9 h-9 rounded-xl bg-sky-200 border border-sky-400 flex items-center justify-center text-xl shrink-0">
              📖
            </div>
            <div>
              <div className="font-bold text-xs text-sky-950 font-game">Ruang Belajar</div>
              <div className="text-[9px] text-sky-700 leading-tight">Eksplorasi sains, sastra & lingkungan!</div>
            </div>
          </button>

          {/* 2. Klinik Ide */}
          <button
            onClick={() => {
              playSound('click');
              onOpenCreativeStudio();
            }}
            className="p-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 text-left transition cursor-pointer flex items-center gap-2"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-200 border border-amber-400 flex items-center justify-center text-xl shrink-0">
              💡
            </div>
            <div>
              <div className="font-bold text-xs text-amber-950 font-game">Klinik Ide</div>
              <div className="text-[9px] text-amber-700 leading-tight">Saran & bimbingan kreatif!</div>
            </div>
          </button>

          {/* 3. Papan Prestasi */}
          <button
            onClick={() => {
              playSound('star');
              onOpenAchievements();
            }}
            className="p-2.5 rounded-2xl bg-purple-50 hover:bg-purple-100 border-2 border-purple-300 text-left transition cursor-pointer flex items-center gap-2"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-200 border border-purple-400 flex items-center justify-center text-xl shrink-0">
              🏆
            </div>
            <div>
              <div className="font-bold text-xs text-purple-950 font-game">Papan Prestasi</div>
              <div className="text-[9px] text-purple-700 leading-tight">Tunjukkan karya terbaikmu!</div>
            </div>
          </button>

          {/* 4. Mode Adaptif */}
          <button
            onClick={() => {
              playSound('click');
              onOpenTeacherDashboard();
            }}
            className="p-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-300 text-left transition cursor-pointer flex items-center gap-2"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-200 border border-emerald-400 flex items-center justify-center text-xl shrink-0">
              ⚙️
            </div>
            <div>
              <div className="font-bold text-xs text-emerald-950 font-game">Mode Adaptif</div>
              <div className="text-[9px] text-emerald-700 leading-tight">Tantangan menyesuaikan usia & kemampuan!</div>
            </div>
          </button>
        </div>

        {/* Mascot & Motto on Right */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="bg-amber-100 border-2 border-amber-400 px-3 py-1.5 rounded-2xl text-center shadow-sm">
            <span className="font-game font-black text-xs text-amber-950 block">
              Little Minds, Big Solutions!
            </span>
          </div>
          <div className="flex items-center text-3xl">
            <span className="hover:rotate-12 transition transform cursor-pointer">🐶</span>
            <span className="hover:scale-110 transition transform cursor-pointer">👦🎒</span>
          </div>
        </div>
      </div>
    </div>
  );
};
