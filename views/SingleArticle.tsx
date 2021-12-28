import React from "react";
import Image from "next/image";
import { ArticleInterface } from "../types/shared";
import Tag from "../components/Tag";

const SingleArticle = ({ article }: { article: ArticleInterface }) => {
  const { articleType, coverImage, title, date, author, city, content } =
    article;

  return (
    <article>
      <div className="relative h-half border-r-2 border-l-2 border-black">
        <Image
          src={coverImage.url}
          layout="fill"
          alt={title}
          objectFit="cover"
        />
      </div>
      <section>
        <div className="flex">
          <Tag text={city.name} color="black" />
          <Tag text={articleType} color="white" />
        </div>
      </section>
    </article>
  );
};

export default SingleArticle;
