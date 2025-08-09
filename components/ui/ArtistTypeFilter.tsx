"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface ArtistTypeFilterProps {
  currentFilter: string;
}

export default function ArtistTypeFilter({ currentFilter }: ArtistTypeFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value !== "all") {
      params.set("filter", value);
    } else {
      params.delete("filter");
    }
    params.delete("page"); // Reset to first page when filter changes
    params.delete("city"); // Reset city when filter changes
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <select
      className="appearance-none pr-16 self-center bg-transparent border-black border-2 text-lg md:text-2xl text-black"
      value={currentFilter}
      onChange={(e) => handleChange(e.target.value)}
    >
      <option value="all">RESIDENTS & GUESTS</option>
      <option value="residents">RESIDENTS</option>
      <option value="guests">GUESTS</option>
      <option value="alumni">ALUMNI</option>
    </select>
  );
}