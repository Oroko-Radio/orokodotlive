import Slider from "@/components/Slider";
import { Show as ShowType } from "@/payload-types";
import DateTime from "@/components/DateTime";
import Tag from "@/components/Tag";
import Link from "next/link";
import { GenreTag } from "@/components/GenreTag";
import FeaturedTag from "@/components/FeaturedTag";
import SliderCard from "@/components/SliderCard";

interface FeaturedShowsProps {
  shows: ShowType[];
  heading?: string;
}

const FeaturedShows = ({ shows }: FeaturedShowsProps) => {
  return (
    <div className="overflow-hidden bg-orokoOrange border-b-2 border-black">
      <Slider slideByElementWidth fullSize>
        {shows.map((show, idx) => {
          const coverImageUrl =
            typeof show.coverImage === "object" &&
            show.coverImage?.sizes?.["large-full"]?.url
              ? show.coverImage.sizes["large-full"].url
              : typeof show.coverImage === "object" && show.coverImage?.url
                ? show.coverImage.url
                : "/default-cover.jpg";

          return (
            <SliderCard
              cardWidth="featured"
              imageUrl={coverImageUrl}
              objectPosition={
                typeof show.coverImage === "object"
                  ? `${show.coverImage?.focalX ?? 50}% ${show.coverImage?.focalY ?? 50}%`
                  : "center"
              }
              title={show.title}
              link={`/radio/${show.slug}`}
              key={idx}
              idx={idx}
              mixcloudLink={show.mixcloudLink || undefined}
            >
              <div className="py-4 lg:p-4 flex flex-col justify-between flex-1">
                <div>
                  <FeaturedTag />
                  <p className="font-sans text-sm md:text-base pb-2 lg:pt-2 lg:pb-4 font-medium">
                    <DateTime date={show.date} format="DD MMM YYYY HH:mm" />
                    <span>H</span>
                  </p>
                  <Link href={"/radio/" + show.slug} passHref>
                    <div>
                      <h1 className="font-heading card-leading text-4xl lg:text-5xl mb-2">
                        {show.title}
                      </h1>
                      <h2 className="font-serif text-2xl lg:text-3xl mb-4">
                        {" "}
                        With{" "}
                        {show.artists &&
                          Array.isArray(show.artists) &&
                          show.artists.map((artist: any, artistIdx: number) => (
                            <span key={artistIdx}>
                              <span>
                                {typeof artist === "object"
                                  ? artist.name
                                  : artist}
                              </span>
                              {artistIdx !== show.artists!.length - 1 && ", "}
                            </span>
                          ))}
                      </h2>
                    </div>
                  </Link>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {show.artists &&
                    Array.isArray(show.artists) &&
                    show.artists[0] &&
                    typeof show.artists[0] === "object" &&
                    show.artists[0].city && (
                      <Link
                        href={
                          "/artists?city=" +
                          (typeof show.artists[0].city === "object"
                            ? show.artists[0].city.name
                            : show.artists[0].city)
                        }
                        passHref
                      >
                        <Tag
                          text={
                            typeof show.artists[0].city === "object"
                              ? show.artists[0].city.name
                              : String(show.artists[0].city)
                          }
                          color="orange"
                        />
                      </Link>
                    )}
                  {show.genres &&
                    Array.isArray(show.genres) &&
                    show.genres.map((genre: any, genreIdx: number) => (
                      <GenreTag
                        genre={
                          typeof genre === "object" ? genre : { name: genre }
                        }
                        key={genreIdx}
                      />
                    ))}
                </div>
                {show.lead && (
                  <div className="hidden md:block">
                    <p className="mb-4">{show.lead}</p>
                    <Link href={"/radio/" + show.slug} className="underline">
                      Read more
                    </Link>
                  </div>
                )}
              </div>
            </SliderCard>
          );
        })}
      </Slider>
    </div>
  );
};

export default FeaturedShows;
