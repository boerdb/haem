"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { useMotionValueEvent, useReducedMotion, useSpring } from "framer-motion";
import type { ParameterPreset } from "@/lib/types";
import {
  adjustedP50,
  BASE_P50,
  fractionSaturation,
} from "@/lib/physiology/hillEquation";
import {
  formatKpaValue,
  kpaToMmHg,
  mmHgToKpa,
  PCO2_KPA_MAX,
  PCO2_KPA_MIN,
} from "@/lib/units";

type Props = {
  presets?: ParameterPreset[];
  initialPreset?: string;
};

const X_MAX_KPA = 14;

// Grafiekgeometrie (SVG-eenheden). Smal formaat voor telefoons: minder breed,
// dus de tekst wordt relatief groter weergegeven.
function makeGeom(W: number, H: number) {
  const M = { top: 16, right: 20, bottom: 48, left: 56 };
  const PW = W - M.left - M.right;
  const PH = H - M.top - M.bottom;
  return {
    W,
    H,
    M,
    PW,
    PH,
    sx: (kpa: number) => M.left + (kpa / X_MAX_KPA) * PW,
    sy: (s: number) => M.top + (1 - s / 100) * PH,
  };
}
type Geom = ReturnType<typeof makeGeom>;
const WIDE = makeGeom(640, 340);
const NARROW = makeGeom(420, 360);

const NARROW_QUERY = "(max-width: 639px)";
function subscribeNarrow(onChange: () => void) {
  const mq = window.matchMedia(NARROW_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** Typische pO₂ in weefselcapillair (gemengd veneus) en arterieel bloed */
const VENOUS_KPA = 5.3;
const ARTERIAL_KPA = 13.3;

const sat = (kpa: number, p50MmHg: number) => fractionSaturation(kpaToMmHg(kpa), p50MmHg);

function curvePath({ sx, sy }: Geom, p50MmHg: number): string {
  let d = "";
  for (let i = 0; i <= 140; i++) {
    const kpa = (i / 140) * X_MAX_KPA;
    d += `${i === 0 ? "M" : "L"}${sx(kpa).toFixed(1)},${sy(sat(kpa, p50MmHg)).toFixed(1)}`;
  }
  return d;
}

const fmt = (n: number, d = 1) => n.toFixed(d).replace(".", ",");

export function DissociationCurveChart({
  presets = [],
  initialPreset = "normaal-long",
}: Props) {
  const preset = presets.find((p) => p.slug === initialPreset) ?? presets[0];
  const [pH, setPH] = useState(preset?.pH ?? 7.4);
  const [pCO2Kpa, setPCO2Kpa] = useState(formatKpaValue(preset?.pCO2 ?? 40, 2));
  const [temp, setTemp] = useState(preset?.temp_c ?? 37);
  const [bpg, setBpg] = useState(preset?.bpg_mmol ?? 4.5);
  const [compareP50, setCompareP50] = useState<number | null>(null);
  const [hoverKpa, setHoverKpa] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const reduceMotion = useReducedMotion();
  const narrow = useSyncExternalStore(
    subscribeNarrow,
    () => window.matchMedia(NARROW_QUERY).matches,
    () => false,
  );
  const G = narrow ? NARROW : WIDE;
  const { W, H, M, PW, PH, sx, sy } = G;

  const targetP50 = useMemo(
    () => adjustedP50({ pH, pCO2: kpaToMmHg(pCO2Kpa), temp, bpg }),
    [pH, pCO2Kpa, temp, bpg],
  );

  // P₅₀ veert naar de nieuwe waarde — de curve morpht mee.
  const p50Spring = useSpring(targetP50, { stiffness: 140, damping: 22 });
  const [p50, setP50] = useState(targetP50);
  useMotionValueEvent(p50Spring, "change", setP50);
  useEffect(() => {
    if (reduceMotion) p50Spring.jump(targetP50);
    else p50Spring.set(targetP50);
  }, [targetP50, reduceMotion, p50Spring]);

  const applyPreset = (slug: string) => {
    const p = presets.find((x) => x.slug === slug);
    if (!p) return;
    setPH(p.pH);
    setPCO2Kpa(formatKpaValue(p.pCO2, 2));
    setTemp(p.temp_c);
    setBpg(p.bpg_mmol);
  };

  const p50Kpa = mmHgToKpa(p50);
  const shift = targetP50 - BASE_P50;
  const shiftLabel =
    Math.abs(shift) < 0.3
      ? "normale positie"
      : shift > 0
        ? "rechtsverschuiving — lagere O₂-affiniteit"
        : "linksverschuiving — hogere O₂-affiniteit";

  const satArt = sat(ARTERIAL_KPA, p50);
  const satVen = sat(VENOUS_KPA, p50);

  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * W;
    const kpa = ((x - M.left) / PW) * X_MAX_KPA;
    setHoverKpa(kpa >= 0 && kpa <= X_MAX_KPA ? kpa : null);
  };

  return (
    <div className="space-y-6">
      {presets.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => applyPreset(p.slug)}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 hover:border-red-300 hover:bg-red-50"
            >
              {p.label_nl}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Slider label="pH" value={pH} min={7.0} max={7.6} step={0.01} onChange={setPH} />
        <Slider
          label="pCO₂ (kPa)"
          value={pCO2Kpa}
          min={PCO2_KPA_MIN}
          max={PCO2_KPA_MAX}
          step={0.1}
          onChange={setPCO2Kpa}
          format={(v) => `${v.toFixed(1)} kPa`}
        />
        <Slider label="Temperatuur (°C)" value={temp} min={34} max={42} step={0.5} onChange={setTemp} />
        <Slider label="2,3-BPG (mmol/L)" value={bpg} min={2} max={8} step={0.1} onChange={setBpg} />
      </div>

      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="rounded-md bg-slate-100 px-2 py-1 font-mono">
          P₅₀ = {fmt(p50Kpa, 2)} kPa
        </span>
        <span
          className={
            Math.abs(shift) < 0.3
              ? "text-slate-500"
              : shift > 0
                ? "font-medium text-orange-700"
                : "font-medium text-blue-700"
          }
        >
          {shiftLabel}
        </span>
        <span className="flex-1" />
        <button
          type="button"
          className="rounded-md border border-slate-200 px-3 py-1 hover:bg-slate-50"
          onClick={() => setCompareP50(targetP50)}
        >
          Referentiecurve vastzetten
        </button>
        {compareP50 !== null && (
          <button
            type="button"
            className="text-slate-500 underline"
            onClick={() => setCompareP50(null)}
          >
            Referentie wissen
          </button>
        )}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-2 sm:p-4">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full touch-none select-none"
          role="img"
          aria-label={`Hb-O₂ dissociatiecurve, P₅₀ ${fmt(p50Kpa, 2)} kPa, ${shiftLabel}`}
          onPointerMove={onPointerMove}
          onPointerLeave={() => setHoverKpa(null)}
        >
          {/* Raster en assen */}
          {[0, 20, 40, 60, 80, 100].map((s) => (
            <g key={`y${s}`}>
              <line x1={M.left} x2={W - M.right} y1={sy(s)} y2={sy(s)} stroke="#e2e8f0" strokeDasharray={s === 0 ? undefined : "3 3"} />
              <text x={M.left - 8} y={sy(s) + 4} textAnchor="end" fontSize="14" fill="#64748b">{s}</text>
            </g>
          ))}
          {[0, 2, 4, 6, 8, 10, 12, 14].map((k) => (
            <g key={`x${k}`}>
              <line x1={sx(k)} x2={sx(k)} y1={M.top} y2={H - M.bottom} stroke="#f1f5f9" />
              <text x={sx(k)} y={H - M.bottom + 18} textAnchor="middle" fontSize="14" fill="#64748b">{k}</text>
            </g>
          ))}
          <text x={M.left + PW / 2} y={H - 6} textAnchor="middle" fontSize="15" fill="#334155">pO₂ (kPa)</text>
          <text transform={`translate(14 ${M.top + PH / 2}) rotate(-90)`} textAnchor="middle" fontSize="15" fill="#334155">sO₂ (%)</text>

          {/* Weefsel- en longzone */}
          <rect x={sx(2.5)} y={M.top} width={sx(VENOUS_KPA + 0.8) - sx(2.5)} height={PH} fill="#fff7ed" opacity="0.8" />
          <text x={sx(4.2)} y={H - M.bottom - 8} textAnchor="middle" fontSize="13" fill="#c2410c">weefsel</text>
          <rect x={sx(11.5)} y={M.top} width={sx(X_MAX_KPA) - sx(11.5)} height={PH} fill="#eff6ff" opacity="0.8" />
          <text x={sx(12.75)} y={H - M.bottom - 8} textAnchor="middle" fontSize="13" fill="#1d4ed8">long</text>

          {/* Normale curve als schaduw */}
          <path d={curvePath(G, BASE_P50)} fill="none" stroke="#cbd5e1" strokeWidth="2" />
          {compareP50 !== null && (
            <path d={curvePath(G, compareP50)} fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="6 4" />
          )}

          {/* P₅₀-hulplijnen */}
          <polyline
            points={`${sx(0)},${sy(50)} ${sx(p50Kpa)},${sy(50)} ${sx(p50Kpa)},${sy(0)}`}
            fill="none"
            stroke="#94a3b8"
            strokeDasharray="4 4"
          />
          <text x={M.left + 6} y={sy(50) - 6} fontSize="13" fill="#475569">P₅₀</text>

          {/* O₂-extractie tussen long en weefsel */}
          <line x1={sx(VENOUS_KPA)} x2={sx(ARTERIAL_KPA)} y1={sy(satVen)} y2={sy(satVen)} stroke="#a855f7" strokeDasharray="2 3" />
          <line x1={sx(ARTERIAL_KPA)} x2={sx(ARTERIAL_KPA)} y1={sy(satVen)} y2={sy(satArt)} stroke="#a855f7" strokeWidth="2" />
          <text x={sx(ARTERIAL_KPA) - 6} y={(sy(satVen) + sy(satArt)) / 2 + 4} textAnchor="end" fontSize="13" fontWeight="600" fill="#7e22ce">
            O₂-afgifte {fmt(satArt - satVen, 0)}%
          </text>

          {/* Huidige curve */}
          <path d={curvePath(G, p50)} fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />

          <circle cx={sx(p50Kpa)} cy={sy(50)} r="5" fill="#dc2626" stroke="white" strokeWidth="2" />
          <Marker g={G} kpa={VENOUS_KPA} s={satVen} color="#ea580c" label="veneus" />
          <Marker g={G} kpa={ARTERIAL_KPA} s={satArt} color="#2563eb" label="arterieel" above />

          {/* Hover-uitlezing */}
          {hoverKpa !== null && (
            <g pointerEvents="none">
              <line x1={sx(hoverKpa)} x2={sx(hoverKpa)} y1={M.top} y2={H - M.bottom} stroke="#0f172a" strokeOpacity="0.25" />
              <circle cx={sx(hoverKpa)} cy={sy(sat(hoverKpa, p50))} r="4" fill="#0f172a" />
              <g transform={`translate(${Math.min(sx(hoverKpa) + 10, W - M.right - 146)} ${M.top + 28})`}>
                <rect width="146" height="48" rx="6" fill="#0f172a" opacity="0.9" />
                <text x="10" y="19" fontSize="13" fill="#cbd5e1">pO₂ {fmt(hoverKpa)} kPa</text>
                <text x="10" y="38" fontSize="14" fontWeight="600" fill="white">sO₂ {fmt(sat(hoverKpa, p50))}%</text>
              </g>
            </g>
          )}
        </svg>

        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 px-2 text-xs text-slate-600">
          <Legend color="#dc2626" label="Huidige curve" />
          <Legend color="#cbd5e1" label="Normaal (pH 7,40 · 37 °C)" />
          {compareP50 !== null && <Legend color="#64748b" label="Referentie" dashed />}
          <Legend color="#a855f7" label="O₂-afgifte long → weefsel" />
        </div>
      </div>
    </div>
  );
}

function Marker({
  g: { sx, sy },
  kpa,
  s,
  color,
  label,
  above = false,
}: {
  g: Geom;
  kpa: number;
  s: number;
  color: string;
  label: string;
  above?: boolean;
}) {
  return (
    <g>
      <circle cx={sx(kpa)} cy={sy(s)} r="5.5" fill={color} stroke="white" strokeWidth="2" />
      <text
        x={sx(kpa) + (above ? -4 : 8)}
        y={sy(s) + (above ? -12 : 16)}
        textAnchor={above ? "end" : "start"}
        fontSize="13"
        fontWeight="600"
        fill={color}
      >
        {label} {fmt(s, 0)}%
      </text>
    </g>
  );
}

function Legend({ color, label, dashed }: { color: string; label: string; dashed?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <svg width="18" height="6" aria-hidden>
        <line x1="0" x2="18" y1="3" y2="3" stroke={color} strokeWidth="3" strokeDasharray={dashed ? "4 3" : undefined} />
      </svg>
      {label}
    </span>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
}) {
  return (
    <label className="block rounded-lg border border-slate-200 bg-white p-3">
      <span className="mb-1 block text-xs font-medium text-slate-600">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-red-600"
      />
      <span className="mt-1 block font-mono text-sm font-semibold">
        {format ? format(value) : value}
      </span>
    </label>
  );
}
