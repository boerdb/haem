export type CurvePoint = {
  pO2: number;
  sO2: number;
};

export type CurveParams = {
  pH: number;
  pCO2: number;
  temp: number;
  bpg: number;
};

export type CurveResult = {
  points: CurvePoint[];
  P50: number;
  n: number;
  params: CurveParams;
};

export type ParameterPreset = {
  id: number;
  slug: string;
  label_nl: string;
  pH: number;
  pCO2: number;
  temp_c: number;
  bpg_mmol: number;
  context: "long" | "weefsel" | "normaal";
  sort_order: number;
};

export type ClinicalScenario = {
  id: number;
  slug: string;
  title_nl: string;
  description_nl: string | null;
  pH: number | null;
  pCO2: number | null;
  notes_nl: string | null;
};

export type LiteratureRef = {
  id: number;
  citation_key: string;
  authors: string;
  title: string;
  year: number;
  url: string | null;
};
