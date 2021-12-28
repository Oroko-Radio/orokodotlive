import React from "react";
import Image from "next/image";
import { ArticleInterface } from "../types/shared";
import Tag from "../components/Tag";
import dayjs from "dayjs";
import { renderRichTextWithImages } from "../lib/rich-text";
import BackButton from "../components/ui/BackButton";

const SingleArticle = ({ article }: { article: ArticleInterface }) => {
  const { articleType, coverImage, title, date, author, city, content } =
    article;

  return (
    <article>
      <div className="relative h-half border-2 border-t-0 border-black">
        <Image
          src={coverImage.url}
          layout="fill"
          alt={title}
          objectFit="cover"
        />
        <div className="absolute top-8 left-8">
          <BackButton />
        </div>
      </div>
      <section className="relative border-2 border-black mb-6">
        <div className="container max-w-4xl mx-auto my-6">
          <div className="mb-6">
            <div className="inline-flex mr-6">
              <Tag text={city.name} color="black" />
              <Tag text={articleType} color="white" />
            </div>
            {date && (
              <p className="mb-0 inline-block font-sans font-semibold tracking-wide text-xl lg:text-2xl">
                {dayjs(date).format("ddd DD MMMM YYYY @ HH") + "H"}
              </p>
            )}
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-4 font-heading md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
            {title}
          </h1>
          <h2 className="font-serif text-4xl lg:text-6xl mb-6 lg:mb-10">
            By <span className="border-b-2 border-black ">{author.name}</span>
          </h2>
        </div>
      </section>
      <section className="container max-w-4xl mx-auto rich-text">
        {renderRichTextWithImages(content)}
      </section>
    </article>
  );
};

export default SingleArticle;
