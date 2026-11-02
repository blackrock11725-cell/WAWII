import React, { useState } from 'react';
import { ArrowLeft, RotateCcw, Play, CheckCircle2, Award, Clock, BookOpen, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../../utils/sound';
import { AgeLevel, AGE_CONFIGS } from '../../types';
import { REAL_WORLD_MISSIONS } from '../../data/mockData';

interface BlockOption {
  id: string;
  name: string;
  type: 'plank' | 'pillar' | 'arch';
  icon: string;
  strength: number;
}

const AVAILABLE_BLOCKS: BlockOption[] = [
  { id: 'b1', name: 'Balok Papan Kayu', type: 'plank', icon: '🪵', strength: 2 },
  { id: 'b2', name: 'Tiang Penyangga Batu', type: 'pillar', icon: '🏛️', strength: 3 },
  { id: 'b3', name: 'Lengkungan Kuat', type: 'arch', icon: '🌈', strength: 4 },
  { id: 'b4', name: 'Batu Pengunci', type: 'pillar', icon: '🪨', strength: 3 },
];

interface BuildingCityGameProps {
  ageLevel: AgeLevel;
  onBack: () => void;
  onReward: (coins: number, xp: number) => void;
}

export const BuildingCityGame: React.FC<BuildingCityGameProps> = ({ ageLevel, onBack, onReward }) => {
  // Slots needed: 3 for explorer, 4 for creator, 5 for innovator
  const totalSlots = ageLevel === 'explorer' ? 3 : ageLevel === 'creator' ? 4 : 5;
  const [placedSlots, setPlacedSlots] = useState<(BlockOption | null)[]>(new Array(totalSlots).fill(null));
  const [selectedBlock, setSelectedBlock] = useState<BlockOption | null>(AVAILABLE_BLOCKS[0]);
  const [isTesting, setIsTesting] = useState(false);
  const [testSuccess, setTestSuccess] = useState<boolean | null>(null);
  const [roverPosition, setRoverPosition] = useState(0); // 0% to 100%
  const [feedback, setFeedback] = useState<string>('Pilih balok dan pasang di tiang jembatan yang kosong!');
  const [showRealWorldMission, setShowRealWorldMission] = useState(false);

  const handleSlotClick = (index: number) => {
    if (!selectedBlock) return;
    playSound('snap');
    const newSlots = [...placedSlots];
    newSlots[index] = selectedBlock;
    setPlacedSlots(newSlots);
    setTestSuccess(null);
    setFeedback(`Memasang ${selectedBlock.name} pada bagian #${index + 1}.`);
  };

  const handleClearSlot = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    playSound('pop');
    const newSlots = [...placedSlots];
    newSlots[index] = null;
    setPlacedSlots(newSlots);
    setTestSuccess(null);
  };

  const handleTestBridge = () => {
    playSound('click');
    setIsTesting(true);
    setRoverPosition(0);

    // Check if all slots are filled
    const allFilled = placedSlots.every((slot) => slot !== null);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setRoverPosition(progress);

      // If gap encountered midway
      if (!allFilled && progress >= 50) {
        clearInterval(interval);
        setIsTesting(false);
        setTestSuccess(false);
        playSound('snap');
        setFeedback('Waduh, mobil berhenti di tengah karena ada bagian jembatan yang bolong! Lengkapi semua balok ya.');
        return;
      }

      if (progress >= 100) {
        clearInterval(interval);
        setIsTesting(false);
        setTestSuccess(true);
        playSound('victory');
        onReward(60, 120);
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
        });
        setFeedback('Horeee! Jembatan sangat kokoh dan seimbang! Mobil dan teman-teman berhasil menyeberang!');
      }
    }, 250);
  };

  const handleReset = () => {
    playSound('click');
    setPlacedSlots(new Array(totalSlots).fill(null));
    setRoverPosition(0);
    setIsTesting(false);
    setTestSuccess(null);
    setFeedback('Pilih balok dan pasang di tiang jembatan yang kosong!');
  };

  const missionData = REAL_WORLD_MISSIONS.building_city;

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
              <span className="text-xl">🏙️</span>
              <h2 className="text-xl font-bold font-game text-slate-800">Dunia 2: Kota Berkelanjutan (Bridge Builder)</h2>
            </div>
            <p className="text-xs text-slate-500">
              Tahap Adaptif: <span className="font-semibold text-sky-600">{AGE_CONFIGS[ageLevel].name} ({AGE_CONFIGS[ageLevel].ageRange})</span>
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
          {/* Main Visual Stage */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Bridge Construction Canvas */}
            <div className="relative rounded-3xl overflow-hidden border-4 border-sky-300 shadow-md bg-gradient-to-b from-sky-300 via-sky-100 to-emerald-200 p-6 min-h-[400px] flex flex-col justify-between">
              {/* Skyline Background */}
              <div className="absolute top-4 left-6 flex items-center gap-2 text-xs font-bold bg-white/80 backdrop-blur px-3 py-1 rounded-full text-sky-800">
                <ShieldCheck className="w-4 h-4 text-sky-600" />
                Misi Konstruksi Jembatan Nusantara
              </div>

              {/* River and Banks */}
              <div className="relative z-10 my-auto py-8">
                {/* Left Bank (Start) */}
                <div className="absolute left-0 bottom-6 w-24 h-32 bg-gradient-to-t from-emerald-700 to-emerald-500 rounded-tr-3xl border-r-4 border-emerald-800 flex flex-col items-center justify-start pt-2 text-xs font-bold text-white shadow-md">
                  <span>Tepi Barat</span>
                  <span className="text-2xl mt-1">👦🎒</span>
                  <span className="text-[10px] text-emerald-100 font-normal">Wawi</span>
                </div>

                {/* Right Bank (Finish Goal) */}
                <div className="absolute right-0 bottom-6 w-24 h-32 bg-gradient-to-t from-emerald-700 to-emerald-500 rounded-tl-3xl border-l-4 border-emerald-800 flex flex-col items-center justify-start pt-2 text-xs font-bold text-white shadow-md">
                  <span>Tepi Timur</span>
                  <span className="text-2xl mt-1">🐶🏡</span>
                  <span className="text-[10px] text-emerald-100 font-normal">Milo si Guguk</span>
                </div>

                {/* River Flow in the Middle */}
                <div className="mx-24 h-36 bg-gradient-to-b from-sky-400 via-cyan-500 to-blue-600 rounded-2xl relative overflow-hidden flex flex-col justify-end p-2 border-t-2 border-sky-300">
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] animate-pulse"></div>
                  <div className="relative z-10 flex items-center justify-around text-xs text-white/80 font-medium">
                    <span>🌊 Aliran Sungai Jernih 🌊</span>
                    <span className="text-sm">🐟 🦆</span>
                  </div>
                </div>

                {/* Bridge Slots overlayed on top of the river */}
                <div className="absolute inset-x-24 bottom-20 flex items-center justify-between gap-2 px-4 z-20">
                  {placedSlots.map((slot, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSlotClick(idx)}
                      className={`flex-1 h-20 rounded-xl border-2 flex flex-col items-center justify-center relative transition transform cursor-pointer ${
                        slot
                          ? 'bg-amber-100 border-amber-600 shadow-md scale-102 hover:scale-105'
                          : 'bg-white/70 border-dashed border-sky-400 hover:bg-white hover:border-sky-600'
                      }`}
                    >
                      {slot ? (
                        <>
                          <span className="text-2xl">{slot.icon}</span>
                          <span className="text-[10px] font-bold text-slate-800 mt-1">{slot.name}</span>
                          <span
                            onClick={(e) => handleClearSlot(idx, e)}
                            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold shadow hover:bg-rose-600"
                            title="Hapus balok"
                          >
                            ×
                          </span>
                        </>
                      ) : (
                        <div className="flex flex-col items-center">
                          <span className="text-xs text-sky-600 font-bold">Slot #{idx + 1}</span>
                          <span className="text-[10px] text-slate-400">Pasang di sini</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Moving Rover during Test */}
                {isTesting && (
                  <div
                    className="absolute bottom-28 z-30 transition-all duration-300 text-3xl filter drop-shadow-lg"
                    style={{ left: `${Math.min(88, Math.max(4, roverPosition))}%` }}
                  >
                    🚜💨
                  </div>
                )}
              </div>

              {/* Status and Test Button Bar */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 bg-white/90 backdrop-blur rounded-2xl p-3 border border-sky-200">
                <div className="text-xs text-slate-700">
                  Balok Terpasang: <strong className="text-sky-700">{placedSlots.filter(Boolean).length}</strong> dari <strong>{totalSlots}</strong>
                </div>

                <button
                  onClick={handleTestBridge}
                  disabled={isTesting}
                  className={`px-5 py-2.5 rounded-xl font-game font-bold text-sm flex items-center gap-2 shadow-md transition ${
                    isTesting
                      ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                      : 'game-btn-green'
                  }`}
                >
                  <Play className="w-4 h-4 fill-current" />
                  {isTesting ? 'Sedang Menguji Jembatan...' : 'Uji Jembatan!'}
                </button>
              </div>
            </div>

            {/* Block Picker Palette */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
              <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider mb-2">
                Pilih Material Balok Konstruksi:
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {AVAILABLE_BLOCKS.map((b) => {
                  const isSelected = selectedBlock?.id === b.id;
                  return (
                    <button
                      key={b.id}
                      onClick={() => {
                        playSound('pop');
                        setSelectedBlock(b);
                      }}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-1 text-center transition cursor-pointer ${
                        isSelected
                          ? 'bg-amber-100 border-amber-500 ring-2 ring-amber-400 shadow-sm'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-2xl">{b.icon}</span>
                      <span className="text-xs font-bold text-slate-800">{b.name}</span>
                      <span className="text-[10px] text-slate-500">Kekuatan: {'⭐'.repeat(b.strength)}</span>
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
                <div className="w-12 h-12 rounded-2xl bg-sky-100 border-2 border-sky-300 flex items-center justify-center text-2xl shrink-0">
                  🏗️
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800">Petunjuk Arsitek Cilik</h4>
                  <p className="text-xs text-slate-500">Eksplorasi Sebab & Keseimbangan</p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-xs text-slate-700 leading-relaxed">
                <p className="font-medium text-slate-800">
                  {feedback}
                </p>
              </div>

              {testSuccess && (
                <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200 text-xs text-emerald-800 flex flex-col gap-2">
                  <div className="font-bold flex items-center gap-1.5 text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Keren Sekali! Tantangan Digital Selesai!
                  </div>
                  <p>
                    Sekarang saatnya kamu mencoba membuat jembatan dengan balok kayu dan stik es krim sungguhan di kelas bersama teman-teman!
                  </p>
                  <button
                    onClick={() => setShowRealWorldMission(true)}
                    className="game-btn-gold px-3 py-1.5 rounded-lg text-xs font-bold font-game text-center"
                  >
                    Buka Panduan Misi Praktik Nyata
                  </button>
                </div>
              )}

              <div className="bg-sky-50 rounded-xl p-3 border border-sky-100 text-[11px] text-sky-800 flex flex-col gap-1.5">
                <div className="font-bold flex items-center gap-1.5 text-sky-900">
                  <Clock className="w-3.5 h-3.5" />
                  Siklus 30 Menit Belajar
                </div>
                <p>
                  Game ini melatih <strong>spatial reasoning & trial-and-error</strong>. Anak belajar bahwa kegagalan (jembatan belum nyambung) adalah petunjuk untuk memperbaiki strategi, bukan kesalahan fatal.
                </p>
              </div>
            </div>

            {/* Cognitive Skills */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col gap-2">
              <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider">Kemampuan yang Distimulasi</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                  <span className="text-slate-700 font-medium">Penalaran Spasial Geometri</span>
                  <span className="text-sky-600 font-bold">Kognitif</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                  <span className="text-slate-700 font-medium">Trial, Error & Resilience</span>
                  <span className="text-amber-600 font-bold">Problem Solving</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                  <span className="text-slate-700 font-medium">Perencanaan Konstruksi</span>
                  <span className="text-emerald-600 font-bold">Rekayasa STEAM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Real-World Mission Sheet */
        <div className="bg-white rounded-3xl p-6 border-2 border-sky-300 shadow-md flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-sky-800">
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
            <div className="bg-sky-50/70 rounded-2xl p-4 border border-sky-200">
              <h4 className="font-bold text-sm text-sky-900 mb-2 flex items-center gap-2">
                🪵 Bahan yang Disediakan Guru di Kelas:
              </h4>
              <ul className="space-y-1.5 text-xs text-sky-950">
                {missionData.materialsNeeded.map((mat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-sky-600 font-bold">•</span>
                    <span>{mat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200">
              <h4 className="font-bold text-sm text-amber-900 mb-2 flex items-center gap-2">
                👩‍🏫 Panduan Langkah Guru TK:
              </h4>
              <ul className="space-y-1.5 text-xs text-amber-950">
                {missionData.teacherSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-bold text-amber-600">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-emerald-50/70 rounded-2xl p-4 border border-emerald-200">
              <h4 className="font-bold text-sm text-emerald-900 mb-2 flex items-center gap-2">
                👦👧 Tantangan Kelompok Anak:
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
                💬 3 Menit Refleksi Guru & Murid:
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
