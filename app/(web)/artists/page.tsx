import type { Metadata } from "next";
import AllArtists from "@/views/AllArtists";
import { Suspense } from "react";
import { getPayload } from "payload";
import config from "@payload-config";

export const revalidate = 3600; // 1 hour

export const metadata: Metadata = {
  title: "Artists",
};

export default async function ArtistsPage() {
  const payload = await getPayload({ config });
  const allArtists = await payload.find({
    collection: "artists",
    depth: 1,
    limit: 0,
  });
  const cities = await payload.find({
    collection: "city",
    depth: 1,
    limit: 0,
  });

  return (
    <>
      <Suspense fallback={<div>Loading artists...</div>}>
        <AllArtists allArtists={allArtists.docs} cities={cities.docs} />
      </Suspense>
    </>
  );
}
