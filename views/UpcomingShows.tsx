import Link from "next/link";
import Slider from "../components/Slider";
import DotButton from "../components/ui/DotButton";
import Show from "../components/Show";

const UpcomingShows = ({ shows, heading = "Coming up on OROKO" }) => {
  return (
    <div className="overflow-hidden bg-orokoBlue border-b-2 border-black">
      <div className="flex justify-between p-8">
        <h1 className="font-serif text-4xl md:text-5xl">{heading}</h1>
        <Link href="/radio#all-shows" passHref>
          <div className="hidden md:block mt-4">
            <DotButton transparent size="large">
              All Shows
            </DotButton>
          </div>
        </Link>
      </div>

      <Slider>
        {shows.length > 0 ? (
          shows.map((show, idx) => (
            <Slider.Card
              imageUrl={show.coverImage.url}
              title={show.title}
              link={`/radio/${show.slug}`}
              cardWidth="quarter"
              key={idx}
              idx={idx}
            >
              <Show show={show} cityColor="blue" />
            </Slider.Card>
          ))
        ) : (
          <h2 className="font-sans text-2xl">NO UPCOMING SHOWS</h2>
        )}
      </Slider>
    </div>
  );
};

export default UpcomingShows;
