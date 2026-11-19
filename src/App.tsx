import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { BeamCalculator } from './components/BeamCalculator';
import { SuiteInfoModal } from './components/SuiteInfoModal';
import {
  DEFAULT_INPUTS,
  STEEL_GRADES,
  STEELPRO_CHECKOUT_URL,
  WF_PROFILES,
} from './data/steelData';

export default function App() {
  const [profileId, setProfileId] = useState<string>(DEFAULT_INPUTS.profileId);
  const [gradeId, setGradeId] = useState<string>(DEFAULT_INPUTS.gradeId);
  const [muInput, setMuInput] = useState<string>(String(DEFAULT_INPUTS.mu));
  const [spanInput, setSpanInput] = useState<string>(String(DEFAULT_INPUTS.spanL));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedProfile =
    WF_PROFILES.find((p) => p.id === profileId) ?? WF_PROFILES[1];
  const selectedGrade =
    STEEL_GRADES.find((g) => g.id === gradeId) ?? STEEL_GRADES[0];

  const handleReset = () => {
    setProfileId(DEFAULT_INPUTS.profileId);
    setGradeId(DEFAULT_INPUTS.gradeId);
    setMuInput(String(DEFAULT_INPUTS.mu));
    setSpanInput(String(DEFAULT_INPUTS.spanL));
  };

  return (
    <div className="min-h-screen flex flex-col justify-between text-slate-900">
      {/* Top Brand Navigation Bar */}
      <header className="bg-navy-900 text-white border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-15 flex items-center justify-between gap-6">
          <a
            href="#kalkulator"
            className="flex items-center gap-2.5 font-display font-extrabold tracking-tight text-base sm:text-lg whitespace-nowrap shrink-0"
          >
            <svg
              className="w-5 h-5 text-blue-400 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              aria-hidden="true"
            >
              <path d="M5 4h14M5 20h14M12 4v16" strokeLinecap="round" />
            </svg>
            <span>
              STEELPRO <span className="text-slate-400 font-bold">| SNI</span>
            </span>
          </a>

          <span className="hidden sm:inline text-xs font-medium text-blue-300 whitespace-nowrap">
            Acuan: SNI 1729:2020 Bab F
          </span>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold text-white border border-white/10 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Lihat 12+ Modul
          </button>
        </div>
      </header>

      {/* Main Demo Application Container */}
      <main className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 flex-grow">
        {/* Intro Title for Demo Context */}
        <div className="text-center mb-6">
          <p className="text-xs font-bold text-blue-700 mb-1.5">
            Simulasi Langsung Modul Excel · Demo Interaktif
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight text-balance">
            Coba Cek Kapasitas Lentur{' '}
            <span className="text-blue-600">Balok WF Secara Instan</span>
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto mt-1.5 leading-relaxed">
            Pilih profil WF, tentukan mutu baja, dan masukkan momen rencana (M
            <sub>u</sub>) untuk melihat cara kerja indikator kapasitas otomatis di{' '}
            <strong className="text-slate-900">STEELPRO SNI</strong>.
          </p>
        </div>

        {/* Main Calculator Card */}
        <BeamCalculator
          profile={selectedProfile}
          grade={selectedGrade}
          muInput={muInput}
          spanInput={spanInput}
          onProfileChange={setProfileId}
          onGradeChange={setGradeId}
          onMuChange={setMuInput}
          onSpanChange={setSpanInput}
          onReset={handleReset}
        />

        {/* Product Demo Call-to-Action Banner */}
        <section
          aria-labelledby="cta-suite-title"
          className="mt-6 bg-navy-900 rounded-2xl p-5 sm:p-6 text-white shadow-lg border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="text-center sm:text-left">
            <p className="text-[11px] font-bold text-blue-300 mb-1">
              12+ Modul Lengkap · SNI 1729:2020
            </p>
            <h3
              id="cta-suite-title"
              className="font-display text-base sm:text-lg font-extrabold leading-snug text-balance"
            >
              Ingin Hitung Kolom, Gording, Sambungan Baut &amp; Base Plate Otomatis?
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Dapatkan suite Excel lengkap <strong className="text-white">STEELPRO SNI</strong>{' '}
              + 2 Bonus Eksklusif (E-Book Tabel Profil &amp; Template RAB Tonase). Sekali
              beli, pakai selamanya!
            </p>
          </div>
          <div className="shrink-0 w-full sm:w-auto flex flex-col gap-2">
            <a
              href={STEELPRO_CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-display font-bold text-xs sm:text-sm transition-colors active:scale-95 whitespace-nowrap"
            >
              <span>DAPATKAN AKSES SEKARANG</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-blue-200 font-semibold text-[11px] border border-white/10 transition-colors whitespace-nowrap cursor-pointer"
            >
              Lihat Daftar 12+ Modul &amp; Bonus
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-5 text-center text-[11px] text-slate-500">
        <strong className="text-slate-700">STEELPRO SNI</strong> — Automated Steel
        Structure Design &amp; Verification Suite (Acuan SNI 1729:2020).
      </footer>

      {/* Modal Info Paket Lengkap */}
      <SuiteInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
