import dayjs from "dayjs";
import Tag from "./Tag";
import { ShowInterface } from "@/types/shared";
import FeaturedTag from "./FeaturedTag";

interface ShowProps {
  show: ShowInterface;
  cityColor?: "black" | "blue" | "orange" | "green" | "gray";
}

export default function Show({ show, cityColor }: ShowProps) {
  const { date, title, isFeatured, artistsCollection, genresCollection } = show;

  return (
    <div className="p-4 flex flex-col justify-between flex-1">
      <div>
        <p className="font-sans text-sm md:text-base mb-2 font-semibold">
          {dayjs.utc(date).tz("Europe/Oslo").format("DD MMM YYYY HH:mm") + "H"}
        </p>
        {isFeatured && <FeaturedTag />}
        <h1 className="font-heading card-leading text-4xl">{title}</h1>
        <h2 className="font-serif text-2xl lg:text-3xl mb-4">
          {" "}
          With{" "}
          {artistsCollection.items &&
            artistsCollection.items.map(({ name }, idx) => (
              <span key={idx}>
                <span>{name}</span>
                {idx !== artistsCollection.items.length - 1 && ", "}
              </span>
            ))}
        </h2>
      </div>
      <div className="flex flex-wrap gap-1 mb-4">
        {artistsCollection.items[0].city && (
          <Tag
            text={artistsCollection.items[0].city.name}
            color={cityColor}
            card
          />
        )}
        {genresCollection.items.map(({ name }, idx) => (
          <Tag key={idx} text={name} transparent card />
        ))}
      </div>
    </div>
  );
}
