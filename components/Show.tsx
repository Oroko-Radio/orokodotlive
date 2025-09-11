import Tag from "./Tag";
import { Show as ShowType } from "@/payload-types";
import FeaturedTag from "./FeaturedTag";
import DateTimeWrapper from "./DateTimeWrapper";

interface ShowProps {
  show: ShowType;
  cityColor?: "black" | "blue" | "orange" | "green" | "gray";
}

export default function Show({ show, cityColor }: ShowProps) {
  const { date, title, isFeatured, artists, genres } = show;

  // Extract and normalize artist names
  const artistNames =
    artists && Array.isArray(artists)
      ? artists.map((artist) =>
          typeof artist === "object" ? artist.name : artist,
        )
      : [];

  // Extract first artist's city for display
  const firstArtist =
    artists &&
    Array.isArray(artists) &&
    artists[0] &&
    typeof artists[0] === "object"
      ? artists[0]
      : null;

  const cityName = firstArtist?.city
    ? typeof firstArtist.city === "object"
      ? firstArtist.city.name
      : String(firstArtist.city)
    : null;

  // Extract and normalize genre names
  const genreNames =
    genres && Array.isArray(genres)
      ? genres.map((genre) => (typeof genre === "object" ? genre.name : ""))
      : [];

  return (
    <div className="p-4 flex flex-col justify-between flex-1">
      <div>
        <p className="font-sans text-sm md:text-base mb-2 font-medium">
          <DateTimeWrapper date={date} format="DD MMM YYYY HH:mm" />
          <span>H</span>
        </p>
        {isFeatured && <FeaturedTag />}
        <h1 className="font-heading card-leading text-4xl">{title}</h1>
        <h2 className="font-serif text-2xl lg:text-3xl mb-4">
          {" "}
          With{" "}
          {artistNames.map((name, idx) => (
            <span key={idx}>
              <span>{name}</span>
              {idx !== artistNames.length - 1 && ", "}
            </span>
          ))}
        </h2>
      </div>
      <div className="flex flex-wrap gap-1 mb-4">
        {cityName && <Tag text={cityName} color={cityColor} card />}
        {genreNames.map((name, idx) => (
          <Tag key={idx} text={name} transparent card />
        ))}
      </div>
    </div>
  );
}
