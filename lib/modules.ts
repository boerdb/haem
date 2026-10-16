export type ModuleAccent = "o2" | "co2" | "neutral";

export type SiteModule = {
  href: string;
  /** Korte naam voor navigatie */
  label: string;
  title: string;
  desc: string;
  accent: ModuleAccent;
};

/** Leerroute in vaste volgorde — bron voor navigatie, homepage en vorige/volgende. */
export const MODULES: SiteModule[] = [
  {
    href: "/heem-ijzer",
    label: "Heem & ijzer",
    title: "Heem & ijzer",
    desc: "Protoporfyrine, Fe²⁺, coördinatie en O₂-binding",
    accent: "o2",
  },
  {
    href: "/erytrocyt",
    label: "Erytrocyt",
    title: "Hemoglobine in de erytrocyt",
    desc: "T/R-stand, 2,3-BPG, carbonic anhydrase",
    accent: "o2",
  },
  {
    href: "/dissociatiecurve",
    label: "Dissociatiecurve",
    title: "Dissociatiecurve",
    desc: "Interactieve Hill-curve met Bohr-shift",
    accent: "o2",
  },
  {
    href: "/bohr-effect",
    label: "Bohr",
    title: "Bohr-effect",
    desc: "CO₂/H⁺ verlagen O₂-affiniteit in weefsel",
    accent: "co2",
  },
  {
    href: "/haldane-effect",
    label: "Haldane",
    title: "Haldane-effect",
    desc: "O₂-binden bevordert CO₂-afgifte in longen",
    accent: "co2",
  },
  {
    href: "/co2-transport",
    label: "CO₂-transport",
    title: "CO₂-transport",
    desc: "Bicarbonaat, carbamino-Hb, chloride shift",
    accent: "co2",
  },
  {
    href: "/longen",
    label: "Longen",
    title: "Gasuitwisseling longen",
    desc: "Alveolaire diffusie en capillaire perfusie",
    accent: "o2",
  },
  {
    href: "/circulatie",
    label: "Circulatie",
    title: "Circulatie — scroll-verhaal",
    desc: "Weefsel → transport → long → arterieel",
    accent: "neutral",
  },
  {
    href: "/theorie",
    label: "Theorie",
    title: "Theoretische achtergrond",
    desc: "Allosterie, Hill-vergelijking, klinische correlaties",
    accent: "neutral",
  },
  {
    href: "/appendix",
    label: "Appendix",
    title: "Appendix — formules & literatuur",
    desc: "Referentiewaarden, vergelijkingen en bronnen",
    accent: "neutral",
  },
];
