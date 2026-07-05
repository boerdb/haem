import { PageHeader } from "@/components/layout/PageHeader";
import { InfoCard } from "@/components/InfoCard";
import { BloodGasPanel } from "@/components/BloodGasPanel";
import { LungAlveolusDiagram } from "@/components/illustrations/LungAlveolusDiagram";
import { DissociationCurveChart } from "@/components/charts/DissociationCurveChart";
import { getParameterPresets } from "@/lib/db/presets";
import { ALVEOLAR } from "@/lib/physiology/co2Transport";

export default async function HaldaneEffectPage() {
  const presets = await getParameterPresets();

  return (
    <>
      <PageHeader
        title="Haldane-effect"
        subtitle="Deoxyhemoglobine bindt CO₂ (carbamino-vorm) en H⁺ beter dan oxyhemoglobine. Bij oxygenatie in de longen worden CO₂ en protonen vrijgegeven — complementair aan het Bohr-effect."
      />

      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6">
        <LungAlveolusDiagram />
      </div>

      <BloodGasPanel values={ALVEOLAR} variant="alveolar" />

      <InfoCard title="Carbamino-hemoglobine" accent="co2" className="mt-6">
        <p>
          CO₂ bindt direct aan de N-terminus van α- en β-ketens van deoxy-Hb, niet aan
          heem. Na O₂-binden (R-stand) neemt carbamino-binding af → CO₂ diffundeert
          naar de alveolus (~23% van totaal CO₂-transport).
        </p>
      </InfoCard>

      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold">Longcapilair — curve naar links</h2>
        <DissociationCurveChart presets={presets} initialPreset="normaal-long" />
      </div>
    </>
  );
}
