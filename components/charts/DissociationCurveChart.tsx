"use client";

import { useCallback, useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { CurvePoint, ParameterPreset } from "@/lib/types";
import {
  formatKpaFromMmHg,
  formatKpaValue,
  kpaToMmHg,
  PCO2_KPA_MAX,
  PCO2_KPA_MIN,
} from "@/lib/units";

type CurveData = {
  points: CurvePoint[];
  P50: number;
  params: { pH: number; pCO2: number; temp: number; bpg: number };
};

type Props = {
  presets?: ParameterPreset[];
  initialPreset?: string;
};

export function DissociationCurveChart({
  presets = [],
  initialPreset = "normaal-long",
}: Props) {
  const preset = presets.find((p) => p.slug === initialPreset) ?? presets[0];
  const [pH, setPH] = useState(preset?.pH ?? 7.4);
  const [pCO2Kpa, setPCO2Kpa] = useState(formatKpaValue(preset?.pCO2 ?? 40, 2));
  const [temp, setTemp] = useState(preset?.temp_c ?? 37);
  const [bpg, setBpg] = useState(preset?.bpg_mmol ?? 4.5);
  const [compare, setCompare] = useState<CurveData | null>(null);
  const [curve, setCurve] = useState<CurveData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCurve = useCallback(async (params: Record<string, number>) => {
    const qs = new URLSearchParams(
      Object.entries(params).map(([k, v]) => [k, String(v)]),
    );
    const res = await fetch(`/api/physiology/dissociation-curve?${qs}`);
    return (await res.json()) as CurveData;
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const pCO2 = kpaToMmHg(pCO2Kpa);
    fetchCurve({ pH, pCO2, temp, bpg })
      .then((data) => {
        if (!cancelled) setCurve(data);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [pH, pCO2Kpa, temp, bpg, fetchCurve]);

  const applyPreset = (slug: string) => {
    const p = presets.find((x) => x.slug === slug);
    if (!p) return;
    setPH(p.pH);
    setPCO2Kpa(formatKpaValue(p.pCO2, 2));
    setTemp(p.temp_c);
    setBpg(p.bpg_mmol);
  };

  const chartData =
    curve?.points.map((p, i) => ({
      pO2Kpa: formatKpaValue(p.pO2, 2),
      sO2: p.sO2,
      compare: compare?.points[i]?.sO2,
    })) ?? [];

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
        {curve && (
          <span className="rounded-md bg-slate-100 px-2 py-1 font-mono">
            P₅₀ = {formatKpaFromMmHg(curve.P50)}
          </span>
        )}
        <button
          type="button"
          className="rounded-md border border-slate-200 px-3 py-1 hover:bg-slate-50"
          onClick={() => curve && setCompare(curve)}
        >
          Referentiecurve vastzetten
        </button>
        {compare && (
          <button
            type="button"
            className="text-slate-500 underline"
            onClick={() => setCompare(null)}
          >
            Referentie wissen
          </button>
        )}
        {loading && <span className="text-slate-400">Berekenen…</span>}
      </div>

      <div className="h-80 w-full rounded-xl border border-slate-200 bg-white p-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="pO2Kpa"
              label={{ value: "pO₂ (kPa)", position: "insideBottom", offset: -2 }}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              domain={[0, 100]}
              label={{ value: "sO₂ (%)", angle: -90, position: "insideLeft" }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(v) => [`${Number(v).toFixed(1)}%`, "sO₂"]}
              labelFormatter={(l) => `pO₂ ${l} kPa`}
            />
            <Legend />
            {curve && (
              <ReferenceLine
                x={formatKpaValue(curve.P50, 2)}
                stroke="#94a3b8"
                strokeDasharray="4 4"
                label={{ value: "P₅₀", position: "top", fontSize: 11 }}
              />
            )}
            <Line
              type="monotone"
              dataKey="sO2"
              name="Huidige curve"
              stroke="#dc2626"
              strokeWidth={2.5}
              dot={false}
            />
            {compare && (
              <Line
                type="monotone"
                dataKey="compare"
                name="Referentie"
                stroke="#64748b"
                strokeWidth={2}
                strokeDasharray="6 4"
                dot={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
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
