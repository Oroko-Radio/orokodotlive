import cn from "classnames";
import dayjs from "dayjs";
import Card from "../components/Card";
import Tag from "../components/Tag";
import { ArticleInterface } from "../types/shared";

const AllNews = ({
  articles,
  heading = "All News",
  bgColor = "white",
}: {
  articles: ArticleInterface[];
  heading?: string;
  bgColor?: "white" | "gray";
}) => {
  return (
    <div
      id="all-news"
      className={cn("", {
        "bg-orokoGray": bgColor === "gray",
      })}
    >
      <h1 className="font-serif text-6xl p-8">{heading}</h1>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 p-8 xl:pb-12">
        {articles.map(
          (
            { title, date, slug, articleType, city, subtitle, coverImage },
            idx
          ) => (
            <div key={idx}>
              <div className="border-black border-2 bg-white">
                <Card
                  imageUrl={coverImage.url}
                  title={title}
                  link={`/news/${slug}`}
                >
                  <div className="p-4">
                    <div className="flex flex-wrap gap-1 mb-6">
                      {city && <Tag text={city.name} color="black" card />}
                      <Tag text={articleType} transparent card />
                    </div>
                    <p className="font-sans mb-0 font-medium">
                      {dayjs(date).format("DD MMMM YYYY")}
                    </p>
                    <h1 className="font-heading mb-2 text-4xl">{title}</h1>
                    <p className="mb-4 text-2xl">{subtitle}</p>
                  </div>
                </Card>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AllNews;
