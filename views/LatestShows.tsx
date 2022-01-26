import Link from "next/link";
import Slider from "../components/Slider";
import DotButton from "../components/ui/DotButton";
import Show from "../components/Show";

const LatestShows = ({ shows, heading = "Latest Shows" }) => {
  return (
    <div className="overflow-hidden bg-orokoGreen border-b-2 border-black">
      <div className="flex justify-between p-8">
        <h1 className="font-serif text-4xl md:text-5xl">{heading}</h1>
        <Link href="/radio" passHref>
          <div className="hidden md:block mt-4">
            <DotButton transparent size="large">
              All Shows
            </DotButton>
          </div>
        </Link>
      </div>

      <Slider>
        {shows.map((show, idx) => (
          <Slider.Card
            imageUrl={show.coverImage.url}
            title={show.title}
            link={`/radio/${show.slug}`}
            cardWidth="quarter"
            key={idx}
            idx={idx}
            mixcloudLink={show.mixcloudLink}
          >
            <Show show={show} cityColor="green" />
          </Slider.Card>
        ))}
      </Slider>
    </div>
  );
};

export default LatestShows;
