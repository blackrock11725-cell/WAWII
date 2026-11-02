import React, { useState } from 'react';
import { NusantaraHub } from './components/NusantaraHub';
import { EcoRescueGame } from './components/games/EcoRescueGame';
import { BuildingCityGame } from './components/games/BuildingCityGame';
import { KindnessVillageGame } from './components/games/KindnessVillageGame';
import { SmartClassroomTimer } from './components/SmartClassroomTimer';
import { TeacherGrowthDashboard } from './components/TeacherGrowthDashboard';
import { CreativeStudio } from './components/CreativeStudio';
import { AchievementsModal } from './components/AchievementsModal';
import { CoinShopModal } from './components/CoinShopModal';
import { ShareQRModal } from './components/ShareQRModal';
import { ActiveTab, AgeLevel, StudentProfile } from './types';
import { INITIAL_STUDENTS } from './data/mockData';
import { ArrowLeft, Home, Trophy, Palette, ShoppingBag, Clock, GraduationCap, QrCode } from 'lucide-react';
import { playSound } from './utils/sound';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [ageLevel, setAgeLevel] = useState<AgeLevel>('creator');
  const [currentProfile, setCurrentProfile] = useState<StudentProfile>(INITIAL_STUDENTS[0]);

  const SHARED_APP_URL = 'https://ais-pre-zxlefwhls4kcgup43dxf6d-796966145397.asia-northeast1.run.app';

  // Modals
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isQROpen, setIsQROpen] = useState(false);

  const handleReward = (coinsEarned: number, xpEarned: number) => {
    setCurrentProfile((prev) => {
      const nextXp = prev.xp + xpEarned;
      const nextCoins = prev.coins + coinsEarned;
      const nextStars = prev.stars + 1;
      return {
        ...prev,
        xp: nextXp,
        coins: nextCoins,
        stars: nextStars,
      };
    });
  };

  const handleBuy = (cost: number) => {
    setCurrentProfile((prev) => ({
      ...prev,
      coins: Math.max(0, prev.coins - cost),
    }));
  };

  return (
    <div className="min-h-screen bg-[#0e1628] text-slate-100 flex flex-col font-sans select-none">
      {/* Dynamic Main View */}
      <main className="flex-1 w-full flex flex-col items-center justify-start py-1 sm:py-3 px-1 sm:px-3">
        {/* VIEW 1: THE FULL-SCREEN MAJESTIC NUSANTARA ADVENTURE HUB */}
        {activeTab === 'home' && (
          <NusantaraHub
            ageLevel={ageLevel}
            onSelectGame={(gameId) => setActiveTab(gameId)}
            onOpenAchievements={() => setIsAchievementsOpen(true)}
            onOpenShop={() => setIsShopOpen(true)}
            onOpenTimer={() => setActiveTab('class_timer')}
            onOpenTeacherDashboard={() => setActiveTab('teacher_dashboard')}
            onOpenCreativeStudio={() => setActiveTab('creations')}
            onOpenQRModal={() => setIsQROpen(true)}
            coins={currentProfile.coins}
            gems={currentProfile.gems}
            xp={currentProfile.xp}
            maxXp={currentProfile.maxXp}
          />
        )}

        {/* NON-HOME VIEWS (WITH BEAUTIFUL RETURN HEADER) */}
        {activeTab !== 'home' && (
          <div className="w-full max-w-5xl px-2 sm:px-4 py-3 flex flex-col gap-4">
            {/* Return Bar */}
            <div className="flex items-center justify-between bg-slate-900/90 backdrop-blur p-3 rounded-2xl border-2 border-amber-400 shadow-xl">
              <button
                onClick={() => {
                  playSound('click');
                  setActiveTab('home');
                }}
                className="btn-gold-3d px-4 py-2 rounded-xl font-game font-bold text-xs sm:text-sm flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Nusantara Adventure Hub
              </button>

              <div className="flex items-center gap-2 sm:gap-3 text-xs font-game">
                <button
                  onClick={() => setIsQROpen(true)}
                  className="px-2.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-300 font-bold flex items-center gap-1.5 transition"
                >
                  <QrCode className="w-4 h-4" />
                  <span className="hidden sm:inline">QR Code</span>
                </button>
                <span className="text-amber-300 font-bold">🪙 {currentProfile.coins.toLocaleString('id-ID')}</span>
                <span className="text-purple-300 font-bold">💎 {currentProfile.gems}</span>
              </div>
            </div>

            {/* VIEW 2: ECO RESCUE GAME */}
            {activeTab === 'game_eco' && (
              <EcoRescueGame
                ageLevel={ageLevel}
                onBack={() => setActiveTab('home')}
                onReward={handleReward}
              />
            )}

            {/* VIEW 3: BUILDING CITY BRIDGE GAME */}
            {activeTab === 'game_bridge' && (
              <BuildingCityGame
                ageLevel={ageLevel}
                onBack={() => setActiveTab('home')}
                onReward={handleReward}
              />
            )}

            {/* VIEW 4: KINDNESS VILLAGE GAME */}
            {activeTab === 'game_kindness' && (
              <KindnessVillageGame
                ageLevel={ageLevel}
                onBack={() => setActiveTab('home')}
                onReward={handleReward}
              />
            )}

            {/* VIEW 5: INVENTION LAB GAME */}
            {activeTab === 'game_invention' && (
              <BuildingCityGame
                ageLevel={ageLevel}
                onBack={() => setActiveTab('home')}
                onReward={handleReward}
              />
            )}

            {/* VIEW 6: 30-MINUTE SMART LEARNING CLASSROOM TIMER */}
            {activeTab === 'class_timer' && <SmartClassroomTimer />}

            {/* VIEW 7: TEACHER GROWTH TRACKER DASHBOARD */}
            {activeTab === 'teacher_dashboard' && <TeacherGrowthDashboard />}

            {/* VIEW 8: CREATIVE STUDIO (BUILD & CREATE) */}
            {activeTab === 'creations' && (
              <CreativeStudio onBack={() => setActiveTab('home')} />
            )}
          </div>
        )}
      </main>

      {/* Global Modals */}
      <AchievementsModal
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
      />

      <CoinShopModal
        isOpen={isShopOpen}
        onClose={() => setIsShopOpen(false)}
        coins={currentProfile.coins}
        onBuy={handleBuy}
      />

      <ShareQRModal
        isOpen={isQROpen}
        onClose={() => setIsQROpen(false)}
        sharedUrl={SHARED_APP_URL}
      />
    </div>
  );
}
