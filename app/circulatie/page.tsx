import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { CirculationStory } from "@/components/animations/CirculationStory";

export const metadata: Metadata = {
  title: "Circulatie — van weefsel naar long",
  description:
    "Volg één erytrocyt door de hele kringloop. Scroll omlaag: de bloedgaswaarden veranderen mee terwijl de cel door weefsel, venen, longen en arteriën reist.",
};

export default function CirculatiePage() {
  return (
    <>
      <PageHeader
        title="Circulatie — van weefsel naar long"
        subtitle="Volg één erytrocyt door de hele kringloop. Scroll omlaag: de bloedgaswaarden veranderen mee terwijl de cel door weefsel, venen, longen en arteriën reist."
      />
      <CirculationStory />
    </>
  );
}
