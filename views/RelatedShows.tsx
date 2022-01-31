import React from "react";
import dayjs from "dayjs";

import Card from "../components/Card";
import Tag from "../components/Tag";
import { ShowInterface } from "../types/shared";

const RelatedShows = ({
  shows,
  city,
}: {
  shows: ShowInterface[];
  city: string;
}) => {
  return (
    <div className="bg-offBlack" id="all-shows">
      <h1 className="font-serif text-white text-4xl md:text-5xl pt-8 px-4 md:px-8 pb-0">
        Related Shows
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 md:p-8 xl:pb-12">
        {shows.map(
          (
            { title, date, slug, genresCollection, coverImage, mixcloudLink },
            idx
          ) => (
            <div key={idx} className="border-black border-2 bg-white">
              <Card
                imageUrl={coverImage.url}
                title={title}
                link={`/radio/${slug}`}
                mixcloudLink={mixcloudLink}
              >
                <div className="p-4">
                  <p className="font-sans mb-2 font-semibold">
                    {dayjs(date).format("DD MMMM YYYY")}
                  </p>
                  <h1 className="font-heading mb-4 text-4xl">{title}</h1>
                  <div className="flex flex-wrap gap-1 mb-4">
                    <Tag text={city} color="black" card />
                    {genresCollection.items.map(({ name }, idx) => (
                      <Tag key={idx} text={name} transparent card />
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default RelatedShows;
