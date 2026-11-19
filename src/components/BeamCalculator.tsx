import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  RotateCcw,
  Settings,
} from 'lucide-react';
import {
  calculateBeamFlexure,
  formatDim,
  formatID,
  STEEL_GRADES,
  WF_PROFILES,
  type SteelGrade,
  type WfProfile,
} from '../data/steelData';
import { WfCrossSectionSvg } from './WfCrossSectionSvg';

interface BeamCalculatorProps {
  profile: WfProfile;
  grade: SteelGrade;
  muInput: string;
  spanInput: string;
  onProfileChange: (profileId: string) => void;
  onGradeChange: (gradeId: string) => void;
  onMuChange: (value: string) => void;
  onSpanChange: (value: string) => void;
  onReset: () => void;
}

export function BeamCalculator({
  profile,
  grade,
  muInput,
  spanInput,
  onProfileChange,
  onGradeChange,
  onMuChange,
  onSpanChange,
  onReset,
}: BeamCalculatorProps) {
  const parsedMu = Math.max(0, parseFloat(muInput.replace(',', '.')) || 0);
  const parsedSpan = Math.max(0.1, parseFloat(spanInput.replace(',', '.')) || 6);

  const result = calculateBeamFlexure(profile, grade, parsedMu, parsedSpan);
  const clampedScale = Math.min(1, Math.max(0, result.dcRatio));

  return (
    <section
      id="kalkulator"
      aria-labelledby="calc-header-title"
      className="bg-white rounded-2xl border border-slate-300 shadow-lg overflow-hidden"
    >
      {/* Dark Navy Card Header */}
      <div className="bg-navy-900 px-5 py-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
        <div className="flex items-center gap-2.5 text-white">
          <Settings className="w-5 h-5 text-slate-300 shrink-0" aria-hidden="true" />
          <h2
            id="calc-header-title"
            className="font-display font-bold text-base sm:text-lg tracking-tight"
          >
            Mini Kalkulator Balok WF ({grade.name})
          </h2>
        </div>
        <span className="text-xs font-medium text-blue-300 whitespace-nowrap">
          Simulasi dari Modul Lentur
        </span>
      </div>

      {/* Calculator Grid Body */}
      <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: INPUT PARAMETERS (5 cols on desktop) */}
        <div className="md:col-span-5 space-y-4">
          {/* Input 1: Profil WF Dropdown */}
          <div>
            <label
              htmlFor="spProf"
              className="block text-xs font-bold text-slate-600 mb-1.5"
            >
              Contoh Ukuran Profil WF
            </label>
            <div className="relative">
              <select
                id="spProf"
                value={profile.id}
                onChange={(e) => onProfileChange(e.target.value)}
                className="w-full h-11 pl-3.5 pr-9 rounded-xl border border-slate-300 bg-blue-50/70 text-slate-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors appearance-none cursor-pointer"
              >
                {WF_PROFILES.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-700">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Input 2: Mutu Baja Dropdown */}
          <div>
            <label
              htmlFor="spGrade"
              className="block text-xs font-bold text-slate-600 mb-1.5"
            >
              Mutu Baja Struktural (f<sub>y</sub>)
            </label>
            <div className="relative">
              <select
                id="spGrade"
                value={grade.id}
                onChange={(e) => onGradeChange(e.target.value)}
                className="w-full h-11 pl-3.5 pr-9 rounded-xl border border-slate-300 bg-blue-50/70 text-slate-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors appearance-none cursor-pointer"
              >
                {STEEL_GRADES.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-700">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Input 3: Momen Rencana Mu */}
          <div>
            <label
              htmlFor="spMu"
              className="block text-xs font-bold text-slate-600 mb-1.5"
            >
              Momen Rencana Terfaktor M<sub>u</sub> (kNm)
            </label>
            <input
              id="spMu"
              type="number"
              inputMode="decimal"
              min={0}
              step={1}
              value={muInput}
              onChange={(e) => onMuChange(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-slate-300 bg-blue-50/70 text-slate-900 font-mono font-bold text-base tabular-nums focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors"
            />
          </div>

          {/* Input 4: Panjang Balok L */}
          <div>
            <label
              htmlFor="spSpan"
              className="block text-xs font-bold text-slate-600 mb-1.5"
            >
              Panjang Balok L (meter)
            </label>
            <input
              id="spSpan"
              type="number"
              inputMode="decimal"
              min={0.5}
              step={0.5}
              value={spanInput}
              onChange={(e) => onSpanChange(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-slate-300 bg-blue-50/70 text-slate-900 font-mono font-bold text-base tabular-nums focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors"
            />
          </div>

          {/* Reset Action Button */}
          <div className="pt-1 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors active:scale-95 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Reset Simulasi</span>
            </button>
            <span className="text-[11px] text-slate-400 font-medium">
              Auto-kalkulasi real-time
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: OUTPUT RESULTS & VISUALIZATION (7 cols on desktop) */}
        <div className="md:col-span-7 space-y-3">
          {/* Primary Dark Card: Rasio Kapasitas (D/C Ratio) */}
          <div className="bg-navy-900 rounded-xl p-4 sm:p-5 text-white border border-slate-800">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs font-bold text-slate-300">
                Rasio Kapasitas (D/C Ratio)
              </span>
              <span
                className={`font-mono text-xs font-bold tabular-nums ${
                  result.isSafe ? 'text-emerald-300' : 'text-red-300'
                }`}
              >
                {result.pctUsed}% Terpakai
              </span>
            </div>

            <div className="flex items-baseline justify-between gap-4">
              <div
                className={`font-mono text-3xl sm:text-4xl font-bold tracking-tight tabular-nums ${
                  result.isSafe ? 'text-blue-400' : 'text-red-400'
                }`}
              >
                {formatID(result.dcRatio)}
              </div>
              <div className="text-right font-mono text-[11px] text-slate-400 tabular-nums">
                Batas Izin &le; 1,00
              </div>
            </div>

            {/* Capacity Progress Bar */}
            <div className="mt-3 h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full w-full origin-left rounded-full transition-transform duration-200 ${
                  result.isSafe ? 'bg-emerald-400' : 'bg-red-500'
                }`}
                style={{ transform: `scaleX(${clampedScale})` }}
              />
            </div>
          </div>

          {/* Two Sub-Cards: Kuat Lentur & Estimasi Berat */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-xl p-3.5 sm:p-4 border border-slate-300">
              <span className="block text-[11px] font-bold text-slate-500 mb-0.5">
                Kuat Lentur &phi;M<sub>n</sub>
              </span>
              <b className="font-mono text-lg sm:text-xl font-bold text-navy-900 block tabular-nums">
                {formatID(result.phiMn)} kNm
              </b>
            </div>

            <div className="bg-slate-50 rounded-xl p-3.5 sm:p-4 border border-slate-300">
              <span className="block text-[11px] font-bold text-slate-500 mb-0.5">
                Estimasi Berat
              </span>
              <b className="font-mono text-lg sm:text-xl font-bold text-navy-900 block tabular-nums">
                {formatID(result.totalMass)} kg
              </b>
            </div>
          </div>

          {/* Dynamic Status Indicator Box */}
          <div
            role="status"
            aria-live="polite"
            className={`rounded-xl p-3.5 sm:p-4 border transition-colors duration-200 flex items-start gap-2.5 ${
              result.isSafe
                ? 'bg-emerald-100 border-emerald-300 text-emerald-950'
                : 'bg-red-100 border-red-300 text-red-950'
            }`}
          >
            {result.isSafe ? (
              <CheckCircle2
                className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5"
                aria-hidden="true"
              />
            ) : (
              <AlertTriangle
                className="w-4 h-4 text-red-800 shrink-0 mt-0.5"
                aria-hidden="true"
              />
            )}
            <p className="text-xs sm:text-[13px] font-bold leading-relaxed">
              {result.isSafe
                ? `STATUS: SAFE / OK (${result.pctUsed}% kapasitas terpakai). Profil memenuhi syarat lentur.`
                : `STATUS: UNSAFE / NOT OK (${result.pctUsed}% kapasitas). Profil tidak kuat, silakan perbesar ukuran profil WF.`}
            </p>
          </div>

          {/* Interactive SVG Cross-Section Dimension Preview */}
          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 flex items-center justify-between gap-4">
            <div className="space-y-1 min-w-0">
              <p className="text-[11px] font-bold text-blue-700">
                Detail Penampang Profil
              </p>
              <h3 className="font-display font-bold text-sm text-navy-900">
                WF {profile.h} &times; {profile.b} &times; {formatDim(profile.tw)} &times;{' '}
                {formatDim(profile.tf)} mm
              </h3>
              <p className="font-mono text-[11px] text-slate-600 tabular-nums">
                H = {profile.h} mm · B = {profile.b} mm · t<sub>w</sub> ={' '}
                {formatDim(profile.tw)} mm · t<sub>f</sub> = {formatDim(profile.tf)} mm ·
                Z<sub>x</sub> = {profile.zx} cm³
              </p>
            </div>
            <div className="shrink-0 bg-white p-1.5 rounded-lg border border-slate-200">
              <WfCrossSectionSvg profile={profile} isSafe={result.isSafe} />
            </div>
          </div>
        </div>
      </div>

      {/* Technical Footnote */}
      <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-slate-100">
        <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
          Simulasi menggunakan mutu baja {grade.name} (f<sub>y</sub> = {grade.fy} MPa,
          &phi;<sub>b</sub> = 0,90) dengan asumsi pengekang lateral penuh. Di dalam suite
          lengkap <strong className="text-slate-700">STEELPRO SNI</strong>, perhitungan
          mencakup panjang tak terkekang (L<sub>b</sub>), geser, serta lendutan izin.
        </p>
      </div>
    </section>
  );
}
