import React, { useState } from "react";
import Card from "../components/Card";
import Button from "../components/ui/Button";
import { AllArtistEntry } from "../types/shared";

interface AllArtistsProps {
  allArtists: AllArtistEntry[];
}

const AllArtists = ({ allArtists }: AllArtistsProps) => {
  const [viewingNumber, setViewingNumber] = useState<number>(50);
  return (
    <div className="bg-orokoYellow">
      <h1 className="font-serif text-black text-6xl p-8">All Artists</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-8">
        {allArtists
          .slice(0, viewingNumber)
          .map(({ name, slug, photo }, idx) => (
            <div key={idx} className="border-black border-2">
              <Card
                imageUrl={photo && photo.url ? photo.url : null}
                title={name}
                link={`/artists/${slug}`}
              >
                <h1 className="font-heading p-4 text-4xl">{name}</h1>
              </Card>
            </div>
          ))}
      </div>
      {viewingNumber < allArtists.length && (
        <div className="pl-8 pt-4 pb-12">
          <Button onClick={() => setViewingNumber(viewingNumber + 50)}>
            Load More Artists
          </Button>
        </div>
      )}
    </div>
  );
};

export default AllArtists;
