import React from "react";
import dayjs from "dayjs";
import Link from "next/link";

import Slider from "../components/Slider";
import Tag from "../components/Tag";
import DotButton from "../components/ui/DotButton";

const UpcomingShows = ({ shows, heading = "Coming up on OROKO" }) => {
  return (
    <div className="overflow-hidden bg-orokoBlue border-b-2 border-black">
      <div className="flex justify-between p-8">
        <h1 className="font-serif text-6xl">{heading}</h1>
        <Link href="/radio#all-shows" passHref>
          <div className="hidden md:block mt-4">
            <DotButton transparent size="large">
              All Shows
            </DotButton>
          </div>
        </Link>
      </div>

      <Slider>
        {shows.length > 0 ? (
          shows.map(
            (
              {
                title,
                date,
                slug,
                artistsCollection,
                genresCollection,
                coverImage,
              },
              idx
            ) => (
              <Slider.Card
                imageUrl={coverImage.url}
                title={title}
                link={`/radio/${slug}`}
                cardWidth="quarter"
                key={idx}
                idx={idx}
              >
                <div className="p-4">
                  <p className="font-sans mb-2 font-semibold">
                    {dayjs(date).format("DD MMM YYYY / HH") + "H"}
                  </p>
                  <h1 className="font-heading mb-4 text-4xl">{title}</h1>
                  <div className="flex flex-wrap gap-1">
                    <Tag
                      text={artistsCollection.items[0].city.name}
                      color="blue"
                      card
                    />
                    {genresCollection.items.map(({ name }, idx) => (
                      <Tag key={idx} text={name} transparent card />
                    ))}
                  </div>
                </div>
              </Slider.Card>
            )
          )
        ) : (
          <h2 className="font-sans text-2xl">NO UPCOMING SHOWS</h2>
        )}
      </Slider>
    </div>
  );
};

export default UpcomingShows;
