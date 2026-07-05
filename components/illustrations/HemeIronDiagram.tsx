export function HemeIronDiagram() {
  return (
    <svg
      viewBox="0 0 520 340"
      className="mx-auto w-full max-w-2xl"
      role="img"
      aria-label="Heemgroep met protoporfyrine ring en ferrozuur, O2-bindingsplaats"
    >
      {/* Protoporfyrine ring (vereenvoudigd) */}
      <g transform="translate(260, 155)">
        <ellipse cx="0" cy="0" rx="95" ry="55" fill="none" stroke="#7c2d12" strokeWidth="2.5" />
        <ellipse cx="0" cy="0" rx="75" ry="38" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" opacity="0.9" />
        {/* vier pyrrol-achtige lobes */}
        <circle cx="-55" cy="-20" r="18" fill="#fde68a" stroke="#b45309" strokeWidth="1.5" />
        <circle cx="55" cy="-20" r="18" fill="#fde68a" stroke="#b45309" strokeWidth="1.5" />
        <circle cx="-55" cy="20" r="18" fill="#fde68a" stroke="#b45309" strokeWidth="1.5" />
        <circle cx="55" cy="20" r="18" fill="#fde68a" stroke="#b45309" strokeWidth="1.5" />

        {/* Fe²⁺ centrum */}
        <circle cx="0" cy="0" r="14" fill="#78716c" stroke="#44403c" strokeWidth="2" />
        <text x="0" y="5" textAnchor="middle" fontSize="11" fontWeight="700" fill="white">
          Fe²⁺
        </text>

        {/* Proximale His (onder) */}
        <line x1="0" y1="14" x2="0" y2="42" stroke="#059669" strokeWidth="2" />
        <text x="0" y="58" textAnchor="middle" fontSize="9" fill="#047857">
          Proximale His (F8)
        </text>

        {/* O₂ boven heem (6e coordinatieplaats) */}
        <line x1="0" y1="-14" x2="0" y2="-38" stroke="#2563eb" strokeWidth="2" />
        <circle cx="0" cy="-52" r="12" fill="#2563eb" />
        <text x="0" y="-48" textAnchor="middle" fontSize="8" fontWeight="600" fill="white">
          O₂
        </text>
        <text x="0" y="-68" textAnchor="middle" fontSize="9" fill="#1d4ed8">
          Distale His (E7) moduleert affiniteit
        </text>
      </g>

      {/* Legenda */}
      <rect x="20" y="250" width="480" height="78" rx="8" fill="#f8fafc" stroke="#e2e8f0" />
      <text x="40" y="272" fontSize="11" fontWeight="600" fill="#0f172a">
        Heem = protoporfyrine IX + ferrozuur (Fe²⁺)
      </text>
      <text x="40" y="290" fontSize="10" fill="#475569">
        • Fe moet in ferrous toestand (Fe²⁺) blijven voor reversibele O₂-binding
      </text>
      <text x="40" y="306" fontSize="10" fill="#475569">
        • Fe³⁺ (methemoglobine) bindt O₂ niet · 1 heem = max. 1 O₂ · Hb (α₂β₂) = 4 heemgroepen
      </text>
      <text x="40" y="322" fontSize="10" fill="#475569">
        • CO/NO concurreren om dezelfde bindingsplaats (klinisch relevant bij intoxicatie)
      </text>
    </svg>
  );
}
