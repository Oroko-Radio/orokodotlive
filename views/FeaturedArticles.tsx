import React from "react";
import dayjs from "dayjs";
import Link from "next/link";

import Slider from "../components/Slider";
import Tag from "../components/Tag";
import DotButton from "../components/ui/DotButton";
import SliderCard from "../components/SliderCard";

const FeaturedArticles = ({ featuredArticles, heading = "Featured News" }) => {
  return (
    <>
      <div className="overflow-hidden">
        <div className="flex justify-between py-8 px-4 md:px-8">
          <h1 className="font-serif text-4xl md:text-5xl">{heading}</h1>
          <Link href="/news#all-news" passHref>
            <div className="hidden md:block mt-4">
              <DotButton transparent size="large">
                All News
              </DotButton>
            </div>
          </Link>
        </div>

        <Slider>
          {featuredArticles.map(
            (
              { title, date, slug, articleType, city, subtitle, coverImage },
              idx,
            ) => (
              <SliderCard
                imageUrl={coverImage.url}
                title={title}
                link={`/news/${slug}`}
                key={idx}
                idx={idx}
                bgColor="gray"
              >
                <div className="p-4">
                  <div className="flex flex-wrap gap-1 mb-4">
                    {city && <Tag text={city.name} color="gray" card />}
                    <Tag text={articleType} transparent card />
                  </div>
                  <p className="font-sans mb-2 font-semibold">
                    {dayjs.utc(date).tz("Europe/Oslo").format("DD MMMM YYYY")}
                  </p>
                  <h1 className="font-heading card-leading mb-1 text-4xl">
                    {title}
                  </h1>
                  <p className="font-serif mb-4 text-lg md:text-2xl">
                    {subtitle}
                  </p>
                </div>
              </SliderCard>
            ),
          )}
        </Slider>
      </div>
    </>
  );
};

export default FeaturedArticles;
