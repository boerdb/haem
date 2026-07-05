import { PageHeader } from "@/components/layout/PageHeader";
import { ScrollNarrative } from "@/components/ScrollNarrative";

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
