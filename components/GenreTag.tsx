import Link from "next/link";
import Tag from "./Tag";
import type { Genre, GenreCategory } from "@/payload-types";
import { encodeNameForUrl } from "@/lib/utils/url-helpers";

export function GenreTag({ genre }: { genre: Genre }) {
  const { name, genreCategory } = genre;

  // Find the first populated genreCategory
  const category = genreCategory?.find(cat => typeof cat === 'object') as GenreCategory | undefined;
  
  if (!category)
    return <Tag text={name} transparent />;

  return (
    <Link
      href={`/radio?category=${encodeNameForUrl(category.name)}&genre=${encodeNameForUrl(name)}#all-shows`}
      passHref
    >
      <Tag text={name} transparent />
    </Link>
  );
}
