import Link from "next/link";
import Slider from "../components/Slider";
import DotButton from "../components/ui/DotButton";
import Show from "../components/Show";
import { ShowInterface } from "../types/shared";

const UpcomingShows = ({
  shows,
  heading = "Coming up",
}: {
  shows: ShowInterface[];
  heading?: string;
}) => {
  // Get the current date
  const currentDate = new Date();

  // Filter out past shows
  const upcomingShows = shows.filter((show) => {
    const showDate = new Date(show.date);
    return showDate > currentDate;
  });

  // Sort upcoming shows in ascending order
  upcomingShows.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateA - dateB;
  });

  if (upcomingShows.length < 1) return;

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
        {upcomingShows.map((show, idx) => (
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
        ))}
      </Slider>
    </div>
  );
};

export default UpcomingShows;
