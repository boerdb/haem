/** Omrekening druk: 1 mmHg = 101,325/760 kPa (SI) */
export const MMHG_TO_KPA = 101.325 / 760;

export function mmHgToKpa(mmHg: number): number {
  return mmHg * MMHG_TO_KPA;
}

export function kpaToMmHg(kpa: number): number {
  return kpa / MMHG_TO_KPA;
}

/** Toon mmHg-waarde (intern) als kPa-string */
export function formatKpaFromMmHg(mmHg: number, decimals = 1): string {
  return `${mmHgToKpa(mmHg).toFixed(decimals)} kPa`;
}

export function formatKpaValue(mmHg: number, decimals = 1): number {
  return Number(mmHgToKpa(mmHg).toFixed(decimals));
}

/** pCO₂-sliderbereik in kPa (equivalent 20–80 mmHg) */
export const PCO2_KPA_MIN = formatKpaValue(20, 2);
export const PCO2_KPA_MAX = formatKpaValue(80, 2);
