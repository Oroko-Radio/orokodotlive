import React, { useCallback, useMemo, useState } from "react";
import Card from "../components/Card";
import Tag from "../components/Tag";
import { AllArtistEntry, CityInterface } from "../types/shared";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/router";

interface AllArtistsProps {
  allArtists: AllArtistEntry[];
  cities: CityInterface[];
}

const AllArtists = ({ allArtists, cities }: AllArtistsProps) => {
  const searchParams = useSearchParams()!;
  const pathname = usePathname();
  const router = useRouter();

  const city = searchParams.get("city") || "all";
  const filter = searchParams.get("resident-filter") || "all";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const filteredArtists = useMemo<AllArtistEntry[]>(() => {
    return allArtists.filter((artist) => {
      if (city === "all" || city === artist.city.name) {
        if (filter === "all") return artist;
        if (filter === "former residents") return artist.isFormerResident;
        if (filter === "residents")
          return artist.isResident && !artist.isFormerResident;
        if (filter === "guests") return !artist.isResident;
      }
    });
  }, [city, filter, allArtists]);

  return (
    <div className="bg-orokoYellow px-4 md:px-8">
      <div className="md:flex justify-between py-8 pb-2 md:pb-8">
        <h1 className="font-serif text-black text-4xl md:text-5xl mb-8 md:mb-0">
          All Artists
        </h1>
        <select
          className="appearance-none pr-16 self-center bg-transparent border-black border-2 text-lg md:text-2xl text-black"
          onChange={(e) => {
            router.push(
              pathname +
                "?" +
                createQueryString("resident-filter", e.target.value)
            );
          }}
        >
          <option value="all">RESIDENTS & GUESTS</option>
          <option value="residents">RESIDENTS</option>
          <option value="guests">GUESTS</option>
          <option value="former residents">FORMER RESIDENTS</option>
        </select>
      </div>
      <select
        className="md:hidden appearance-none self-center bg-transparent border-black border-2 text-lg md:text-2xl text-black"
        onChange={(e) => {
          router.push(
            pathname + "?" + createQueryString("city", e.target.value)
          );
        }}
        // value={cityFilter}
      >
        <option value="all">ALL CITIES</option>
        {cities.map(({ name }, idx) => (
          <option value={name} key={idx}>
            {name.toUpperCase()}
          </option>
        ))}
      </select>
      <div className="hidden md:flex flex-wrap gap-1">
        <Link href={pathname + "?" + createQueryString("city", "all")} passHref>
          <Tag text="All" color={city === "all" ? "yellow" : null} />
        </Link>
        {cities.map(({ name }, idx) => (
          <Link
            href={pathname + "?" + createQueryString("city", name)}
            passHref
            key={idx}
            // onClick={() => setCityFilter(name)}
            className="cursor-pointer"
          >
            <Tag color={name === city ? "yellow" : null} text={name} />
          </Link>
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
