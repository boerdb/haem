export function LungAlveolusDiagram() {
  return (
    <svg
      viewBox="0 0 520 320"
      className="mx-auto w-full max-w-xl"
      role="img"
      aria-label="Alveolus en longcapilair: O₂ diffundeert naar het bloed, CO₂ naar de alveolus"
    >
      {/* Alveolus */}
      <ellipse cx="260" cy="105" rx="180" ry="68" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
      <text x="260" y="100" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1d4ed8">
        Alveolus
      </text>
      <text x="260" y="118" textAnchor="middle" fontSize="10" fill="#2563eb">
        hoge pO₂ · lage pCO₂
      </text>

      {/* O₂: alveolus → capilair (pijlen omlaag) */}
      <g aria-label="Zuurstof diffundeert naar capilair">
        <line x1="170" y1="168" x2="170" y2="208" stroke="#2563eb" strokeWidth="3" />
        <polygon points="170,218 164,206 176,206" fill="#2563eb" />
        <line x1="350" y1="168" x2="350" y2="208" stroke="#2563eb" strokeWidth="3" />
        <polygon points="350,218 344,206 356,206" fill="#2563eb" />
        <text x="128" y="192" fontSize="11" fontWeight="600" fill="#1d4ed8">
          O₂
        </text>
        <text x="128" y="206" fontSize="9" fill="#3b82f6">
          diffusie ↓
        </text>
      </g>

      {/* Capilair */}
      <rect x="50" y="222" width="420" height="40" rx="20" fill="#fecaca" stroke="#dc2626" strokeWidth="2" />
      <text x="260" y="247" textAnchor="middle" fontSize="11" fontWeight="500" fill="#991b1b">
        Longcapilair · deoxy-Hb → oxy-Hb
      </text>

      {/* CO₂: capilair → alveolus (pijlen omhoog) */}
      <g aria-label="Koolstofdioxide diffundeert naar alveolus">
        <line x1="230" y1="218" x2="230" y2="178" stroke="#ea580c" strokeWidth="3" />
        <polygon points="230,168 224,180 236,180" fill="#ea580c" />
        <line x1="290" y1="218" x2="290" y2="178" stroke="#ea580c" strokeWidth="3" />
        <polygon points="290,168 284,180 296,180" fill="#ea580c" />
        <text x="378" y="192" fontSize="11" fontWeight="600" fill="#c2410c">
          CO₂
        </text>
        <text x="378" y="206" fontSize="9" fill="#ea580c">
          diffusie ↑
        </text>
      </g>

      {/* Haldane */}
      <rect x="60" y="278" width="400" height="36" rx="6" fill="#f0fdf4" stroke="#86efac" />
      <text x="260" y="300" textAnchor="middle" fontSize="10" fill="#166534">
        Haldane-effect: O₂-binden → CO₂ en H⁺ vrijgeven · carbamino-Hb ↓
      </text>
    </svg>
  );
}
