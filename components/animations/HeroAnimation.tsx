import type { CSSProperties } from "react";

// Hemoglobine-tetrameer: 2 α- en 2 β-ketens, elk met een heemgroep.
const SUBUNITS = [
  { x: 152, y: 124, fill: "#4c1d95", label: "α₁" },
  { x: 208, y: 124, fill: "#7c3aed", label: "β₁" },
  { x: 152, y: 180, fill: "#7c3aed", label: "β₂" },
  { x: 208, y: 180, fill: "#4c1d95", label: "α₂" },
];

// O₂ vliegt binnen vanaf (dx, dy) en verlaat de cel naar (ex, ey).
// De eerste binding gaat traag, de volgende sneller: coöperativiteit.
const O2 = [
  { dx: -170, dy: -120, ex: 160, ey: 120, delay: 0 },
  { dx: 160, dy: -130, ex: -170, ey: 110, delay: 0.6 },
  { dx: -180, dy: 90, ex: 170, ey: -100, delay: 0.85 },
  { dx: 170, dy: 110, ex: -160, ey: -120, delay: 1.0 },
];

/** Decoratieve lus voor de homepage: O₂ bindt coöperatief, Hb gaat van T- naar R-stand. */
export function HeroAnimation() {
  return (
    <svg viewBox="0 0 360 300" className="haemo-hero w-full" aria-hidden>
      <defs>
        <radialGradient id="heroShine" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Erytrocyt */}
      <ellipse className="haemo-hero-cell" cx="180" cy="152" rx="150" ry="112" />
      <ellipse cx="180" cy="152" rx="150" ry="112" fill="url(#heroShine)" />
      <ellipse cx="180" cy="152" rx="78" ry="54" fill="#450a0a" opacity="0.12" />

      {/* Hb-tetrameer */}
      <g className="haemo-hero-hb">
        {SUBUNITS.map((s) => (
          <g key={s.label}>
            <circle cx={s.x} cy={s.y} r="27" fill={s.fill} opacity="0.92" />
            <circle cx={s.x} cy={s.y} r="8" fill="#fbbf24" stroke="#b45309" strokeWidth="1.5" />
            <text x={s.x + (s.x < 180 ? -16 : 16)} y={s.y + (s.y < 150 ? -12 : 20)} textAnchor="middle" fontSize="10" fontWeight="600" fill="#e0e7ff">
              {s.label}
            </text>
          </g>
        ))}
      </g>

      {/* O₂-moleculen */}
      {O2.map((o, i) => (
        <g
          key={i}
          className="haemo-hero-o2"
          style={
            {
              "--dx": `${o.dx}px`,
              "--dy": `${o.dy}px`,
              "--ex": `${o.ex}px`,
              "--ey": `${o.ey}px`,
              animationDelay: `${o.delay}s`,
            } as CSSProperties
          }
        >
          <g transform={`translate(${SUBUNITS[i].x} ${SUBUNITS[i].y})`}>
            <circle cx="-5" r="7" fill="#2563eb" stroke="white" strokeWidth="1.5" />
            <circle cx="5" r="7" fill="#2563eb" stroke="white" strokeWidth="1.5" />
          </g>
        </g>
      ))}

      {/* Toestand */}
      <g fontSize="13" fontWeight="600" textAnchor="middle">
        <text className="haemo-hero-label-t" x="180" y="292" fill="#7f1d1d">deoxy-Hb · T-stand</text>
        <text className="haemo-hero-label-r" x="180" y="292" fill="#dc2626">oxy-Hb · R-stand</text>
      </g>
    </svg>
  );
}
