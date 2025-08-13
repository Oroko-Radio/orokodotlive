import type { Metadata } from "next";
import AllShows from "@/views/AllShows";
import { getPayload } from "payload";
import config from "@payload-config";
import { SHOWS_PAGE_SIZE } from "@/constants";
import ShowFilters from "@/components/ui/ShowFilters";
import LoadMoreButton from "@/components/ui/LoadMoreButton";
import { Genre } from "@/payload-types";

export const revalidate = 300; // 5 minutes

export const metadata: Metadata = {
  title: "Radio",
};

interface SearchParams {
  category?: string;
  genre?: string;
  page?: string;
}

interface RadioPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function RadioPage({ searchParams }: RadioPageProps) {
  const payload = await getPayload({ config });
  const params = await searchParams;

  const currentCategory = params.category || "all";
  const currentGenre = params.genre || "all";
  const currentPage = parseInt(params.page || "1");

  let shows: any;
  let genreCategories: any;
  let genres: Genre[] = [];

  // Get all genre categories
  genreCategories = await payload.find({
    collection: "genreCategory",
    depth: 0,
    limit: 0,
  });

  // Build query for shows based on filters
  let where: any = {
    date: { less_than_equal: new Date().toISOString().split("T")[0] },
  };

  if (currentGenre !== "all") {
    // Find genre by name
    const genreResult = await payload.find({
      collection: "genres",
      where: { name: { equals: currentGenre } },
      limit: 1,
    });

    if (genreResult.docs.length > 0) {
      where.genres = { contains: genreResult.docs[0].id };
    }
  } else if (currentCategory !== "all") {
    // Find category by name
    const categoryResult = await payload.find({
      collection: "genreCategory",
      where: { name: { equals: currentCategory } },
      limit: 1,
    });

    if (categoryResult.docs.length > 0) {
      // Get all genres in this category
      const categoryGenres = await payload.find({
        collection: "genres",
        where: {
          genreCategory: { contains: categoryResult.docs[0].id },
        },
        limit: 0,
      });

      if (categoryGenres.docs.length > 0) {
        where.genres = {
          in: categoryGenres.docs.map((g) => g.id),
        };
      }
    }
  }

  // Get shows with pagination
  shows = await payload.find({
    collection: "shows",
    depth: 2,
    limit: SHOWS_PAGE_SIZE * currentPage,
    where,
    sort: "-date",
  });

  // If category is selected, get genres for that category
  if (currentCategory !== "all") {
    const categoryResult = await payload.find({
      collection: "genreCategory",
      where: { name: { equals: currentCategory } },
      limit: 1,
    });

    if (categoryResult.docs.length > 0) {
      const categoryGenreData = await payload.find({
        collection: "genres",
        where: {
          genreCategory: { contains: categoryResult.docs[0].id },
        },
        limit: 0,
      });
      genres = categoryGenreData.docs;
    }
  }

  const hasMore = shows.totalDocs > SHOWS_PAGE_SIZE * currentPage;

  return (
    <div className="bg-offBlack px-4 md:px-8">
      <ShowFilters
        genreCategories={genreCategories.docs}
        genres={genres}
        initialCategory={currentCategory}
        initialGenre={currentGenre}
      >
        <>
          <AllShows shows={shows.docs} />

          {hasMore && (
            <div className="flex justify-center py-8">
              <LoadMoreButton
                currentPage={currentPage}
                currentCity={currentCategory}
                currentFilter={currentGenre}
              />
            </div>
          )}
        </>
      </ShowFilters>
    </div>
  );
}
