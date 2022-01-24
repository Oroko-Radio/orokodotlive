import Card from "../components/Card";
import Show from "../components/Show";
import { ShowInterface } from "../types/shared";

const AllShows = ({ shows }: { shows: ShowInterface[] }) => {
  return (
    <div className="bg-offBlack" id="all-shows">
      <h1 className="font-serif text-white text-4xl md:text-5xl p-8 pb-0">
        All Shows
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-8 xl:pb-12">
        {shows.map((show, idx) => (
          <div key={idx} className="border-black border-2 bg-white">
            <Card
              imageUrl={show.coverImage.url}
              title={show.title}
              link={`/radio/${show.slug}`}
              mixcloudLink={show.mixcloudLink}
            >
              <Show show={show} cityColor="black" />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllShows;
