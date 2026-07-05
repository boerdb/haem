import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  TheoryCallout,
  TheoryLink,
  TheorySection,
  TheoryToc,
} from "@/components/theory/TheorySection";
import { BASE_P50, HILL_N } from "@/lib/physiology/hillEquation";
import { formatKpaFromMmHg } from "@/lib/units";
import { getLiteratureRefs } from "@/lib/db/presets";

const TOC = [
  { id: "kader", label: "Fysiologisch kader" },
  { id: "hemoglobine", label: "Hemoglobine & allosterie" },
  { id: "dissociatie", label: "Dissociatiecurve & Hill" },
  { id: "bohr", label: "Bohr-effect" },
  { id: "haldane", label: "Haldane-effect" },
  { id: "co2", label: "CO₂-transport" },
  { id: "cl-shift", label: "Chloride shift" },
  { id: "bpg", label: "2,3-BPG" },
  { id: "integratie", label: "Long–weefsel integratie" },
  { id: "kliniek", label: "Klinische correlaties" },
  { id: "literatuur", label: "Literatuur" },
];

export default async function TheoriePage() {
  const refs = await getLiteratureRefs();

  return (
    <>
      <PageHeader
        title="Theoretische achtergrond"
        subtitle="Uitgebreide fysiologische en moleculaire uitleg voor gespecialiseerde professionals — aanvulling op de interactieve modules."
      />

      <TheoryCallout>
        Deze pagina gaat dieper dan de illustraties. Drukwaarden in <strong>kPa</strong>{" "}
        (1 kPa ≈ 7,5 mmHg). Zie ook de{" "}
        <TheoryLink href="/dissociatiecurve">interactieve dissociatiecurve</TheoryLink> en{" "}
        <TheoryLink href="/appendix">appendix</TheoryLink>.
      </TheoryCallout>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px]">
        <div className="min-w-0 space-y-2">
          <TheorySection id="kader" title="1. Fysiologisch kader">
            <p>
              Gasuitwisseling berust op partiaaldrukgradiënten over membranen en op de
              chemische eigenschappen van hemoglobine (Hb). In de longen stijgt de
              O₂-partiaaldruk van venous bloed (~{formatKpaFromMmHg(40)}) naar
              arterieel (~{formatKpaFromMmHg(95)}); pCO₂ daalt van ~{formatKpaFromMmHg(46)}{" "}
              naar ~{formatKpaFromMmHg(40)}. In weefselcapilairen is het omgekeerd.
            </p>
            <p>
              Hb fungeert als coöperatieve carrier: binding van één O₂-molecuul vergemakkelijkt
              binding van het volgende (R-stand). CO₂ en H⁺ moduleren deze affiniteit
              (Bohr-effect); O₂-saturatie moduleert CO₂-binding (Haldane-effect). Samen
              optimaliseren ze O₂-levering en CO₂-eliminatie zonder dat ventilatie en perfusie
              strikt gekoppeld hoeven te zijn per capillair.
            </p>
          </TheorySection>

          <TheorySection id="hemoglobine" title="2. Hemoglobine & quaternaire allosterie">
            <p>
              Volwassen Hb is een tetrameer (α₂β₂). Elk subunit bevat een heemgroep met
              ferrozuur (Fe²⁺) dat reversibel O₂ bindt. In de <strong>T-stand</strong> (tense,
              deoxy) is de affiniteit laag; O₂-binden verschuift naar de{" "}
              <strong>R-stand</strong> (relaxed, oxy), met hoge affiniteit en verhoogde
              subunit–subunit interactie.
            </p>
            <p>
              Allosterische effectoren stabiliseren T of R:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li><strong>Protonen</strong> (Bohr): binden o.a. aan His-146β → T</li>
              <li><strong>CO₂</strong>: carbamino-binding aan N-termini → T (Bohr + Haldane)</li>
              <li><strong>2,3-BPG</strong>: bindt centrale pocket van deoxy-Hb → T</li>
              <li><strong>O₂</strong>: bindt heem → R (Haldane)</li>
            </ul>
            <p>
              Carbonic anhydrase (CA-II) in de erytrocyt katalyseert CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻.
              Zonder CA zou de uncatalyzed reactie te traag zijn voor efficiënt CO₂-transport.
            </p>
          </TheorySection>

          <TheorySection id="dissociatie" title="3. Dissociatiecurve & Hill-vergelijking">
            <p className="font-mono text-sm text-slate-800">
              sO₂ = (pO₂ⁿ / (P₅₀ⁿ + pO₂ⁿ)) × 100
            </p>
            <p>
              De sigmoïde vorm weerspiegelt coöperativiteit (n ≈ {HILL_N}). P₅₀ is het pO₂
              waarbij Hb 50% verzadigd is; standaard ~{formatKpaFromMmHg(BASE_P50)} bij pH 7,4,
              37 °C, pCO₂ ~{formatKpaFromMmHg(40)}, 2,3-BPG ~4,5 mmol/L.
            </p>
            <p>
              <strong>Curve naar rechts</strong> (hogere P₅₀): lagere O₂-affiniteit → gunstiger
              voor afgifte in weefsel. Oorzaken: acidose, hypercapnie, hyperthermie, ↑2,3-BPG.
              <br />
              <strong>Curve naar links</strong>: alkalose, hypocapnie, hypothermie, ↓2,3-BPG,
              CO-vergiftiging (CO bindt heem met zeer hoge affiniteit, verschuift curve links
              terwijl sO₂ meetwaarden misleidend kunnen lijken).
            </p>
            <p>
              Het model in deze applicatie gebruikt een empirisch Bohr-/temperatuur-/BPG-shift
              op P₅₀. Voor research-grade modellen (bijv. Dash et al.) zijn gekoppelde
              O₂–CO₂–pH-vergelijkingen nodig; zie literatuur.
            </p>
          </TheorySection>

          <TheorySection id="bohr" title="4. Bohr-effect — molecuulair & klinisch">
            <p>
              In metabolisch actief weefsel stijgt pCO₂ → via CA meer H⁺ → pH daalt. H⁺ bindt
              aan histidine- en andere zure residuen, stabiliseert T-stand, verhoogt P₅₀.
              Het resultaat: bij hetzelfde capillair pO₂ is sO₂ lager dan zonder Bohr-shift —
              dus meer O₂ wordt afgegeven aan het interstitium.
            </p>
            <p>
              De Bohr-curve (1904) beschrijft dit fenomeen empirisch; moderne interpretatie
              koppelt het aan allosterische overgangen en carbamino-vorming. In weefsel
              (~pH 7,35, pCO₂ ~{formatKpaFromMmHg(46)}) ligt P₅₀ hoger dan in longcapillairen
              (~pH 7,45, pCO₂ ~{formatKpaFromMmHg(40)}).
            </p>
            <p>
              <strong>Klinisch:</strong> bij lactaatacidose (shock, inspanning) versterkt het
              Bohr-effect de O₂-afgifte — adaptief. Bij respiratoire alkalose (hyperventilatie)
              verschuift de curve links: O₂-afgifte in weefsel kan worden bemoeilijkt.
            </p>
          </TheorySection>

          <TheorySection id="haldane" title="5. Haldane-effect — complement van Bohr">
            <p>
              Deoxy-Hb bindt CO₂ preferent als <strong>carbaminohemoglobine</strong> (CO₂ aan
              N-termini van α- en β-ketens) én bindt H⁺ sterker dan oxy-Hb. Bij oxygenatie in
              de longen: R-stand → lagere carbamino-capaciteit → CO₂ en H⁺ worden vrijgegeven
              naar plasma/alveolus.
            </p>
            <p>
              Het Haldane-effect verklaart waarom ~23% van CO₂-transport als carbamino-Hb
              relatief meer bijdraagt in venous dan arterieel bloed, en waarom O₂-therapie
              (verhoogde FiO₂) theoretisch CO₂-retentie kan beïnvloeden bij patiënten die
              sterk op hypoxic drive vertrouwen — naast ventilatoire effecten.
            </p>
            <p>
              Bohr en Haldane zijn twee kanten van één allosterisch systeem: dezelfde
              proton-/CO₂-binding die O₂-afgifte in weefsel bevordert, bevordert CO₂-opname
              daar; omgekeerd in de longen.
            </p>
          </TheorySection>

          <TheorySection id="co2" title="6. CO₂-transport — drie vormen">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-300 text-left">
                  <th className="py-2 pr-4">Vorm</th>
                  <th className="py-2 pr-4">~Fractie</th>
                  <th className="py-2">Mechanisme</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-2 pr-4">Bicarbonaat (HCO₃⁻)</td>
                  <td className="py-2 pr-4">~70%</td>
                  <td className="py-2">CA in erytrocyt; diffusie naar plasma</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-2 pr-4">Carbamino-Hb</td>
                  <td className="py-2 pr-4">~23%</td>
                  <td className="py-2">Directe CO₂-binding deoxy-Hb (Haldane)</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Opgelost</td>
                  <td className="py-2 pr-4">~7%</td>
                  <td className="py-2">Henry&apos;s wet; drijfkracht diffusie alveolus</td>
                </tr>
              </tbody>
            </table>
            <p>
              Het totale CO₂-gehalte van bloed (ml CO₂/dL) hangt af van pO₂, pCO₂ en pH —
              niet alleen van pCO₂ alleen. Daarom is de arterioveneuze CO₂-extractie niet
              constant bij variërende perfusie of hemoglobinevarianten.
            </p>
          </TheorySection>

          <TheorySection id="cl-shift" title="7. Chloride shift (Hamburger-verschuiving)">
            <p>
              Bij productie van HCO₃⁻ in de erytrocyt verlaat HCO₃⁻ de cel via het{" "}
              <strong>band 3</strong> anion-exchanger (AE1). Om electroneutraliteit te
              handhaven diffundeert Cl⁻ van plasma naar binnen. Omgekeerd in longcapillairen
              bij CO₂-eliminatie.
            </p>
            <p>
              Zonder chloride shift zou de intracellular HCO₃⁻-concentratie snel de
              evenwichtsproduct-grens van carbonic anhydrase bereiken en CO₂-transport
              afremmen. De shift vergroot de effektieve CO₂-draagcapaciteit van bloed met
              factor ~1,5–2 ten opzichte van een scenario zonder erytrocyt-Cl⁻ beweging.
            </p>
          </TheorySection>

          <TheorySection id="bpg" title="8. 2,3-Bisfofoglycerate (2,3-BPG)">
            <p>
              2,3-BPG bindt in de centrale cavity van deoxy-Hb tussen β-ketens. Hogere
              concentraties (chronische hypoxie, anemie, COPD, hoogte) verschuiven de curve
              naar rechts — lagere affiniteit als adaptatie om O₂-afgifte in weefsel te
              verbeteren ondanks lagere inspiratoire pO₂.
            </p>
            <p>
              Omgekeerd: lang bewaard bankbloed (weinig 2,3-BPG), septic shock met
              gestoorde glycolyse, of acute alkalose kunnen de curve naar links verschuiven.
              Bij transfusie van oud erytrocytconcentraat kan tijdelijk verminderde
              O₂-afgifte in weefsel optreden tot 2,3-BPG is geregenereerd (~24 uur).
            </p>
          </TheorySection>

          <TheorySection id="integratie" title="9. Geïntegreerd model long ↔ weefsel">
            <p>
              <strong>Weefselcapilair:</strong> metabole CO₂ ↑ → pH ↓ → Bohr → O₂-afgifte ↑.
              CO₂ opgenomen als HCO₃⁻ + carbamino-Hb + opgelost. Venous bloed: lagere sO₂,
              hogere pCO₂, lagere pH.
            </p>
            <p>
              <strong>Longcapilair:</strong> alveolair pO₂ ~{formatKpaFromMmHg(104)}, pCO₂ ~
              {formatKpaFromMmHg(40)}. O₂ diffundeert in bloed → Haldane → CO₂/H⁺ vrij.
              Transitietijd ~0,75 s bij normale perfusie — voldoende voor volledige
              saturatie bij normale diffusiecapaciteit.
            </p>
            <p>
              Diffusielimitatie (fibrose, emphyseem), V/Q-mismatch (embolie, COPD) en shunt
              (rechts-links) zijn aparte mechanismen die bovenstaande integratie verstoren
              zonder het underliggende Bohr/Haldane-principe te annuleren.
            </p>
          </TheorySection>

          <TheorySection id="kliniek" title="10. Klinische correlaties">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>COPD / chronische hypercapnie:</strong> compensatoire alkalose
                (renaal) + chronisch verhoogde 2,3-BPG; curve systematisch naar rechts.
              </li>
              <li>
                <strong>Metabolische acidose:</strong> sterke Bohr-shift; sO₂-curve nuttig
                naast bloedgas om O₂-transportcapaciteit te beoordelen.
              </li>
              <li>
                <strong>Hypothermie:</strong> curve naar links; minder O₂-afgifte per mmHg
                (kPa) capillair pO₂ — relevant bij ECC en ernstige hypothermie.
              </li>
              <li>
                <strong>Hb-varianten & CO:</strong> HbS, HbF, carboxyhemoglobine veranderen
                curve-vorm en P₅₀; pulse oximetrie meet niet betrouwbaar bij CO.
              </li>
              <li>
                <strong>IVC/perfusie:</strong> sO₂ en ScvO₂ interpreteren in context van
                hemoglobineconcentratie, cardiac output en Bohr/Haldane-toestand — niet
                isolé als O₂-levering.
              </li>
            </ul>
          </TheorySection>

          <TheorySection id="literatuur" title="11. Literatuur & verder lezen">
            <ul className="space-y-3">
              {refs.map((r) => (
                <li key={r.citation_key}>
                  <span className="font-medium text-slate-900">{r.authors}</span> ({r.year}).{" "}
                  <em>{r.title}</em>
                  {r.url && (
                    <>
                      {" · "}
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-700 underline"
                      >
                        PubMed
                      </a>
                    </>
                  )}
                </li>
              ))}
            </ul>
            <p className="text-sm text-slate-500">
              Aanbevolen standaardwerken: West — Respiratory Physiology; Geers & Gross —
              carbonic anhydrase en CO₂; Dash et al. — gekoppelde O₂/CO₂ dissociatie.
            </p>
          </TheorySection>
        </div>

        <TheoryToc items={TOC} />
      </div>
    </>
  );
}
