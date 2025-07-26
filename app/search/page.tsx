import type { Metadata } from "next";
import Search from "../../views/Search";

export const metadata: Metadata = {
  title: "Search",
};

export default function SearchPage() {
  return <Search />;
}
