"use client";

import { PlayPauseButton, usePlayback } from "@/components/animations/AnimationControls";
import { ALVEOLAR, NORMAL_VENOUS } from "@/lib/physiology/co2Transport";
import { mmHgToKpa } from "@/lib/units";

const ALV_O2 = mmHgToKpa(ALVEOLAR.pO2);
const ALV_CO2 = mmHgToKpa(ALVEOLAR.pCO2);
const VEN_O2 = mmHgToKpa(NORMAL_VENOUS.pO2);
const VEN_CO2 = mmHgToKpa(NORMAL_VENOUS.pCO2);
const kpa = (v: number) => v.toFixed(1).replace(".", ",");

// Capillair van x 30 → 570 komt overeen met de contacttijd 0 → 0,75 s.
const CAP_X0 = 30;
const CAP_X1 = 570;
const CONTACT_S = 0.75;
const FLOW_S = 7; // animatieduur van één erytrocyt door het beeld
const RBC_COUNT = 7;

const tx = (t: number) => CAP_X0 + (t / CONTACT_S) * (CAP_X1 - CAP_X0);
const EQ_X = tx(0.25);

// Profiel onder de tekening: pO₂ en pCO₂ langs het capillair
const CHART = { top: 292, bottom: 372, min: 4, max: 14 };
const cy = (kpa: number) =>
  CHART.bottom - ((kpa - CHART.min) / (CHART.max - CHART.min)) * (CHART.bottom - CHART.top);

function profilePath(from: number, to: number): string {
  let d = "";
  for (let i = 0; i <= 60; i++) {
    const t = (i / 60) * CONTACT_S;
    const v = to + (from - to) * Math.exp(-t / 0.06);
    d += `${i === 0 ? "M" : "L"}${tx(t).toFixed(1)},${cy(v).toFixed(1)}`;
  }
  return d;
}

const O2_X = [70, 105, 140, 175, 205];
const CO2_X = [88, 122, 158, 192];

export function AlveolusAnimation() {
  const { paused, toggle } = usePlayback();

  return (
    <div className="haemo-anim-root" data-paused={paused}>
      <svg
        viewBox="0 0 600 400"
        className="mx-auto w-full max-w-2xl"
        role="img"
        aria-label="Alveolus en longcapillair: erytrocyten nemen O₂ op en geven CO₂ af; evenwicht is bereikt na ongeveer een derde van de contacttijd."
      >
        <defs>
          <clipPath id="capClip">
            <rect x={CAP_X0} y="190" width={CAP_X1 - CAP_X0} height="60" rx="30" />
          </clipPath>
        </defs>

        {/* Alveolus */}
        <ellipse
          className="haemo-anim haemo-breathe"
          cx="300"
          cy="100"
          rx="230"
          ry="68"
          fill="#dbeafe"
          stroke="#3b82f6"
          strokeWidth="2"
        />
        <text x="300" y="92" textAnchor="middle" fontSize="14" fontWeight="600" fill="#1d4ed8">Alveolus</text>
        <text x="300" y="112" textAnchor="middle" fontSize="11" fill="#2563eb">
          pO₂ {kpa(ALV_O2)} kPa · pCO₂ {kpa(ALV_CO2)} kPa
        </text>

        {/* Membraan */}
        <line x1={CAP_X0} x2={CAP_X1} y1="180" y2="180" stroke="#94a3b8" strokeWidth="2" strokeDasharray="1 3" />
        <text x={CAP_X1} y="174" textAnchor="end" fontSize="10" fill="#64748b">membraan ~0,5 µm</text>

        {/* Diffusie — alleen in het eerste deel, daarna is er geen gradiënt meer */}
        {O2_X.map((x, i) => (
          <circle
            key={`o2-${x}`}
            className="haemo-anim haemo-o2-drop"
            cx={x}
            cy="160"
            r="5"
            fill="#2563eb"
            style={{ animationDelay: `${-i * 0.37}s` }}
          />
        ))}
        {CO2_X.map((x, i) => (
          <circle
            key={`co2-${x}`}
            className="haemo-anim haemo-co2-rise"
            cx={x}
            cy="215"
            r="5"
            fill="#ea580c"
            style={{ animationDelay: `${-i * 0.45 - 0.2}s` }}
          />
        ))}

        {/* Capillair met stromende erytrocyten */}
        <rect x={CAP_X0} y="190" width={CAP_X1 - CAP_X0} height="60" rx="30" fill="#fef2f2" stroke="#dc2626" strokeWidth="2" />
        <g clipPath="url(#capClip)">
          {Array.from({ length: RBC_COUNT }, (_, i) => (
            <ellipse
              key={i}
              className="haemo-anim haemo-rbc"
              cx={CAP_X0 - 20}
              cy={i % 2 ? 214 : 226}
              rx="17"
              ry="11"
              style={{ animationDelay: `${(-i * FLOW_S) / RBC_COUNT}s`, animationDuration: `${FLOW_S}s` }}
            />
          ))}
        </g>
        <text x={CAP_X1 - 12} y="268" textAnchor="end" fontSize="10" fill="#991b1b">bloedstroom →</text>
        <text x={CAP_X0 + 8} y="268" fontSize="10" fill="#7f1d1d">veneus, deoxy-Hb</text>

        {/* Evenwichtspunt */}
        <line x1={EQ_X} x2={EQ_X} y1="140" y2={CHART.bottom} stroke="#0f172a" strokeOpacity="0.35" strokeDasharray="4 4" />
        <text x={EQ_X + 6} y="150" fontSize="10" fontWeight="600" fill="#334155">evenwicht ≈ 0,25 s</text>

        {/* Profiel pO₂ / pCO₂ langs het capillair */}
        <line x1={CAP_X0} x2={CAP_X1} y1={CHART.bottom} y2={CHART.bottom} stroke="#cbd5e1" />
        <path d={profilePath(VEN_O2, ALV_O2)} fill="none" stroke="#2563eb" strokeWidth="2.5" />
        <path d={profilePath(VEN_CO2, ALV_CO2)} fill="none" stroke="#ea580c" strokeWidth="2.5" />
        <text x={CAP_X1} y={cy(ALV_O2) - 6} textAnchor="end" fontSize="10" fontWeight="600" fill="#1d4ed8">pO₂ capillair</text>
        <text x={CAP_X1} y={cy(ALV_CO2) - 6} textAnchor="end" fontSize="10" fontWeight="600" fill="#c2410c">pCO₂ capillair</text>
        <text x={CAP_X0} y={CHART.bottom + 16} fontSize="10" fill="#64748b">0 s</text>
        <text x={CAP_X1} y={CHART.bottom + 16} textAnchor="end" fontSize="10" fill="#64748b">0,75 s contacttijd</text>
        <line
          className="haemo-anim haemo-sweep"
          x1={CAP_X0 - 20}
          x2={CAP_X0 - 20}
          y1={CHART.top - 4}
          y2={CHART.bottom}
          stroke="#dc2626"
          strokeWidth="2"
          style={{ animationDuration: `${FLOW_S}s` }}
        />
      </svg>

      <div className="mt-3 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <PlayPauseButton paused={paused} onToggle={toggle} />
        <p className="flex-1 text-sm leading-relaxed text-slate-600">
          Erytrocyten kleuren van donker- naar helderrood zodra ze O₂ opnemen. Al na ongeveer
          een derde van de contacttijd is het evenwicht bereikt; de rest is reserve voor
          inspanning of een verdikt membraan. Tegelijk geeft oxy-Hb CO₂ en H⁺ af
          (Haldane-effect).
        </p>
      </div>
    </div>
  );
}
