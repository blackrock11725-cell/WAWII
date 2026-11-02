import React from 'react';
import { Award, Star, X, CheckCircle2, Lock } from 'lucide-react';
import { BADGES_CATALOG } from '../data/mockData';
import { playSound } from '../utils/sound';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-xl w-full shadow-2xl border-4 border-amber-300 flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏆</span>
            <div>
              <h3 className="text-xl font-bold font-game text-slate-800">
                Papan Penghargaan: Solution Badges
              </h3>
              <p className="text-xs text-slate-500">
                Apresiasi Proses Berpikir, Ketekunan, & Kebaikan Hati
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {BADGES_CATALOG.map((b) => (
            <div
              key={b.id}
              className={`p-4 rounded-2xl border flex items-start gap-3 transition ${
                b.unlocked
                  ? 'bg-gradient-to-b from-amber-50 to-orange-50 border-amber-300 shadow-sm'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-sm ${
                  b.unlocked ? 'bg-amber-100 border-2 border-amber-400' : 'bg-slate-200 border-2 border-slate-300'
                }`}
              >
                {b.unlocked ? b.icon : <Lock className="w-5 h-5 text-slate-400" />}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-xs text-slate-800">{b.name}</h4>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                      b.rarity === 'Legenda'
                        ? 'bg-purple-100 text-purple-700'
                        : b.rarity === 'Emas'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {b.rarity}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1 leading-snug">{b.description}</p>
                <div className="mt-2 text-[10px] font-bold">
                  {b.unlocked ? (
                    <span className="text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Berhasil Diraih!
                    </span>
                  ) : (
                    <span className="text-slate-400">Selesaikan misi terkait</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 rounded-2xl p-3 border border-amber-200 text-xs text-amber-900 text-center font-medium">
          🌟 Bukan cuma kecepatan! Penghargaan WAWI dirancang untuk menghargai <strong>proses mencoba</strong> dan <strong>empati kepada teman</strong>.
        </div>
      </div>
    </div>
  );
};
