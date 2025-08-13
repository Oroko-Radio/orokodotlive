import Search from "@/views/Search";
import { searchContent } from "@/lib/payload/pages/search";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
};

export default async function SearchPage() {
  // Initial data always has 4 items per section
  const initialData = await searchContent({ query: "" });
  
  return <Search initialData={initialData} />;
}
