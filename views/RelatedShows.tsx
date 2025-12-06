import React from "react";

import Card from "@/components/Card";
import { Show as ShowType } from "@/payload-types";
import Show from "@/components/Show";

const RelatedShows = ({ shows }: { shows: ShowType[] }) => {
  return (
    <div className="bg-offBlack" id="all-shows">
      <h1 className="font-serif text-white text-4xl md:text-5xl pt-8 px-4 md:px-8 pb-0">
        Related Shows
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 md:p-8 xl:pb-12">
        {shows.map((show, idx) => (
          <div key={idx} className="border-black border-2 bg-white">
            <Card
              imageUrl={typeof show.coverImage === 'object' && show.coverImage?.sizes?.["small-full"]?.url ? show.coverImage.sizes["small-full"].url : (typeof show.coverImage === 'object' && show.coverImage?.url ? show.coverImage.url : "/default-cover.jpg")}
              objectPosition={
                typeof show.coverImage === "object"
                  ? `${show.coverImage?.focalX ?? 50}% ${show.coverImage?.focalY ?? 50}%`
                  : "center"
              }
              title={show.title}
              link={`/radio/${show.slug}`}
              mixcloudLink={show.mixcloudLink || undefined}
            >
              <Show show={show} cityColor="black" />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedShows;
