import dayjs from "dayjs";
import Tag from "./Tag";
import { ShowInterface } from "../types/shared";
import ConcentricCircles from "./ui/ConcentricCircles";

interface ShowProps {
  show: ShowInterface;
  featured: boolean;
  cityColor?: "black" | "blue" | "orange" | "green" | "gray";
}

export default function Show({ show, featured, cityColor }: ShowProps) {
  const { date, title, artistsCollection, genresCollection, content } = show;

  return (
    <div className="p-4 flex flex-col justify-between flex-1">
      <div>
        <div className="flex items-center mb-4 pl-1">
          <ConcentricCircles />
          <p className="font-sans text-sm md:text-base font-semibold uppercase">
            Featured Show
          </p>
        </div>
        <p className="font-sans text-sm md:text-base mb-2 font-semibold">
          {dayjs(date).format("DD MMM YYYY HH:mm") + "H"}
        </p>
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
      {featured && (
        <div className="hidden md:block">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem eius quos
          enim ex ab debitis, deleniti natus molestiae nihil! Aperiam doloribus
          dolore voluptate enim, aut reiciendis, cum ipsam veritatis eligendi
          iure molestias, minima ea unde soluta earum recusandae molestiae
          praesentium facilis deleniti esse? Corrupti repellendus temporibus
          voluptates! Alias, tempore natus?
        </div>
      )}
    </div>
  );
}
