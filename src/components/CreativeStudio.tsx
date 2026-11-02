import React, { useState } from 'react';
import { Sparkles, RotateCcw, Save, Trash2, CheckCircle2, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/sound';

interface BuildItem {
  id: string;
  name: string;
  icon: string;
  category: 'nature' | 'building' | 'energy' | 'eco';
}

const PALETTE_ITEMS: BuildItem[] = [
  { id: 'tree', name: 'Pohon Hijau', icon: '🌳', category: 'nature' },
  { id: 'flower', name: 'Taman Bunga', icon: '🌸', category: 'nature' },
  { id: 'house', name: 'Rumah Kayu', icon: '🏡', category: 'building' },
  { id: 'school', name: 'Sekolah Ceria', icon: '🏫', category: 'building' },
  { id: 'bridge', name: 'Jembatan Mini', icon: '🌉', category: 'building' },
  { id: 'solar', name: 'Panel Surya', icon: '☀️', category: 'energy' },
  { id: 'wind', name: 'Kincir Angin', icon: '💨', category: 'energy' },
  { id: 'recycle', name: 'Kotak Pilah', icon: '♻️', category: 'eco' },
  { id: 'pond', name: 'Kolam Ikan', icon: '🐟', category: 'nature' },
  { id: 'bench', name: 'Bangku Santai', icon: '🪑', category: 'building' },
];

export const CreativeStudio: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const GRID_SIZE = 36; // 6x6 grid
  const [grid, setGrid] = useState<(BuildItem | null)[]>(new Array(GRID_SIZE).fill(null));
  const [selectedTool, setSelectedTool] = useState<BuildItem | 'eraser'>(PALETTE_ITEMS[0]);
  const [savedCreationsCount, setSavedCreationsCount] = useState(2);

  const handleCellClick = (index: number) => {
    playSound('snap');
    const newGrid = [...grid];
    if (selectedTool === 'eraser') {
      newGrid[index] = null;
    } else {
      newGrid[index] = selectedTool;
    }
    setGrid(newGrid);
  };

  const handleClear = () => {
    playSound('click');
    setGrid(new Array(GRID_SIZE).fill(null));
  };

  const handleSave = () => {
    playSound('victory');
    setSavedCreationsCount((c) => c + 1);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    });
    alert('🎉 Horeee! Desain Kota Impianmu berhasil disimpan ke "Ruang Karya"!');
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
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
              <span className="text-xl">✨</span>
              <h2 className="text-xl font-bold font-game text-slate-800">
                WAWI Creative Studio (Build & Create)
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              Rancang Desa & Solusi Ramah Lingkungan Impianmu secara Bebas!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleClear}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            Hapus Semua
          </button>
          <button
            onClick={handleSave}
            className="game-btn-gold px-4 py-1.5 rounded-xl text-xs font-bold font-game flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            Simpan ke Ruang Karya ({savedCreationsCount})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Grid Canvas (2 Cols) */}
        <div className="lg:col-span-2 bg-gradient-to-b from-emerald-100 via-green-50 to-emerald-200 p-6 rounded-3xl border-4 border-emerald-400 shadow-md flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-4 text-xs font-bold text-emerald-900 bg-white/80 backdrop-blur px-3 py-1.5 rounded-full">
            <span>🌿 Kanvas Desa Inovasi Nusantara (6x6 Grid)</span>
            <span>Sentuh kotak untuk menaruh objek</span>
          </div>

          <div className="grid grid-cols-6 gap-2 w-full max-w-[480px] aspect-square p-3 bg-emerald-600/20 rounded-2xl border-2 border-emerald-400">
            {grid.map((cell, idx) => (
              <button
                key={idx}
                onClick={() => handleCellClick(idx)}
                className={`w-full h-full rounded-xl flex items-center justify-center text-3xl transition transform cursor-pointer border ${
                  cell
                    ? 'bg-white/95 border-emerald-300 shadow-sm hover:scale-105'
                    : 'bg-emerald-500/20 border-dashed border-emerald-400/60 hover:bg-emerald-400/30'
                }`}
              >
                {cell ? cell.icon : <span className="opacity-0">.</span>}
              </button>
            ))}
          </div>

          <div className="mt-4 text-[11px] text-emerald-800 font-medium">
            💡 Tips Guru: Ajak anak menceritakan mengapa mereka menaruh pohon di dekat rumah atau mengapa panel surya ditaruh di atap!
          </div>
        </div>

        {/* Palette Deck (1 Col) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col gap-4">
          <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Pilih Objek untuk Diletakkan:
          </h3>

          <div className="grid grid-cols-2 gap-2">
            {PALETTE_ITEMS.map((item) => {
              const isSelected = selectedTool !== 'eraser' && selectedTool.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    playSound('pop');
                    setSelectedTool(item);
                  }}
                  className={`p-3 rounded-2xl border flex items-center gap-2.5 transition cursor-pointer text-left ${
                    isSelected
                      ? 'bg-amber-100 border-amber-500 ring-2 ring-amber-400 shadow-sm'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <div className="font-bold text-xs text-slate-800">{item.name}</div>
                    <div className="text-[10px] text-slate-400 capitalize">{item.category}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Eraser Tool */}
          <button
            onClick={() => {
              playSound('pop');
              setSelectedTool('eraser');
            }}
            className={`p-3 rounded-2xl border flex items-center justify-center gap-2 font-bold text-xs transition cursor-pointer ${
              selectedTool === 'eraser'
                ? 'bg-rose-100 border-rose-500 text-rose-800 ring-2 ring-rose-300'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Trash2 className="w-4 h-4" />
            Penghapus Objek
          </button>
        </div>
      </div>
    </div>
  );
};
