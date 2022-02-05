import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Tag from "../components/Tag";
import { AllArtistEntry, CityInterface } from "../types/shared";

interface AllArtistsProps {
  allArtists: AllArtistEntry[];
  cities: CityInterface[];
}

const AllArtists = ({ allArtists, cities }: AllArtistsProps) => {
  const [residentFilter, setResidentFilter] = useState<string>("all");
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [filteredArtists, setFilteredArtists] =
    useState<AllArtistEntry[]>(allArtists);

  useEffect(() => {
    setFilteredArtists(
      allArtists.filter((artist) => {
        if (cityFilter === "all" || cityFilter === artist.city.name) {
          if (residentFilter === "all") return artist;
          if (residentFilter === "residents") return artist.isResident;
          if (residentFilter === "guests") return !artist.isResident;
        }
      })
    );
  }, [cityFilter, residentFilter, allArtists]);

  return (
    <div className="bg-orokoYellow px-4 md:px-8">
      <div className="md:flex justify-between py-8 pb-2 md:pb-8">
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
      <select
        className="md:hidden appearance-none self-center bg-transparent border-black border-2 text-lg md:text-2xl text-black"
        onChange={(e) => setCityFilter(e.target.value)}
      >
        <option value="all">ALL</option>
        {cities.map(({ name }, idx) => (
          <option value={name} key={idx}>
            {name.toUpperCase()}
          </option>
        ))}
      </select>
      <div className="hidden md:flex flex-wrap gap-1">
        <div className="cursor-pointer" onClick={() => setCityFilter("all")}>
          <Tag text="All" color={cityFilter === "all" ? "yellow" : null} />
        </div>
        {cities.map(({ name }, idx) => (
          <div
            key={idx}
            onClick={() => setCityFilter(name)}
            className="cursor-pointer"
          >
            <Tag color={name === cityFilter ? "yellow" : null} text={name} />
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 py-8">
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
