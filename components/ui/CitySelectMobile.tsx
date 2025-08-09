"use client";

import { useRouter, usePathname } from "next/navigation";
import { City } from "@/payload-types";

interface CitySelectMobileProps {
  cities: City[];
  currentCity: string;
  currentFilter: string;
}

export default function CitySelectMobile({ 
  cities, 
  currentCity, 
  currentFilter 
}: CitySelectMobileProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (value: string) => {
    const params = new URLSearchParams();
    if (value !== "all") params.set("city", value);
    if (currentFilter !== "all") params.set("filter", currentFilter);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <select
      className="appearance-none self-center bg-transparent border-black border-2 text-lg md:text-2xl text-black w-full p-2"
      value={currentCity}
      onChange={(e) => handleChange(e.target.value)}
    >
      <option value="all">ALL CITIES</option>
      {cities.map((city, idx) => (
        <option value={city.id.toString()} key={idx}>
          {city.name.toUpperCase()}
        </option>
      ))}
    </select>
  );
}