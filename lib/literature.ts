import type { LiteratureRef } from "@/lib/types";

/**
 * Canonieke literatuurlijst (gecontroleerd in PubMed, oktober 2026).
 * De database-tabel `references_lit` wordt hiermee gesynchroniseerd
 * (sql/002_literature.sql); bij afwijkingen wint deze lijst.
 */
const REFS: Omit<LiteratureRef, "id" | "url">[] = [
  {
    citation_key: "bohr-1904",
    authors: "Bohr C., Hasselbalch K., Krogh A.",
    title:
      "Ueber einen in biologischer Beziehung wichtigen Einfluss, den die Kohlensäurespannung des Blutes auf dessen Sauerstoffbindung übt",
    journal: "Skand Arch Physiol. 1904;16:402–412",
    year: 1904,
    doi: "10.1111/j.1748-1716.1904.tb01382.x",
    pmid: null,
  },
  {
    citation_key: "mwc-1965",
    authors: "Monod J., Wyman J., Changeux J.P.",
    title: "On the nature of allosteric transitions: a plausible model",
    journal: "J Mol Biol. 1965;12:88–118",
    year: 1965,
    doi: "10.1016/s0022-2836(65)80285-6",
    pmid: "14343300",
  },
  {
    citation_key: "benesch-1967",
    authors: "Benesch R., Benesch R.E.",
    title: "The effect of organic phosphates from the human erythrocyte on the allosteric properties of hemoglobin",
    journal: "Biochem Biophys Res Commun. 1967;26(2):162–167",
    year: 1967,
    doi: "10.1016/0006-291x(67)90228-8",
    pmid: "6030262",
  },
  {
    citation_key: "perutz-1970",
    authors: "Perutz M.F.",
    title: "Stereochemistry of cooperative effects in haemoglobin",
    journal: "Nature. 1970;228(5273):726–739",
    year: 1970,
    doi: "10.1038/228726a0",
    pmid: "5528785",
  },
  {
    citation_key: "severinghaus-1979",
    authors: "Severinghaus J.W.",
    title: "Simple, accurate equations for human blood O₂ dissociation computations",
    journal: "J Appl Physiol. 1979;46(3):599–602",
    year: 1979,
    doi: "10.1152/jappl.1979.46.3.599",
    pmid: "35496",
  },
  {
    citation_key: "aubier-1980",
    authors: "Aubier M., Murciano D., Milic-Emili J., et al.",
    title:
      "Effects of the administration of O₂ on ventilation and blood gases in patients with chronic obstructive pulmonary disease during acute respiratory failure",
    journal: "Am Rev Respir Dis. 1980;122(5):747–754",
    year: 1980,
    doi: "10.1164/arrd.1980.122.5.747",
    pmid: "6778278",
  },
  {
    citation_key: "wright-1999",
    authors: "Wright R.O., Lewander W.J., Woolf A.D.",
    title: "Methemoglobinemia: etiology, pharmacology, and clinical management",
    journal: "Ann Emerg Med. 1999;34(5):646–656",
    year: 1999,
    doi: "10.1016/s0196-0644(99)70167-8",
    pmid: "10533013",
  },
  {
    citation_key: "geers-2000",
    authors: "Geers C., Gros G.",
    title: "Carbon dioxide transport and carbonic anhydrase in blood and muscle",
    journal: "Physiol Rev. 2000;80(2):681–715",
    year: 2000,
    doi: "10.1152/physrev.2000.80.2.681",
    pmid: "10747205",
  },
  {
    citation_key: "weaver-2002",
    authors: "Weaver L.K., Hopkins R.O., Chan K.J., et al.",
    title: "Hyperbaric oxygen for acute carbon monoxide poisoning",
    journal: "N Engl J Med. 2002;347(14):1057–1067",
    year: 2002,
    doi: "10.1056/NEJMoa013121",
    pmid: "12362006",
  },
  {
    citation_key: "jensen-2004",
    authors: "Jensen F.B.",
    title:
      "Red blood cell pH, the Bohr effect, and other oxygenation-linked phenomena in blood O₂ and CO₂ transport",
    journal: "Acta Physiol Scand. 2004;182(3):215–227",
    year: 2004,
    doi: "10.1111/j.1365-201X.2004.01361.x",
    pmid: "15491402",
  },
  {
    citation_key: "dash-2004",
    authors: "Dash R.K., Bassingthwaighte J.B.",
    title: "Blood HbO₂ and HbCO₂ dissociation curves at varied O₂, CO₂, pH, 2,3-DPG and temperature levels",
    journal: "Ann Biomed Eng. 2004;32(12):1676–1693",
    year: 2004,
    doi: "10.1007/s10439-004-7821-6",
    pmid: "15682524",
  },
  {
    citation_key: "ards-2012",
    authors: "ARDS Definition Task Force; Ranieri V.M., Rubenfeld G.D., et al.",
    title: "Acute respiratory distress syndrome: the Berlin Definition",
    journal: "JAMA. 2012;307(23):2526–2533",
    year: 2012,
    doi: "10.1001/jama.2012.5669",
    pmid: "22797452",
  },
  {
    citation_key: "abdo-2012",
    authors: "Abdo W.F., Heunks L.M.A.",
    title: "Oxygen-induced hypercapnia in COPD: myths and facts",
    journal: "Crit Care. 2012;16(5):323",
    year: 2012,
    doi: "10.1186/cc11475",
    pmid: "23106947",
  },
  {
    citation_key: "mallat-2016",
    authors: "Mallat J., Lemyze M., Tronchon L., Vallet B., Thevenin D.",
    title: "Use of venous-to-arterial carbon dioxide tension difference to guide resuscitation therapy in septic shock",
    journal: "World J Crit Care Med. 2016;5(1):47–56",
    year: 2016,
    doi: "10.5492/wjccm.v5.i1.47",
    pmid: "26855893",
  },
  {
    citation_key: "scott-2016",
    authors: "Scott A.V., Nagababu E., Johnson D.J., et al.",
    title:
      "2,3-Diphosphoglycerate concentrations in autologous salvaged versus stored red blood cells and in surgical patients after transfusion",
    journal: "Anesth Analg. 2016;122(3):616–623",
    year: 2016,
    doi: "10.1213/ANE.0000000000001071",
    pmid: "26891388",
  },
  {
    citation_key: "west-2020",
    authors: "West J.B., Luks A.M.",
    title: "West's Respiratory Physiology: The Essentials (11e editie)",
    journal: "Wolters Kluwer, 2020",
    year: 2020,
    doi: null,
    pmid: null,
  },
  {
    citation_key: "sjoding-2020",
    authors: "Sjoding M.W., Dickson R.P., Iwashyna T.J., Gay S.E., Valley T.S.",
    title: "Racial bias in pulse oximetry measurement",
    journal: "N Engl J Med. 2020;383(25):2477–2478",
    year: 2020,
    doi: "10.1056/NEJMc2029240",
    pmid: "33326721",
  },
  {
    citation_key: "mallat-2025",
    authors: "Mallat J., Jozwiak M., Orozco N., et al.",
    title: "Use of CO₂-derived variables in critically ill patients",
    journal: "Ann Intensive Care. 2025;15(1):142",
    year: 2025,
    doi: "10.1186/s13613-025-01569-2",
    pmid: "40999252",
  },
];

export const pubmedUrl = (pmid: string) => `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`;
export const doiUrl = (doi: string) => `https://doi.org/${doi}`;

export const STATIC_REFERENCES: LiteratureRef[] = REFS.map((r, i) => ({
  ...r,
  id: i + 1,
  url: r.pmid ? pubmedUrl(r.pmid) : r.doi ? doiUrl(r.doi) : null,
}));
