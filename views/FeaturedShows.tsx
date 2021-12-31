import React from "react";
import dayjs from "dayjs";

import Slider from "../components/Slider";
import Tag from "../components/Tag";
import { ShowInterface } from "../types/shared";

interface FeaturedShowsProps {
  shows: ShowInterface[];
  heading?: string;
}

const FeaturedShows = ({
  shows,
  heading = "Featured Shows",
}: FeaturedShowsProps) => {
  return (
    <div className="overflow-hidden bg-orokoOrange border-b-2 border-black">
      <h1 className="font-serif text-6xl p-8">{heading}</h1>

      <Slider>
        {shows.map(
          (
            {
              title,
              date,
              slug,
              mixcloudLink,
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
              key={idx}
              idx={idx}
              mixcloudLink={mixcloudLink}
            >
              <div className="p-4">
                <p className="font-sans mb-2 font-semibold">
                  {dayjs(date).format("DD MMM YYYY / HH") + "H"}
                </p>
                <h1 className="font-heading mb-4 text-4xl">{title}</h1>
                <div className="flex flex-wrap gap-1">
                  <Tag
                    text={artistsCollection.items[0].city.name}
                    color="black"
                    card
                  />
                  {genresCollection.items.map(({ name }, idx) => (
                    <Tag key={idx} text={name} color="white" card />
                  ))}
                </div>
              </div>
            </Slider.Card>
          )
        )}
      </Slider>
    </div>
  );
};

export default FeaturedShows;
