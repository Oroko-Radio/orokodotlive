import type { Metadata } from "next";
import { getRadioPage } from "../../lib/contentful/pages/radio";
import AllShows from "../../views/AllShows";
import { Suspense } from "react";

export const revalidate = 3600; // 1 hour

export const metadata: Metadata = {
  title: "Radio",
};

export default async function RadioPage() {
  const { shows, genreCategories } = await getRadioPage(false);

  return (
    <>
      <Suspense fallback={<div>Loading shows...</div>}>
        <AllShows initialShows={shows} genreCategories={genreCategories} />
      </Suspense>
    </>
  );
}
