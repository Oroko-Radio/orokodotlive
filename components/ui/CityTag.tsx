"use client";

import { useRouter, usePathname } from "next/navigation";
import Tag from "../Tag";

interface CityTagProps {
  city: string;
  label: string;
  isActive: boolean;
  currentFilter: string;
}

export default function CityTag({
  city,
  label,
  isActive,
  currentFilter,
}: CityTagProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    const params = new URLSearchParams();
    if (city !== "all") params.set("city", city);
    if (currentFilter !== "all") params.set("filter", currentFilter);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <button onClick={handleClick} className="cursor-pointer">
      <Tag text={label} color={isActive ? "yellow" : undefined} />
    </button>
  );
}
