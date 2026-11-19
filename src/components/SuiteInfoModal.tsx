import { useEffect } from 'react';
import { ArrowRight, Check, Gift, Layers, X } from 'lucide-react';
import {
  STEELPRO_CHECKOUT_URL,
  SUITE_BONUSES,
  SUITE_MODULES,
} from '../data/steelData';

interface SuiteInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SuiteInfoModal({ isOpen, onClose }: SuiteInfoModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-[2px] p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="suite-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200">
        {/* Modal Header */}
        <div className="bg-navy-900 px-5 py-4 text-white flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium text-blue-300">
              STEELPRO SNI Suite
            </p>
            <h4
              id="suite-modal-title"
              className="font-display font-bold text-base tracking-tight"
            >
              Daftar 12+ Modul &amp; Bonus
            </h4>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup jendela informasi paket"
            className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 text-xs text-slate-700 max-h-[70vh] overflow-y-auto">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-navy-900 text-xs">
              <Layers className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Modul Elemen &amp; Sambungan (SNI 1729:2020)</span>
            </div>
            <ul className="space-y-1.5 text-slate-600">
              {SUITE_MODULES.map((item) => (
                <li key={item} className="flex items-start gap-2 leading-relaxed">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-blue-950 text-xs">
              <Gift className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Termasuk 2 Bonus Eksklusif</span>
            </div>
            <ul className="space-y-1.5 text-blue-950">
              {SUITE_BONUSES.map((bonus) => (
                <li key={bonus} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-blue-600 font-bold" aria-hidden="true">
                    ·
                  </span>
                  <span>{bonus}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-1 text-center border-t border-slate-100">
            <p className="text-slate-500 mt-2">
              Harga Promo Peluncuran:{' '}
              <s className="text-red-600 font-mono tabular-nums">Rp499.000</s>
            </p>
            <p className="font-display text-2xl font-extrabold text-navy-900 tabular-nums mt-0.5">
              Rp179.000{' '}
              <span className="text-xs font-sans font-semibold text-emerald-700">
                (Sekali Bayar)
              </span>
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row gap-2.5">
          <a
            href={STEELPRO_CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-display font-bold text-xs shadow-sm transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <span>Dapatkan Akses Sekarang</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-display font-bold text-xs transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
