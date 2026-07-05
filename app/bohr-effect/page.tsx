import { PageHeader } from "@/components/layout/PageHeader";
import { InfoCard } from "@/components/InfoCard";
import { BloodGasPanel } from "@/components/BloodGasPanel";
import { DissociationCurveChart } from "@/components/charts/DissociationCurveChart";
import { getParameterPresets } from "@/lib/db/presets";
import { NORMAL_VENOUS } from "@/lib/physiology/co2Transport";

export default async function BohrEffectPage() {
  const presets = await getParameterPresets();

  return (
    <>
      <PageHeader
        title="Bohr-effect"
        subtitle="In weefselcapilairen stijgt pCO₂ en daalt pH. Protonen binden aan histidine-residuen van hemoglobine → T-stand stabieler → P₅₀ stijgt → meer O₂-afgifte."
      />

      <BloodGasPanel values={NORMAL_VENOUS} variant="venous" />

      <InfoCard title="Mechanisme" accent="co2" className="mt-6">
        <ol className="list-decimal space-y-2 pl-5">
          <li>Weefselmetabolisme produceert CO₂</li>
          <li>CA: CO₂ + H₂O → H⁺ + HCO₃⁻</li>
          <li>H⁺ bindt aan β-146 histidine (en andere sites) van Hb</li>
          <li>T-stand wordt gestabiliseerd → lagere O₂-affiniteit</li>
          <li>O₂ dissociëert gemakkelijker van heem — gunstig voor weefselperfusie</li>
        </ol>
      </InfoCard>

      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold">Vergelijk long vs. weefsel</h2>
        <DissociationCurveChart presets={presets} initialPreset="normaal-weefsel" />
      </div>
    </>
  );
}
