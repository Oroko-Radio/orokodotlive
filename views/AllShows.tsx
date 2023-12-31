import { useEffect, useState } from "react";
import Card from "../components/Card";
import Show from "../components/Show";
import Tag from "../components/Tag";
import Button from "../components/ui/Button";
import {
  GenreCategoryInterface,
  GenreInterface,
  ShowInterface,
} from "../types/shared";
import { getAllShows, getShowsByGenre } from "../lib/contentful/pages/radio";
import { LIMITS } from "../lib/contentful";

const AllShows = ({
  shows,
  genreCategories,
}: {
  shows: ShowInterface[];
  genreCategories: GenreCategoryInterface[];
}) => {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [genres, setGenres] = useState<GenreInterface[]>([]);
  const [genre, setGenre] = useState<string | null>(null);
  const [genreSkip, setGenreSkip] = useState<number>(LIMITS.SHOWS);
  const [allShows, setAllShows] = useState<ShowInterface[]>(shows);
  const [skip, setSkip] = useState<number>(LIMITS.SHOWS);
  const [more, setMore] = useState(true);
  const [loading, setLoading] = useState(false);

  async function handleLoadMoreShows() {
    setLoading(true);
    if (categoryFilter === "all") {
      const moreShows = await getAllShows(false, LIMITS.SKIP, skip);
      if (moreShows.length < LIMITS.SKIP) {
        setMore(false);
        return;
      }
      const concatenatedShows = allShows.concat(moreShows);
      setAllShows(concatenatedShows);
      setSkip(skip + LIMITS.SKIP);
    } else {
      const moreShows = await getShowsByGenre(genre, LIMITS.SKIP, genreSkip);
      if (moreShows.length < LIMITS.SKIP) {
        setMore(false);
        return;
      }
      const concatenatedShows = allShows.concat(moreShows);
      setAllShows(concatenatedShows);
      setGenreSkip(genreSkip + LIMITS.SKIP);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (categoryFilter === "all") return;
    const category = genreCategories.find(
      (category) => category.name === categoryFilter
    );
    const genres = category.linkedFrom.genresCollection.items;
    setGenres(genres);
  }, [categoryFilter, genreCategories]);

  return (
    <div className="bg-offBlack px-4 md:px-8" id="all-shows">
      <h1 className="font-serif text-white text-4xl md:text-5xl py-8">
        All Shows
      </h1>

      <div className="flex flex-wrap gap-2 mb-4">
        <div
          className="cursor-pointer"
          onClick={() => {
            setCategoryFilter("all");
            setMore(true);
            setGenres([]);
          }}
        >
          <Tag
            text={"all"}
            color={categoryFilter === "all" ? "selected" : "white"}
            borderColor={categoryFilter === "all" ? "white" : null}
          />
        </div>

        {genreCategories.map(({ name }, idx) => (
          <div
            key={idx}
            className="cursor-pointer"
            onClick={() => setCategoryFilter(name)}
          >
            <Tag
              text={name}
              color={categoryFilter === name ? "selected" : "white"}
              borderColor={categoryFilter === name ? "white" : null}
            />
          </div>
        ))}
      </div>

      <div>
        <div className="text-white flex flex-wrap gap-2">
          {genres.map((g, idx) => (
            <div
              key={idx}
              className="cursor-pointer"
              onClick={async () => {
                setGenre(g.name);
                setMore(true);
                setGenreSkip(LIMITS.SHOWS);
                const shows = await getShowsByGenre(g.name, LIMITS.SHOWS, 0);
                if (shows.length < LIMITS.SHOWS) {
                  setMore(false);
                }
                setAllShows(shows);
              }}
            >
              <Tag text={g.name} color={genre === g.name ? "selected" : null} />
            </div>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 py-8 xl:pb-12">
        {allShows.length < 1 ? (
          <div className="text-white">No shows in this genre</div>
        ) : (
          allShows.map((show, idx) => (
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
