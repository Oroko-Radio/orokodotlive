import { useEffect, useMemo, useState } from "react";
import Card from "../components/Card";
import Show from "../components/Show";
import Tag from "../components/Tag";
import Button from "../components/ui/Button";
import { GenreCategoryInterface, ShowInterface } from "../types/shared";
import { getShowsByGenreCategory } from "../lib/contentful/pages/radio";

const AllShows = ({
  shows,
  genres,
}: {
  shows: ShowInterface[];
  genres: GenreCategoryInterface[];
}) => {
  const [skip, setSkip] = useState<number>(0);
  const [genreFilter, setGenreFilter] = useState<string>("all");
  const [filteredShows, setFilteredShows] = useState<ShowInterface[]>(shows);

  async function handleGenreCategoryChange(name: string) {
    setSkip(0);
    if (name === "all") {
      setFilteredShows(shows);
      return;
    }

    const showsByGenreCategory = await getShowsByGenreCategory(false, name);
    setGenreFilter(name);
    setFilteredShows(showsByGenreCategory);
  }

  async function handleLoadMoreShows() {
    const newSkip = skip + 4;
    setSkip(newSkip);

    if (genreFilter !== "all") {
      const moreShows = await getShowsByGenreCategory(
        false,
        genreFilter,
        newSkip
      );
      const concatenatedShows = filteredShows.concat(moreShows);
      setFilteredShows(concatenatedShows);
    }
  }

  return (
    <div className="bg-offBlack px-4 md:px-8" id="all-shows">
      <h1 className="font-serif text-white text-4xl md:text-5xl py-8">
        All Shows
      </h1>

      <div className="flex gap-2">
        <div
          className="cursor-pointer"
          onClick={() => handleGenreCategoryChange("all")}
        >
          <Tag text={"all"} color="white" borderColor="white" />
        </div>
        {genres.map(({ name }, idx) => (
          <div
            key={idx}
            className="cursor-pointer"
            onClick={() => handleGenreCategoryChange(name)}
          >
            <Tag text={name} color="white" borderColor="white" />
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 py-8 xl:pb-12">
        {filteredShows.slice(0, skip + 8).map((show, idx) => (
          <div key={idx} className="border-black border-2 bg-white">
            <Card
              imageUrl={show.coverImage.url}
              title={show.title}
              link={`/radio/${show.slug}`}
              mixcloudLink={show.mixcloudLink}
            >
              <Show show={show} cityColor="black" />
            </Card>
          </div>
        ))}
      </div>

      <div className="pl-4 md:pl-8 pt-4 pb-12">
        <Button onClick={handleLoadMoreShows}>Load More Shows</Button>
      </div>
    </div>
  );
};

export default AllShows;
