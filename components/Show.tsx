import dayjs from "dayjs";
import "@/util";
import Tag from "./Tag";
import { Show as ShowType } from "@/payload-types";
import FeaturedTag from "./FeaturedTag";

interface ShowProps {
  show: ShowType;
  cityColor?: "black" | "blue" | "orange" | "green" | "gray";
}

export default function Show({ show, cityColor }: ShowProps) {
  const { date, title, isFeatured, artists, genres } = show;

  return (
    <div className="p-4 flex flex-col justify-between flex-1">
      <div>
        <p className="font-sans text-sm md:text-base mb-2 font-semibold">
          {dayjs(date).tz("Europe/Oslo").format("DD MMM YYYY HH:mm") + "H"}
        </p>
        {isFeatured && <FeaturedTag />}
        <h1 className="font-heading card-leading text-4xl">{title}</h1>
        <h2 className="font-serif text-2xl lg:text-3xl mb-4">
          {" "}
          With{" "}
          {artists &&
            Array.isArray(artists) &&
            artists.map((artist: any, idx: number) => (
              <span key={idx}>
                <span>{typeof artist === "object" ? artist.name : artist}</span>
                {idx !== artists.length - 1 && ", "}
              </span>
            ))}
        </h2>
      </div>
      <div className="flex flex-wrap gap-1 mb-4">
        {artists &&
          Array.isArray(artists) &&
          artists[0] &&
          typeof artists[0] === "object" &&
          artists[0].city && (
            <Tag
              text={
                typeof artists[0].city === "object"
                  ? artists[0].city.name
                  : String(artists[0].city)
              }
              color={cityColor}
              card
            />
          )}
        {genres &&
          Array.isArray(genres) &&
          genres.map((genre: any, idx: number) => (
            <Tag
              key={idx}
              text={typeof genre === "object" ? genre.name : genre}
              transparent
              card
            />
          ))}
      </div>
    </div>
  );
}
