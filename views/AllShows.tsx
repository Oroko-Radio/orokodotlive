import { useCallback, useEffect, useState } from "react";
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
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

const AllShows = ({
  shows,
  genreCategories,
}: {
  shows: ShowInterface[];
  genreCategories: GenreCategoryInterface[];
}) => {
  const [genres, setGenres] = useState<GenreInterface[]>([]);
  const [genreSkip, setGenreSkip] = useState<number>(LIMITS.SHOWS);
  const [allShows, setAllShows] = useState<ShowInterface[]>(shows);
  const [skip, setSkip] = useState<number>(LIMITS.SHOWS);
  const [more, setMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams()!;
  const pathname = usePathname();

  const category = searchParams.get("category") || "all";
  const genre = searchParams.get("genre");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  /* Change category */
  useEffect(() => {
    if (category === "all") {
      setMore(true);
      setGenres([]);
      setAllShows(shows);
      return;
    }
    setAllShows([]);
    const cat = genreCategories.find((c) => c.name === category);
    const genres = cat.linkedFrom.genresCollection.items;
    setGenres(genres);
  }, [category, genreCategories, shows]);

  /* Change genre */
  useEffect(() => {
    if (!genre) return;
    setGenreSkip(LIMITS.SHOWS);

    async function getShows() {
      const shows = await getShowsByGenre(genre, LIMITS.SHOWS, 0);
      if (shows.length >= LIMITS.SHOWS) {
        setMore(true);
      } else {
        setMore(false);
      }
      setAllShows(shows);
    }
    getShows();
  }, [genre]);

  async function handleLoadMoreShows() {
    setLoading(true);
    if (category === "all") {
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

  return (
    <div className="bg-offBlack px-4 md:px-8" id="all-shows">
      <h1 className="font-serif text-white text-4xl md:text-5xl py-8">
        All Shows
      </h1>

      <div className="flex flex-wrap gap-2 mb-4">
        <Link href={pathname} passHref scroll={false}>
          <Tag
            text={"all"}
            color={category === "all" ? "selected" : "white"}
            borderColor={category === "all" ? "white" : null}
          />
        </Link>

        {genreCategories.map(({ name }, idx) => (
          <Link
            key={idx}
            href={pathname + "?" + createQueryString("category", name)}
            scroll={false}
            passHref
          >
            <Tag
              text={name}
              color={category === name ? "selected" : "white"}
              borderColor={category === name ? "white" : null}
            />
          </Link>
        ))}
      </div>

      <div>
        <div className="text-white flex flex-wrap gap-2">
          {genres.map((g, idx) => (
            <Link
              key={idx}
              href={pathname + "?" + createQueryString("genre", g.name)}
              passHref
              scroll={false}
            >
              <Tag text={g.name} color={genre === g.name ? "selected" : null} />
            </Link>
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
