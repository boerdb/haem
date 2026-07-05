export function ErythrocyteCrossSection() {
  return (
    <svg
      viewBox="0 0 480 340"
      className="mx-auto w-full max-w-lg"
      role="img"
      aria-label="Doorsnede erytrocyt met hemoglobine, heem-ijzer, carbonic anhydrase en 2,3-BPG"
    >
      <defs>
        <radialGradient id="rbcGrad" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#fecaca" />
          <stop offset="100%" stopColor="#dc2626" />
        </radialGradient>
      </defs>
      <ellipse cx="240" cy="165" rx="200" ry="130" fill="url(#rbcGrad)" stroke="#991b1b" strokeWidth="3" />
      <ellipse cx="240" cy="165" rx="175" ry="105" fill="none" stroke="#fca5a5" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />

      {/* Hb tetramers — blauw = globine, goud = heem/Fe²⁺ */}
      {[80, 160, 240, 320, 400].map((x, i) => (
        <g key={x} transform={`translate(${x - 20}, ${120 + (i % 2) * 40})`}>
          <circle r="18" fill="#1e3a8a" opacity="0.85" />
          <circle r="9" fill="#fbbf24" stroke="#b45309" strokeWidth="1.5" />
          <text x="0" y="3" textAnchor="middle" fontSize="7" fontWeight="700" fill="#78350f">
            Fe²⁺
          </text>
          <text x="0" y="32" textAnchor="middle" fontSize="9" fill="#1e293b">
            Hb
          </text>
        </g>
      ))}

      <g transform="translate(240, 205)">
        <rect x="-28" y="-14" width="56" height="28" rx="6" fill="#059669" opacity="0.9" />
        <text x="0" y="5" textAnchor="middle" fontSize="10" fill="white" fontWeight="600">
          CA
        </text>
      </g>

      <g transform="translate(120, 215)">
        <rect x="-24" y="-12" width="48" height="24" rx="4" fill="#7c3aed" opacity="0.85" />
        <text x="0" y="4" textAnchor="middle" fontSize="9" fill="white">
          2,3-BPG
        </text>
      </g>

      <circle cx="360" cy="85" r="10" fill="#2563eb" />
      <text x="360" y="89" textAnchor="middle" fontSize="8" fill="white">
        O₂
      </text>

      <text x="240" y="24" textAnchor="middle" fontSize="13" fontWeight="600" fill="#450a0a">
        Erytrocyt
      </text>
      <text x="240" y="318" textAnchor="middle" fontSize="11" fill="#64748b">
        Goud = heem (Fe²⁺) · Blauw = globine · 4 heem per Hb-molecuul
      </text>
    </svg>
  );
}
