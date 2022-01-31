import React from "react";
import dayjs from "dayjs";
import Link from "next/link";

import Slider from "../components/Slider";
import Tag from "../components/Tag";
import DotButton from "../components/ui/DotButton";

const FeaturedArticles = ({ featuredArticles, heading = "Featured News" }) => {
  return (
    <>
      <div className="overflow-hidden">
        <div className="flex justify-between p-8">
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
              idx
            ) => (
              <Slider.Card
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
                    {dayjs(date).format("DD MMMM YYYY")}
                  </p>
                  <h1 className="font-heading mb-1 text-4xl">{title}</h1>
                  <p className="mb-4 text-lg md:text-2xl">{subtitle}</p>
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
