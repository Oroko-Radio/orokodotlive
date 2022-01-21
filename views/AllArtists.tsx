import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Button from "../components/ui/Button";
import Artist from "../pages/artists/[slug]";
import { AllArtistEntry } from "../types/shared";

interface AllArtistsProps {
  allArtists: AllArtistEntry[];
}

const AllArtists = ({ allArtists }: AllArtistsProps) => {
  const [viewingNumber, setViewingNumber] = useState<number>(50);
  const [residentFilter, setResidentFilter] = useState<string>("all");
  const [filteredArtists, setFilteredArtists] =
    useState<AllArtistEntry[]>(allArtists);

  useEffect(() => {
    setFilteredArtists(
      allArtists.filter((artist) => {
        if (residentFilter === "all") return artist;
        if (residentFilter === "residents") return artist.isResident;
        if (residentFilter === "guests") return !artist.isResident;
      })
    );
  }, [residentFilter, allArtists]);

  return (
    <div className="bg-orokoYellow">
      <div className="flex justify-between p-8">
        <h1 className="font-serif text-black text-6xl">All Artists</h1>
        <select
          className="appearance-none pr-16 self-center bg-transparent border-black border-2 text-2xl text-black"
          onChange={(e) => setResidentFilter(e.target.value)}
        >
          <option value="all">RESIDENTS & GUESTS</option>
          <option value="residents">RESIDENTS</option>
          <option value="guests">GUESTS</option>
        </select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-8">
        {filteredArtists
          .slice(0, viewingNumber)
          .map(({ name, slug, photo, isResident }, idx) => (
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
      {viewingNumber < filteredArtists.length && (
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
