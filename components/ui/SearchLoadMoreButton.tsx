"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { ScaleLoader } from "react-spinners";
import { SEARCH_PAGE_SIZE } from "@/constants";
import Button from "./Button";

interface SearchLoadMoreButtonProps {
  section: "shows" | "articles" | "artists";
  currentLimit: number;
  query: string;
  showsLimit: number;
  articlesLimit: number;
  artistsLimit: number;
  isLoading: boolean;
}

export default function SearchLoadMoreButton({
  section,
  currentLimit,
  query,
  showsLimit,
  articlesLimit,
  artistsLimit,
  isLoading,
}: SearchLoadMoreButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleLoadMore = () => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      
      // Increment the limit for the specific section
      const newLimit = currentLimit + SEARCH_PAGE_SIZE;
      if (section === "shows") {
        params.set("showsLimit", newLimit.toString());
      } else if (section === "articles") {
        params.set("articlesLimit", newLimit.toString());
      } else if (section === "artists") {
        params.set("artistsLimit", newLimit.toString());
      }
      
      // Preserve other limits
      if (showsLimit > SEARCH_PAGE_SIZE && section !== "shows") {
        params.set("showsLimit", showsLimit.toString());
      }
      if (articlesLimit > SEARCH_PAGE_SIZE && section !== "articles") {
        params.set("articlesLimit", articlesLimit.toString());
      }
      if (artistsLimit > SEARCH_PAGE_SIZE && section !== "artists") {
        params.set("artistsLimit", artistsLimit.toString());
      }
      
      // Preserve query
      if (query) {
        params.set("query", query);
      }
      
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  if (isPending || isLoading) {
    return (
      <div className="flex justify-center items-center h-[48px]">
        <ScaleLoader />
      </div>
    );
  }

  return <Button onClick={handleLoadMore}>Load More</Button>;
}