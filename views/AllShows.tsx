import Card from "@/components/Card";
import Show from "@/components/Show";
import { Show as ShowType } from "@/payload-types";

const AllShows = ({
  shows,
}: {
  shows: ShowType[];
}) => {
  if (shows.length === 0) {
    return (
      <div className="text-white py-8 min-h-[568px]">
        No shows found
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 py-8 xl:pb-12">
      {shows.map((show, idx) => {
        const coverImageUrl = typeof show.coverImage === 'object' && show.coverImage?.url 
          ? show.coverImage.url 
          : "/default-cover.jpg";
          
        return (
          <div key={idx} className="border-black border-2 bg-white">
            <Card
              imageUrl={coverImageUrl}
              title={show.title}
              link={`/radio/${show.slug}`}
              mixcloudLink={show.mixcloudLink || undefined}
            >
              <Show show={show} cityColor="black" />
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default AllShows;
