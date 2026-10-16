import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ScrollNarrative } from "@/components/ScrollNarrative";

export const metadata: Metadata = {
  title: "Circulatie — van weefsel naar long",
  description:
    "Scroll door de volledige cyclus: Bohr-effect in weefsel, CO₂-transport, Haldane-effect in longen, arterieel bloed.",
};

export default function CirculatiePage() {
  return (
    <>
      <PageHeader
        title="Circulatie — van weefsel naar long"
        subtitle="Scroll door de volledige cyclus: Bohr-effect in weefsel, CO₂-transport, Haldane-effect in longen, arterieel bloed."
      />
      <ScrollNarrative />
    </>
  );
}
