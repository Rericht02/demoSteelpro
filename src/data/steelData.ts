export interface WfProfile {
  id: string;
  label: string;
  shortLabel: string;
  zx: number; // cm^3 (modulus penampang plastis sumbu kuat)
  unitWeight: number; // kg/m
  h: number; // mm (tinggi profil)
  b: number; // mm (lebar sayap)
  tw: number; // mm (tebal badan)
  tf: number; // mm (tebal sayap)
}

export interface SteelGrade {
  id: string;
  name: string;
  fy: number; // MPa
  fu: number; // MPa
  label: string;
}

export interface BeamCalculationResult {
  phiB: number;
  mn: number; // kNm
  phiMn: number; // kNm
  dcRatio: number;
  pctUsed: number;
  totalMass: number; // kg
  isSafe: boolean;
  marginKnm: number; // kNm remaining (positive) or deficit (negative)
}

export const PHI_B = 0.90;

export const WF_PROFILES: WfProfile[] = [
  {
    id: 'wf-150',
    label: 'WF 150×75×5×7 (Zx = 102 cm³)',
    shortLabel: 'WF 150×75×5×7',
    zx: 102,
    unitWeight: 14.0,
    h: 150,
    b: 75,
    tw: 5,
    tf: 7,
  },
  {
    id: 'wf-200',
    label: 'WF 200×100×5.5×8 (Zx = 196 cm³)',
    shortLabel: 'WF 200×100×5,5×8',
    zx: 196,
    unitWeight: 21.3,
    h: 200,
    b: 100,
    tw: 5.5,
    tf: 8,
  },
  {
    id: 'wf-250',
    label: 'WF 250×125×6×9 (Zx = 324 cm³)',
    shortLabel: 'WF 250×125×6×9',
    zx: 324,
    unitWeight: 29.6,
    h: 250,
    b: 125,
    tw: 6,
    tf: 9,
  },
  {
    id: 'wf-300',
    label: 'WF 300×150×6.5×9 (Zx = 481 cm³)',
    shortLabel: 'WF 300×150×6,5×9',
    zx: 481,
    unitWeight: 36.7,
    h: 300,
    b: 150,
    tw: 6.5,
    tf: 9,
  },
  {
    id: 'wf-350',
    label: 'WF 350×175×7×11 (Zx = 775 cm³)',
    shortLabel: 'WF 350×175×7×11',
    zx: 775,
    unitWeight: 49.6,
    h: 350,
    b: 175,
    tw: 7,
    tf: 11,
  },
  {
    id: 'wf-400',
    label: 'WF 400×200×8×13 (Zx = 1190 cm³)',
    shortLabel: 'WF 400×200×8×13',
    zx: 1190,
    unitWeight: 66.0,
    h: 400,
    b: 200,
    tw: 8,
    tf: 13,
  },
];

export const STEEL_GRADES: SteelGrade[] = [
  {
    id: 'bj-37',
    name: 'BJ-37',
    fy: 240,
    fu: 370,
    label: 'BJ-37 (fy = 240 MPa)',
  },
  {
    id: 'bj-41',
    name: 'BJ-41',
    fy: 250,
    fu: 410,
    label: 'BJ-41 (fy = 250 MPa)',
  },
];

export const DEFAULT_INPUTS = {
  profileId: 'wf-200',
  gradeId: 'bj-37',
  mu: 32,
  spanL: 6,
} as const;

export const STEELPRO_CHECKOUT_URL =
  'https://digitalassethub.myscalev.com/automated-steel-structure-design-verification-suite-based-on-sni-17292020';

export const SUITE_MODULES = [
  'Balok Lentur WF & H-Beam (Cek LTB, Geser & Lendutan)',
  'Batang Tekan & Kolom (Interaksi Aksial-Momen P-M)',
  'Gording Atap CNP (Beban Angin, Hujan & Sagrod)',
  'Rangka Batang Kuda-Kuda (Siku Tunggal & Ganda)',
  'Sambungan Baut (Geser, Tumpu Pelat & Block Shear)',
  'Sambungan Las (Fillet & Groove Weld)',
  'Base Plate Kolom & Angkur Pedestal Beton',
];

export const SUITE_BONUSES = [
  'E-Book & Tabel Profil Baja Lengkap (JIS & SNI)',
  'Template RAB & Estimasi Tonase Berat Baja',
];

export function formatID(num: number, decimals = 2): string {
  return num.toLocaleString('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatDim(num: number): string {
  return String(num).replace('.', ',');
}

/**
 * Menghitung kapasitas lentur plastis balok WF berdasarkan SNI 1729:2020 Bab F
 * dengan asumsi pengekang lateral penuh (Lb <= Lp).
 * Mn = fy * Zx / 1000 (kNm), phiMn = 0.90 * Mn
 */
export function calculateBeamFlexure(
  profile: WfProfile,
  grade: SteelGrade,
  mu: number,
  spanL: number
): BeamCalculationResult {
  const safeMu = Math.max(0, Number.isFinite(mu) ? mu : 0);
  const safeSpan = Math.max(0.1, Number.isFinite(spanL) ? spanL : 0.1);

  const mn = (grade.fy * profile.zx) / 1000;
  const phiMn = PHI_B * mn;
  const dcRatio = phiMn > 0 ? safeMu / phiMn : 0;
  const pctUsed = Math.round(dcRatio * 100);
  const totalMass = profile.unitWeight * safeSpan;
  const isSafe = dcRatio <= 1.0;
  const marginKnm = phiMn - safeMu;

  return {
    phiB: PHI_B,
    mn,
    phiMn,
    dcRatio,
    pctUsed,
    totalMass,
    isSafe,
    marginKnm,
  };
}
