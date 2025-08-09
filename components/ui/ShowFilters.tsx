"use client";

import { useState, useEffect, useTransition, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ScaleLoader } from "react-spinners";
import { debounce } from "@/util";
import Tag from "../Tag";
import { GenreCategory, Genre } from "@/payload-types";

interface ShowFiltersProps {
  genreCategories: GenreCategory[];
  genres: Genre[];
  initialCategory: string;
  initialGenre: string;
  children: React.ReactNode;
}

export default function ShowFilters({
  genreCategories,
  genres,
  initialCategory,
  initialGenre,
  children,
}: ShowFiltersProps) {
  const [currentCategory, setCurrentCategory] = useState(initialCategory);
  const [currentGenre, setCurrentGenre] = useState(initialGenre);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const pathname = usePathname();

  const debouncedUpdateUrl = useCallback(
    debounce((category: string, genre: string) => {
      startTransition(() => {
        const params = new URLSearchParams();
        if (category !== "all") params.set("category", category);
        if (genre !== "all") params.set("genre", genre);

        const newUrl = `${pathname}?${params.toString()}`;
        router.push(newUrl);
      });
    }, 200),
    [pathname, router],
  );

  useEffect(() => {
    debouncedUpdateUrl(currentCategory, currentGenre);
  }, [currentCategory, currentGenre, debouncedUpdateUrl]);

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
    setCurrentGenre("all");
  };

  const handleGenreChange = (genre: string) => {
    setCurrentGenre(genre);
  };

  return (
    <>
      <h1 className="font-serif text-white text-4xl md:text-5xl py-8">
        All Shows
      </h1>

      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={() => handleCategoryChange("all")}>
          <Tag
            text="all"
            color={currentCategory === "all" ? "selected" : "white"}
            borderColor={currentCategory === "all" ? "white" : undefined}
          />
        </button>

        {genreCategories.map((category, idx) => (
          <button key={idx} onClick={() => handleCategoryChange(category.name)}>
            <Tag
              text={category.name}
              color={currentCategory === category.name ? "selected" : "white"}
              borderColor={
                currentCategory === category.name ? "white" : undefined
              }
            />
          </button>
        ))}
      </div>

      {genres.length > 0 && (
        <div className="text-white flex flex-wrap gap-2 mb-4">
          {genres.map((genre, idx) => (
            <button key={idx} onClick={() => handleGenreChange(genre.name)}>
              <Tag
                text={genre.name}
                color={currentGenre === genre.name ? "selected" : undefined}
              />
            </button>
          ))}
        </div>
      )}

      {isPending ? (
        <div className="flex justify-center min-h-[600px] pt-10">
          <ScaleLoader />
        </div>
      ) : (
        children
      )}
    </>
  );
}
