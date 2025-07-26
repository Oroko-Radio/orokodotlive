import type { Metadata } from "next";
import ArtworkGenerator from "../../views/ArtworkGenerator";

export const metadata: Metadata = {
  title: "Artwork Generator",
  robots: "noindex",
};

export default function ArtworkGeneratorPage() {
  return <ArtworkGenerator />;
}
