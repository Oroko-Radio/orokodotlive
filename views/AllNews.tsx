import cn from "classnames";
import Link from "next/link";
import dayjs from "dayjs";
import Card from "../components/Card";
import Tag from "../components/Tag";
import { ArticleInterface } from "../types/shared";
import DotButton from "../components/ui/DotButton";

const AllNews = ({
  articles,
  heading = "All News",
  bgColor = "white",
  home = false,
}: {
  articles: ArticleInterface[];
  heading?: string;
  bgColor?: "white" | "gray";
  home?: boolean;
}) => {
  return (
    <div
      id="all-news"
      className={cn("", {
        "bg-orokoGray": bgColor === "gray",
      })}
    >
      <div className="flex justify-between py-8 px-4 md:px-8 pb-0">
        <h1 className="font-serif text-4xl md:text-5xl">{heading}</h1>
        {home && (
          <Link href="/news#all-news" passHref>
            <div className="hidden md:block mt-4">
              <DotButton transparent size="large">
                All News
              </DotButton>
            </div>
          </Link>
        )}
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 p-4 md:p-8 xl:pb-12">
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
                    <p className="font-sans mb-2 font-medium">
                      {dayjs(date).format("DD MMMM YYYY")}
                    </p>
                    <h1 className="font-heading reduced-leading mb-2 text-4xl">
                      {title}
                    </h1>
                    <p className="mb-4 text-lg md:text-2xl">{subtitle}</p>
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
