export function ErythrocyteCrossSection() {
  return (
    <svg
      viewBox="0 0 480 320"
      className="mx-auto w-full max-w-lg"
      role="img"
      aria-label="Doorsnede erytrocyt met hemoglobine, carbonic anhydrase en 2,3-BPG"
    >
      <defs>
        <radialGradient id="rbcGrad" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#fecaca" />
          <stop offset="100%" stopColor="#dc2626" />
        </radialGradient>
      </defs>
      {/* Membraan */}
      <ellipse cx="240" cy="160" rx="200" ry="130" fill="url(#rbcGrad)" stroke="#991b1b" strokeWidth="3" />
      <ellipse cx="240" cy="160" rx="175" ry="105" fill="none" stroke="#fca5a5" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />

      {/* Hemoglobine tetramers */}
      {[80, 160, 240, 320, 400].map((x, i) => (
        <g key={x} transform={`translate(${x - 20}, ${120 + (i % 2) * 40})`}>
          <circle r="18" fill="#1e3a8a" opacity="0.85" />
          <circle r="8" fill="#fbbf24" />
          <text x="0" y="32" textAnchor="middle" fontSize="9" fill="#1e293b">Hb</text>
        </g>
      ))}

      {/* Carbonic anhydrase */}
      <g transform="translate(240, 200)">
        <rect x="-28" y="-14" width="56" height="28" rx="6" fill="#059669" opacity="0.9" />
        <text x="0" y="5" textAnchor="middle" fontSize="10" fill="white" fontWeight="600">CA</text>
      </g>

      {/* 2,3-BPG */}
      <g transform="translate(120, 210)">
        <rect x="-24" y="-12" width="48" height="24" rx="4" fill="#7c3aed" opacity="0.85" />
        <text x="0" y="4" textAnchor="middle" fontSize="9" fill="white">2,3-BPG</text>
      </g>

      {/* O2 molecules */}
      <circle cx="360" cy="80" r="10" fill="#2563eb" />
      <text x="360" y="84" textAnchor="middle" fontSize="8" fill="white">O₂</text>
      <circle cx="390" cy="100" r="8" fill="#2563eb" opacity="0.7" />
      <text x="390" y="103" textAnchor="middle" fontSize="7" fill="white">O₂</text>

      {/* Labels */}
      <text x="240" y="24" textAnchor="middle" fontSize="13" fontWeight="600" fill="#450a0a">Erytrocyt</text>
      <text x="240" y="300" textAnchor="middle" fontSize="11" fill="#64748b">
        Hemoglobine · Carbonic anhydrase · 2,3-BPG stabiliseert T-stand
      </text>
    </svg>
  );
}
