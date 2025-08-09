import Link from "next/link";
import Slider from "@/components/Slider";
import DotButton from "@/components/ui/DotButton";
import Show from "@/components/Show";
import { Show as ShowType } from "@/payload-types";
import SliderCard from "@/components/SliderCard";

const UpcomingShows = ({
  shows,
  heading = "Coming up",
}: {
  shows: ShowType[];
  heading?: string;
}) => {
  if (shows.length < 1) return;

  return (
    <div className="overflow-hidden bg-orokoBlue border-b-2 border-black">
      <div className="flex justify-between py-8 px-4 md:px-8">
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
        {shows.map((show, idx) => (
          <SliderCard
            imageUrl={typeof show.coverImage === 'object' && show.coverImage?.url ? show.coverImage.url : "/default-cover.jpg"}
            title={show.title}
            link={`/radio/${show.slug}`}
            cardWidth="quarter"
            key={idx}
            idx={idx}
          >
            <Show show={show} cityColor="blue" />
          </SliderCard>
        ))}
      </Slider>
    </div>
  );
};

export default UpcomingShows;
