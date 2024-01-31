import Link from "next/link";
import Tag from "./Tag";
import { GenreInterface } from "../types/shared";

export function GenreTag({ genre }: { genre: GenreInterface }) {
  const { name, genreCategory } = genre;

  if (!genreCategory || !genreCategory.name)
    return <Tag text={name} transparent />;

  return (
    <Link
      href={`/radio?category=${genreCategory.name}&genre=${name}#all-shows`}
      passHref
    >
      <Tag text={name} transparent />
    </Link>
  );
}
