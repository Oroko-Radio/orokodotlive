import type { Metadata } from "next";
import { getArtistsPage } from "@/lib/contentful/pages/artists";
import AllArtists from "@/views/AllArtists";
import { Suspense } from "react";

export const revalidate = 3600; // 1 hour

export const metadata: Metadata = {
  title: "Artists",
};

export default async function ArtistsPage() {
  const { allArtists, cities } = await getArtistsPage();

  return (
    <>
      <Suspense fallback={<div>Loading artists...</div>}>
        <AllArtists allArtists={allArtists} cities={cities} />
      </Suspense>
    </>
  );
}
