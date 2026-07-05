import { PageHeader } from "@/components/layout/PageHeader";
import { InfoCard } from "@/components/InfoCard";
import { BloodGasPanel } from "@/components/BloodGasPanel";
import { LungAlveolusDiagram } from "@/components/illustrations/LungAlveolusDiagram";
import { ALVEOLAR, NORMAL_ARTERIAL } from "@/lib/physiology/co2Transport";
import { formatKpaFromMmHg } from "@/lib/units";

export default function LongenPage() {
  return (
    <>
      <PageHeader
        title="Gasuitwisseling in de longen"
        subtitle="In de alveolus-capilaire eenheid diffundeert O₂ naar het bloed en CO₂ naar de alveolus. Bohr- en Haldane-effect werken samen voor efficiënte gasuitwisseling."
      />

      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6">
        <LungAlveolusDiagram />
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <BloodGasPanel values={ALVEOLAR} variant="alveolar" />
        <BloodGasPanel values={NORMAL_ARTERIAL} variant="arterial" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <InfoCard title="Alveolaire gasuitwisseling" accent="o2">
          <ul>
            <li>Diffusie over dun membraan (~0,5 µm)</li>
            <li>Driving force: alveolair pO₂ {formatKpaFromMmHg(104)} vs. capilair {formatKpaFromMmHg(40)}</li>
            <li>Transitietijd capilair ~0,75 s — voldoende voor volledige saturatie</li>
          </ul>
        </InfoCard>

        <InfoCard title="Geïntegreerde effecten" accent="co2">
          <ul>
            <li><strong>Bohr:</strong> dalende pCO₂ in longen → pH stijgt → curve links</li>
            <li><strong>Haldane:</strong> O₂-binden → CO₂/H⁺ vrijgeven</li>
            <li>Resultaat: arterieel bloed pO₂ {formatKpaFromMmHg(95)}, sO₂ ~97%, pCO₂ {formatKpaFromMmHg(40)}</li>
          </ul>
        </InfoCard>

        <InfoCard title="Ventilatie-perfusie (V/Q)" accent="neutral">
          <p>
            Regionale V/Q-mismatch kan hypoxemie veroorzaken ondanks normale
            alveolaire gaswaarden. Shunt, dead space en diffusion limitation zijn
            aparte mechanismen — buiten scope van deze module.
          </p>
        </InfoCard>

        <InfoCard title="Klinische checkpoints" accent="neutral">
          <ul>
            <li>PaO₂ / SaO₂: oxygenatie</li>
            <li>PaCO₂: ventilatie (niet perfusie)</li>
            <li>pH + pCO₂: respiratoire vs. metabolische component</li>
          </ul>
        </InfoCard>
      </div>
    </>
  );
}
