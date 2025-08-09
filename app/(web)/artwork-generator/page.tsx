import ArtworkGenerator from "@/views/ArtworkGenerator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artwork Generator",
  robots: "noindex",
};

export default function ArtworkGeneratorPage() {
  return <ArtworkGenerator />;
}
