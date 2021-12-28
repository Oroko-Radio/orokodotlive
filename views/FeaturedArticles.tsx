import React from "react";
import dayjs from "dayjs";

import Slider from "../components/Slider";
import Tag from "../components/Tag";

const FeaturedArticles = ({ featuredArticles, heading = "Featured News" }) => {
  return (
    <>
      <div className="overflow-hidden">
        <h1 className="font-serif text-6xl m-8">{heading}</h1>

        <Slider>
          {featuredArticles.map(
            (
              { title, date, slug, articleType, city, subtitle, coverImage },
              idx
            ) => (
              <Slider.Card
                imageUrl={coverImage.url}
                title={title}
                link={`/news/${slug}`}
                key={idx}
                idx={idx}
              >
                <div className="p-4">
                  <div className="flex flex-wrap gap-1 mb-4">
                    {city && <Tag text={city.name} color="black" card />}
                    <Tag text={articleType} color="white" card />
                  </div>
                  <p className="font-sans mb-2 font-semibold">
                    {dayjs(date).format("DD MMMM YYYY")}
                  </p>
                  <h1 className="font-heading mb-1 text-4xl">{title}</h1>
                  <p className="mb-4 text-2xl">{subtitle}</p>
                </div>
              </Slider.Card>
            )
          )}
        </Slider>
      </div>
    </>
  );
};

export default FeaturedArticles;
