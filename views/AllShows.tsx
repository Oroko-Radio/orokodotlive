import { useState } from "react";
import Card from "../components/Card";
import Show from "../components/Show";
import Button from "../components/ui/Button";
import { ShowInterface } from "../types/shared";

const AllShows = ({ shows }: { shows: ShowInterface[] }) => {
  const [viewingNumber, setViewingNumber] = useState<number>(25);

  return (
    <div className="bg-offBlack" id="all-shows">
      <h1 className="font-serif text-white text-4xl md:text-5xl px-4 md:px-8 py-8 pb-0">
        All Shows
      </h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 px-4 md:px-8 py-8 xl:pb-12">
        {shows.slice(0, viewingNumber).map((show, idx) => (
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
      {viewingNumber < shows.length && (
        <div className="pl-4 md:pl-8 pt-4 pb-12">
          <Button onClick={() => setViewingNumber(viewingNumber + 25)}>
            Load More Shows
          </Button>
        </div>
      )}
    </div>
  );
};

export default AllShows;
