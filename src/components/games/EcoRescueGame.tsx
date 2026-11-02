import React, { useState } from 'react';
import { Sparkles, ArrowLeft, RotateCcw, CheckCircle2, Award, Clock, Users, BookOpen, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../../utils/sound';
import { AgeLevel, AGE_CONFIGS } from '../../types';
import { REAL_WORLD_MISSIONS } from '../../data/mockData';

interface TrashItem {
  id: string;
  name: string;
  icon: string;
  type: 'organic' | 'plastic' | 'paper';
  fact: string;
}

const ALL_TRASH: TrashItem[] = [
  { id: 't1', name: 'Kulit Pisang', icon: '🍌', type: 'organic', fact: 'Bisa jadi pupuk tanaman subur!' },
  { id: 't2', name: 'Botol Plastik', icon: '🧴', type: 'plastic', fact: 'Bisa didaur ulang jadi pot bunga lucu!' },
  { id: 't3', name: 'Kotak Susu Karton', icon: '🧃', type: 'paper', fact: 'Terbuat dari serat pohon, bisa dilebur kembali.' },
  { id: 't4', name: 'Daun Kering', icon: '🍂', type: 'organic', fact: 'Jatuh dari pohon, sangat disukai cacing tanah.' },
  { id: 't5', name: 'Gelas Plastik', icon: '🥤', type: 'plastic', fact: 'Butuh ratusan tahun jika dibuang sembarangan.' },
  { id: 't6', name: 'Kertas Gambar Bekas', icon: '📄', type: 'paper', fact: 'Bisa dipakai untuk kerajinan origami baru!' },
  { id: 't7', name: 'Apel Busuk', icon: '🍎', type: 'organic', fact: 'Sampah alami yang mudah terurai oleh mikroba.' },
  { id: 't8', name: 'Kantong Kresek', icon: '🛍️', type: 'plastic', fact: 'Jangan sampai termakan hewan atau hanyut ke kali.' },
];

interface EcoRescueGameProps {
  ageLevel: AgeLevel;
  onBack: () => void;
  onReward: (coins: number, xp: number) => void;
}

export const EcoRescueGame: React.FC<EcoRescueGameProps> = ({ ageLevel, onBack, onReward }) => {
  // Adaptive item counts
  const itemCount = ageLevel === 'explorer' ? 4 : ageLevel === 'creator' ? 6 : 8;
  const initialItems = ALL_TRASH.slice(0, itemCount);

  const [remainingItems, setRemainingItems] = useState<TrashItem[]>(initialItems);
  const [selectedItem, setSelectedItem] = useState<TrashItem | null>(null);
  const [sortedCounts, setSortedCounts] = useState({ organic: 0, plastic: 0, paper: 0 });
  const [feedback, setFeedback] = useState<{ text: string; correct: boolean } | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showRealWorldMission, setShowRealWorldMission] = useState(false);

  const handleSelectItem = (item: TrashItem) => {
    playSound('pop');
    setSelectedItem(item);
    setFeedback({ text: `Pilih tong sampah yang cocok untuk ${item.name}!`, correct: true });
  };

  const handleSortIntoBin = (binType: 'organic' | 'plastic' | 'paper') => {
    if (!selectedItem) {
      setFeedback({ text: 'Sentuh sampah di taman dulu ya!', correct: false });
      return;
    }

    if (selectedItem.type === binType) {
      playSound('coin');
      setSortedCounts((prev) => ({ ...prev, [binType]: prev[binType] + 1 }));
      const nextRemaining = remainingItems.filter((i) => i.id !== selectedItem.id);
      setRemainingItems(nextRemaining);
      setFeedback({ text: `Hebat! ${selectedItem.name} ${selectedItem.fact}`, correct: true });
      setSelectedItem(null);

      if (nextRemaining.length === 0) {
        handleVictory();
      }
    } else {
      playSound('snap');
      const binNames = { organic: 'Tong Hijau (Organik)', plastic: 'Tong Biru (Plastik)', paper: 'Tong Merah (Kertas)' };
      const correctName = binNames[selectedItem.type];
      setFeedback({
        text: `Ups, coba lagi ya! ${selectedItem.name} cocoknya di ${correctName}.`,
        correct: false,
      });
    }
  };

  const handleVictory = () => {
    playSound('victory');
    setIsCompleted(true);
    onReward(50, 100);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleReset = () => {
    playSound('click');
    setRemainingItems(initialItems);
    setSelectedItem(null);
    setSortedCounts({ organic: 0, plastic: 0, paper: 0 });
    setFeedback(null);
    setIsCompleted(false);
    setShowRealWorldMission(false);
  };

  const missionData = REAL_WORLD_MISSIONS.eco_rescue;

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
              <span className="text-xl">🌱</span>
              <h2 className="text-xl font-bold font-game text-slate-800">Dunia 1: Taman Kehidupan (Eco Rescue)</h2>
            </div>
            <p className="text-xs text-slate-500">
              Tahap Adaptif: <span className="font-semibold text-emerald-600">{AGE_CONFIGS[ageLevel].name} ({AGE_CONFIGS[ageLevel].ageRange})</span>
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
        /* Digital Game Stage */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Visual Stage (2 Cols) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Park Canvas */}
            <div className="relative rounded-3xl overflow-hidden border-4 border-emerald-300 shadow-md bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-200 p-6 min-h-[380px] flex flex-col justify-between">
              {/* Sun & Clouds */}
              <div className="absolute top-4 right-6 flex items-center gap-2">
                <span className="text-3xl animate-spin" style={{ animationDuration: '20s' }}>☀️</span>
                <span className="text-2xl opacity-80">☁️</span>
              </div>
              <div className="absolute top-8 left-8 text-2xl opacity-70">☁️</div>

              {/* Top Banner Status */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-800 shadow-sm border border-emerald-200">
                  Sisa Sampah: {remainingItems.length} dari {initialItems.length}
                </div>
                {selectedItem && (
                  <div className="bg-amber-400 text-amber-950 font-bold px-3 py-1.5 rounded-full text-xs animate-bounce shadow-md flex items-center gap-1.5">
                    <span>Sedang Memegang: {selectedItem.icon} {selectedItem.name}</span>
                  </div>
                )}
              </div>

              {/* Park Garden Floor with Trash Items */}
              <div className="relative z-10 my-auto py-6">
                {remainingItems.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {remainingItems.map((item) => {
                      const isSelected = selectedItem?.id === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSelectItem(item)}
                          className={`p-3 rounded-2xl flex flex-col items-center gap-1.5 transition transform cursor-pointer ${
                            isSelected
                              ? 'bg-amber-100 border-3 border-amber-500 scale-105 shadow-lg ring-4 ring-amber-300/60'
                              : 'bg-white/95 border-2 border-slate-200 hover:border-emerald-400 hover:scale-102 shadow-sm'
                          }`}
                        >
                          <span className="text-3xl filter drop-shadow-sm">{item.icon}</span>
                          <span className="text-xs font-bold text-slate-700 text-center">{item.name}</span>
                          <span className="text-[10px] text-slate-400">Sentuh aku!</span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-white/90 backdrop-blur rounded-2xl p-6 text-center border-2 border-emerald-400 shadow-lg max-w-md mx-auto">
                    <span className="text-5xl block mb-2">🎉🌸✨</span>
                    <h3 className="text-xl font-bold font-game text-emerald-700">Taman Kembali Bersih & Cantik!</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Kamu berhasil memilah semua sampah dengan tepat. Bunga-bunga mekar ceria kembali!
                    </p>
                    <div className="mt-4 flex justify-center gap-2">
                      <button
                        onClick={() => setShowRealWorldMission(true)}
                        className="game-btn-gold px-4 py-2 rounded-xl text-xs font-bold font-game flex items-center gap-2"
                      >
                        <Sparkles className="w-4 h-4" />
                        Lanjut ke Misi Nyata di Kelas! (15 Menit)
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Park Grass & Flowers Footer */}
              <div className="relative z-10 flex items-center justify-between text-lg select-none">
                <span>🌱 🌷 🌼</span>
                <span className="text-xs font-medium text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                  Taman Kehidupan Nusantara
                </span>
                <span>🌸 🌻 🌱</span>
              </div>
            </div>

            {/* Interactive Sorting Bins */}
            <div className="grid grid-cols-3 gap-3">
              {/* Organic Bin */}
              <button
                onClick={() => handleSortIntoBin('organic')}
                className="group relative p-4 rounded-2xl bg-gradient-to-b from-emerald-500 to-green-600 border-3 border-emerald-700 shadow-md text-white text-center hover:scale-102 transition active:scale-98"
              >
                <div className="w-12 h-12 mx-auto bg-white/20 rounded-xl flex items-center justify-center text-2xl mb-1 group-hover:rotate-6 transition">
                  🍏
                </div>
                <div className="font-game font-bold text-sm">Tong Hijau</div>
                <div className="text-[11px] font-medium text-emerald-100">Organik / Alami</div>
                <div className="mt-1 text-[10px] bg-black/20 px-2 py-0.5 rounded-full inline-block">
                  Terisi: {sortedCounts.organic}
                </div>
              </button>

              {/* Plastic Bin */}
              <button
                onClick={() => handleSortIntoBin('plastic')}
                className="group relative p-4 rounded-2xl bg-gradient-to-b from-sky-500 to-blue-600 border-3 border-sky-700 shadow-md text-white text-center hover:scale-102 transition active:scale-98"
              >
                <div className="w-12 h-12 mx-auto bg-white/20 rounded-xl flex items-center justify-center text-2xl mb-1 group-hover:rotate-6 transition">
                  🧴
                </div>
                <div className="font-game font-bold text-sm">Tong Biru</div>
                <div className="text-[11px] font-medium text-sky-100">Anorganik / Plastik</div>
                <div className="mt-1 text-[10px] bg-black/20 px-2 py-0.5 rounded-full inline-block">
                  Terisi: {sortedCounts.plastic}
                </div>
              </button>

              {/* Paper Bin */}
              <button
                onClick={() => handleSortIntoBin('paper')}
                className="group relative p-4 rounded-2xl bg-gradient-to-b from-amber-500 to-red-500 border-3 border-amber-700 shadow-md text-white text-center hover:scale-102 transition active:scale-98"
              >
                <div className="w-12 h-12 mx-auto bg-white/20 rounded-xl flex items-center justify-center text-2xl mb-1 group-hover:rotate-6 transition">
                  📦
                </div>
                <div className="font-game font-bold text-sm">Tong Kuning/Merah</div>
                <div className="text-[11px] font-medium text-amber-100">Kertas & Karton</div>
                <div className="mt-1 text-[10px] bg-black/20 px-2 py-0.5 rounded-full inline-block">
                  Terisi: {sortedCounts.paper}
                </div>
              </button>
            </div>
          </div>

          {/* Right Guidance & Problem-Solving Feedback Deck */}
          <div className="flex flex-col gap-4">
            {/* Guide Dialogue Card */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-2xl shrink-0">
                  👦
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800">Wawi si Pemecah Masalah</h4>
                  <p className="text-xs text-slate-500">Pendamping Belajar Cilik</p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-xs text-slate-700 leading-relaxed">
                {feedback ? (
                  <p className={feedback.correct ? 'text-emerald-700 font-medium' : 'text-rose-600 font-medium'}>
                    {feedback.correct ? '🌟 ' : '💡 '}
                    {feedback.text}
                  </p>
                ) : (
                  <p>
                    "Halo teman-teman! Sampah berserakan membuat taman kotor. Yuk bantu pilih sampah dan masukkan ke tong yang tepat ya!"
                  </p>
                )}
              </div>

              {/* 30-Minute Cycle Hint */}
              <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100 text-[11px] text-emerald-800 flex flex-col gap-1.5">
                <div className="font-bold flex items-center gap-1.5 text-emerald-900">
                  <Clock className="w-3.5 h-3.5" />
                  Siklus 30 Menit Belajar
                </div>
                <p>
                  15 Menit pertama di game ini melatih kemampuan <strong>klasifikasi & observasi</strong>. Setelah selesai, kita lanjutkan dengan 15 menit praktik membuat tong sampah kardus nyata di kelas!
                </p>
              </div>
            </div>

            {/* Cognitive Skills Trained */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col gap-2">
              <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider">Fondasi Perkembangan Anak</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                  <span className="text-slate-700 font-medium">Klasifikasi Kategori</span>
                  <span className="text-emerald-600 font-bold">Kognitif</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                  <span className="text-slate-700 font-medium">Kepedulian Alam</span>
                  <span className="text-blue-600 font-bold">Karakter</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                  <span className="text-slate-700 font-medium">Ketelitian Sentuh</span>
                  <span className="text-purple-600 font-bold">Motorik Halus</span>
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
                <span className="text-xs text-slate-500 font-medium">
                  {missionData.worldName}
                </span>
              </div>
              <h3 className="text-2xl font-bold font-game text-slate-800 mt-1">{missionData.title}</h3>
              <p className="text-xs text-slate-500">{missionData.subtitle}</p>
            </div>
            <button
              onClick={() => {
                playSound('star');
                alert('Lembar Panduan Guru siap dicetak untuk aktivitas kelas hari ini!');
              }}
              className="game-btn-gold px-4 py-2 rounded-xl text-xs font-bold font-game self-start sm:self-auto flex items-center gap-1.5"
            >
              <Award className="w-4 h-4" />
              Cetak / Simpan Panduan Guru
            </button>
          </div>

          {/* Grid Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Bahan & Alat */}
            <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200">
              <h4 className="font-bold text-sm text-amber-900 mb-2 flex items-center gap-2">
                📦 Alat & Bahan Murah yang Disediakan Guru:
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

            {/* Langkah Guru */}
            <div className="bg-blue-50/70 rounded-2xl p-4 border border-blue-200">
              <h4 className="font-bold text-sm text-blue-900 mb-2 flex items-center gap-2">
                👩‍🏫 Panduan Fasilitasi Guru TK:
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

          {/* Langkah Aktivitas Anak & Refleksi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-emerald-50/70 rounded-2xl p-4 border border-emerald-200">
              <h4 className="font-bold text-sm text-emerald-900 mb-2 flex items-center gap-2">
                👦👧 Tantangan Praktik Anak (Kelompok Kecil):
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
                💬 3 Menit Lingkaran Refleksi Anak:
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

          {/* Alignment Badges */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-bold text-slate-700">Keterkaitan SDGs: </span>
              <span className="text-slate-600">{missionData.sdgGoals.join(' · ')}</span>
            </div>
            <div>
              <span className="font-bold text-slate-700">Kurikulum Merdeka PAUD: </span>
              <span className="text-slate-600">{missionData.kurikulumMerdekaAspects.join(' · ')}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
