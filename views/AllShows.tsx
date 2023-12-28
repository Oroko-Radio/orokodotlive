import { useEffect, useMemo, useState } from "react";
import Card from "../components/Card";
import Show from "../components/Show";
import Tag from "../components/Tag";
import Button from "../components/ui/Button";
import {
  GenreCategoryInterface,
  GenreInterface,
  ShowInterface,
} from "../types/shared";
import { getAllShows } from "../lib/contentful/pages/radio";
import { LIMITS } from "../lib/contentful";

const AllShows = ({
  shows,
  genreCategories,
}: {
  shows: ShowInterface[];
  genreCategories: GenreCategoryInterface[];
}) => {
  const [skip, setSkip] = useState<number>(LIMITS.SHOWS);
  const [genreFilter, setGenreFilter] = useState<string>("all");
  const [allShows, setAllShows] = useState<ShowInterface[]>(shows);
  const [more, setMore] = useState(true);
  const [genres, setGenres] = useState<GenreInterface[]>([]);
  const [loading, setLoading] = useState(false);

  const filteredShows = useMemo(() => {
    return allShows
      .filter((show) => {
        if (genreFilter === "all") return show;

        const genreCategories = show.genresCollection.items.map((genre) => {
          if (genre.genreCategory) return genre.genreCategory.name;
        });

        if (genreCategories.includes(genreFilter)) return show;
      })
      .sort((a, b) => (a.date > b.date ? -1 : 1));
  }, [genreFilter, allShows]);

  async function handleLoadMoreShows() {
    setLoading(true);
    const moreShows = await getAllShows(false, LIMITS.SKIP, skip);
    if (moreShows.length < LIMITS.SKIP) {
      setMore(false);
      return;
    }
    const concatenatedShows = allShows.concat(moreShows);
    setAllShows(concatenatedShows);
    setSkip(skip + LIMITS.SKIP);
    setLoading(false);
  }

  useEffect(() => {
    if (genreFilter === "all") return;
    const category = genreCategories.find(
      (category) => category.name === genreFilter
    );
    const genres = category.linkedFrom.genresCollection.items;
    setGenres(genres);
  }, [genreFilter, genreCategories]);

  return (
    <div className="bg-offBlack px-4 md:px-8" id="all-shows">
      <h1 className="font-serif text-white text-4xl md:text-5xl py-8">
        All Shows
      </h1>

      <div className="flex flex-wrap gap-2 mb-4">
        <div
          className="cursor-pointer"
          onClick={() => {
            setGenreFilter("all");
            setGenres([]);
          }}
        >
          <Tag
            text={"all"}
            color={genreFilter === "all" ? "selected" : "white"}
            borderColor={genreFilter === "all" ? "white" : null}
          />
        </div>

        {genreCategories.map(({ name }, idx) => (
          <div
            key={idx}
            className="cursor-pointer"
            onClick={() => setGenreFilter(name)}
          >
            <Tag
              text={name}
              color={genreFilter === name ? "selected" : "white"}
              borderColor={genreFilter === name ? "white" : null}
            />
          </div>
        ))}
      </div>

      <div>
        <div className="text-white flex flex-wrap gap-2">
          {genres.map((genre, idx) => (
            <Tag key={idx} text={genre.name} />
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 py-8 xl:pb-12">
        {filteredShows.length < 1 ? (
          <div className="text-white">No recent shows in this genre</div>
        ) : (
          filteredShows.map((show, idx) => (
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
          ))
        )}
      </div>

      {more ? (
        <div className="pl-4 md:pl-8 pt-4 pb-12">
          <Button onClick={handleLoadMoreShows}>
            {loading ? "Loading" : "Load More Shows"}
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default AllShows;
