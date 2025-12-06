import React from "react";
import dayjs from "dayjs";
import "@/util";
import Link from "next/link";
import Slider from "@/components/Slider";
import Tag from "@/components/Tag";
import DotButton from "@/components/ui/DotButton";
import SliderCard from "@/components/SliderCard";
import type { Article } from "@/payload-types";

const FeaturedArticles = ({
  featuredArticles,
  heading = "Featured News",
}: {
  featuredArticles: Article[];
  heading?: string;
}) => {
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
          {featuredArticles.map((article, idx) => (
            <SliderCard
              imageUrl={
                typeof article.coverImage === "object" &&
                article.coverImage?.sizes?.["small-full"]?.url
                  ? article.coverImage.sizes["small-full"].url
                  : typeof article.coverImage === "object" &&
                      article.coverImage?.url
                    ? article.coverImage.url
                    : ""
              }
              objectPosition={
                typeof article.coverImage === "object"
                  ? `${article.coverImage?.focalX ?? 50}% ${article.coverImage?.focalY ?? 50}%`
                  : "center"
              }
              title={article.title}
              link={`/news/${article.slug}`}
              key={idx}
              idx={idx}
              bgColor="gray"
            >
              <div className="p-4">
                <div className="flex flex-wrap gap-1 mb-4">
                  {typeof article.city === "object" && article.city && (
                    <Tag text={article.city.name} color="gray" card />
                  )}
                  <Tag text={article.articleType} transparent card />
                </div>
                <p className="font-sans mb-2 font-semibold">
                  {dayjs
                    .utc(article.date)
                    .tz("Europe/Oslo")
                    .format("DD MMMM YYYY")}
                </p>
                <h1 className="font-heading card-leading mb-1 text-4xl">
                  {article.title}
                </h1>
                {article.subtitle && (
                  <p className="font-serif mb-4 text-lg md:text-2xl">
                    {article.subtitle}
                  </p>
                )}
              </div>
            </SliderCard>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default FeaturedArticles;
