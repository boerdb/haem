import "server-only";
import type mysql from "mysql2/promise";
import { getPool, isDbEnabled } from "@/lib/db/pool";
import { STATIC_PRESETS } from "@/lib/presets";
import { STATIC_REFERENCES } from "@/lib/literature";
import type { ClinicalScenario, LiteratureRef, ParameterPreset } from "@/lib/types";

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

/** Literatuur uit de database; de canonieke lijst in lib/literature.ts wint bij bekende sleutels. */
export async function getLiteratureRefs(): Promise<LiteratureRef[]> {
  if (!isDbEnabled()) return STATIC_REFERENCES;
  try {
    const pool = getPool();
    const [rows] = await pool.query<mysql.RowDataPacket[]>("SELECT * FROM references_lit");
    const byKey = new Map(STATIC_REFERENCES.map((r) => [r.citation_key, r]));
    for (const r of rows) {
      const key = String(r.citation_key);
      if (STATIC_REF_BY_KEY.has(key)) continue;
      byKey.set(key, {
        id: r.id,
        citation_key: key,
        authors: r.authors,
        title: r.title,
        journal: r.journal ?? null,
        year: r.year,
        doi: r.doi ?? null,
        pmid: r.pmid ?? null,
        url: r.url ?? null,
      });
    }
    return [...byKey.values()].sort((a, b) => a.year - b.year);
  } catch {
    return STATIC_REFERENCES;
  }
}
