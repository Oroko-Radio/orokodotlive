"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ScaleLoader } from "react-spinners";
import CityTag from "./CityTag";
import ArtistTypeFilter from "./ArtistTypeFilter";
import { City } from "@/payload-types";

interface ArtistsFiltersProps {
  cities: City[];
  initialCity: string;
  initialFilter: string;
  children: React.ReactNode;
}

const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default function ArtistsFilters({ 
  cities, 
  initialCity, 
  initialFilter,
  children
}: ArtistsFiltersProps) {
  const [currentCity, setCurrentCity] = useState(initialCity);
  const [currentFilter, setCurrentFilter] = useState(initialFilter);
  const [isPending, startTransition] = useTransition();
  
  const router = useRouter();
  const pathname = usePathname();
  
  const debouncedCity = useDebounce(currentCity, 200);
  const debouncedFilter = useDebounce(currentFilter, 200);
  
  useEffect(() => {
    startTransition(() => {
      const params = new URLSearchParams();
      if (debouncedCity !== "all") params.set("city", debouncedCity);
      if (debouncedFilter !== "all") params.set("filter", debouncedFilter);
      
      const newUrl = `${pathname}?${params.toString()}`;
      router.push(newUrl);
    });
  }, [debouncedCity, debouncedFilter, pathname, router]);

  const handleCityChange = (city: string) => {
    setCurrentCity(city);
  };

  const handleFilterChange = (filter: string) => {
    setCurrentFilter(filter);
    if (filter !== currentFilter) {
      setCurrentCity("all");
    }
  };

  return (
    <>
      <div className="md:flex justify-between py-8 pb-2 md:pb-8">
        <h1 className="font-serif text-black text-4xl md:text-5xl mb-8 md:mb-0">
          All Artists
        </h1>
        <ArtistTypeFilter 
          currentFilter={currentFilter}
          onChange={handleFilterChange}
        />
      </div>

      <div className="md:hidden mb-4">
        <select
          className="w-full p-3 border-2 border-black bg-transparent text-lg"
          value={currentCity}
          onChange={(e) => handleCityChange(e.target.value)}
        >
          <option value="all">All Cities</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id.toString()}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      <div className="hidden md:flex flex-wrap gap-1 mb-8">
        <CityTag
          label="All"
          isActive={currentCity === "all"}
          onClick={() => handleCityChange("all")}
        />
        {cities.map((city) => (
          <CityTag
            key={city.id}
            label={city.name}
            isActive={city.id.toString() === currentCity}
            onClick={() => handleCityChange(city.id.toString())}
          />
        ))}
      </div>

      {isPending ? (
        <div className="flex justify-center items-center min-h-[400px] pt-10">
          <ScaleLoader />
        </div>
      ) : (
        children
      )}
    </>
  );
}