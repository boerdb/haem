import type { CurveParams, CurvePoint, CurveResult } from "@/lib/types";

/** P50 bij pH 7,4 · 37 °C · pCO₂ 40 · 2,3-BPG 4,5 mmol/L */
export const BASE_P50 = 26.8;
export const HILL_N = 2.7;

export function fractionSaturation(pO2: number, P50: number, n = HILL_N): number {
  if (pO2 <= 0) return 0;
  const num = Math.pow(pO2, n);
  const den = Math.pow(P50, n) + num;
  return (num / den) * 100;
}

/** Bohr-/temperatuur-/2,3-BPG-shift op P50 (vereenvoudigd klinisch model) */
export function adjustedP50(params: CurveParams, baseP50 = BASE_P50): number {
  const { pH, pCO2, temp, bpg } = params;
  let p50 = baseP50;

  // Bohr: lagere pH → hogere P50 (curve naar rechts)
  p50 *= Math.pow(10, (7.4 - pH) * 1.15);

  // pCO₂ (mmHg)
  p50 *= 1 + (pCO2 - 40) * 0.0032;

  // Temperatuur (°C)
  p50 *= 1 + (temp - 37) * 0.012;

  // 2,3-BPG (mmol/L erytrocyt)
  p50 *= 1 + (bpg - 4.5) * 0.085;

  return Math.round(p50 * 100) / 100;
}

export function generateDissociationCurve(
  params: CurveParams,
  maxPO2 = 100,
  step = 1,
): CurveResult {
  const P50 = adjustedP50(params);
  const points: CurvePoint[] = [];

  for (let pO2 = 0; pO2 <= maxPO2; pO2 += step) {
    points.push({
      pO2,
      sO2: Math.round(fractionSaturation(pO2, P50) * 10) / 10,
    });
  }

  return { points, P50, n: HILL_N, params };
}

export function curveCacheKey(params: CurveParams): string {
  const { pH, pCO2, temp, bpg } = params;
  return `curve:${pH.toFixed(2)}:${pCO2.toFixed(1)}:${temp.toFixed(1)}:${bpg.toFixed(2)}`;
}
