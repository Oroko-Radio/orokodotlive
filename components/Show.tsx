import dayjs from "dayjs";
import Tag from "./Tag";
import { ShowInterface } from "../types/shared";

interface ShowProps {
  show: ShowInterface;
  cityColor?: "black" | "blue" | "orange" | "green" | "gray";
}

export default function Show({ show, cityColor }: ShowProps) {
  const { date, title, artistsCollection, genresCollection } = show;

  return (
    <div className="p-4">
      <p className="font-sans text-sm md:text-base mb-2 font-semibold">
        {dayjs(date).format("DD MMM YYYY HH:mm") + "H"}
      </p>
      <h1 className="font-heading mb-0 text-4xl">{title}</h1>
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
      <div className="flex flex-wrap gap-1 mb-4">
        <Tag
          text={artistsCollection.items[0].city.name}
          color={cityColor}
          card
        />
        {genresCollection.items.map(({ name }, idx) => (
          <Tag key={idx} text={name} transparent card />
        ))}
      </div>
    </div>
  );
}
