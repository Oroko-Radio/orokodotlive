"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import useSWR from "swr";
import Card from "../components/Card";
import dayjs from "dayjs";
import Tag from "../components/Tag";
import { ScaleLoader } from "react-spinners";
import { Show, Article, ArtistProfile } from "@/payload-types";

interface SearchData {
  shows: Show[];
  articles: Article[];
  artists: ArtistProfile[];
}

interface SearchProps {
  initialData: SearchData;
}

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => data.data);

export default function Search({ initialData }: SearchProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const shouldFetch = debouncedQuery.trim().length > 0;

  const { data, isValidating } = useSWR(
    shouldFetch
      ? `/api/search?query=${encodeURIComponent(debouncedQuery.trim())}`
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    },
  );

  // Use initial data when no query, otherwise use SWR data
  const displayData: SearchData | null = !shouldFetch
    ? initialData
    : data || null;

  // Handle input change with debouncing
  const handleInputChange = (value: string) => {
    setQuery(value);

    // Clear existing timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Set new timeout for debouncing
    debounceTimeoutRef.current = setTimeout(() => {
      setDebouncedQuery(value);

      // Update URL
      const params = new URLSearchParams();
      if (value.trim()) {
        params.set("query", value.trim());
      }

      const newUrl = `${pathname}?${params.toString()}`;
      router.push(newUrl, { scroll: false });
    }, 500);
  };

  // Sync with URL params on mount
  useEffect(() => {
    const initialQuery = searchParams.get("query") || "";
    setQuery(initialQuery);
    setDebouncedQuery(initialQuery);
  }, [searchParams]);

  const isDataEmpty = displayData
    ? displayData.shows.length === 0 &&
      displayData.articles.length === 0 &&
      displayData.artists.length === 0
    : true;

  return (
    <>
      <section className="bg-offBlack border-b-2 border-black">
        <div className="p-4 sm:p-8 xl:p-12 text-center">
          <input
            autoComplete="off"
            autoCorrect="off"
            autoFocus
            className="max-w-full bg-offBlack text-white placeholder-white border-r-0 border-t-0 border-b-0 border-l-2 text-4xl xl:text-5xl font-serif border-white focus:ring-white focus:ring-2 focus:border-offBlack"
            id="search"
            name="search"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Search Oroko"
            type="search"
          />
        </div>
      </section>

      {shouldFetch && isValidating && (
        <section className="bg-orokoBlue">
          <div className="p-4 sm:p-8">
            <div className="flex justify-center items-center min-h-[400px] pt-10">
              <ScaleLoader />
            </div>
          </div>
        </section>
      )}

      {!isValidating && isDataEmpty && debouncedQuery.trim() && (
        <section className="bg-orokoBlue min-h-[70vh]">
          <div className="p-4 sm:p-8">
            <div className="pt-10">
              <p className="text-4xl xl:text-5xl font-serif">
                No results for{" "}
                <span className="font-medium">{`"${debouncedQuery.trim()}"`}</span>
              </p>
            </div>
          </div>
        </section>
      )}

      {displayData && displayData.shows.length > 0 && (
        <section className="bg-orokoBlue border-b-2 border-black p-4 py-12">
          <div className="flex justify-center items-end mb-12">
            <h2 className="font-serif text-4xl md:text-5xl xl:text-6xl mr-2 inline">
              Shows
            </h2>
            <span>({displayData.shows.length})</span>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-y-10 sm:gap-8">
            {displayData.shows.map((show) => (
              <li key={show.slug} className="border-2 border-black bg-white">
                <Card
                  imageUrl={
                    (typeof show.coverImage === "object" &&
                      show.coverImage?.sizes?.["small-full"]?.url) ||
                    (typeof show.coverImage === "object" &&
                      show.coverImage?.url) ||
                    ""
                  }
                  title={show.title}
                  link={`/radio/${show.slug}`}
                  mixcloudLink={show.mixcloudLink || undefined}
                >
                  <div className="p-4 flex flex-col justify-between flex-1">
                    <div>
                      <p className="font-sans text-sm md:text-base mb-2 font-semibold">
                        {dayjs(show.date).format("DD MMM YYYY HH:mm") + "H"}
                      </p>
                      <h1 className="font-heading card-leading text-4xl">
                        {show.title}
                      </h1>
                      <h2 className="font-serif text-2xl lg:text-3xl mb-4">
                        {" "}
                        With{" "}
                        {Array.isArray(show.artists) &&
                          show.artists &&
                          show.artists.map((artist, idx) => (
                            <span key={idx}>
                              <span>
                                {typeof artist === "object" ? artist.name : ""}
                              </span>
                              {idx !== show.artists!.length - 1 && ", "}
                            </span>
                          ))}
                      </h2>
                    </div>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      )}

      {displayData && displayData.artists.length > 0 && (
        <section className="bg-orokoRed border-b-2 border-black p-4 py-12">
          <div className="flex justify-center items-end mb-12">
            <h2 className="font-serif text-4xl md:text-5xl xl:text-6xl mr-2 inline">
              Artists
            </h2>
            <span>({displayData.artists.length})</span>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-y-6 sm:gap-8">
            {displayData.artists.map((artist) => (
              <li key={artist.slug} className="border-black border-2">
                <Card
                  imageUrl={
                    (typeof artist.photo === "object" &&
                      artist.photo?.sizes?.["small-full"]?.url) ||
                    (typeof artist.photo === "object" && artist.photo?.url) ||
                    ""
                  }
                  title={artist.name}
                  link={`/artists/${artist.slug}`}
                >
                  <h1 className="font-heading card-leading p-4 text-4xl">
                    {artist.name}
                  </h1>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      )}

      {displayData && displayData.articles.length > 0 && (
        <section className="bg-orokoGray p-4 py-12">
          <div className="flex justify-center items-end mb-12">
            <h2 className="font-serif text-4xl md:text-5xl xl:text-6xl mr-2 inline">
              News
            </h2>
            <span>({displayData.articles.length})</span>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-y-10 sm:gap-8">
            {displayData.articles.map((article) => (
              <li key={article.slug} className="border-black border-2 bg-white">
                <Card
                  imageUrl={
                    (typeof article.coverImage === "object" &&
                      article.coverImage?.sizes?.["small-full"]?.url) ||
                    (typeof article.coverImage === "object" &&
                      article.coverImage?.url) ||
                    ""
                  }
                  title={article.title}
                  link={`/news/${article.slug}`}
                >
                  <div className="p-4">
                    <div className="flex flex-wrap gap-1 mb-6">
                      {typeof article.city === "object" && article.city && (
                        <Tag text={article.city.name} color="black" card />
                      )}
                      <Tag text={article.articleType} transparent card />
                    </div>
                    <p className="font-sans mb-2 font-medium">
                      {dayjs(article.date).format("DD MMMM YYYY")}
                    </p>
                    <h1 className="font-heading card-leading mb-2 text-4xl">
                      {article.title}
                    </h1>
                    <p className="font-serif mb-4 text-lg md:text-2xl">
                      {article.subtitle}
                    </p>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
