import type { Metadata } from "next";
import AllArtists from "@/views/AllArtists";
import { Suspense } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import { ARTISTS_PAGE_SIZE } from "@/constants";
import ArtistsFilters from "@/components/ui/ArtistsFilters";
import LoadMoreButton from "@/components/ui/LoadMoreButton";
import { City } from "@/payload-types";

export const metadata: Metadata = {
  title: "Artists",
};

interface SearchParams {
  city?: string;
  filter?: string;
  page?: string;
}

interface ArtistsPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function ArtistsPage({ searchParams }: ArtistsPageProps) {
  const payload = await getPayload({ config });

  const params = await searchParams;

  const currentCity = params.city || "all";
  const currentFilter = params.filter || "all";
  const currentPage = parseInt(params.page || "1");

  // Build query conditions
  const where: any = {};

  if (currentCity !== "all") {
    where.city = { equals: parseInt(currentCity) };
  }

  if (currentFilter === "alumni") {
    where.isAlumni = { equals: true };
  } else if (currentFilter === "residents") {
    where.and = [
      { isResident: { equals: true } },
      { isAlumni: { equals: false } },
    ];
  } else if (currentFilter === "guests") {
    where.isResident = { equals: false };
  }

  const artists = await payload.find({
    collection: "artists",
    depth: 1,
    limit: ARTISTS_PAGE_SIZE * currentPage,
    where: Object.keys(where).length > 0 ? where : undefined,
  });

  // Get all artists for the current filter to build cities list
  const allFilteredArtists = await payload.find({
    collection: "artists",
    depth: 1,
    limit: 0,
    where:
      currentFilter === "alumni"
        ? { isAlumni: { equals: true } }
        : currentFilter === "residents"
          ? {
              and: [
                { isResident: { equals: true } },
                { isAlumni: { equals: false } },
              ],
            }
          : currentFilter === "guests"
            ? { isResident: { equals: false } }
            : undefined,
  });

  // Build unique cities list from filtered artists
  const cities: City[] = allFilteredArtists.docs
    .map((artist) => artist.city)
    .filter(
      (city): city is City =>
        city !== null && city !== undefined && typeof city !== "number",
    )
    .filter(
      (city, index, self) => self.findIndex((c) => c.id === city.id) === index,
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const hasMore = artists.totalDocs > ARTISTS_PAGE_SIZE * currentPage;

  return (
    <div className="bg-orokoYellow px-4 md:px-8">
      <ArtistsFilters
        cities={cities}
        initialCity={currentCity}
        initialFilter={currentFilter}
      >
        <>
          <Suspense fallback={<div>Loading artists...</div>}>
            <AllArtists artists={artists.docs} />
          </Suspense>

          {hasMore && (
            <div className="flex justify-center py-8">
              <LoadMoreButton
                currentPage={currentPage}
                currentCity={currentCity}
                currentFilter={currentFilter}
              />
            </div>
          )}
        </>
      </ArtistsFilters>
    </div>
  );
}

export const revalidate = 300; // 5 minutes
