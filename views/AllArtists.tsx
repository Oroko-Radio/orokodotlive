import React from "react";
import Card from "@/components/Card";
import { ArtistProfile } from "@/payload-types";

interface AllArtistsProps {
  artists: ArtistProfile[];
}

const AllArtists = ({ artists }: AllArtistsProps) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 py-8">
      {artists.map(({ name, slug, photo }, idx) => (
        <div key={idx} className="border-black border-2">
          {photo && typeof photo !== "number" && photo.url && (
            <Card imageUrl={photo.url} title={name} link={`/artists/${slug}`}>
              <h1 className="font-heading card-leading p-4 text-4xl">{name}</h1>
            </Card>
          )}
        </div>
      ))}
    </div>
  );
};

export default AllArtists;
