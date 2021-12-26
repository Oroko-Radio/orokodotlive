import React from "react";
import dayjs from "dayjs";

import Card from "../components/Card";
import Tag from "../components/Tag";

const AllShows = ({ shows }) => {
  return (
    <div className="bg-offBlack">
      <h1 className="font-serif text-white text-6xl p-8">All Shows</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
        {shows.map(
          ({ title, date, slug, city, genresCollection, coverImage }, idx) => (
            <div key={idx} className="border-black border-2 bg-white">
              <Card
                imageUrl={coverImage.url}
                title={title}
                link={`/radio/${slug}`}
              >
                <div className="p-4">
                  <div className="flex flex-wrap gap-1 mb-4">
                    {city && <Tag text={city} color="black" />}
                  </div>
                  <p className="font-sans mb-2 font-semibold">
                    {dayjs(date).format("DD MMMM YYYY")}
                  </p>
                  <h1 className="font-heading mb-1 text-4xl">{title}</h1>
                </div>
              </Card>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AllShows;
