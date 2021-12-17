import cx from "classnames";
import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getNewsPage } from "../../lib/contentful/pages/news";
import dayjs from "dayjs";
import { renderRichTextWithImages } from "../../lib/rich-text";

export async function getStaticProps({ preview = false }) {
  return {
    props: { preview, ...(await getNewsPage(preview)) },
    revalidate: 60,
  };
}

export default function NewsPage({
  articles,
  featuredArticles,
  preview,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="overflow-hidden">
      <h1 className="font-serif text-6xl m-8">Featured News</h1>
      <div className="ml-8 mb-8 relative">
        <div
          className="absolute cursor-pointer bg-offBlack z-50 right-0 top-1/2 rounded-full h-16 w-16 border-black border-2 flex justify-center items-center"
          onClick={() => {
            const element = document.querySelector("#carousel");
            element.scrollTo({ top: 0, left: 1000, behavior: "smooth" });
          }}
        >
          <p className="text-white font-sans mb-0">{">"}</p>
        </div>
        <div className="flex overflow-x-scroll" id="carousel">
          {featuredArticles.map(
            (
              { articleType, city, title, date, subtitle, coverImage, slug },
              idx
            ) => (
              <div
                key={slug}
                className={cx(
                  "inline-block flex-shrink-0 w-2/5 bg-orokoGray cursor-pointer border-2 border-black",
                  {
                    "border-l-0": idx !== 0,
                  }
                )}
              >
                <Link href={`/news/${slug}`} passHref>
                  <div>
                    <div className="relative w-full h-80">
                      <Image
                        src={coverImage.url}
                        alt={title}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="border-2 border-black inline-block mb-4">
                        {city && (
                          <p className="font-sans inline-block font-semibold text-sm mb-0 bg-black text-white border-r-2 border-black px-3 py-1">
                            {city.toUpperCase()}
                          </p>
                        )}
                        <p className="font-sans inline-block font-semibold text-sm py-1 px-3 mb-0">
                          {articleType.toUpperCase()}
                        </p>
                      </div>
                      <p className="font-sans mb-2 font-semibold">
                        {dayjs(date).format("DD MMMM YYYY")}
                      </p>
                      <h1 className="font-heading mb-1 text-4xl">{title}</h1>
                      <p className="mb-4 text-2xl">{subtitle}</p>
                    </div>
                  </div>
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
