import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  Cite as CiteBase,
  Deepening,
  Formula,
  RefTable,
  TheoryBox,
  TheoryCallout,
  TheoryLink,
  TheorySection,
  TheorySubheading,
  TheoryToc,
  TheoryTocMobile,
} from "@/components/theory/TheorySection";
import { BASE_P50, HILL_N } from "@/lib/physiology/hillEquation";
import { mmHgToKpa } from "@/lib/units";
import { getLiteratureRefs } from "@/lib/db/presets";
import { doiUrl } from "@/lib/literature";

export const metadata: Metadata = {
  title: "Theoretische achtergrond",
  description:
    "Diepgaande fysiologie van O₂- en CO₂-transport voor de intensive care: allosterie, Bohr- en Haldane-effect, O₂-levering, Pv–aCO₂, dyshemoglobines en temperatuur.",
};

const REVIEWED = "16 oktober 2026";

const TOC = [
  { id: "kader", label: "Fysiologisch kader" },
  { id: "heem-ijzer", label: "Heem & ijzer" },
  { id: "hemoglobine", label: "Hemoglobine & allosterie" },
  { id: "dissociatie", label: "Dissociatiecurve" },
  { id: "bohr", label: "Bohr-effect" },
  { id: "haldane", label: "Haldane-effect" },
  { id: "co2", label: "CO₂-transport" },
  { id: "cl-shift", label: "Chloride shift" },
  { id: "bpg", label: "2,3-BPG & HbF" },
  { id: "levering", label: "O₂-gehalte, -levering, -extractie" },
  { id: "oxygenatie", label: "Alveolaire gasvergelijking" },
  { id: "pvaco2", label: "Pv–aCO₂ & CO₂-variabelen" },
  { id: "dyshb", label: "Dyshemoglobines & oximetrie" },
  { id: "temperatuur", label: "Temperatuur & α-stat" },
  { id: "integratie", label: "Long–weefsel integratie" },
  { id: "kliniek", label: "Klinische correlaties" },
  { id: "literatuur", label: "Literatuur" },
];

/** Volgorde van eerste vermelding in de tekst = bronnummer. */
const ORDER = [
  "west-2020",
  "perutz-1970",
  "wright-1999",
  "jensen-2004",
  "mwc-1965",
  "severinghaus-1979",
  "dash-2004",
  "bohr-1904",
  "aubier-1980",
  "abdo-2012",
  "geers-2000",
  "benesch-1967",
  "scott-2016",
  "ards-2012",
  "mallat-2016",
  "mallat-2025",
  "sjoding-2020",
  "weaver-2002",
];

const Cite = ({ k }: { k: string | string[] }) => <CiteBase k={k} order={ORDER} />;

const dec = (v: number, d = 1) => v.toFixed(d).replace(".", ",");
/** Druk in kPa met mmHg tussen haakjes, bijv. "12,7 kPa (95 mmHg)". */
const k = (mmHg: number, d = 1) => `${dec(mmHgToKpa(mmHg), d)} kPa (${Math.round(mmHg)} mmHg)`;

export default async function TheoriePage() {
  const refs = await getLiteratureRefs();
  const byKey = new Map(refs.map((r) => [r.citation_key, r]));
  const cited = ORDER.map((key) => byKey.get(key)).filter((r) => r !== undefined);
  const extra = refs.filter((r) => !ORDER.includes(r.citation_key));

  return (
    <>
      <PageHeader
        title="Theoretische achtergrond"
        subtitle="Diepgaande fysiologie van O₂- en CO₂-transport voor artsen en verpleegkundigen op de intensive care — aanvulling op de interactieve modules."
      />

      <TheoryCallout>
        Drukken in <strong>kPa</strong> met mmHg tussen haakjes (1 kPa = 7,50 mmHg). Hemoglobine in{" "}
        <strong>mmol/L</strong> (× 1,611 = g/dL). Bronnen zijn genummerd <Cite k="west-2020" /> en
        verwijzen naar de{" "}
        <a href="#literatuur" className="font-medium text-amber-900 underline">
          literatuurlijst
        </a>
        . Laatst herzien: {REVIEWED}. Onderwijsmateriaal; vervangt geen lokaal protocol of klinisch oordeel.
      </TheoryCallout>

      <TheoryTocMobile items={TOC} />

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_230px]">
        <div className="min-w-0 space-y-2">
          {/* 1 ─────────────────────────────────────────── */}
          <TheorySection id="kader" number={1} title="Fysiologisch kader">
            <p>
              Gasuitwisseling berust op partiaaldrukgradiënten over membranen en op de chemie van
              hemoglobine (Hb). Langs de <strong>O₂-cascade</strong> daalt de pO₂ van ingeademde lucht tot
              in het mitochondrion; CO₂ volgt de omgekeerde route <Cite k="west-2020" />.
            </p>
            <RefTable
              head={["Compartiment", "pO₂", "pCO₂", "Toelichting"]}
              rows={[
                ["Ingeademd (bevochtigd)", k(149), "≈ 0", "FiO₂ 0,21 × (101,3 − 6,3 kPa)"],
                ["Alveolair", "≈ 13,3–13,9 kPa (100–104 mmHg)", k(40), "Alveolaire gasvergelijking (§ 11)"],
                ["Arterieel", k(95), k(40), "A–a-gradiënt door V/Q-spreiding en shunt"],
                ["Gemengd veneus", k(40), k(46), "SvO₂ ≈ 75%"],
                ["Mitochondrion", "< 0,4 kPa (< 3 mmHg)", "—", "Orde van grootte; kritische pO₂ voor oxidatieve fosforylering"],
              ]}
              caption="Typische waarden in rust op zeeniveau, gezonde volwassene."
            />
            <p>
              Hb is een coöperatieve drager: binding van één O₂ vergemakkelijkt de volgende. CO₂ en H⁺
              verlagen de O₂-affiniteit (Bohr-effect); oxygenatie verlaagt de binding van CO₂ en H⁺
              (Haldane-effect). Beide komen voort uit <em>dezelfde</em> conformatieverandering en
              optimaliseren samen O₂-afgifte in weefsel en CO₂-afgifte in de long.
            </p>
          </TheorySection>

          {/* 2 ─────────────────────────────────────────── */}
          <TheorySection
            id="heem-ijzer"
            number={2}
            title="Heem & ijzer — structuur en functie"
            related={{ href: "/heem-ijzer", label: "Interactieve module heem & ijzer" }}
          >
            <p>
              Het gasbindende centrum is <strong>heem</strong>: protoporfyrine IX met centraal{" "}
              <strong>ijzer in ferrotoestand (Fe²⁺)</strong>. Zonder intact heem–ijzercomplex is globine een
              eiwit zonder O₂-draagcapaciteit.
            </p>

            <TheorySubheading>Protoporfyrine IX</TheorySubheading>
            <p>
              De ring ontstaat in erytroïde voorlopers via δ-aminolevulinezuur (ALA) → porfobilinogeen →
              uroporfyrinogeen → coproporfyrinogeen → protoporfyrinogeen → protoporfyrine IX; ferrochelatase
              voegt in het mitochondrion Fe²⁺ in. Enzymdefecten geven porfyrieën; loodintoxicatie remt
              ALA-dehydratase en ferrochelatase. Hetzelfde heem zit in myoglobine, cytochromen en catalase —
              het globine bepaalt de functie.
            </p>

            <TheorySubheading>Coördinatie: proximale en distale histidine</TheorySubheading>
            <p>
              Fe²⁺ heeft zes coördinatieplaatsen: vier stikstofatomen van de porfyrine, de{" "}
              <strong>proximale histidine (His F8</strong>; α87, β92) en O₂ op de zesde plaats. De{" "}
              <strong>distale histidine (His E7</strong>; α58, β63) vormt een waterstofbrug met gebonden O₂,
              hindert CO-binding sterisch en beschermt tegen autoxidatie (Fe²⁺ → Fe³⁺ + superoxide){" "}
              <Cite k="perutz-1970" />.
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong>E7-mutaties:</strong> Hb Zürich (β63 His→Arg) — verhoogde affiniteit en
                oxidatiegevoeligheid (hemolyse bij sulfonamiden); Hb M Boston (α58 His→Tyr) — stabiliseert
                Fe³⁺, congenitale methemoglobinemie.
              </li>
              <li>
                <strong>Hb Kansas</strong> (β102 Asn→Thr) ligt <em>niet</em> bij E7 maar in het
                α₁β₂-contactvlak: de T-stand wordt bevoordeeld, lage O₂-affiniteit, klinisch cyanose bij
                normale PaO₂.
              </li>
            </ul>

            <TheorySubheading>Oxidatiestatus: methemoglobine</TheorySubheading>
            <p>
              Fe³⁺ kan geen O₂ binden. Bovendien verhogen geoxideerde heemgroepen de affiniteit van de
              resterende Fe²⁺-plaatsen binnen hetzelfde tetrameer: de curve schuift naar links, dus ook de{" "}
              <em>afgifte</em> van de overgebleven O₂ verslechtert. Fysiologisch is metHb &lt; 1–2%;
              NADH-cytochroom-b₅-reductase reduceert het continu. De NADPH-afhankelijke route (via G6PD) is
              fysiologisch van ondergeschikt belang, maar is precies de route die methyleenblauw gebruikt{" "}
              <Cite k="wright-1999" /> (zie § 13).
            </p>

            <TheorySubheading>Liganden naast O₂</TheorySubheading>
            <ul className="list-disc space-y-1 pl-5">
              <li>1 heem bindt maximaal 1 O₂; een tetrameer (α₂β₂) dus 4 O₂.</li>
              <li>
                <strong>CO</strong> bindt ~200–250× sterker dan O₂ (carboxyhemoglobine, COHb) én verschuift de
                curve van de overige plaatsen naar links (§ 13).
              </li>
              <li>
                <strong>NO</strong>: Hb is een NO-buffer. Deoxy-Hb kan nitriet tot NO reduceren en S-nitroso-Hb
                kan bij deoxygenatie NO vrijgeven — hypothesen voor hoe de erytrocyt lokale vasodilatatie aan
                O₂-behoefte koppelt <Cite k="jensen-2004" />.
              </li>
            </ul>

            <Deepening title="IJzerhuishouding en erytropoëse">
              <p>
                IJzer wordt opgenomen door enterocyten (DMT1) en via ferroportine aan het bloed afgegeven;{" "}
                <strong>hepcidine</strong> remt ferroportine en is het centrale regelhormoon — verhoogd bij
                inflammatie (anemie van inflammatie, frequent op de IC). Transport als transferrine-Fe³⁺,
                opname in erytroblasten via transferrinereceptor 1. Een rijpe erytrocyt maakt geen heem meer:
                zijn ~270 miljoen Hb-moleculen zijn aangelegd vóór het kernverlies. Macrofagen recyclen ijzer
                uit verouderde erytrocyten (levensduur ~120 dagen).
              </p>
            </Deepening>
          </TheorySection>

          {/* 3 ─────────────────────────────────────────── */}
          <TheorySection
            id="hemoglobine"
            number={3}
            title="Hemoglobine & quaternaire allosterie"
            related={{ href: "/erytrocyt", label: "Module hemoglobine in de erytrocyt" }}
          >
            <p>
              Volwassen HbA is een tetrameer α₂β₂. In de <strong>T-stand</strong> (tense, deoxy) houden
              zoutbruggen tussen de subunits het molecuul in een conformatie met lage affiniteit.
              O₂-binding brengt de <strong>R-stand</strong> (relaxed, oxy) binnen bereik, met hoge affiniteit.
            </p>
            <p>
              <strong>Mechanisme (Perutz):</strong> in deoxy-Hb is Fe²⁺ high-spin en ligt het ~0,4 Å buiten
              het porfyrinevlak. Bij O₂-binding wordt het ijzer low-spin, kleiner, en schuift het het vlak
              in. Het trekt His F8 en de F-helix mee; die beweging verbreekt zoutbruggen aan het
              α₁β₂-contactvlak, tot het tetrameer als geheel naar R kantelt <Cite k="perutz-1970" />.
            </p>
            <RefTable
              head={["Effector", "Bindingsplaats", "Stabiliseert", "Effect op P₅₀"]}
              rows={[
                ["H⁺ (Bohr)", "o.a. C-terminale His β146, α-N-termini", "T", "↑"],
                ["CO₂", "N-terminale aminogroepen (carbamaat)", "T", "↑"],
                ["2,3-BPG", "Centrale holte tussen β-ketens (deoxy)", "T", "↑"],
                ["Temperatuur ↑", "Exotherme O₂-binding", "—", "↑"],
                ["O₂", "Heem-Fe²⁺", "R", "↓ (coöperativiteit)"],
                ["CO, metHb", "Heem van één subunit", "R", "↓ (linksverschuiving)"],
              ]}
            />
            <Deepening title="Concerted (MWC) of sequentieel (KNF)?">
              <p>
                Het <strong>Monod-Wyman-Changeux-model</strong> beschrijft twee toestanden (T en R) waartussen
                het tetrameer als geheel wisselt; ligandbinding verschuift het evenwicht <Cite k="mwc-1965" />.
                Het sequentiële model van Koshland, Némethy en Filmer laat subunits één voor één van vorm
                veranderen. Hemoglobine past grotendeels in het MWC-kader, met tertiaire veranderingen
                binnen elke quaternaire toestand als verfijning. Klinisch relevant: alle allosterische
                effectoren grijpen in op hetzelfde T⇌R-evenwicht, waardoor hun effecten op de curve (deels)
                optellen.
              </p>
            </Deepening>
            <p>
              Carbonic anhydrase II in de erytrocyt versnelt CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻ ongeveer
              10⁴-voudig — essentieel om de Bohr-verschuiving binnen de capillaire transittijd te laten
              plaatsvinden <Cite k="jensen-2004" />.
            </p>
          </TheorySection>

          {/* 4 ─────────────────────────────────────────── */}
          <TheorySection
            id="dissociatie"
            number={4}
            title="Dissociatiecurve & Hill-vergelijking"
            related={{ href: "/dissociatiecurve", label: "Interactieve dissociatiecurve" }}
          >
            <Formula
              vars={[
                ["sO₂", "fractionele O₂-saturatie (× 100%)"],
                ["pO₂", "partiaaldruk O₂"],
                ["P₅₀", "pO₂ waarbij Hb 50% verzadigd is"],
                ["n", `Hill-coëfficiënt, maat voor coöperativiteit (≈ ${dec(HILL_N)})`],
              ]}
            >
              sO₂ = pO₂ⁿ / (P₅₀ⁿ + pO₂ⁿ)
            </Formula>
            <p>
              De sigmoïde vorm weerspiegelt coöperativiteit. De standaard-P₅₀ is ~{k(BASE_P50)} bij pH 7,40,
              37 °C, pCO₂ {k(40)} en 2,3-BPG ~5 mmol/L erytrocyt. Het vlakke bovenste deel beschermt de
              arteriële saturatie bij dalende PaO₂; het steile middendeel (≈ 3–7 kPa) zorgt dat kleine
              drukveranderingen in weefsel veel O₂ vrijmaken.
            </p>
            <RefTable
              head={["Curve naar rechts (P₅₀ ↑)", "Curve naar links (P₅₀ ↓)"]}
              rows={[
                ["Acidose (Bohr)", "Alkalose"],
                ["Hypercapnie", "Hypocapnie"],
                ["Hyperthermie", "Hypothermie"],
                ["2,3-BPG ↑ (anemie, hoogte, chronische hypoxie)", "2,3-BPG ↓ (bewaard bloed, hypofosfatemie)"],
                ["HbS, Hb Kansas", "HbF, COHb, metHb, Hb Zürich"],
              ]}
            />
            <Formula
              caption={
                <>
                  Severinghaus: Hill-variant die de standaardcurve over het hele bereik tot op ±0,55% saturatie
                  beschrijft <Cite k="severinghaus-1979" />.
                </>
              }
            >
              S = 1 / (23 400 / (PO₂³ + 150 · PO₂) + 1) &nbsp;&nbsp;— PO₂ in mmHg
            </Formula>
            <p>
              Kwantitatief: de Bohr-coëfficiënt Δlog P₅₀ / ΔpH ≈ −0,48 en de temperatuurcoëfficiënt Δlog P₅₀ /
              ΔT ≈ +0,024 per °C <Cite k="severinghaus-1979" />. Voor gelijktijdige O₂–CO₂–pH-modellen (bijv.
              bij simulatie van gasuitwisseling) zijn gekoppelde vergelijkingen nodig <Cite k="dash-2004" />.
            </p>
            <TheoryBox kind="note" title="Model in deze app">
              <p>
                De interactieve curve gebruikt een vereenvoudigde Hill-curve (n = {dec(HILL_N)}) met empirische
                multiplicatieve correcties op P₅₀ voor pH, pCO₂, temperatuur en 2,3-BPG (zie{" "}
                <TheoryLink href="/appendix">appendix</TheoryLink>). Geschikt voor onderwijs; niet voor
                patiëntspecifieke berekening.
              </p>
            </TheoryBox>
          </TheorySection>

          {/* 5 ─────────────────────────────────────────── */}
          <TheorySection
            id="bohr"
            number={5}
            title="Bohr-effect — moleculair & klinisch"
            related={{ href: "/bohr-effect", label: "Module Bohr-effect" }}
          >
            <p>
              Bohr, Hasselbalch en Krogh beschreven in 1904 dat CO₂ de O₂-binding van bloed verlaagt{" "}
              <Cite k="bohr-1904" />. Moleculair: H⁺ protoneert o.a. His β146 en de α-N-termini, die in de
              T-stand zoutbruggen vormen; CO₂ werkt deels via de pH (CA) en deels direct via carbamaatvorming{" "}
              <Cite k="jensen-2004" />.
            </p>
            <p>
              In weefselcapillairen (pH ~7,35, pCO₂ {k(46)}) ligt P₅₀ hoger dan in longcapillairen (pH ~7,45,
              pCO₂ {k(40)}): bij dezelfde capillaire pO₂ is de saturatie lager, dus komt meer O₂ vrij.
            </p>
            <TheoryBox kind="pearl">
              <p>
                Bij lactaatacidose (shock, convulsies) helpt de rechtsverschuiving de O₂-afgifte. Snelle
                correctie met bicarbonaat of hyperventilatie neemt dat voordeel acuut weg, terwijl 2,3-BPG (dat
                bij acidose daalt) pas na uren herstelt.
              </p>
            </TheoryBox>
            <TheoryBox kind="pitfall">
              <p>
                Respiratoire alkalose (hyperventilatie, overbeademing) schuift de curve naar links én
                vermindert de cerebrale doorbloeding — dubbel nadeel voor het cerebrale O₂-aanbod.
              </p>
            </TheoryBox>
          </TheorySection>

          {/* 6 ─────────────────────────────────────────── */}
          <TheorySection
            id="haldane"
            number={6}
            title="Haldane-effect — complement van Bohr"
            related={{ href: "/haldane-effect", label: "Module Haldane-effect" }}
          >
            <p>
              Deoxy-Hb bindt meer CO₂ als <strong>carbaminohemoglobine</strong> (aan de N-terminale
              aminogroepen) en is een betere H⁺-buffer dan oxy-Hb. Bij oxygenatie in de longen komen CO₂ en H⁺
              vrij; H⁺ zet HCO₃⁻ om tot CO₂, dat wordt uitgeademd. In weefsel gebeurt het omgekeerde:
              deoxygenatie verhoogt de CO₂-opnamecapaciteit <Cite k="jensen-2004" />.
            </p>
            <p>
              Gevolg: de CO₂-dissociatiecurve van veneus bloed ligt hoger dan die van arterieel bloed. Bij
              dezelfde pCO₂ bevat gedeoxygeneerd bloed meer CO₂ — zonder Haldane-effect zou het
              arterioveneuze pCO₂-verschil groter moeten zijn om dezelfde hoeveelheid CO₂ af te voeren.
            </p>
            <TheoryBox kind="pitfall" title="O₂ bij COPD">
              <p>
                Hypercapnie door hoge FiO₂ bij een COPD-exacerbatie wordt traditioneel toegeschreven aan het
                wegvallen van de &ldquo;hypoxic drive&rdquo;. Bij 100% O₂ steeg de PaCO₂ echter ~3 kPa (23
                mmHg) terwijl het ademminuutvolume vrijwel gelijk bleef <Cite k="aubier-1980" />. De
                belangrijkste mechanismen zijn <strong>verslechterde V/Q</strong> (opheffen van hypoxische
                pulmonale vasoconstrictie) en het <strong>Haldane-effect</strong>; de bijdrage van
                ademdepressie is beperkt <Cite k="abdo-2012" />. Dus: O₂ niet onthouden, maar titreren
                (gangbaar doel SpO₂ 88–92%).
              </p>
            </TheoryBox>
          </TheorySection>

          {/* 7 ─────────────────────────────────────────── */}
          <TheorySection
            id="co2"
            number={7}
            title="CO₂-transport — drie vormen"
            related={{ href: "/co2-transport", label: "Module CO₂-transport" }}
          >
            <p>
              Het verschil tussen <em>totale inhoud</em> en <em>uitgewisselde</em> CO₂ wordt vaak verward.
              Arterieel bloed bevat ~21,5 mmol/L CO₂ (≈ 48 ml/dL), veneus ~23,3 mmol/L (≈ 52 ml/dL); per
              passage wordt dus maar ~8% van de voorraad uitgewisseld <Cite k={["west-2020", "geers-2000"]} />.
            </p>
            <RefTable
              head={["Vorm", "Aandeel totale inhoud", "Aandeel arterioveneus verschil", "Mechanisme"]}
              rows={[
                ["Bicarbonaat (HCO₃⁻)", "≈ 90%", "≈ 60–70%", "CA-II in erytrocyt; export via band-3"],
                ["Carbamino-Hb", "≈ 5%", "≈ 20–30%", "Directe binding aan deoxy-Hb (Haldane)"],
                ["Opgelost", "≈ 5%", "≈ 5–10%", "Wet van Henry; drijft de diffusie"],
              ]}
              caption="De modules in deze app gebruiken 70 / 23 / 7% voor het uitgewisselde aandeel."
            />
            <p>
              Carbamino-Hb is dus klein in voorraad maar groot in uitwisseling — precies door het
              Haldane-effect. De CO₂-inhoud hangt af van pCO₂, saturatie, pH en Hb; de relatie tussen pCO₂ en
              CO₂-inhoud is daardoor niet lineair en niet constant (relevant voor § 12).
            </p>
          </TheorySection>

          {/* 8 ─────────────────────────────────────────── */}
          <TheorySection
            id="cl-shift"
            number={8}
            title="Chloride shift (Hamburger-verschuiving)"
            related={{ href: "/co2-transport", label: "Animatie chloride shift" }}
          >
            <p>
              HCO₃⁻ dat in de erytrocyt ontstaat, verlaat de cel via de anionwisselaar{" "}
              <strong>band 3 (AE1)</strong> in ruil voor Cl⁻ (1:1, elektroneutraal). De uitwisseling verloopt
              binnen de capillaire transittijd; in de long draait ze om <Cite k={["geers-2000", "jensen-2004"]} />.
            </p>
            <p>
              Zonder deze export zou HCO₃⁻ zich in de cel ophopen: de CA-reactie loopt dan vast tegen haar
              evenwicht en de CO₂-opname stagneert. Bovendien kan het plasma (het grootste volume) zo als
              HCO₃⁻-opslag dienen.
            </p>
            <Deepening title="Osmotisch gevolg: veneuze erytrocyten zijn groter">
              <p>
                Netto stijgt het aantal osmotisch actieve deeltjes in de veneuze erytrocyt (Cl⁻ naar binnen,
                plus gebufferde H⁺). Water volgt, waardoor veneuze erytrocyten iets groter zijn en het veneuze
                hematocriet enkele procenten hoger ligt dan het arteriële <Cite k="west-2020" />.
              </p>
            </Deepening>
          </TheorySection>

          {/* 9 ─────────────────────────────────────────── */}
          <TheorySection id="bpg" number={9} title="2,3-BPG en foetaal hemoglobine">
            <p>
              2,3-Bisfosfoglyceraat ontstaat in de Rapoport-Luebering-shunt van de glycolyse en bindt in de
              centrale holte van deoxy-Hb aan positief geladen residuen van de β-ketens. Het stabiliseert de
              T-stand en verhoogt P₅₀ <Cite k="benesch-1967" />. De concentratie is ~5 mmol/L erytrocyt; ze
              stijgt bij anemie, hoogte en chronische hypoxie en daalt bij acidose en hypofosfatemie.
            </p>
            <TheoryBox kind="pearl" title="Transfusie">
              <p>
                Erytrocytenconcentraten die ~3 weken bewaard zijn, hebben ~90% minder 2,3-BPG en een ~30%
                lagere P₅₀. Na transfusie herstelt 2,3-BPG geleidelijk over ongeveer drie dagen{" "}
                <Cite k="scott-2016" />. Het O₂-gehalte stijgt direct, de afgifte in weefsel pas later volledig.
              </p>
            </TheoryBox>
            <p>
              <strong>HbF</strong> (α₂γ₂) bindt 2,3-BPG slecht (γ143 Ser in plaats van His) en heeft een P₅₀ van
              ~2,5 kPa (19 mmHg): zo kan de foetus O₂ uit maternaal bloed opnemen. Hydroxyurea verhoogt HbF
              bij sikkelcelziekte; HbS zelf heeft een rechtsverschoven curve.
            </p>
          </TheorySection>

          {/* 10 ─────────────────────────────────────────── */}
          <TheorySection id="levering" number={10} title="O₂-gehalte, -levering en -extractie">
            <p>
              Voor de IC is niet de saturatie maar het <strong>O₂-aanbod</strong> de relevante grootheid. In
              Nederland wordt Hb in mmol/L uitgedrukt; 1 mmol Hb (per heem) bindt maximaal 1 mmol O₂.
            </p>
            <Formula
              vars={[
                ["CaO₂", "arterieel O₂-gehalte (mmol/L)"],
                ["Hb", "hemoglobine (mmol/L)"],
                ["SaO₂", "arteriële saturatie (fractie, bijv. 0,97)"],
                ["0,01", "oplosbaarheid O₂ ≈ 0,0104 mmol/L per kPa"],
              ]}
              caption="Equivalent in g/dL: CaO₂ (ml/dL) = 1,34 × Hb (g/dL) × SaO₂ + 0,0225 × PaO₂ (kPa). 1 mmol O₂ = 22,4 ml."
            >
              CaO₂ = Hb × SaO₂ + 0,01 × PaO₂ (kPa)
            </Formula>
            <Formula
              vars={[
                ["DO₂", "O₂-levering (mmol/min)"],
                ["CO", "hartminuutvolume (L/min)"],
                ["VO₂", "O₂-verbruik = CO × (CaO₂ − CvO₂)"],
                ["O₂ER", "extractieratio = VO₂ / DO₂"],
              ]}
            >
              <span className="block">DO₂ = CO × CaO₂</span>
              <span className="block">O₂ER = VO₂ / DO₂</span>
              <span className="block">SvO₂ ≈ SaO₂ × (1 − O₂ER)</span>
            </Formula>
            <RefTable
              head={["Rekenvoorbeeld", "Normaal", "Anemie (Hb 5,0)", "Hypoxemie (SaO₂ 0,88)"]}
              rows={[
                ["CaO₂ (mmol/L)", "8,7 × 0,97 + 0,13 = 8,6", "5,0 × 0,97 + 0,13 = 5,0", "8,7 × 0,88 + 0,07 = 7,7"],
                ["DO₂ bij CO 5 L/min", "43 mmol/min (≈ 960 ml)", "25 mmol/min (≈ 560 ml)", "39 mmol/min (≈ 860 ml)"],
                ["O₂ER bij VO₂ 11 mmol/min", "26%", "44%", "28%"],
                ["Verwachte SvO₂", "≈ 72%", "≈ 54%", "≈ 63%"],
              ]}
              caption="VO₂ 11 mmol/min ≈ 250 ml/min. Opgelost O₂ is bij normale PaO₂ verwaarloosbaar (~1,5%)."
            />
            <TheoryBox kind="pearl">
              <p>
                Een daling van Hb van 8,7 naar 5,0 mmol/L vermindert het aanbod meer dan een daling van de
                saturatie van 97 naar 88%. Een PaO₂ verhogen boven ~13 kPa voegt vrijwel niets toe aan CaO₂.
              </p>
            </TheoryBox>
            <p>
              <strong>SvO₂ / ScvO₂</strong> weerspiegelt de balans tussen aanbod en verbruik (normaal SvO₂
              65–75%; ScvO₂ ligt bij gezonden enkele procenten lager dan SvO₂, bij shock vaak hoger). Een lage
              waarde betekent onvoldoende aanbod of hoog verbruik; een normale of hoge waarde sluit
              weefselhypoxie <em>niet</em> uit bij gestoorde extractie (sepsis, shunting in de
              microcirculatie) — zie § 12.
            </p>
          </TheorySection>

          {/* 11 ─────────────────────────────────────────── */}
          <TheorySection id="oxygenatie" number={11} title="Alveolaire gasvergelijking & oxygenatie-indices">
            <Formula
              vars={[
                ["PAO₂", "alveolaire pO₂"],
                ["Pb", "barometerdruk (101,3 kPa op zeeniveau)"],
                ["PH₂O", "waterdampspanning bij 37 °C (6,3 kPa)"],
                ["RQ", "respiratoir quotiënt (≈ 0,8)"],
              ]}
              caption="Kamerlucht: 0,21 × 95,0 − 5,3 / 0,8 ≈ 13,3 kPa."
            >
              PAO₂ = FiO₂ × (Pb − PH₂O) − PaCO₂ / RQ
            </Formula>
            <p>
              De <strong>A–a-gradiënt</strong> (PAO₂ − PaO₂) is bij jonge volwassenen &lt; ~2 kPa en neemt met de
              leeftijd toe. Een normale gradiënt bij hypoxemie wijst op hypoventilatie of een lage FiO₂; een
              verhoogde gradiënt op V/Q-mismatch, shunt of (zelden in rust) een diffusiestoornis.
            </p>
            <RefTable
              head={["ARDS (Berlin)", "PaO₂/FiO₂ in kPa", "in mmHg"]}
              rows={[
                ["Mild", "26,7 – 40", "200 – 300"],
                ["Matig", "13,3 – 26,7", "100 – 200"],
                ["Ernstig", "≤ 13,3", "≤ 100"],
              ]}
              caption={
                <>
                  Bij PEEP/CPAP ≥ 5 cmH₂O, plus acuut begin, bilaterale afwijkingen en niet volledig verklaard door
                  hartfalen <Cite k="ards-2012" />.
                </>
              }
            />
            <TheoryBox kind="pitfall">
              <p>
                De P/F-ratio is geen vaste longeigenschap: ze verandert met FiO₂, PEEP, hartminuutvolume (via
                SvO₂ en shuntfractie) en Hb. Vergelijk ratio&apos;s alleen onder vergelijkbare
                beademingsinstellingen.
              </p>
            </TheoryBox>
          </TheorySection>

          {/* 12 ─────────────────────────────────────────── */}
          <TheorySection id="pvaco2" number={12} title="Pv–aCO₂ en CO₂-afgeleide variabelen">
            <p>
              Het veneus-arteriële pCO₂-verschil (<strong>ΔPCO₂</strong>: centraal of gemengd veneus min
              arterieel) laat zien of de doorbloeding volstaat om de geproduceerde CO₂ af te voeren. Volgens de
              gemodificeerde Fick-relatie is ΔPCO₂ evenredig met de CO₂-productie en omgekeerd evenredig met
              het hartminuutvolume <Cite k="mallat-2016" />.
            </p>
            <RefTable
              head={["Variabele", "Afkapwaarde", "Interpretatie"]}
              rows={[
                ["Pcv–aCO₂", "> 0,8 kPa (> 6 mmHg)", "Flow onvoldoende voor CO₂-afvoer — ook als ScvO₂ > 70%"],
                ["Pv–aCO₂ / Ca–vO₂", "> ≈ 1,4 (mmHg per ml/dL)", "Aanwijzing voor anaerobe CO₂-productie (VCO₂ > VO₂)"],
              ]}
              caption={
                <>
                  Afkapwaarden volgens overzichtsartikelen <Cite k={["mallat-2016", "mallat-2025"]} />; de ratio wordt
                  in de literatuur in mmHg en ml/dL uitgedrukt.
                </>
              }
            />
            <TheoryBox kind="pearl">
              <p>
                Lactaat ↑ + ScvO₂ normaal + ΔPCO₂ ↑ → waarschijnlijk nog een flowtekort; overweeg het
                hartminuutvolume te verhogen. ΔPCO₂ normaal + ratio ↑ → eerder anaeroob metabolisme of
                verminderde extractie.
              </p>
            </TheoryBox>
            <TheoryBox kind="pitfall" title="Haldane in de gap">
              <p>
                Door het Haldane-effect bindt bloed met een hogere veneuze saturatie minder CO₂: bij dezelfde
                CO₂-inhoud is de pCO₂ dan hoger. Veranderingen in SvO₂, Hb, temperatuur en pH verschuiven zo de
                ΔPCO₂ zonder dat de flow verandert <Cite k="mallat-2025" />.
              </p>
            </TheoryBox>
          </TheorySection>

          {/* 13 ─────────────────────────────────────────── */}
          <TheorySection id="dyshb" number={13} title="Dyshemoglobines & pulsoximetrie">
            <p>
              Een pulsoximeter meet de verhouding van de absorptie bij twee golflengtes (≈ 660 en 940 nm) en
              kent dus alleen oxy- en deoxy-Hb. Alle andere hemoglobinevormen vereisen{" "}
              <strong>CO-oximetrie</strong> op een bloedgasanalyser.
            </p>
            <RefTable
              head={["Situatie", "SpO₂ toont", "Werkelijk", "Mechanisme"]}
              rows={[
                [
                  "CO-intoxicatie",
                  "normaal tot hoog",
                  "functionele SaO₂ ↓",
                  "COHb absorbeert bij 660 nm vrijwel als O₂Hb en telt mee als ‘oxy’",
                ],
                ["Methemoglobinemie", "≈ 85%, ongeacht ernst", "kan veel lager zijn", "metHb absorbeert bij beide golflengtes; ratio → ~1"],
                ["Donkere huidskleur", "te hoog", "occulte hypoxemie", "kalibratie vooral op lichte huid (zie onder)"],
                ["Lage perfusie, vasopressie", "onbetrouwbaar", "—", "zwak pulsatiel signaal, artefacten"],
              ]}
            />
            <p>
              Bij gelijktijdige arteriële en pulsoximetrische meting had 11,7% van de zwarte patiënten een SaO₂
              &lt; 88% bij een SpO₂ van 92–96%, tegenover 3,6% van de witte patiënten <Cite k="sjoding-2020" />.
              Bij twijfel, of bij beslissingen rond doelsaturaties: arterieel bloedgas.
            </p>
            <TheorySubheading>Methemoglobinemie</TheorySubheading>
            <p>
              Oorzaken: lokale anesthetica (benzocaïne, prilocaïne), dapson, nitraten en nitriet, inhalatie
              van NO, aangeboren cytochroom-b₅-reductasedeficiëntie of Hb M. Klachten correleren matig met de
              concentratie. Behandeling bij symptomen of metHb &gt; ~20–30%: <strong>methyleenblauw</strong>{" "}
              1–2 mg/kg iv <Cite k="wright-1999" />.
            </p>
            <TheoryBox kind="pitfall">
              <p>
                Methyleenblauw heeft NADPH (via G6PD) nodig: bij <strong>G6PD-deficiëntie</strong> werkt het niet
                en kan het hemolyse uitlokken. Het is bovendien een MAO-remmer — risico op serotoninesyndroom
                bij serotonerge medicatie.
              </p>
            </TheoryBox>
            <TheorySubheading>Koolmonoxide</TheorySubheading>
            <p>
              COHb verlaagt het O₂-gehalte én verschuift de curve van de resterende plaatsen naar links;
              daarnaast remt CO cytochroom-c-oxidase. Halfwaardetijd van COHb: ~4–6 uur in kamerlucht, ~1–1,5
              uur bij 100% O₂, ~20–30 minuten hyperbaar. In een gerandomiseerde studie gaven drie hyperbare
              sessies binnen 24 uur na 6 weken minder cognitieve restschade dan normobare O₂ (25% vs 46%){" "}
              <Cite k="weaver-2002" />.
            </p>
          </TheorySection>

          {/* 14 ─────────────────────────────────────────── */}
          <TheorySection id="temperatuur" number={14} title="Temperatuur: hypothermie, α-stat en pH-stat">
            <p>
              Afkoeling verschuift de curve naar links (Δlog P₅₀ ≈ 0,024 per °C): bij 32 °C is P₅₀ ≈{" "}
              {k(BASE_P50 * Math.pow(10, -0.024 * 5))}. Tegelijk stijgt de oplosbaarheid van gassen, waardoor
              de werkelijke pO₂ en pCO₂ in het bloed van een hypotherme patiënt lager en de pH hoger zijn dan de
              analyser bij 37 °C rapporteert (pH ≈ +0,015 per °C afkoeling) <Cite k="severinghaus-1979" />.
            </p>
            <RefTable
              head={["Strategie", "Werkwijze", "Gevolg"]}
              rows={[
                [
                  "α-stat",
                  "Waarden bij 37 °C interpreteren (geen temperatuurcorrectie); PaCO₂ ≈ 5,3 kPa nastreven",
                  "Behoud van intracellulaire elektrochemische neutraliteit en cerebrale autoregulatie; gangbaar bij volwassenen",
                ],
                [
                  "pH-stat",
                  "Temperatuurgecorrigeerde waarden normaliseren; vaak CO₂ toevoegen",
                  "Cerebrale vasodilatatie, snellere en homogenere hersenkoeling; soms bij kinderen (cardiochirurgie)",
                ],
              ]}
            />
            <TheoryBox kind="pearl">
              <p>
                Bij temperatuurmanagement en ECMO/ECC: ga na welke strategie lokaal wordt gebruikt en of de
                analyser gecorrigeerde of 37 °C-waarden rapporteert, vóór je de PaCO₂ bijstuurt.
              </p>
            </TheoryBox>
          </TheorySection>

          {/* 15 ─────────────────────────────────────────── */}
          <TheorySection
            id="integratie"
            number={15}
            title="Geïntegreerd model long ↔ weefsel"
            related={{ href: "/circulatie", label: "Volg een erytrocyt door de kringloop" }}
          >
            <p>
              <strong>Weefselcapillair:</strong> metabole CO₂ ↑ → H⁺ ↑ via CA → Bohr → O₂-afgifte ↑; tegelijk
              Haldane → meer CO₂-opname. Veneus bloed: lagere sO₂, hogere pCO₂, lagere pH.
            </p>
            <p>
              <strong>Longcapillair:</strong> O₂ diffundeert het bloed in → Haldane → CO₂ en H⁺ komen vrij; de
              daling van de pCO₂ verschuift de curve weer naar links (Bohr in omgekeerde richting), wat de
              O₂-opname helpt. De transittijd is in rust ~0,75 s; evenwicht wordt al na ~0,25 s bereikt{" "}
              <Cite k="west-2020" />.
            </p>
            <TheoryBox kind="note" title="Wanneer de reserve opraakt">
              <p>
                Bij inspanning, hoogte of een verdikt membraan (fibrose) kan de transittijd te kort worden voor
                volledig evenwicht: diffusielimitatie. V/Q-mismatch (COPD, embolie) en rechts-linksshunt
                (atelectase, ARDS) zijn andere mechanismen; ze heffen het Bohr/Haldane-principe niet op, maar
                beperken wel de uitkomst ervan.
              </p>
            </TheoryBox>
          </TheorySection>

          {/* 16 ─────────────────────────────────────────── */}
          <TheorySection id="kliniek" number={16} title="Klinische correlaties">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Chronische hypercapnie (COPD):</strong> respiratoire acidose met renale HCO₃⁻-retentie;
                2,3-BPG vaak verhoogd. Titreer O₂ (§ 6) en corrigeer de PaCO₂ bij beademing niet te snel — de
                gecompenseerde HCO₃⁻ geeft anders een metabole alkalose.
              </li>
              <li>
                <strong>Sepsis:</strong> ScvO₂ kan normaal of hoog zijn bij gestoorde extractie; combineer met
                lactaat, ΔPCO₂ en klinische perfusie (§ 10, § 12).
              </li>
              <li>
                <strong>Anemie en transfusie:</strong> DO₂ wordt meer bepaald door Hb dan door PaO₂; transfusie
                verhoogt CaO₂ direct, de afgifte pas na herstel van 2,3-BPG (§ 9).
              </li>
              <li>
                <strong>Hypothermie / ECC:</strong> linksverschuiving en de keuze tussen α-stat en pH-stat (§ 14).
              </li>
              <li>
                <strong>Intoxicaties:</strong> CO en methemoglobine-inductoren — SpO₂ is misleidend; altijd
                CO-oximetrie (§ 13).
              </li>
              <li>
                <strong>Hemoglobinopathieën:</strong> HbS (rechtsverschuiving, sikkelen bij deoxygenatie), HbF,
                varianten met hoge of lage affiniteit (§ 2, § 9).
              </li>
            </ul>
          </TheorySection>

          {/* 17 ─────────────────────────────────────────── */}
          <TheorySection id="literatuur" number={17} title="Literatuur">
            <ol className="space-y-3 text-[0.95rem]">
              {cited.map((r, i) => (
                <li key={r.citation_key} id={`ref-${r.citation_key}`} className="flex scroll-mt-28 gap-3">
                  <span className="w-7 shrink-0 text-right font-mono text-sm font-semibold text-red-700">{i + 1}.</span>
                  <span>
                    {r.authors} {r.title}. {r.journal && <em>{r.journal}.</em>}
                    {r.pmid && r.url && (
                      <>
                        {" "}
                        <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-red-700 underline">
                          PubMed
                        </a>
                      </>
                    )}
                    {r.doi && (
                      <>
                        {r.pmid ? " · " : " "}
                        <a href={doiUrl(r.doi)} target="_blank" rel="noopener noreferrer" className="text-red-700 underline">
                          DOI
                        </a>
                      </>
                    )}
                  </span>
                </li>
              ))}
            </ol>
            {extra.length > 0 && (
              <>
                <TheorySubheading>Aanvullend</TheorySubheading>
                <ul className="list-disc space-y-1 pl-5 text-[0.95rem]">
                  {extra.map((r) => (
                    <li key={r.citation_key}>
                      {r.authors} ({r.year}). <em>{r.title}</em>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <p className="text-sm text-slate-500">
              Bronnen gecontroleerd in PubMed en Crossref op {REVIEWED}. Onderwijsmateriaal; toets
              toepassing aan de geldende richtlijnen en lokale protocollen.
            </p>
          </TheorySection>
        </div>

        <aside className="hidden lg:block">
          <TheoryToc items={TOC} />
        </aside>
      </div>
    </>
  );
}
