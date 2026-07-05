import { PageHeader } from "@/components/layout/PageHeader";
import { InfoCard } from "@/components/InfoCard";
import { ErythrocyteCrossSection } from "@/components/illustrations/ErythrocyteCrossSection";

export default function ErytrocytPage() {
  return (
    <>
      <PageHeader
        title="Hemoglobine in de erytrocyt"
        subtitle="De erytrocyt is geoptimaliseerd voor gas transport: hemoglobine bindt O₂ coöperatief, carbonic anhydrase katalyseert CO₂-hydratatie, en 2,3-BPG moduleert de affiniteit."
      />

      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6">
        <ErythrocyteCrossSection />
      </div>

      <InfoCard title="Heem & ijzer — het actieve centrum" accent="o2" className="mb-6">
        <p>
          Elke globine-subunit bevat één <strong>heemgroep</strong>: protoporfyrine IX met
          centraal <strong>ferrozuur (Fe²⁺)</strong>. O₂ bindt aan Fe²⁺; oxidatie tot Fe³⁺
          (methemoglobine) maakt O₂-binding onmogelijk.{" "}
          <a href="/heem-ijzer" className="font-medium text-red-700 underline">
            Uitgebreide module heem & ijzer →
          </a>
        </p>
      </InfoCard>

      <div className="grid gap-4 lg:grid-cols-2">
        <InfoCard title="Quaternaire structuur (α₂β₂)" accent="o2">
          <p>
            Hemoglobine bestaat uit vier subunits, elk met een heemgroep en Fe²⁺. In
            deoxy-stand (T) is de affiniteit voor O₂ laag; bij oxy-stand (R) stijgt
            de affiniteit coöperatief — de sigmoïde dissociatiecurve.
          </p>
        </InfoCard>

        <InfoCard title="2,3-Bisfofoglycerate (2,3-BPG)" accent="neutral">
          <p>
            2,3-BPG bindt in de centrale pocket van deoxy-Hb en stabiliseert de
            T-stand. Hogere concentraties (anemie, hypoxie, COPD) verschuiven de curve
            naar rechts → lagere O₂-affiniteit.
          </p>
        </InfoCard>

        <InfoCard title="Carbonic anhydrase (CA)" accent="co2">
          <p>
            CA katalyseert CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻ binnen de erytrocyt.
            HCO₃⁻ diffundeert naar het plasma; dit is de belangrijkste route voor
            CO₂-transport (~70%).
          </p>
        </InfoCard>

        <InfoCard title="T-stand vs. R-stand" accent="o2">
          <ul>
            <li><strong>T (tense):</strong> deoxy, lage O₂-affiniteit, gunstig voor afgifte</li>
            <li><strong>R (relaxed):</strong> oxy, hoge O₂-affiniteit, gunstig voor binding in longen</li>
            <li>H⁺, CO₂ en 2,3-BPG stabiliseren T; O₂-binden verschuift naar R</li>
          </ul>
        </InfoCard>
      </div>
    </>
  );
}
