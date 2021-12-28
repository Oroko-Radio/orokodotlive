import React from "react";
import dayjs from "dayjs";

import Card from "../components/Card";
import Tag from "../components/Tag";

const AllNews = ({ articles }) => {
  return (
    <>
      <h1 className="font-serif text-6xl m-8">All News</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 m-8">
        {articles.map(
          (
            { title, date, slug, articleType, city, subtitle, coverImage },
            idx
          ) => (
            <div key={idx} className="border-black border-2">
              <Card
                imageUrl={coverImage.url}
                title={title}
                link={`/news/${slug}`}
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
              </Card>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default AllNews;
