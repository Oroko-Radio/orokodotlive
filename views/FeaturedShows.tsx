import Slider from "../components/Slider";
import { ShowInterface } from "../types/shared";
import dayjs from "dayjs";
import ConcentricCircles from "../components/ui/ConcentricCircles";
import Tag from "../components/Tag";
import Link from "next/link";
import { GenreTag } from "../components/GenreTag";

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
              coverImage,
              mixcloudLink,
              artistsCollection,
              genresCollection,
            },
            idx
          ) => (
            <Slider.Card
              cardWidth="featured"
              imageUrl={coverImage.url}
              title={title}
              link={`/radio/${slug}`}
              key={idx}
              idx={idx}
              mixcloudLink={mixcloudLink}
            >
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center mb-4 pl-1">
                    <ConcentricCircles />
                    <p className="font-sans text-sm md:text-base font-semibold uppercase">
                      Featured Show
                    </p>
                  </div>
                  <p className="font-sans text-sm md:text-base mb-2 font-semibold">
                    {dayjs(date).format("DD MMM YYYY HH:mm") + "H"}
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
                    <Tag
                      text={artistsCollection.items[0].city.name}
                      color="orange"
                    />
                  )}
                  {genresCollection.items.map((genre, idx) => (
                    <GenreTag genre={genre} key={idx} />
                  ))}
                </div>
                <div>
                  <p className="hidden md:block mb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                    eius quos enim ex ab debitis, deleniti natus molestiae
                    nihil! Aperiam doloribus dolore voluptate enim, aut
                    reiciendis, cum ipsam veritatis eligendi iure molestias,
                    minima ea unde soluta earum recusandae molestiae praesentium
                    facilis deleniti esse? Corrupti repellendus temporibus
                    voluptates! Alias, tempore natus?
                  </p>
                  <Link href={"/radio/" + slug} className="underline">
                    Read more
                  </Link>
                </div>
              </div>
            </Slider.Card>
          )
        )}
      </Slider>
    </div>
  );
};

export default FeaturedShows;
