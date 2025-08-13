"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import { ScaleLoader } from "react-spinners";
import Button from "./Button";

interface LoadMoreButtonProps {
  currentPage: number;
  currentCity: string;
  currentFilter: string;
}

export default function LoadMoreButton({
  currentPage,
  currentCity,
  currentFilter,
}: LoadMoreButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLoadMore = () => {
    startTransition(() => {
      const params = new URLSearchParams();
      if (currentCity !== "all") params.set("city", currentCity);
      if (currentFilter !== "all") params.set("filter", currentFilter);
      params.set("page", (currentPage + 1).toString());
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-[48px]">
        <ScaleLoader />
      </div>
    );
  }

  return <Button onClick={handleLoadMore}>Load More</Button>;
}
