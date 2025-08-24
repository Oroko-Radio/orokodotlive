"use client";

import Tag from "../Tag";

interface CityTagProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export default function CityTag({
  label,
  isActive,
  onClick,
}: CityTagProps) {
  return (
    <button onClick={onClick} className="cursor-pointer">
      <Tag text={label} color={isActive ? "yellow" : undefined} />
    </button>
  );
}
