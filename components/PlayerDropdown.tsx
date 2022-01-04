import dayjs from "dayjs";
import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { OROKO_LIVE } from "../constants";
import useRadioCo from "../hooks/useRadioCo";
import { getAllShows } from "../lib/contentful/pages/radio";
import { ShowInterface } from "../types/shared";
import { sort } from "../util";

export default function PlayerDropdown() {
  const { data } = useRadioCo(OROKO_LIVE);
  const [nextUp, setNextUp] = useState<ShowInterface | null>(null);

  const today = dayjs();

  async function getNextUp() {
    const shows = await getAllShows(false);
    const upcomingShows = shows
      .sort(sort.date_ASC)
      .filter((show) => dayjs(show.date).isAfter(today));

    setNextUp(upcomingShows[0]);
  }

  useEffect(() => {
    getNextUp();
  }, []);

  return (
    <section className="grid grid-cols-5 bg-orokoRed border-b-2 border-black shadow-2xl">
      <div className="col-span-3 border-r-2 p-4 border-black">
        <p className="font-sans font-semibold text-black text-sm mb-2">LIVE</p>
        <div className="relative border-2 border-black w-full h-72 mb-4">
          <Image
            src={data.current_track.artwork_url_large}
            alt={data.current_track.title}
            layout="fill"
            objectFit="cover"
            unoptimized
          />
        </div>
        <h1 className="font-heading text-5xl text-black">
          {data.current_track.title.split(" - ")[1]}
        </h1>
        <h1 className="font-serif text-4xl text-black mb-2">
          With {data.current_track.title.split(" - ")[0]}
        </h1>
      </div>
      {nextUp && (
        <div className="col-span-2 bg-orokoBlue p-4 text-black">
          <p className="font-sans font-semibold text-sm mb-2">NEXT UP</p>
          <div className="relative border-2 border-black rounded-full overflow-hidden w-72 h-72 mb-4">
            <Image
              src={nextUp.coverImage.url}
              alt={nextUp.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <p className="font-sans"></p>
          <h1 className="font-heading text-5xl">{nextUp.title}</h1>
          <h2 className="font-serif text-4xl mb-4 lg:mb-10">
            {" "}
            With{" "}
            {nextUp.artistsCollection.items &&
              nextUp.artistsCollection.items.map(({ name, slug }, idx) => (
                <span key={slug}>
                  <span>{name}</span>
                  {idx !== nextUp.artistsCollection.items.length - 1 && ", "}
                </span>
              ))}
          </h2>
        </div>
      )}
    </section>
  );
}
