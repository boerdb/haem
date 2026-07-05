import { PageHeader } from "@/components/layout/PageHeader";
import { InfoCard } from "@/components/InfoCard";
import { ClShiftDiagram } from "@/components/illustrations/ClShiftDiagram";
import {
  ARTERIAL_CO2_FRACTIONS,
  TISSUE_CO2_FRACTIONS,
} from "@/lib/physiology/co2Transport";

function FractionBar({
  label,
  fractions,
}: {
  label: string;
  fractions: typeof ARTERIAL_CO2_FRACTIONS;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <p className="mb-3 text-sm font-semibold text-slate-800">{label}</p>
      <div className="flex h-8 overflow-hidden rounded-md text-xs font-medium text-white">
        <div
          className="flex items-center justify-center bg-orange-500"
          style={{ width: `${fractions.bicarbonate}%` }}
        >
          HCO₃⁻ {fractions.bicarbonate}%
        </div>
        <div
          className="flex items-center justify-center bg-red-600"
          style={{ width: `${fractions.carbamino}%` }}
        >
          Carb. {fractions.carbamino}%
        </div>
        <div
          className="flex items-center justify-center bg-slate-500"
          style={{ width: `${fractions.dissolved}%` }}
        >
          {fractions.dissolved}%
        </div>
      </div>
    </div>
  );
}

export default function Co2TransportPage() {
  return (
    <>
      <PageHeader
        title="CO₂-transport in bloed"
        subtitle="Drie transportvormen: bicarbonaat (~70%), carbamino-hemoglobine (~23%) en opgelost CO₂ (~7%). De chloride shift maakt massale HCO₃⁻-export mogelijk."
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <FractionBar label="Arteriëel bloed" fractions={ARTERIAL_CO2_FRACTIONS} />
        <FractionBar label="Weefsel / venous" fractions={TISSUE_CO2_FRACTIONS} />
      </div>

      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6">
        <ClShiftDiagram />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <InfoCard title="Bicarbonaat (~70%)" accent="co2">
          <p>
            CO₂ + H₂O → H₂CO₃ → H⁺ + HCO₃⁻ (CA). HCO₃⁻ verlaat de erytrocyt via
            band-3 anion exchanger; Cl⁻ diffundeert naar binnen (Hamburger-verschuiving).
          </p>
        </InfoCard>

        <InfoCard title="Carbamino-Hb (~23%)" accent="co2">
          <p>
            Directe binding van CO₂ aan deoxy-Hb. Sterker Haldane-effect: meer carbamino
            in venous bloed, minder na oxygenatie in de longen.
          </p>
        </InfoCard>

        <InfoCard title="Opgelost (~7%)" accent="neutral">
          <p>
            Fysische oplosbaarheid volgens Henry&apos;s wet. Relatief klein aandeel,
            maar bepaalt de drijfkracht voor diffusie over alveolair membraan.
          </p>
        </InfoCard>

        <InfoCard title="Carbonic anhydrase — essentieel" accent="co2">
          <p>
            Zonder CA zou de uncatalyzed reactie te langzaam zijn. CA in erytrocyten
            (CA-II) verhoogt de omzettingssnelheid ~10.000×.
          </p>
        </InfoCard>
      </div>
    </>
  );
}
