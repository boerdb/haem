import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { InfoCard } from "@/components/InfoCard";
import { TheoryLink } from "@/components/theory/TheorySection";
import { getLiteratureRefs } from "@/lib/db/presets";
import { doiUrl } from "@/lib/literature";
import { BASE_P50, HILL_N } from "@/lib/physiology/hillEquation";
import { formatKpaFromMmHg } from "@/lib/units";

export const metadata: Metadata = {
  title: "Appendix — formules & literatuur",
  description:
    "Referentiewaarden, vergelijkingen en bronnen voor verdere lectuur.",
};

export default async function AppendixPage() {
  const refs = await getLiteratureRefs();

  return (
    <>
      <PageHeader
        title="Appendix — formules & literatuur"
        subtitle="Referentiewaarden, vergelijkingen en bronnen voor verdere lectuur."
      />

      <div className="grid gap-4">
        <InfoCard title="Hill-vergelijking" accent="o2">
          <p className="font-mono text-sm">sO₂ = (pO₂ⁿ / (P₅₀ⁿ + pO₂ⁿ)) × 100</p>
          <p className="mt-2">n = {HILL_N}, P₅₀ (standaard) = {formatKpaFromMmHg(BASE_P50)}</p>
        </InfoCard>

        <InfoCard title="P₅₀-shift (vereenvoudigd model in deze app)" accent="neutral">
          <ul>
            <li>pH: × 10^((7,4 − pH) × 1,15)</li>
            <li>pCO₂: +2,4% per kPa boven 5,3 kPa (0,32% per mmHg boven 40 mmHg)</li>
            <li>Temperatuur: +1,2% per °C boven 37</li>
            <li>2,3-BPG: +8,5% per mmol/L boven 4,5</li>
          </ul>
        </InfoCard>

        <InfoCard title="Bedside-formules" accent="o2">
          <ul className="font-mono text-sm">
            <li>CaO₂ (mmol/L) = Hb (mmol/L) × SaO₂ + 0,01 × PaO₂ (kPa)</li>
            <li>DO₂ (mmol/min) = CO (L/min) × CaO₂</li>
            <li>O₂ER = VO₂ / DO₂ · SvO₂ ≈ SaO₂ × (1 − O₂ER)</li>
            <li>PAO₂ = FiO₂ × (101,3 − 6,3) − PaCO₂ / 0,8 (kPa)</li>
            <li>1 mmol O₂ = 22,4 ml · Hb g/dL = mmol/L × 1,611</li>
          </ul>
          <p className="mt-2 text-sm">
            Toelichting en rekenvoorbeelden: <TheoryLink href="/theorie#levering">theorie § 10–12</TheoryLink>.
          </p>
        </InfoCard>

        <InfoCard title="Normale bloedgaswaarden" accent="neutral">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-2">Parameter</th>
                <th>Arterieel</th>
                <th>Gemengd veneus</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              <tr><td className="py-1">pO₂</td><td>{formatKpaFromMmHg(95)}</td><td>{formatKpaFromMmHg(40)}</td></tr>
              <tr><td className="py-1">pCO₂</td><td>{formatKpaFromMmHg(40)}</td><td>{formatKpaFromMmHg(46)}</td></tr>
              <tr><td className="py-1">pH</td><td>~7,40</td><td>~7,36</td></tr>
              <tr><td className="py-1">sO₂</td><td>~97%</td><td>~75%</td></tr>
            </tbody>
          </table>
        </InfoCard>

        <InfoCard title="Literatuur" accent="neutral">
          <ul className="space-y-3">
            {refs.map((r) => (
              <li key={r.citation_key}>
                <span className="font-medium">{r.authors}</span> {r.title}.{" "}
                {r.journal && <em>{r.journal}.</em>}
                {r.pmid && r.url && (
                  <>
                    {" "}
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-red-600 underline">
                      PubMed
                    </a>
                  </>
                )}
                {r.doi && (
                  <>
                    {r.pmid ? " · " : " "}
                    <a href={doiUrl(r.doi)} target="_blank" rel="noopener noreferrer" className="text-red-600 underline">
                      DOI
                    </a>
                  </>
                )}
              </li>
            ))}
          </ul>
        </InfoCard>
      </div>
    </>
  );
}
