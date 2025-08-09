import Link from "next/link";
import Slider from "@/components/Slider";
import DotButton from "@/components/ui/DotButton";
import Show from "@/components/Show";
import { Show as ShowType } from "@/payload-types";
import SliderCard from "@/components/SliderCard";

const LatestShows = ({
  shows,
  heading = "Latest Shows",
}: {
  shows: ShowType[];
  heading?: string;
}) => {
  return (
    <div className="overflow-hidden bg-orokoGreen border-b-2 border-black">
      <div className="flex justify-between py-8 px-4 md:px-8">
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
          <SliderCard
            imageUrl={typeof show.coverImage === 'object' && show.coverImage?.url ? show.coverImage.url : "/default-cover.jpg"}
            title={show.title}
            link={`/radio/${show.slug}`}
            cardWidth="quarter"
            key={idx}
            idx={idx}
            mixcloudLink={show.mixcloudLink || undefined}
          >
            <Show show={show} cityColor="green" />
          </SliderCard>
        ))}
      </Slider>
    </div>
  );
};

export default LatestShows;
