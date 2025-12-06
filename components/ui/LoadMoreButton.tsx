"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { ScaleLoader } from "react-spinners";
import Button from "./Button";

interface LoadMoreButtonProps {
  currentPage: number;
}

export default function LoadMoreButton({ currentPage }: LoadMoreButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleLoadMore = () => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams?.toString());
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
