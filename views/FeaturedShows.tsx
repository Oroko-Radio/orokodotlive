import Slider from "../components/Slider";
import { ShowInterface } from "../types/shared";
import Show from "../components/Show";

interface FeaturedShowsProps {
  shows: ShowInterface[];
  heading?: string;
}

const FeaturedShows = ({
  shows,
  heading = "Featured Shows",
}: FeaturedShowsProps) => {
  return (
    <div className="overflow-hidden bg-orokoOrange border-b-2 border-black">
      <h1 className="font-serif text-4xl md:text-5xl p-8">{heading}</h1>

      <Slider>
        {shows.map((show, idx) => (
          <Slider.Card
            imageUrl={show.coverImage.url}
            title={show.title}
            link={`/radio/${show.slug}`}
            key={idx}
            idx={idx}
            mixcloudLink={show.mixcloudLink}
          >
            <Show show={show} cityColor="orange" />
          </Slider.Card>
        ))}
      </Slider>
    </div>
  );
};

export default FeaturedShows;
