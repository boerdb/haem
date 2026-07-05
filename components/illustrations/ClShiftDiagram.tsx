export function ClShiftDiagram() {
  return (
    <svg
      viewBox="0 0 520 280"
      className="mx-auto w-full max-w-xl"
      role="img"
      aria-label="Chloride shift: HCO3 uit erytrocyt, Cl naar binnen"
    >
      {/* Plasma */}
      <rect x="0" y="0" width="520" height="280" fill="#eff6ff" rx="8" />
      <text x="260" y="28" textAnchor="middle" fontSize="12" fill="#1e40af">Plasma</text>

      {/* Erytrocyt */}
      <ellipse cx="260" cy="160" rx="140" ry="90" fill="#fecaca" stroke="#b91c1c" strokeWidth="2" />
      <text x="260" y="165" textAnchor="middle" fontSize="11" fill="#7f1d1d">Erytrocyt</text>

      {/* HCO3 out */}
      <path d="M 200 140 L 80 100" stroke="#ea580c" strokeWidth="2" markerEnd="url(#arrowCo2)" />
      <text x="120" y="108" fontSize="11" fill="#c2410c">HCO₃⁻ → plasma</text>

      {/* Cl in */}
      <path d="M 320 140 L 440 100" stroke="#059669" strokeWidth="2" markerEnd="url(#arrowCl)" />
      <text x="360" y="108" fontSize="11" fill="#047857">Cl⁻ ← plasma</text>

      {/* CO2 in */}
      <path d="M 260 60 L 260 90" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowCo2)" />
      <text x="260" y="52" textAnchor="middle" fontSize="11" fill="#475569">CO₂ + H₂O → H₂CO₃ (CA)</text>

      {/* CA */}
      <rect x="230" y="175" width="60" height="24" rx="4" fill="#059669" />
      <text x="260" y="191" textAnchor="middle" fontSize="10" fill="white">CA</text>

      <defs>
        <marker id="arrowCo2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#ea580c" />
        </marker>
        <marker id="arrowCl" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#059669" />
        </marker>
      </defs>

      <text x="260" y="265" textAnchor="middle" fontSize="11" fill="#64748b">
        Hamburger-verschuiving — ~70% CO₂ als bicarbonaat
      </text>
    </svg>
  );
}
