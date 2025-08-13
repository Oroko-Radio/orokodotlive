"use client";

interface ArtistTypeFilterProps {
  currentFilter: string;
  onChange: (filter: string) => void;
}

export default function ArtistTypeFilter({ currentFilter, onChange }: ArtistTypeFilterProps) {
  return (
    <select
      className="appearance-none pr-16 self-center bg-transparent border-black border-2 text-lg md:text-2xl text-black"
      value={currentFilter}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="all">RESIDENTS & GUESTS</option>
      <option value="residents">RESIDENTS</option>
      <option value="guests">GUESTS</option>
      <option value="alumni">ALUMNI</option>
    </select>
  );
}