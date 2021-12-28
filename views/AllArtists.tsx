import React from "react";
import Link from "next/link";
import Card from "../components/Card";
import { AllArtistEntry } from "../types/shared";

interface AllArtistsProps {
  allArtists: AllArtistEntry[];
}

const AllArtists = ({ allArtists }: AllArtistsProps) => {
  return (
    <div className="bg-orokoYellow">
      <h1 className="font-serif text-black text-6xl p-8">All Artists</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
        {allArtists.map(({ name, slug, photo }, idx) => (
          <div key={idx} className="border-black border-2">
            <Card imageUrl={photo.url} title={name} link={`/artists/${slug}`}>
              <h1 className="font-heading p-4 text-4xl">{name}</h1>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllArtists;
