import React, { useCallback, useEffect, useMemo, useState } from "react";
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

const AllArtists = ({ allArtists }: AllArtistsProps) => {
  const searchParams = useSearchParams()!;
  const pathname = usePathname();
  const router = useRouter();

  const city = searchParams.get("city") || "all";
  const filter = searchParams.get("filter") || "all";

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
      if (filter === "all") return artist;
      if (filter === "alumni") return artist.isAlumni;
      if (filter === "residents") return artist.isResident && !artist.isAlumni;
      if (filter === "guests") return !artist.isResident;
    });
  }, [filter, allArtists]);

  const cities = useMemo<string[]>(() => {
    const allCities = filteredArtists
      .map(({ city }) => city.name)
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => (a.toUpperCase() > b.toUpperCase() ? 1 : -1));

    return allCities;
  }, [filteredArtists]);

  const artists = useMemo(() => {
    return filteredArtists.filter(
      (artist) => artist.city.name === city || city === "all"
    );
  }, [filteredArtists, city]);

  useEffect(() => {
    if (city !== "all" && !cities.includes(city)) {
      router.push(pathname + "?" + createQueryString("city", "all"));
    }
  }, [filter, cities, city, router, pathname, createQueryString]);

  return (
    <div className="bg-orokoYellow px-4 md:px-8">
      <div className="md:flex justify-between py-8 pb-2 md:pb-8">
        <h1 className="font-serif text-black text-4xl md:text-5xl mb-8 md:mb-0">
          All Artists
        </h1>
        <select
          className="appearance-none pr-16 self-center bg-transparent border-black border-2 text-lg md:text-2xl text-black"
          value={filter}
          onChange={(e) => {
            router.push(
              pathname + "?" + createQueryString("filter", e.target.value)
            );
          }}
        >
          <option value="all">ALL</option>
          <option value="residents">RESIDENTS</option>
          <option value="guests">GUESTS</option>
          <option value="alumni">ALUMNI</option>
        </select>
      </div>
      <select
        className="md:hidden appearance-none self-center bg-transparent border-black border-2 text-lg md:text-2xl text-black"
        value={city}
        onChange={(e) => {
          router.push(
            pathname + "?" + createQueryString("city", e.target.value)
          );
        }}
      >
        <option value="all">ALL CITIES</option>
        {cities.map((name, idx) => (
          <option value={name} key={idx}>
            {name.toUpperCase()}
          </option>
        ))}
      </select>
      <div className="hidden md:flex flex-wrap gap-1">
        <Link href={pathname + "?" + createQueryString("city", "all")} passHref>
          <Tag text="All" color={city === "all" ? "yellow" : null} />
        </Link>
        {cities.map((name, idx) => (
          <Link
            href={pathname + "?" + createQueryString("city", name)}
            passHref
            key={idx}
            className="cursor-pointer"
          >
            <Tag color={name === city ? "yellow" : null} text={name} />
          </Link>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 py-8">
        {artists.map(({ name, slug, photo }, idx) => (
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
