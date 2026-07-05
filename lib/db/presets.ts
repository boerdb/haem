import "server-only";
import type mysql from "mysql2/promise";
import { getPool, isDbEnabled } from "@/lib/db/pool";
import { STATIC_PRESETS } from "@/lib/presets";
import type { ClinicalScenario, LiteratureRef, ParameterPreset } from "@/lib/types";

export const STATIC_REFERENCES: LiteratureRef[] = [
  {
    id: 1,
    citation_key: "west-2020",
    authors: "West J.B.",
    title: "Respiratory Physiology — The Essentials",
    year: 2020,
    url: null,
  },
  {
    id: 2,
    citation_key: "geers-1994",
    authors: "Geers C., Gross G.",
    title: "Carbon dioxide transport and carbonic anhydrase in blood and muscle",
    year: 1994,
    url: "https://pubmed.ncbi.nlm.nih.gov/7933611/",
  },
  {
    id: 3,
    citation_key: "dash-2004",
    authors: "Dash R.K., Bassingthwaighte J.B.",
    title: "Blood HbO₂ and HbCO₂ dissociation curves at varied O₂, CO₂, pH, 2,3-DPG and temperature",
    year: 2004,
    url: null,
  },
];

export async function getParameterPresets(): Promise<ParameterPreset[]> {
  if (!isDbEnabled()) return STATIC_PRESETS;
  try {
    const pool = getPool();
    const [rows] = await pool.query<mysql.RowDataPacket[]>(
      "SELECT id, slug, label_nl, pH, pCO2, temp_c, bpg_mmol, context, sort_order FROM parameter_presets ORDER BY sort_order",
    );
    if (!rows.length) return STATIC_PRESETS;
    return rows.map((r) => ({
      id: r.id,
      slug: r.slug,
      label_nl: r.label_nl,
      pH: Number(r.pH),
      pCO2: Number(r.pCO2),
      temp_c: Number(r.temp_c),
      bpg_mmol: Number(r.bpg_mmol),
      context: r.context as ParameterPreset["context"],
      sort_order: r.sort_order,
    }));
  } catch (err) {
    console.error("[db] getParameterPresets:", err);
    return STATIC_PRESETS;
  }
}

export async function getClinicalScenarios(): Promise<ClinicalScenario[]> {
  if (!isDbEnabled()) return [];
  try {
    const pool = getPool();
    const [rows] = await pool.query<mysql.RowDataPacket[]>(
      "SELECT id, slug, title_nl, description_nl, pH, pCO2, notes_nl FROM clinical_scenarios ORDER BY id",
    );
    return rows.map((r) => ({
      id: r.id,
      slug: r.slug,
      title_nl: r.title_nl,
      description_nl: r.description_nl,
      pH: r.pH !== null ? Number(r.pH) : null,
      pCO2: r.pCO2 !== null ? Number(r.pCO2) : null,
      notes_nl: r.notes_nl,
    }));
  } catch {
    return [];
  }
}

const STATIC_REF_BY_KEY = new Map(
  STATIC_REFERENCES.map((r) => [r.citation_key, r]),
);

export async function getLiteratureRefs(): Promise<LiteratureRef[]> {
  if (!isDbEnabled()) return STATIC_REFERENCES;
  try {
    const pool = getPool();
    const [rows] = await pool.query<mysql.RowDataPacket[]>(
      "SELECT id, citation_key, authors, title, year, url FROM references_lit ORDER BY year DESC",
    );
    if (!rows.length) return STATIC_REFERENCES;
    return rows.map((r) => {
      const canonical = STATIC_REF_BY_KEY.get(String(r.citation_key));
      return {
        id: r.id,
        citation_key: r.citation_key,
        authors: canonical?.authors ?? r.authors,
        title: canonical?.title ?? r.title,
        year: r.year,
        url: r.url ?? canonical?.url ?? null,
      };
    });
  } catch {
    return STATIC_REFERENCES;
  }
}
