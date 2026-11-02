import React from 'react';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';
import { playSound } from '../utils/sound';

interface ConceptImageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConceptImageModal: React.FC<ConceptImageModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-4xl w-full shadow-2xl border-4 border-amber-300 flex flex-col gap-4 max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎨</span>
            <div>
              <h3 className="text-xl font-bold font-game text-slate-800">
                Desain & Konsep Visual WAWI: Problem Quest
              </h3>
              <p className="text-xs text-slate-500">
                Referensi Visual Asli Prototip Petualangan Nusantara & Pembelajaran 30 Menit
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

        {/* Embedded Reference Image */}
        <div className="rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md bg-slate-100">
          <img
            src="/assets/aistudio/872587105_1632029568381363_8840533061228994835_n_fe248fb6.png"
            alt="Konsep Visual WAWI Problem Quest"
            className="w-full h-auto object-contain max-h-[480px] mx-auto"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Feature Alignment Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
            <h4 className="font-bold text-emerald-900 mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              1. 5 Adventure Worlds
            </h4>
            <p className="text-emerald-950 text-[11px] leading-relaxed">
              Taman Kehidupan (Eco Rescue), Kota Berkelanjutan (Bridge Builder), Laboratorium Inovasi, Desa Nusantara, dan Planet Hijau.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200">
            <h4 className="font-bold text-amber-900 mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-600" />
              2. 30 Menit Smart Learning
            </h4>
            <p className="text-amber-950 text-[11px] leading-relaxed">
              15 Menit Digital Brain Game interaktif adaptif + 15 Menit Real-World Mission di kelas TK dengan panduan guru.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200">
            <h4 className="font-bold text-blue-900 mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              3. WAWI Growth Tracker
            </h4>
            <p className="text-blue-950 text-[11px] leading-relaxed">
              Dashboard observasi proses (bukan sekadar tes angka) selaras dengan Kurikulum Merdeka PAUD (BB, MB, BSH, BSB).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
