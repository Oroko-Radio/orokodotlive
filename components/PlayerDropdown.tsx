import cn from "classnames";
import Image from "next/legacy/image";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { OROKO_LIVE } from "../constants";
import useRadioCo from "../hooks/useRadioCo";
import { getUpcomingShows } from "../lib/contentful/pages/radio";
import { ShowInterface } from "../types/shared";

export default function PlayerDropdown() {
  const { data } = useRadioCo(OROKO_LIVE);
  const [nextUp, setNextUp] = useState<ShowInterface | null>(null);

  async function getNextUp() {
    const upcomingShows = await getUpcomingShows(false);
    setNextUp(upcomingShows[0]);
  }

  useEffect(() => {
    getNextUp();
    // eslint-disable-next-line
  }, []);

  return (
    <section
      className={cn(
        "md:grid mx-auto border-b-2 lg:border-2 lg:border-t-0 border-black shadow-3xl",
        {
          "grid-cols-2 max-w-5xl xl:max-w-6xl": nextUp,
          "max-w-3xl md:border-r-2 md:border-l-2": !nextUp,
        }
      )}
    >
      <div className="flex-grow p-4 bg-orokoRed">
        <div className="relative border-2 border-black w-full h-72 xl:h-96 mb-4">
          <Image
            src={
              data.current_track.artwork_url_large ||
              "https://oroko.live/OROKO_OG_1200px.png"
            }
            priority
            alt={data.current_track.title}
            layout="fill"
            objectFit="cover"
            unoptimized
          />
        </div>
        <p className="font-sans font-semibold text-black text-sm mb-2">
          NOW PLAYING
        </p>
        <h1 className="font-heading text-3xl md:text-5xl text-black">
          {data.current_track.title.split(" - ")[1]}
        </h1>
        <h1 className="font-serif text-2xl md:text-4xl text-black mb-2">
          With {data.current_track.title.split(" - ")[0]}
        </h1>
      </div>
      {nextUp && (
        <div className="bg-orokoBlue h-full p-4 text-black border-t-2 md:border-t-0 md:border-l-2 border-black">
          <div className="hidden md:flex justify-center">
            <div className="relative border-2 border-black rounded-full overflow-hidden w-72 h-72 xl:w-96 xl:h-96 mb-4">
              <Image
                quality={50}
                priority
                src={nextUp.coverImage.url}
                alt={nextUp.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="font-semibold mb-2 flex gap-3">
            <p className="font-sans text-sm mb-0">NEXT UP</p>
            <p className="font-sans text-sm mb-0">
              {dayjs(nextUp.date).format("DD MMM / HH").toUpperCase() + "H"}
            </p>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl">{nextUp.title}</h1>
          <h2 className="font-serif text-2xl md:text-4xl mb-4 lg:mb-10">
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
