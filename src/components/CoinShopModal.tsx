import React from 'react';
import { X, Check, ShoppingBag } from 'lucide-react';
import { playSound } from '../utils/sound';

interface ShopItem {
  id: string;
  name: string;
  price: number;
  icon: string;
  description: string;
  purchased?: boolean;
}

const ITEMS: ShopItem[] = [
  { id: 'hat_explorer', name: 'Topi Penjelajah Daun', price: 200, icon: '🤠', description: 'Topi pelindung saat berpetualang di Taman Kehidupan.' },
  { id: 'glasses_detective', name: 'Kacamata Detektif', price: 350, icon: '👓', description: 'Membantu melihat sampah dan petunjuk masalah tersembunyi.' },
  { id: 'backpack_solar', name: 'Ransel Ramah Lingkungan', price: 500, icon: '🎒', description: 'Ransel hijau dengan wadah stik kayu & perlengkapan kreasi.' },
  { id: 'companion_milo', name: 'Sahabat Cilik Milo', price: 1000, icon: '🐶', description: 'Guguk setia yang selalu menyemangati saat jembatan roboh.' },
];

interface CoinShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  coins: number;
  onBuy: (cost: number) => void;
}

export const CoinShopModal: React.FC<CoinShopModalProps> = ({ isOpen, onClose, coins, onBuy }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border-4 border-amber-300 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🪙</span>
            <div>
              <h3 className="text-xl font-bold font-game text-slate-800">Toko Koin Petualang</h3>
              <p className="text-xs text-slate-500">Tukarkan Koin Kebaikanmu dengan Perlengkapan Baru</p>
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

        <div className="flex items-center justify-between bg-amber-50 p-3 rounded-2xl border border-amber-200">
          <span className="text-xs font-bold text-amber-900">Koin Kamu Saat Ini:</span>
          <span className="font-game font-bold text-base text-amber-900 flex items-center gap-1.5">
            🪙 {coins.toLocaleString('id-ID')} Koin
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {ITEMS.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between gap-2"
            >
              <div className="flex flex-col items-center text-center">
                <span className="text-4xl mb-1">{item.icon}</span>
                <h4 className="font-bold text-xs text-slate-800">{item.name}</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">{item.description}</p>
              </div>

              <button
                onClick={() => {
                  if (coins >= item.price) {
                    playSound('coin');
                    onBuy(item.price);
                    alert(`Selamat! Kamu membeli ${item.name}!`);
                  } else {
                    playSound('snap');
                    alert('Koinmu belum cukup, yuk selesaikan misi lagi!');
                  }
                }}
                className="game-btn-gold py-1.5 px-3 rounded-xl text-[11px] font-bold font-game text-center"
              >
                🪙 {item.price} Koin
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
