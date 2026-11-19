import type { WfProfile } from '../data/steelData';

interface WfCrossSectionSvgProps {
  profile: WfProfile;
  isSafe: boolean;
}

export function WfCrossSectionSvg({ profile, isSafe }: WfCrossSectionSvgProps) {
  // Proporsi dinamis penampang SVG WF berdasarkan dimensi aktual profil
  const scaleFactor = Math.min(1.15, Math.max(0.75, profile.h / 250));
  const halfW = Math.round(22 * scaleFactor);
  const xLeft = 50 - halfW;
  const xRight = 50 + halfW;
  const flangeThick = Math.max(6, Math.round(profile.tf * 0.75));
  const webHalf = Math.max(3, Math.round(profile.tw * 0.55));

  const pathD = [
    `M${xLeft} 16`,
    `H${xRight}`,
    `V${16 + flangeThick}`,
    `H${50 + webHalf}`,
    `V${86 - flangeThick}`,
    `H${xRight}`,
    `V86`,
    `H${xLeft}`,
    `V${86 - flangeThick}`,
    `H${50 - webHalf}`,
    `V${16 + flangeThick}`,
    `H${xLeft}`,
    'Z',
  ].join(' ');

  const strokeAccent = isSafe ? '#2563EB' : '#DC2626';

  return (
    <svg
      className="w-20 h-20 select-none"
      viewBox="0 0 100 100"
      role="img"
      aria-label={`Ilustrasi penampang ${profile.shortLabel} mm`}
    >
      {/* Height dimension line (H) */}
      <line
        x1="14"
        y1="16"
        x2="14"
        y2="86"
        stroke="#94a3b8"
        strokeWidth="1"
        strokeDasharray="2,2"
      />
      <line x1="11" y1="16" x2="17" y2="16" stroke="#94a3b8" strokeWidth="1" />
      <line x1="11" y1="86" x2="17" y2="86" stroke="#94a3b8" strokeWidth="1" />
      <text
        x="8"
        y="52"
        fill="#475569"
        fontSize="8.5"
        fontFamily="DM Mono, monospace"
        fontWeight="700"
        transform="rotate(-90 8,52)"
        textAnchor="middle"
      >
        H
      </text>

      {/* Width dimension line (B) */}
      <line
        x1={xLeft}
        y1="10"
        x2={xRight}
        y2="10"
        stroke="#94a3b8"
        strokeWidth="1"
        strokeDasharray="2,2"
      />
      <line x1={xLeft} y1="7" x2={xLeft} y2="13" stroke="#94a3b8" strokeWidth="1" />
      <line x1={xRight} y1="7" x2={xRight} y2="13" stroke="#94a3b8" strokeWidth="1" />
      <text
        x="50"
        y="7"
        fill="#475569"
        fontSize="8.5"
        fontFamily="DM Mono, monospace"
        fontWeight="700"
        textAnchor="middle"
      >
        B
      </text>

      {/* Neutral Axis X-X */}
      <line
        x1="20"
        y1="51"
        x2="86"
        y2="51"
        stroke="#cbd5e1"
        strokeWidth="0.9"
        strokeDasharray="4,2"
      />

      {/* I-Beam / WF Shape */}
      <path
        d={pathD}
        fill="#0F2537"
        stroke={strokeAccent}
        strokeWidth="1.5"
        strokeLinejoin="miter"
      />

      {/* Flange & Web thickness callout ticks */}
      <text
        x="91"
        y={16 + flangeThick / 2 + 2.5}
        fill="#64748b"
        fontSize="7.5"
        fontFamily="DM Mono, monospace"
        textAnchor="middle"
      >
        tf
      </text>
    </svg>
  );
}
