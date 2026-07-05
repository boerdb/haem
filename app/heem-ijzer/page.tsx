import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { InfoCard } from "@/components/InfoCard";
import { HemeIronDiagram } from "@/components/illustrations/HemeIronDiagram";
import { ArrowRight } from "lucide-react";

export default function HeemIjzerPage() {
  return (
    <>
      <PageHeader
        title="Heem & ijzer"
        subtitle="De heemgroep is het actieve centrum van hemoglobine: protoporfyrine IX met ferrozuur (Fe²⁺) waar O₂ reversibel bindt. Zonder intact heem–ijzer geen gas transport."
      />

      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6">
        <HemeIronDiagram />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <InfoCard title="Protoporfyrine IX" accent="o2">
          <p>
            Heem bestaat uit een tetrapyrrol-ring (protoporfyrine IX) gesynthetiseerd via
            de heem-biosyntheseroute (δ-aminolevulinezuur → porfyrinen). In volwassen
            hemoglobine is dit dezelfde porfyrine-ring als in myoglobine, cytochromen en
            peroxidase — functionele verschillen komen door het eiwit (globine) eromheen.
          </p>
        </InfoCard>

        <InfoCard title="Ferrozuur (Fe²⁺)" accent="neutral">
          <p>
            O₂ bindt aan het ferro-ion in de <strong>ferrous</strong> toestand (Fe²⁺).
            Oxidatie tot Fe³⁺ vormt <strong>methemoglobine</strong> (metHb): geen
            functionele O₂-binding. Kleine metHb-fracties worden continu teruggebracht
            door cytochrome-b₅-reductase; intoxicaties (nitriet, lokale anesthetica,
            G6PD-deficiëntie) kunnen metHb verhogen.
          </p>
        </InfoCard>

        <InfoCard title="Coordinatie & histidinen" accent="o2">
          <ul>
            <li>
              <strong>Proximale histidine (His F8):</strong> coördineert Fe²⁺ vanuit het
              globine-eiwit — fixeert heem in de subunit
            </li>
            <li>
              <strong>Distale histidine (His E7):</strong> beïnvloedt O₂-affiniteit en
              remt autoxidatie (Fe²⁺ → Fe³⁺)
            </li>
            <li>O₂ bezet de zesde coordinatiepositie loodrecht op het heemvlak</li>
          </ul>
        </InfoCard>

        <InfoCard title="Capaciteit & concurrentie" accent="co2">
          <ul>
            <li>1 heemgroep bindt maximaal <strong>1 O₂</strong></li>
            <li>Hemoglobine (α₂β₂): <strong>4 O₂</strong> per molecuul → sO₂ 0–100%</li>
            <li>
              <strong>CO</strong> bindt ~200× sterker dan O₂ → carboxyhemoglobine;
              pulse oximetrie kan misleidend zijn
            </li>
            <li>NO bindt eveneens aan heem (vasomotorische regulatie)</li>
          </ul>
        </InfoCard>

        <InfoCard title="Synthese in de erytrocytlijn" accent="neutral">
          <p>
            Volwassen erytrocyten hebben geen kern: heem- en globinesynthese vinden plaats
            in <strong>erytroblasten</strong> in het beenmerg. IJzer wordt via transferrine
            opgenomen; opgeslagen of gebruikt voor heemsynthese (mitochondriaal en
            cytosolisch). Na rijping blijft ~95% van het celvolume hemoglobine.
          </p>
        </InfoCard>

        <InfoCard title="Klinische implicaties" accent="co2">
          <ul>
            <li><strong>Ijzergebrek:</strong> minder heem → lagere [Hb] → verminderde O₂-capaciteit</li>
            <li><strong>Methemoglobinemie:</strong> functioneel heem verloren ondanks normale [Hb]</li>
            <li><strong>CO-intoxicatie:</strong> heemplaatsen bezet door CO, geen O₂-transport</li>
            <li><strong>Porfyrinen:</strong> stoornissen in heemsynthese (porfyrie) — aparte pathologie</li>
          </ul>
        </InfoCard>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/erytrocyt"
          className="inline-flex items-center gap-1 text-sm font-medium text-red-700 hover:underline"
        >
          Erytrocyt & Hb-structuur <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/theorie#heem-ijzer"
          className="inline-flex items-center gap-1 text-sm font-medium text-red-700 hover:underline"
        >
          Uitgebreide theorie heem & ijzer <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
