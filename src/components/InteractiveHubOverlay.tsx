import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Trophy, BookOpen, Clock, GraduationCap, X, Check, ShoppingBag, Settings } from 'lucide-react';
import { playSound, setSoundEnabled, getSoundEnabled } from '../utils/sound';
import { AgeLevel, AGE_CONFIGS } from '../types';

interface InteractiveHubOverlayProps {
  onOpenGame: (gameId: 'game_eco' | 'game_bridge' | 'game_invention' | 'game_kindness') => void;
  onOpenAchievements: () => void;
  onOpenShop: () => void;
  onOpenTimer: () => void;
  onOpenTeacherDashboard: () => void;
  onOpenCreativeStudio: () => void;
  ageLevel: AgeLevel;
  onSelectAgeLevel: (lvl: AgeLevel) => void;
}

export const InteractiveHubOverlay: React.FC<InteractiveHubOverlayProps> = ({
  onOpenGame,
  onOpenAchievements,
  onOpenShop,
  onOpenTimer,
  onOpenTeacherDashboard,
  onOpenCreativeStudio,
  ageLevel,
  onSelectAgeLevel,
}) => {
  const [soundOn, setSoundOn] = useState(getSoundEnabled());
  const [speechBubbleText, setSpeechBubbleText] = useState('Siap menjadi pemecah masalah hari ini?');
  const [activeNotification, setActiveNotification] = useState<string | null>(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [hotspotHint, setHotspotHint] = useState<string | null>(null);

  const speechQuotes = [
    'Siap menjadi pemecah masalah hari ini?',
    'Dari melihat masalah, menjadi mencoba solusi!',
    'Ayo bantu bersihkan Taman Kehidupan!',
    'Yuk susun balok jembatan bersama teman!',
    '15 Menit main game, 15 Menit praktik di kelas!',
  ];

  const handleSpeechClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSound('pop');
    const nextIdx = (speechQuotes.indexOf(speechBubbleText) + 1) % speechQuotes.length;
    setSpeechBubbleText(speechQuotes[nextIdx]);
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playSound('coin');
  };

  const triggerLockedAlert = () => {
    playSound('snap');
    alert('🔒 Gerbang Planet Hijau Terkunci! Selesaikan 4 dunia sebelumnya (Taman Kehidupan, Kota Berkelanjutan, Lab Inovasi, dan Desa Nusantara) untuk membuka portal ini.');
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Quick Navigation HUD on top */}
      <div className="w-full max-w-7xl px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-game font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300 flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" style={{ animationDuration: '6s' }} />
            Semua Tombol, Gerbang, & Kartu di Bawah Dapat Diklik & Dimainkan!
          </span>
          <span className="text-slate-500 hidden sm:inline">
            Arahkan kursor & klik untuk memulai petualangan.
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Jump Buttons */}
          <button
            onClick={() => {
              playSound('click');
              onOpenTimer();
            }}
            className="px-2.5 py-1 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-900 font-bold border border-orange-300 transition flex items-center gap-1"
          >
            <Clock className="w-3.5 h-3.5" />
            Siklus 30 Menit
          </button>

          <button
            onClick={() => {
              playSound('click');
              onOpenTeacherDashboard();
            }}
            className="px-2.5 py-1 rounded-xl bg-teal-100 hover:bg-teal-200 text-teal-900 font-bold border border-teal-300 transition flex items-center gap-1"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            Growth Tracker Guru
          </button>

          {/* Audio toggle */}
          <button
            onClick={toggleSound}
            className="p-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 shadow-sm"
            title={soundOn ? 'Suara Aktif' : 'Suara Mati'}
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>
        </div>
      </div>

      {/* Main 16:9 Image Viewport with Pixel-Perfect Interactive Hotspots */}
      <div className="w-full max-w-7xl px-2 sm:px-4 py-1">
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-400 bg-slate-900 aspect-[16/9] select-none">
          {/* Exact Background Artwork Image */}
          <img
            src="/assets/aistudio/872587105_1632029568381363_8840533061228994835_n_fe248fb6.png"
            alt="WAWI Problem Quest Nusantara Hub"
            className="w-full h-full object-cover pointer-events-none"
            referrerPolicy="no-referrer"
          />

          {/* ========================================================= */}
          {/* INTERACTIVE HOTSPOTS LAYER                                */}
          {/* ========================================================= */}

          {/* 1. TOP RIGHT HUD: COINS */}
          <button
            onClick={() => {
              playSound('coin');
              onOpenShop();
            }}
            onMouseEnter={() => setHotspotHint('Buka Toko Koin Petualang (12.560 Koin)')}
            onMouseLeave={() => setHotspotHint(null)}
            className="absolute top-[1.5%] left-[73.5%] w-[10%] h-[5.5%] rounded-full cursor-pointer hover:ring-2 hover:ring-yellow-400 hover:bg-yellow-400/20 transition-all z-20"
            title="Toko Koin (12.560 Koin)"
          />

          {/* 2. TOP RIGHT HUD: GEMS */}
          <button
            onClick={() => {
              playSound('star');
              onOpenShop();
            }}
            onMouseEnter={() => setHotspotHint('Buka Toko Permata (245 Permata)')}
            onMouseLeave={() => setHotspotHint(null)}
            className="absolute top-[1.5%] left-[84%] w-[9%] h-[5.5%] rounded-full cursor-pointer hover:ring-2 hover:ring-purple-400 hover:bg-purple-400/20 transition-all z-20"
            title="Permata Ajaib (245 Gems)"
          />

          {/* 3. TOP RIGHT HUD: NOTIFICATION BELL */}
          <button
            onClick={() => {
              playSound('pop');
              setActiveNotification(
                activeNotification
                  ? null
                  : '🔔 3 Notifikasi Misi Baru:\n1. Taman Kehidupan butuh pertolongan!\n2. Misi nyata jembatan balok di kelas siap dimainkan!\n3. Portofolio Growth Tracker anak telah diperbarui.'
              );
            }}
            onMouseEnter={() => setHotspotHint('Lihat 3 Notifikasi Petualangan')}
            onMouseLeave={() => setHotspotHint(null)}
            className="absolute top-[1.5%] left-[93.8%] w-[4.5%] h-[5.5%] rounded-full cursor-pointer hover:ring-2 hover:ring-amber-300 hover:bg-amber-300/20 transition-all z-20"
            title="Notifikasi Petualangan (3)"
          />

          {/* 4. TOP LEFT: PROFILE CARD */}
          <button
            onClick={() => {
              playSound('pop');
              setShowSettingsModal(true);
            }}
            onMouseEnter={() => setHotspotHint('Profil Pemain: Explorer WAWI Lv. 12 (320/800 XP)')}
            onMouseLeave={() => setHotspotHint(null)}
            className="absolute top-[16.5%] left-[1.3%] w-[10.5%] h-[17.5%] rounded-2xl cursor-pointer hover:ring-2 hover:ring-amber-300 hover:bg-amber-300/15 transition-all z-20"
            title="Profil Explorer WAWI Lv. 12"
          />

          {/* 5. LEFT SIDEBAR BUTTONS */}
          {/* Beranda */}
          <button
            onClick={() => {
              playSound('click');
              setSpeechBubbleText('Kamu sudah berada di Beranda Nusantara!');
            }}
            onMouseEnter={() => setHotspotHint('Menu: Beranda (Home)')}
            onMouseLeave={() => setHotspotHint(null)}
            className="absolute top-[37.2%] left-[1.2%] w-[10.6%] h-[3.8%] rounded-xl cursor-pointer hover:ring-2 hover:ring-amber-400 transition-all z-20"
            title="Beranda"
          />

          {/* Pencapaian */}
          <button
            onClick={() => {
              playSound('star');
              onOpenAchievements();
            }}
            onMouseEnter={() => setHotspotHint('Menu: Pencapaian & Solution Badges')}
            onMouseLeave={() => setHotspotHint(null)}
            className="absolute top-[41.4%] left-[1.2%] w-[10.6%] h-[3.8%] rounded-xl cursor-pointer hover:ring-2 hover:ring-amber-400 hover:bg-amber-400/20 transition-all z-20"
            title="Pencapaian & Badges"
          />

          {/* Ruang Karya */}
          <button
            onClick={() => {
              playSound('click');
              onOpenCreativeStudio();
            }}
            onMouseEnter={() => setHotspotHint('Menu: Ruang Karya (Build & Create Studio)')}
            onMouseLeave={() => setHotspotHint(null)}
            className="absolute top-[45.4%] left-[1.2%] w-[10.6%] h-[3.8%] rounded-xl cursor-pointer hover:ring-2 hover:ring-amber-400 hover:bg-amber-400/20 transition-all z-20"
            title="Ruang Karya"
          />

          {/* Toko Koin */}
          <button
            onClick={() => {
              playSound('coin');
              onOpenShop();
            }}
            onMouseEnter={() => setHotspotHint('Menu: Toko Koin Petualang')}
            onMouseLeave={() => setHotspotHint(null)}
            className="absolute top-[49.4%] left-[1.2%] w-[10.6%] h-[3.8%] rounded-xl cursor-pointer hover:ring-2 hover:ring-amber-400 hover:bg-amber-400/20 transition-all z-20"
            title="Toko Koin"
          />

          {/* Pengaturan */}
          <button
            onClick={() => {
              playSound('click');
              setShowSettingsModal(true);
            }}
            onMouseEnter={() => setHotspotHint('Menu: Pengaturan & Mode Adaptif Usia')}
            onMouseLeave={() => setHotspotHint(null)}
            className="absolute top-[53.3%] left-[1.2%] w-[10.6%] h-[3.8%] rounded-xl cursor-pointer hover:ring-2 hover:ring-amber-400 hover:bg-amber-400/20 transition-all z-20"
            title="Pengaturan"
          />

          {/* 6. 5 ADVENTURE SHRINE PORTALS ACROSS THE MIDDLE */}
          {/* Shrine 1: Taman Kehidupan (Eco Rescue) */}
          <button
            onClick={() => {
              playSound('star');
              onOpenGame('game_eco');
            }}
            onMouseEnter={() => setHotspotHint('Dunia 1: Taman Kehidupan (Eco Rescue) — Klik untuk Mainkan!')}
            onMouseLeave={() => setHotspotHint(null)}
            className="absolute top-[21.5%] left-[23.5%] w-[8%] h-[18%] rounded-2xl cursor-pointer hover:ring-4 hover:ring-emerald-400 hover:scale-105 hover:bg-emerald-400/20 transition-all z-20 group"
            title="Dunia 1: Taman Kehidupan"
          >
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow">
              ▶ Mainkan!
            </span>
          </button>

          {/* Shrine 2: Kota Berkelanjutan (Building City) */}
          <button
            onClick={() => {
              playSound('star');
              onOpenGame('game_bridge');
            }}
            onMouseEnter={() => setHotspotHint('Dunia 2: Kota Berkelanjutan (Bridge Builder) — Klik untuk Mainkan!')}
            onMouseLeave={() => setHotspotHint(null)}
            className="absolute top-[21.5%] left-[34.4%] w-[8%] h-[18%] rounded-2xl cursor-pointer hover:ring-4 hover:ring-sky-400 hover:scale-105 hover:bg-sky-400/20 transition-all z-20 group"
            title="Dunia 2: Kota Berkelanjutan"
          >
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sky-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow">
              ▶ Mainkan!
            </span>
          </button>

          {/* Shrine 3: Laboratorium Inovasi */}
          <button
            onClick={() => {
              playSound('star');
              onOpenGame('game_invention');
            }}
            onMouseEnter={() => setHotspotHint('Dunia 3: Laboratorium Inovasi (Eksperimen Alat) — Klik untuk Mainkan!')}
            onMouseLeave={() => setHotspotHint(null)}
            className="absolute top-[21.5%] left-[62.2%] w-[8%] h-[18%] rounded-2xl cursor-pointer hover:ring-4 hover:ring-purple-400 hover:scale-105 hover:bg-purple-400/20 transition-all z-20 group"
            title="Dunia 3: Laboratorium Inovasi"
          >
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow">
              ▶ Mainkan!
            </span>
          </button>

          {/* Shrine 4: Desa Nusantara (Kindness Village) */}
          <button
            onClick={() => {
              playSound('star');
              onOpenGame('game_kindness');
            }}
            onMouseEnter={() => setHotspotHint('Dunia 4: Desa Nusantara (Empati & Kolaborasi) — Klik untuk Mainkan!')}
            onMouseLeave={() => setHotspotHint(null)}
            className="absolute top-[21.5%] left-[73.6%] w-[8%] h-[18%] rounded-2xl cursor-pointer hover:ring-4 hover:ring-amber-400 hover:scale-105 hover:bg-amber-400/20 transition-all z-20 group"
            title="Dunia 4: Desa Nusantara"
          >
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow">
              ▶ Mainkan!
            </span>
          </button>

          {/* Shrine 5: Planet Hijau (Locked) */}
          <button
            onClick={triggerLockedAlert}
            onMouseEnter={() => setHotspotHint('Dunia 5: Planet Hijau (Terkunci)')}
            onMouseLeave={() => setHotspotHint(null)}
            className="absolute top-[21.5%] left-[85.3%] w-[8.2%] h-[18%] rounded-2xl cursor-pointer hover:ring-4 hover:ring-rose-400 hover:bg-rose-400/20 transition-all z-20"
            title="Dunia 5: Planet Hijau (Terkunci)"
          />

          {/* 7. CENTER SPEECH BUBBLE & WAWI */}
          <button
            onClick={handleSpeechClick}
            onMouseEnter={() => setHotspotHint('Klik balon ucapan Wawi untuk mendengar suara & pesan inspirasi!')}
            onMouseLeave={() => setHotspotHint(null)}
            className="absolute top-[32%] left-[53%] w-[10.5%] h-[9%] rounded-2xl cursor-pointer hover:ring-2 hover:ring-amber-400 transition-all z-20 flex items-center justify-center"
            title="Ucapan Wawi (Klik untuk Ganti Kata-kata!)"
          />

          <button
            onClick={handleSpeechClick}
            onMouseEnter={() => setHotspotHint('Wawi si Pemecah Masalah Cilik (Little Innovator)')}
            onMouseLeave={() => setHotspotHint(null)}
            className="absolute top-[26%] left-[44%] w-[10%] h-[23%] rounded-full cursor-pointer hover:ring-2 hover:ring-amber-400 hover:bg-amber-400/10 transition-all z-20"
            title="Karakter Wawi (Klik untuk sapaan!)"
          />

          {/* 8. MIDDLE 5 FEATURE CARDS */}
          {/* Card 1: Petualangan Problem-Solving */}
          <button
            onClick={() => {
              playSound('click');
              onOpenGame('game_eco');
            }}
            onMouseEnter={() => setHotspotHint('Fitur 1: Petualangan Problem-Solving — Temukan masalah di lingkungan sekitar!')}
            onMouseLeave={() => setHotspotHint(null)}
            className="absolute top-[56%] left-[1.2%] w-[17.6%] h-[25.2%] rounded-2xl cursor-pointer hover:ring-4 hover:ring-rose-400 hover:scale-[1.02] hover:bg-rose-400/15 transition-all z-20"
            title="1. Petualangan Problem-Solving"
          />

          {/* Card 2: Mini Game Edukatif */}
          <button
            onClick={() => {
              playSound('click');
              onOpenGame('game_eco');
            }}
            onMouseEnter={() => setHotspotHint('Fitur 2: Mini Game Edukatif — Pilah sampah, urutkan, & selesaikan tantangan!')}
            onMouseLeave={() => setHotspotHint(null)}
            className="absolute top-[56%] left-[19.2%] w-[17.4%] h-[25.2%] rounded-2xl cursor-pointer hover:ring-4 hover:ring-amber-400 hover:scale-[1.02] hover:bg-amber-400/15 transition-all z-20"
            title="2. Mini Game Edukatif"
          />

          {/* Card 3: Kreativitas Tanpa Batas */}
          <button
            onClick={() => {
              playSound('click');
              onOpenCreativeStudio();
            }}
            onMouseEnter={() => setHotspotHint('Fitur 3: Kreativitas Tanpa Batas — Rancang solusi melalui Build & Create!')}
            onMouseLeave={() => setHotspotHint(null)}
            className="absolute top-[56%] left-[36.8%] w-[16%] h-[25.2%] rounded-2xl cursor-pointer hover:ring-4 hover:ring-emerald-400 hover:scale-[1.02] hover:bg-emerald-400/15 transition-all z-20"
            title="3. Kreativitas Tanpa Batas"
          />

          {/* Card 4: Belajar dari Cerita */}
          <button
            onClick={() => {
              playSound('click');
              onOpenTimer();
            }}
            onMouseEnter={() => setHotspotHint('Fitur 4: Belajar dari Cerita — Siklus 30 Menit Smart Learning!')}
            onMouseLeave={() => setHotspotHint(null)}
            className="absolute top-[56%] left-[53.2%] w-[14.8%] h-[25.2%] rounded-2xl cursor-pointer hover:ring-4 hover:ring-purple-400 hover:scale-[1.02] hover:bg-purple-400/15 transition-all z-20"
            title="4. Belajar dari Cerita"
          />

          {/* Card 5: Kolaborasi & Komunitas */}
          <button
            onClick={() => {
              playSound('click');
              onOpenGame('game_kindness');
            }}
            onMouseEnter={() => setHotspotHint('Fitur 5: Kolaborasi & Komunitas — Misi empati bersama di kelas!')}
            onMouseLeave={() => setHotspotHint(null)}
            className="absolute top-[56%] left-[68.3%] w-[16.6%] h-[25.2%] rounded-2xl cursor-pointer hover:ring-4 hover:ring-sky-400 hover:scale-[1.02] hover:bg-sky-400/15 transition-all z-20"
            title="5. Kolaborasi & Komunitas"
          />

          {/* 9. RIGHT CARD: PROGRESS ANAK HEBAT */}
          <button
            onClick={() => {
              playSound('star');
              onOpenAchievements();
            }}
            onMouseEnter={() => setHotspotHint('Progress Anak Hebat: Selesaikan Misi, Koin, Bintang & Badges!')}
            onMouseLeave={() => setHotspotHint(null)}
            className="absolute top-[53.8%] left-[85.5%] w-[13.5%] h-[27.5%] rounded-2xl cursor-pointer hover:ring-4 hover:ring-amber-400 hover:bg-amber-400/15 transition-all z-20"
            title="Progress Anak Hebat & Lihat Detail"
          />

          {/* 10. BOTTOM 4 DOCK BUTTONS */}
          {/* Ruang Belajar */}
          <button
            onClick={() => {
              playSound('pop');
              onOpenTimer();
            }}
            onMouseEnter={() => setHotspotHint('Fitur Pendukung: Ruang Belajar (Sains, Sastra, Lingkungan)')}
            onMouseLeave={() => setHotspotHint(null)}
            className="absolute top-[85%] left-[16.2%] w-[13.8%] h-[9.5%] rounded-2xl cursor-pointer hover:ring-4 hover:ring-sky-400 hover:bg-sky-400/20 transition-all z-20"
            title="Ruang Belajar"
          />

          {/* Klinik Ide */}
          <button
            onClick={() => {
              playSound('pop');
              onOpenCreativeStudio();
            }}
            onMouseEnter={() => setHotspotHint('Fitur Pendukung: Klinik Ide (Bimbingan Kreatif & Solusi)')}
            onMouseLeave={() => setHotspotHint(null)}
            className="absolute top-[85%] left-[30.9%] w-[13.8%] h-[9.5%] rounded-2xl cursor-pointer hover:ring-4 hover:ring-amber-400 hover:bg-amber-400/20 transition-all z-20"
            title="Klinik Ide"
          />

          {/* Papan Prestasi */}
          <button
            onClick={() => {
              playSound('star');
              onOpenAchievements();
            }}
            onMouseEnter={() => setHotspotHint('Fitur Pendukung: Papan Prestasi (Karya Terbaik Anak)')}
            onMouseLeave={() => setHotspotHint(null)}
            className="absolute top-[85%] left-[45.6%] w-[13.8%] h-[9.5%] rounded-2xl cursor-pointer hover:ring-4 hover:ring-purple-400 hover:bg-purple-400/20 transition-all z-20"
            title="Papan Prestasi"
          />

          {/* Mode Adaptif */}
          <button
            onClick={() => {
              playSound('pop');
              setShowSettingsModal(true);
            }}
            onMouseEnter={() => setHotspotHint('Fitur Pendukung: Mode Adaptif (Menyesuaikan Usia 3-4 th, 4-5 th, 5-6 th)')}
            onMouseLeave={() => setHotspotHint(null)}
            className="absolute top-[85%] left-[60.4%] w-[13.8%] h-[9.5%] rounded-2xl cursor-pointer hover:ring-4 hover:ring-indigo-400 hover:bg-indigo-400/20 transition-all z-20"
            title="Mode Adaptif"
          />

          {/* 11. BOTTOM RIGHT MASCOT & BOY */}
          <button
            onClick={() => {
              playSound('victory');
              alert('🌟 "Little Minds, Big Solutions!" — Menemani anak Indonesia berpikir kritis, kreatif, dan berempati sejak usia dini!');
            }}
            onMouseEnter={() => setHotspotHint('Mascot WAWI: Little Minds, Big Solutions!')}
            onMouseLeave={() => setHotspotHint(null)}
            className="absolute top-[82%] left-[75%] w-[23.5%] h-[15%] rounded-2xl cursor-pointer hover:ring-4 hover:ring-amber-400 hover:bg-amber-400/10 transition-all z-20"
            title="Little Minds, Big Solutions!"
          />
        </div>

        {/* Live Hover Hint Bar */}
        <div className="mt-2 min-h-[28px] flex items-center justify-center text-center">
          {hotspotHint ? (
            <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-bold bg-amber-500 text-white shadow animate-pulse">
              <span>👉</span> {hotspotHint}
            </span>
          ) : (
            <span className="text-xs text-slate-500 font-medium">
              💡 Tip: Sentuh gerbang dunia 1–4 atau kartu fitur di atas untuk langsung membuka game interaktif!
            </span>
          )}
        </div>
      </div>

      {/* Notifications Toast */}
      {activeNotification && (
        <div className="fixed top-16 right-6 z-50 bg-white rounded-2xl p-4 max-w-sm shadow-2xl border-2 border-amber-400 animate-in fade-in slide-in-from-top-4">
          <div className="flex items-start justify-between gap-3">
            <div className="whitespace-pre-line text-xs font-medium text-slate-700 leading-relaxed">
              {activeNotification}
            </div>
            <button
              onClick={() => setActiveNotification(null)}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Settings / Adaptive Age Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border-4 border-amber-300 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <Settings className="w-6 h-6 text-amber-600" />
                <h3 className="text-lg font-bold font-game text-slate-800">
                  Pengaturan & Mode Adaptif Usia
                </h3>
              </div>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-slate-600">Pilih Tahap Perkembangan Anak:</span>
              {(Object.keys(AGE_CONFIGS) as AgeLevel[]).map((lvl) => {
                const cfg = AGE_CONFIGS[lvl];
                const isSelected = ageLevel === lvl;
                return (
                  <button
                    key={lvl}
                    onClick={() => {
                      playSound('coin');
                      onSelectAgeLevel(lvl);
                      setShowSettingsModal(false);
                    }}
                    className={`p-3 rounded-2xl border text-left flex items-start justify-between transition cursor-pointer ${
                      isSelected
                        ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-400'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                        <span>{cfg.name}</span>
                        <span className="text-[11px] text-amber-700 bg-amber-100 px-2 py-0.2 rounded-full font-bold">
                          {cfg.ageRange}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">{cfg.focus}</div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t flex items-center justify-between">
              <button
                onClick={() => {
                  setShowSettingsModal(false);
                  onOpenTeacherDashboard();
                }}
                className="text-xs font-bold text-teal-700 hover:underline flex items-center gap-1"
              >
                <GraduationCap className="w-4 h-4" /> Buka Growth Tracker Guru &gt;
              </button>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="game-btn-gold px-4 py-1.5 rounded-xl text-xs font-bold font-game"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
