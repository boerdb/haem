import { PageHeader } from "@/components/layout/PageHeader";
import { DissociationCurveChart } from "@/components/charts/DissociationCurveChart";
import { InfoCard } from "@/components/InfoCard";
import { getParameterPresets } from "@/lib/db/presets";
import { BASE_P50, HILL_N } from "@/lib/physiology/hillEquation";
import { formatKpaFromMmHg } from "@/lib/units";

export default async function DissociatiecurvePage() {
  const presets = await getParameterPresets();

  return (
    <>
      <PageHeader
        title="Hb-O₂ dissociatiecurve"
        subtitle="Sigmoïde curve volgens de Hill-vergelijking. P₅₀, pH, pCO₂, temperatuur en 2,3-BPG bepalen de positie — het Bohr-effect in grafische vorm."
      />

      <DissociationCurveChart presets={presets} />

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <InfoCard title="Hill-vergelijking" accent="o2">
          <p className="font-mono text-xs">
            sO₂ = (pO₂ⁿ / (P₅₀ⁿ + pO₂ⁿ)) × 100
          </p>
          <p className="mt-2">
            Standaard P₅₀ = {formatKpaFromMmHg(BASE_P50)} bij pH 7,4 · n = {HILL_N}. Een hogere
            P₅₀ betekent lagere O₂-affiniteit (curve naar rechts).
          </p>
        </InfoCard>

        <InfoCard title="Klinische interpretatie" accent="neutral">
          <ul>
            <li>Curve naar <strong>rechts</strong>: Bohr-effect, hyperthermie, ↑2,3-BPG</li>
            <li>Curve naar <strong>links</strong>: alkalose, hypothermie, ↓2,3-BPG, CO-intoxicatie</li>
            <li>P₅₀ is het pO₂ (in kPa) waarbij Hb 50% verzadigd is</li>
          </ul>
        </InfoCard>
      </div>
    </>
  );
}
