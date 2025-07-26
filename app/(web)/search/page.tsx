import Search from "@/views/Search";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
};

export default function SearchPage() {
  return <Search />;
}
