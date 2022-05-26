import { useEffect, useState } from "react";
import Card from "../components/Card";
import Show from "../components/Show";
import Tag from "../components/Tag";
import Button from "../components/ui/Button";
import { ShowInterface } from "../types/shared";

const AllShows = ({
  shows,
  genres,
}: {
  shows: ShowInterface[];
  genres: string[];
}) => {
  const [viewingNumber, setViewingNumber] = useState<number>(25);
  const [filteredShows, setFilteredShows] = useState<ShowInterface[]>(shows);
  const [genreFilter, setGenreFilter] = useState<string>("all");

  useEffect(() => {
    setFilteredShows(
      shows.filter((show) => {
        if (genreFilter === "all") return show;
        const currentGenres = [];
        show.genresCollection.items.forEach(({ name }) => {
          currentGenres.push(name);
        });
        if (currentGenres.includes(genreFilter)) return show;
      })
    );
  }, [genreFilter, shows]);

  return (
    <div className="bg-offBlack px-4 md:px-8" id="all-shows">
      <h1 className="font-serif text-white text-4xl md:text-5xl py-8">
        All Shows
      </h1>

      <select
        className="appearance-none self-center bg-transparent border-white border-2 text-lg md:text-2xl text-white"
        value={genreFilter}
        onChange={(e) => setGenreFilter(e.target.value)}
      >
        <option value="all">ALL GENRES</option>
        {genres.map((genre, idx) => (
          <option value={genre} key={idx}>
            {genre.toUpperCase()}
          </option>
        ))}
      </select>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 py-8 xl:pb-12">
        {filteredShows.slice(0, viewingNumber).map((show, idx) => (
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
      {viewingNumber < filteredShows.length && (
        <div className="pl-4 md:pl-8 pt-4 pb-12">
          <Button onClick={() => setViewingNumber(viewingNumber + 25)}>
            Load More Shows
          </Button>
        </div>
      )}
    </div>
  );
};

export default AllShows;
