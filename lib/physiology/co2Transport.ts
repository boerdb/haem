/** CO₂-transportverdeling en Cl⁻-shift (Chloride shift / Hamburger verschuiving) */

export type Co2TransportFractions = {
  bicarbonate: number;
  carbamino: number;
  dissolved: number;
};

/** Typische fracties in arterieel bloed (% van totaal CO₂-transport) */
export const ARTERIAL_CO2_FRACTIONS: Co2TransportFractions = {
  bicarbonate: 70,
  carbamino: 23,
  dissolved: 7,
};

/** In weefsel (meer carbamino door deoxy-Hb, Haldane) */
export const TISSUE_CO2_FRACTIONS: Co2TransportFractions = {
  bicarbonate: 65,
  carbamino: 28,
  dissolved: 7,
};

export type BloodGasValues = {
  pO2: number;
  pCO2: number;
  pH: number;
  sO2: number;
  label: string;
};

export const NORMAL_ARTERIAL: BloodGasValues = {
  label: "Arteriëel (a)",
  pO2: 95,
  pCO2: 40,
  pH: 7.4,
  sO2: 97,
};

export const NORMAL_VENOUS: BloodGasValues = {
  label: "Venous (v)",
  pO2: 40,
  pCO2: 46,
  pH: 7.36,
  sO2: 75,
};

export const ALVEOLAR: BloodGasValues = {
  label: "Alveolair",
  pO2: 104,
  pCO2: 40,
  pH: 7.4,
  sO2: 98,
};
