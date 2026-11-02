import React, { useState } from 'react';
import { ArrowLeft, RotateCcw, Heart, CheckCircle2, Award, Clock, BookOpen, Smile, Frown, Users } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../../utils/sound';
import { AgeLevel, AGE_CONFIGS } from '../../types';
import { REAL_WORLD_MISSIONS } from '../../data/mockData';

interface SolutionOption {
  id: string;
  title: string;
  description: string;
  resultType: 'negative' | 'good' | 'stellar';
  feedbackMessage: string;
  reactionIcon: string;
}

const SOLUTIONS: SolutionOption[] = [
  {
    id: 'sol_1',
    title: 'Berebut dan saling menarik mainan',
    description: 'Budi dan Siti sama-sama berteriak tidak mau mengalah.',
    resultType: 'negative',
    feedbackMessage: 'Aduh! Kereta mainannya terlempar dan roda patah. Budi dan Siti jadi sedih dan menangis bersama. Ini bukan cara pemecah masalah yang baik.',
    reactionIcon: '😢💥',
  },
  {
    id: 'sol_2',
    title: 'Gunakan jam pasir 2 menit untuk bergantian',
    description: 'Budi main dulu 2 menit, lalu Siti bergantian 2 menit berikutnya.',
    resultType: 'good',
    feedbackMessage: 'Bagus sekali! Dengan jam pasir, giliran menjadi adil. Keduanya belajar sabar menunggu dan sama-sama senang!',
    reactionIcon: '⏳😊',
  },
  {
    id: 'sol_3',
    title: 'Kolaborasi Super: Buat jalur rel panjang dan main bersama!',
    description: 'Budi jadi masinis lokomotif, Siti jadi pembuat stasiun dan menaruh gerbong kargo.',
    resultType: 'stellar',
    feedbackMessage: 'Luar Biasa! Ini adalah Solusi Inovator Sejati! Mainan yang sama bisa dinikmati bersama dengan peran berbeda. Semua anak tersenyum lebar!',
    reactionIcon: '🚂🎉💖',
  },
];

interface KindnessVillageGameProps {
  ageLevel: AgeLevel;
  onBack: () => void;
  onReward: (coins: number, xp: number) => void;
}

export const KindnessVillageGame: React.FC<KindnessVillageGameProps> = ({ ageLevel, onBack, onReward }) => {
  const [selectedSolution, setSelectedSolution] = useState<SolutionOption | null>(null);
  const [budiEmotion, setBudiEmotion] = useState<'sad' | 'angry' | 'happy'>('sad');
  const [sitiEmotion, setSitiEmotion] = useState<'sad' | 'angry' | 'happy'>('angry');
  const [showRealWorldMission, setShowRealWorldMission] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleSelectSolution = (sol: SolutionOption) => {
    setSelectedSolution(sol);
    if (sol.resultType === 'negative') {
      playSound('snap');
      setBudiEmotion('sad');
      setSitiEmotion('sad');
    } else if (sol.resultType === 'good') {
      playSound('coin');
      setBudiEmotion('happy');
      setSitiEmotion('happy');
      if (!completed) {
        setCompleted(true);
        onReward(40, 80);
      }
    } else if (sol.resultType === 'stellar') {
      playSound('victory');
      setBudiEmotion('happy');
      setSitiEmotion('happy');
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
      if (!completed) {
        setCompleted(true);
        onReward(70, 150);
      }
    }
  };

  const handleReset = () => {
    playSound('click');
    setSelectedSolution(null);
    setBudiEmotion('sad');
    setSitiEmotion('angry');
    setCompleted(false);
  };

  const missionData = REAL_WORLD_MISSIONS.kindness_village;

  return (
    <div className="flex flex-col gap-4 max-w-5xl mx-auto pb-12">
      {/* Header Bar */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playSound('click');
              onBack();
            }}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🏡</span>
              <h2 className="text-xl font-bold font-game text-slate-800">Dunia 4: Desa Nusantara (Kindness Village)</h2>
            </div>
            <p className="text-xs text-slate-500">
              Tahap Adaptif: <span className="font-semibold text-amber-600">{AGE_CONFIGS[ageLevel].name} ({AGE_CONFIGS[ageLevel].ageRange})</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowRealWorldMission(!showRealWorldMission)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              showRealWorldMission ? 'bg-amber-500 text-white shadow-sm' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            {showRealWorldMission ? 'Kembali ke Game' : 'Lihat Misi Nyata di Kelas'}
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600"
            title="Mulai Ulang"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!showRealWorldMission ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Visual Story Stage */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Play Scene Canvas */}
            <div className="relative rounded-3xl overflow-hidden border-4 border-amber-300 shadow-md bg-gradient-to-b from-amber-100 via-orange-50 to-amber-200 p-6 min-h-[380px] flex flex-col justify-between">
              {/* Scene Banner */}
              <div className="flex items-center justify-between">
                <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-amber-900 border border-amber-200 shadow-sm flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  Misi Empati & Penyelesaian Masalah Bersama
                </div>
                <div className="text-xs bg-amber-400 text-amber-950 font-bold px-2.5 py-1 rounded-full">
                  Area Bermain Balok TK
                </div>
              </div>

              {/* Characters and Object of Dispute */}
              <div className="my-auto py-4 flex items-center justify-around relative">
                {/* Character 1: Budi */}
                <div className="flex flex-col items-center gap-1">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-sky-200 border-3 border-sky-400 flex items-center justify-center text-4xl shadow-md">
                      👦
                    </div>
                    <div className="absolute -bottom-2 -right-2 text-xl bg-white rounded-full p-0.5 shadow">
                      {budiEmotion === 'happy' ? '😊' : budiEmotion === 'angry' ? '😠' : '😢'}
                    </div>
                  </div>
                  <span className="font-game font-bold text-sm text-slate-800">Budi (4 Tahun)</span>
                  <span className="text-[11px] text-slate-500">"Aku mau main kereta ini sekarang!"</span>
                </div>

                {/* The Disputed Toy in the Center */}
                <div className="flex flex-col items-center gap-1 p-3 bg-white/80 backdrop-blur rounded-2xl border-2 border-amber-300 shadow-sm">
                  <span className="text-5xl animate-pulse">🚂✨</span>
                  <span className="text-xs font-bold text-amber-900">1 Kereta Mainan Kayu</span>
                  <span className="text-[10px] text-amber-700 font-medium">Hanya ada 1 di meja</span>
                </div>

                {/* Character 2: Siti */}
                <div className="flex flex-col items-center gap-1">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-pink-200 border-3 border-pink-400 flex items-center justify-center text-4xl shadow-md">
                      👧
                    </div>
                    <div className="absolute -bottom-2 -right-2 text-xl bg-white rounded-full p-0.5 shadow">
                      {sitiEmotion === 'happy' ? '🥰' : sitiEmotion === 'angry' ? '😡' : '😢'}
                    </div>
                  </div>
                  <span className="font-game font-bold text-sm text-slate-800">Siti (5 Tahun)</span>
                  <span className="text-[11px] text-slate-500">"Aku juga mau kereta itu duluan!"</span>
                </div>
              </div>

              {/* Feedback Dialogue Result */}
              {selectedSolution ? (
                <div
                  className={`p-3.5 rounded-2xl border text-xs shadow-sm flex items-start gap-3 transition-all ${
                    selectedSolution.resultType === 'negative'
                      ? 'bg-rose-50 border-rose-200 text-rose-950'
                      : selectedSolution.resultType === 'good'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : 'bg-amber-50 border-amber-300 text-amber-950 ring-2 ring-amber-400'
                  }`}
                >
                  <span className="text-3xl shrink-0">{selectedSolution.reactionIcon}</span>
                  <div>
                    <h5 className="font-bold text-sm mb-0.5">{selectedSolution.title}</h5>
                    <p className="leading-relaxed">{selectedSolution.feedbackMessage}</p>
                  </div>
                </div>
              ) : (
                <div className="bg-white/80 p-3 rounded-2xl text-center text-xs text-slate-600 border border-amber-200">
                  👉 Bantu Budi dan Siti memilih solusi terbaik di bawah ini!
                </div>
              )}
            </div>

            {/* Solution Choices Palette */}
            <div className="flex flex-col gap-2">
              <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider">
                Pilih Keputusan yang Harus Mereka Ambil:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {SOLUTIONS.map((sol) => {
                  const isSelected = selectedSolution?.id === sol.id;
                  return (
                    <button
                      key={sol.id}
                      onClick={() => handleSelectSolution(sol)}
                      className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between gap-2 transition cursor-pointer ${
                        isSelected
                          ? sol.resultType === 'negative'
                            ? 'bg-rose-100 border-rose-400 ring-2 ring-rose-300 shadow'
                            : sol.resultType === 'good'
                            ? 'bg-emerald-100 border-emerald-500 ring-2 ring-emerald-300 shadow'
                            : 'bg-amber-100 border-amber-500 ring-2 ring-amber-400 shadow-md'
                          : 'bg-white border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 shadow-sm'
                      }`}
                    >
                      <div>
                        <div className="font-game font-bold text-xs text-slate-800 flex items-center justify-between">
                          <span>{sol.title}</span>
                          {sol.resultType === 'stellar' && <span className="text-xs">⭐ Super</span>}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 leading-snug">{sol.description}</p>
                      </div>
                      <div className="text-[10px] font-bold self-end text-slate-400">
                        {isSelected ? '✓ Terpilih' : 'Coba Solusi Ini'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Guidance Deck */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-2xl shrink-0">
                  🤗
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800">Detektif Emosi Cilik</h4>
                  <p className="text-xs text-slate-500">Kecerdasan Sosial-Emosional</p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-xs text-slate-700 leading-relaxed">
                <p>
                  Anak usia TK sering mengalami konflik karena ego-sentrisme alami. Melalui simulasi ini, mereka melihat <strong>konsekuensi langsung</strong> dari berebut vs berbagi.
                </p>
              </div>

              {completed && (
                <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200 text-xs text-emerald-800 flex flex-col gap-2">
                  <div className="font-bold flex items-center gap-1.5 text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Bintang Empati Terbuka!
                  </div>
                  <p>
                    Hebat! Kamu sudah memahami pentingnya berbagi dan mencari jalan tengah. Sekarang saatnya mencoba misi nyata di kelas!
                  </p>
                  <button
                    onClick={() => setShowRealWorldMission(true)}
                    className="game-btn-gold px-3 py-1.5 rounded-lg text-xs font-bold font-game text-center"
                  >
                    Buka Panduan Misi Praktik Nyata
                  </button>
                </div>
              )}

              <div className="bg-amber-50 rounded-xl p-3 border border-amber-100 text-[11px] text-amber-800 flex flex-col gap-1.5">
                <div className="font-bold flex items-center gap-1.5 text-amber-900">
                  <Clock className="w-3.5 h-3.5" />
                  Siklus 30 Menit Belajar
                </div>
                <p>
                  15 Menit digital melatih <strong>perspective taking</strong> (memahami perasaan orang lain). 15 Menit nyata di kelas menguji apakah anak mampu menerapkannya saat bermain bersama sungguhan.
                </p>
              </div>
            </div>

            {/* Cognitive Skills */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col gap-2">
              <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider">Pilar Karakter yang Ditempa</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                  <span className="text-slate-700 font-medium">Regulasi Emosi Diri</span>
                  <span className="text-rose-600 font-bold">Self-Regulation</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                  <span className="text-slate-700 font-medium">Komunikasi Negosiasi</span>
                  <span className="text-amber-600 font-bold">Kolaborasi</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                  <span className="text-slate-700 font-medium">Resolusi Konflik Kreatif</span>
                  <span className="text-purple-600 font-bold">Problem Solving</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Real-World Mission Sheet */
        <div className="bg-white rounded-3xl p-6 border-2 border-amber-300 shadow-md flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                  15 Menit Real-World Mission
                </span>
                <span className="text-xs text-slate-500 font-medium">{missionData.worldName}</span>
              </div>
              <h3 className="text-2xl font-bold font-game text-slate-800 mt-1">{missionData.title}</h3>
              <p className="text-xs text-slate-500">{missionData.subtitle}</p>
            </div>
            <button
              onClick={() => {
                playSound('star');
                alert('Lembar Panduan Guru siap dicetak untuk aktivitas kelas hari ini!');
              }}
              className="game-btn-gold px-4 py-2 rounded-xl text-xs font-bold font-game flex items-center gap-1.5"
            >
              <Award className="w-4 h-4" />
              Cetak / Simpan Panduan Guru
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200">
              <h4 className="font-bold text-sm text-amber-900 mb-2 flex items-center gap-2">
                📦 Alat & Media Praktik di Kelas:
              </h4>
              <ul className="space-y-1.5 text-xs text-amber-950">
                {missionData.materialsNeeded.map((mat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{mat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50/70 rounded-2xl p-4 border border-blue-200">
              <h4 className="font-bold text-sm text-blue-900 mb-2 flex items-center gap-2">
                👩‍🏫 Peran Fasilitasi Guru TK:
              </h4>
              <ul className="space-y-1.5 text-xs text-blue-950">
                {missionData.teacherSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-bold text-blue-600">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-emerald-50/70 rounded-2xl p-4 border border-emerald-200">
              <h4 className="font-bold text-sm text-emerald-900 mb-2 flex items-center gap-2">
                👦👧 Tantangan Anak (Kelompok Kecil):
              </h4>
              <ul className="space-y-1.5 text-xs text-emerald-950">
                {missionData.childSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-purple-50/70 rounded-2xl p-4 border border-purple-200">
              <h4 className="font-bold text-sm text-purple-900 mb-2 flex items-center gap-2">
                💬 3 Menit Lingkaran Berbagi Rasa:
              </h4>
              <ul className="space-y-1.5 text-xs text-purple-950">
                {missionData.reflectionQuestions.map((q, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">Q{i + 1}:</span>
                    <span>"{q}"</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
