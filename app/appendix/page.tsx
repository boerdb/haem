import { PageHeader } from "@/components/layout/PageHeader";
import { InfoCard } from "@/components/InfoCard";
import { getLiteratureRefs } from "@/lib/db/presets";
import { BASE_P50, HILL_N } from "@/lib/physiology/hillEquation";
import { formatKpaFromMmHg } from "@/lib/units";

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

        <InfoCard title="P₅₀-shift (vereenvoudigd model)" accent="neutral">
          <ul>
            <li>pH: 10^((7,4 − pH) × 1,15) multiplicatief op P₅₀</li>
            <li>pCO₂: +0,32% per kPa boven ~5,3 kPa (40 mmHg)</li>
            <li>Temperatuur: +1,2% per °C boven 37</li>
            <li>2,3-BPG: +8,5% per mmol/L boven 4,5</li>
          </ul>
        </InfoCard>

        <InfoCard title="Normale bloedgaswaarden" accent="neutral">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-2">Parameter</th>
                <th>Arteriëel</th>
                <th>Venous</th>
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
                <span className="font-medium">{r.authors}</span> ({r.year}).{" "}
                <em>{r.title}</em>
                {r.url && (
                  <>
                    {" "}
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 underline"
                    >
                      link
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
