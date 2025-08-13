import Search from "@/views/Search";
import { searchContent } from "@/lib/payload/pages/search";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
};

export default async function SearchPage() {
  // Initial data always has 4 items per section
  const initialData = await searchContent({ query: "" });
  
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <Search initialData={initialData} />
    </Suspense>
  );
}
