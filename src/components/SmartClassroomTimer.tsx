import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, FastForward, CheckCircle2, Sparkles, BookOpen, Clock, Users, ArrowRight } from 'lucide-react';
import { playSound } from '../utils/sound';
import confetti from 'canvas-confetti';

interface Phase {
  id: number;
  name: string;
  durationSeconds: number; // In real time: 3m (180s), 12m (720s), 12m (720s), 3m (180s)
  icon: string;
  roleTitle: string;
  teacherAction: string;
  childrenAction: string;
  reflectionFocus: string;
}

const PHASES: Phase[] = [
  {
    id: 1,
    name: '00:00 – 03:00 · Pengenalan Cerita & Masalah',
    durationSeconds: 180,
    icon: '📖',
    roleTitle: 'Story Introduction & Problem Discovery',
    teacherAction: 'Guru membuka sesi dengan mendongengkan kisah petualangan WAWI dan tantangan yang sedang terjadi (misal: jembatan putus, sampah di taman, dll).',
    childrenAction: 'Anak mendengarkan, mengamati gambar masalah, dan mulai mengajukan dugaan awal solusi yang mungkin dilakukan.',
    reflectionFocus: '"Kira-kira apa yang terjadi kalau masalah ini tidak kita selesaikan sama-sama?"',
  },
  {
    id: 2,
    name: '03:00 – 15:00 · Digital Brain Game (12 Menit)',
    durationSeconds: 720,
    icon: '🎮',
    roleTitle: 'Adaptive Digital Brain Quest',
    teacherAction: 'Guru membagikan tablet per kelompok kecil (2-3 anak). Mengamati bagaimana anak berinteraksi, mencoba solusi, dan menghadapi kegagalan.',
    childrenAction: 'Anak bermain secara bergantian, menguji berbagai kombinasi balok atau memilah sampah, dan saling memberikan saran kepada temannya.',
    reflectionFocus: 'Mengamati pola respons, trial-and-error, dan ketekunan (resilience) saat level belum terselesaikan.',
  },
  {
    id: 3,
    name: '15:00 – 27:00 · Real-World Mission (12 Menit)',
    durationSeconds: 720,
    icon: '✂️',
    roleTitle: 'Hands-on Real World Challenge',
    teacherAction: 'Guru meletakkan media fisik (kardus, balok nyata, kertas warna, sendok) di meja belajar. Mengarahkan misi nyata transfer belajar.',
    childrenAction: 'Anak berkolaborasi langsung dengan tangan (motorik halus), menyusun bentuk fisik, menguji kekuatan jembatan nyata atau membuat kotak sampah.',
    reflectionFocus: 'Memperhatikan bagaimana pemikiran dari game digital diterapkan ke benda tiga dimensi yang nyata.',
  },
  {
    id: 4,
    name: '27:00 – 30:00 · Lingkaran Refleksi & Apresiasi (3 Menit)',
    durationSeconds: 180,
    icon: '🌟',
    roleTitle: 'Reflection Circle & Solution Badges',
    teacherAction: 'Guru mengumpulkan anak dalam lingkaran karpet ("Lingkaran Inovator"). Memancing pertanyaan refleksi dan memberikan Solution Badge.',
    childrenAction: 'Anak menunjukkan hasil karyanya, menceritakan kendala yang dihadapi, dan mengapresiasi kebaikan teman sekelompok.',
    reflectionFocus: 'Penanaman metacognition awal: menyadari apa yang dipelajari dan bagaimana perasaan mereka hari ini.',
  },
];

export const SmartClassroomTimer: React.FC = () => {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(PHASES[0].durationSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isDemoSpeed, setIsDemoSpeed] = useState(false); // 10x speed for quick demo/review

  const currentPhase = PHASES[currentPhaseIndex];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      const stepMs = isDemoSpeed ? 100 : 1000;
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handlePhaseComplete();
            return 0;
          }
          return prev - 1;
        });
      }, stepMs);
    }
    return () => clearInterval(timer);
  }, [isRunning, currentPhaseIndex, isDemoSpeed]);

  const handlePhaseComplete = () => {
    playSound('chime');
    if (currentPhaseIndex < PHASES.length - 1) {
      const nextIndex = currentPhaseIndex + 1;
      setCurrentPhaseIndex(nextIndex);
      setTimeLeft(PHASES[nextIndex].durationSeconds);
    } else {
      setIsRunning(false);
      playSound('victory');
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 },
      });
    }
  };

  const handleTogglePlay = () => {
    playSound('click');
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    playSound('click');
    setIsRunning(false);
    setCurrentPhaseIndex(0);
    setTimeLeft(PHASES[0].durationSeconds);
  };

  const handleJumpPhase = (index: number) => {
    playSound('click');
    setCurrentPhaseIndex(index);
    setTimeLeft(PHASES[index].durationSeconds);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const phaseProgress = 100 - (timeLeft / currentPhase.durationSeconds) * 100;

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto pb-12">
      {/* Title & Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#fff_2px,transparent_2px)] [background-size:16px_16px]"></div>
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur text-xs font-bold font-game">
                Metode Pembelajaran 30 Menit
              </span>
              <span className="text-xs bg-amber-900/40 px-2.5 py-1 rounded-full font-medium">
                Sesuai Rekomendasi WHO Waktu Layar PAUD
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-game">
              WAWI 30-Minute Smart Learning Simulator
            </h2>
            <p className="text-xs sm:text-sm text-amber-100 mt-1 max-w-xl">
              Simulasi alur pembelajaran berimbang di kelas TK: 15 menit stimulasi berpikir digital + 15 menit eksplorasi fisik & kolaborasi di dunia nyata.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto bg-black/20 p-1.5 rounded-2xl backdrop-blur">
            <button
              onClick={() => setIsDemoSpeed(!isDemoSpeed)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                isDemoSpeed ? 'bg-amber-400 text-amber-950 font-black' : 'text-white/80 hover:text-white'
              }`}
              title="Percepat simulasi 10x untuk presentasi & penilaian"
            >
              <FastForward className="w-3.5 h-3.5" />
              {isDemoSpeed ? 'Mode Demo Cepat (10x)' : 'Kecepatan Normal (1x)'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Timer Display Deck */}
      <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-md flex flex-col items-center gap-6">
        {/* Phase Stepper Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
          {PHASES.map((p, idx) => {
            const isActive = idx === currentPhaseIndex;
            const isDone = idx < currentPhaseIndex;
            return (
              <button
                key={p.id}
                onClick={() => handleJumpPhase(idx)}
                className={`p-3 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-amber-100 border-amber-500 shadow-sm ring-2 ring-amber-400'
                    : isDone
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span>Tahap {p.id}</span>
                  <span>{isDone ? '✓ Selesai' : isActive ? '▶ Aktif' : p.icon}</span>
                </div>
                <div className="text-[11px] font-semibold truncate">{p.roleTitle}</div>
                <div className="text-[10px] text-slate-400 mt-1">{p.name.split('·')[0].trim()}</div>
              </button>
            );
          })}
        </div>

        {/* Big Circular / Radial Timer */}
        <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-amber-50/50 to-orange-50/50 rounded-3xl border border-amber-100 w-full max-w-md">
          <div className="text-5xl mb-2">{currentPhase.icon}</div>
          <div className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
            {currentPhase.roleTitle}
          </div>
          <div className="text-6xl font-black font-game text-slate-800 tracking-tight my-2">
            {formatTime(timeLeft)}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden mt-2">
            <div
              className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${phaseProgress}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between w-full text-[11px] text-slate-500 mt-1.5 font-medium">
            <span>Sisa waktu sesi: {formatTime(timeLeft)}</span>
            <span>{Math.round(phaseProgress)}% Selesai</span>
          </div>

          {/* Timer Controls */}
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={handleTogglePlay}
              className={`px-8 py-3 rounded-2xl font-game font-bold text-base flex items-center gap-2 shadow-lg transition active:scale-95 ${
                isRunning
                  ? 'bg-amber-500 hover:bg-amber-600 text-white'
                  : 'game-btn-green'
              }`}
            >
              {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
              {isRunning ? 'Jeda Simulasi' : 'Mulai Sesi (Play)'}
            </button>

            <button
              onClick={handleReset}
              className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
              title="Reset Timer"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Phase Details Description Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="bg-blue-50/80 p-4 rounded-2xl border border-blue-200 flex flex-col gap-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
              👩‍🏫 Panduan Tindakan Guru:
            </h4>
            <p className="text-xs text-blue-950 leading-relaxed">
              {currentPhase.teacherAction}
            </p>
          </div>

          <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200 flex flex-col gap-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
              👦👧 Aktivitas Inovasi Anak:
            </h4>
            <p className="text-xs text-emerald-950 leading-relaxed">
              {currentPhase.childrenAction}
            </p>
          </div>
        </div>

        {/* Reflection Prompts */}
        <div className="w-full bg-purple-50/80 p-4 rounded-2xl border border-purple-200 flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-purple-900">
              Pertanyaan Pemantik Berpikir Kritis Guru:
            </h4>
            <p className="text-xs font-medium text-purple-950 italic mt-0.5">
              {currentPhase.reflectionFocus}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
