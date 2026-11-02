import React, { useState } from 'react';
import { X, QrCode, Copy, Check, ExternalLink, Smartphone } from 'lucide-react';
import { playSound } from '../utils/sound';

interface ShareQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  sharedUrl: string;
}

export const ShareQRModal: React.FC<ShareQRModalProps> = ({ isOpen, onClose, sharedUrl }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=${encodeURIComponent(sharedUrl)}`;

  const handleCopy = () => {
    playSound('coin');
    navigator.clipboard.writeText(sharedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border-4 border-amber-400 flex flex-col items-center gap-4 text-slate-800 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="w-full flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-game font-bold text-base text-slate-900">
                Scan QR Code & Link Game
              </h3>
              <p className="text-[11px] text-slate-500">
                Buka di HP, Tablet Kelas TK, atau Lampiran Lomba
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* QR Code Container */}
        <div className="p-4 bg-gradient-to-b from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-300 shadow-inner flex flex-col items-center">
          <div className="w-56 h-56 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-md flex items-center justify-center">
            <img
              src={qrImageUrl}
              alt="QR Code WAWI Problem Quest"
              className="w-full h-full object-contain rounded-lg"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-[11px] font-bold text-amber-900 mt-2 flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5 text-amber-600" />
            Arahkan kamera HP / Tablet untuk mencoba langsung!
          </span>
        </div>

        {/* Link Box & Copy Button */}
        <div className="w-full flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-slate-600">Tautan Aplikasi (Shared Link):</label>
          <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
            <input
              type="text"
              readOnly
              value={sharedUrl}
              className="bg-transparent text-xs text-slate-700 font-mono flex-1 outline-none truncate"
            />
            <button
              onClick={handleCopy}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                copied
                  ? 'bg-emerald-500 text-white'
                  : 'bg-amber-400 hover:bg-amber-500 text-amber-950 font-game'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Tersalin!' : 'Salin'}
            </button>
          </div>
        </div>

        {/* Open Direct Button */}
        <a
          href={sharedUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => playSound('star')}
          className="w-full py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-game font-bold text-xs flex items-center justify-center gap-2 shadow"
        >
          <span>Buka di Tab Baru</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
