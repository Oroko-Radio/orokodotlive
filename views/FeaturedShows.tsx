import Slider from "../components/Slider";
import { ShowInterface } from "../types/shared";
import dayjs from "dayjs";
import Tag from "../components/Tag";
import Link from "next/link";
import { GenreTag } from "../components/GenreTag";
import FeaturedTag from "../components/FeaturedTag";
import SliderCard from "../components/SliderCard";

interface FeaturedShowsProps {
  shows: ShowInterface[];
  heading?: string;
}

const FeaturedShows = ({ shows }: FeaturedShowsProps) => {
  return (
    <div className="overflow-hidden bg-orokoOrange border-b-2 border-black">
      <Slider slideByElementWidth fullSize>
        {shows.map(
          (
            {
              title,
              slug,
              date,
              lead,
              coverImage,
              mixcloudLink,
              artistsCollection,
              genresCollection,
            },
            idx,
          ) => (
            <SliderCard
              cardWidth="featured"
              imageUrl={coverImage.url}
              title={title}
              link={`/radio/${slug}`}
              key={idx}
              idx={idx}
              mixcloudLink={mixcloudLink}
            >
              <div className="py-4 lg:p-4 flex flex-col justify-between flex-1">
                <div>
                  <FeaturedTag />
                  <p className="font-sans text-sm md:text-base pb-2 lg:pt-2 lg:pb-4 font-semibold">
                    {dayjs
                      .utc(date)
                      .tz("Europe/Oslo")
                      .format("DD MMM YYYY HH:mm") + "H"}
                  </p>
                  <Link href={"/radio/" + slug} passHref>
                    <div>
                      <h1 className="font-heading card-leading text-4xl lg:text-5xl mb-2">
                        {title}
                      </h1>
                      <h2 className="font-serif text-2xl lg:text-3xl mb-4">
                        {" "}
                        With{" "}
                        {artistsCollection.items &&
                          artistsCollection.items.map(({ name }, idx) => (
                            <span key={idx}>
                              <span>{name}</span>
                              {idx !== artistsCollection.items.length - 1 &&
                                ", "}
                            </span>
                          ))}
                      </h2>
                    </div>
                  </Link>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {artistsCollection.items[0].city && (
                    <Link
                      href={
                        "/artists?city=" + artistsCollection.items[0].city.name
                      }
                      passHref
                    >
                      <Tag
                        text={artistsCollection.items[0].city.name}
                        color="orange"
                      />
                    </Link>
                  )}
                  {genresCollection.items.map((genre, idx) => (
                    <GenreTag genre={genre} key={idx} />
                  ))}
                </div>
                {lead && (
                  <div className="hidden md:block">
                    <p className="mb-4">{lead}</p>
                    <Link href={"/radio/" + slug} className="underline">
                      Read more
                    </Link>
                  </div>
                )}
              </div>
            </SliderCard>
          ),
        )}
      </Slider>
    </div>
  );
};

export default FeaturedShows;
