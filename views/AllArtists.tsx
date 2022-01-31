import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { AllArtistEntry } from "../types/shared";

interface AllArtistsProps {
  allArtists: AllArtistEntry[];
}

const AllArtists = ({ allArtists }: AllArtistsProps) => {
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
      <div className="md:flex justify-between py-8 px-4 md:px-8 pb-2 md:pb-8">
        <h1 className="font-serif text-black text-4xl md:text-5xl mb-8 md:mb-0">
          All Artists
        </h1>
        <select
          className="appearance-none pr-16 self-center bg-transparent border-black border-2 text-lg md:text-2xl text-black"
          onChange={(e) => setResidentFilter(e.target.value)}
        >
          <option value="all">RESIDENTS & GUESTS</option>
          <option value="residents">RESIDENTS</option>
          <option value="guests">GUESTS</option>
        </select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 py-8 px-4 md:px-8">
        {filteredArtists.map(({ name, slug, photo }, idx) => (
          <div key={idx} className="border-black border-2">
            <Card
              imageUrl={photo && photo.url ? photo.url : null}
              title={name}
              link={`/artists/${slug}`}
            >
              <h1 className="font-heading card-leading p-4 text-4xl">{name}</h1>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllArtists;
