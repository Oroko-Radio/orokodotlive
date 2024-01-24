import Slider from "../components/Slider";
import { ShowInterface } from "../types/shared";
import Show from "../components/Show";

interface FeaturedShowsProps {
  shows: ShowInterface[];
  heading?: string;
}

const FeaturedShows = ({ shows }: FeaturedShowsProps) => {
  return (
    <div className="overflow-hidden bg-orokoOrange border-b-2 border-black">
      <Slider slideByElementWidth fullSize>
        {shows.map((show, idx) => (
          <Slider.Card
            cardWidth="featured"
            imageUrl={show.coverImage.url}
            title={show.title}
            link={`/radio/${show.slug}`}
            key={idx}
            idx={idx}
            mixcloudLink={show.mixcloudLink}
          >
            <Show show={show} cityColor="orange" featured />
          </Slider.Card>
        ))}
      </Slider>
    </div>
  );
};

export default FeaturedShows;
