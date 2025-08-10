"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
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

export default function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const initialQuery = searchParams.get("query") || "";
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [data, setData] = useState<SearchData | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [fallbackData, setFallbackData] = useState<SearchData | null>(null);

  // Debounce query changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // Update URL when debounced query changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedQuery.trim()) {
      params.set("query", debouncedQuery.trim());
    } else {
      params.delete("query");
    }
    
    const newUrl = `${pathname}?${params.toString()}`;
    const currentUrl = `${pathname}?${searchParams.toString()}`;
    
    if (newUrl !== currentUrl) {
      router.push(newUrl, { scroll: false });
    }
  }, [debouncedQuery, pathname, router, searchParams]);

  // Fetch search results
  useEffect(() => {
    const fetchData = async (searchQuery: string) => {
      setIsValidating(true);
      try {
        const response = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`);
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setIsValidating(false);
      }
    };

    if (debouncedQuery.trim()) {
      fetchData(debouncedQuery);
    } else {
      // Get fallback data (empty query results)
      if (!fallbackData) {
        fetchData("").then(() => setFallbackData(data));
      } else {
        setData(fallbackData);
      }
    }
  }, [debouncedQuery, fallbackData, data]);

  // Load fallback data on mount
  useEffect(() => {
    const fetchFallbackData = async () => {
      try {
        const response = await fetch("/api/search?query=");
        const result = await response.json();
        setFallbackData(result.data);
        if (!debouncedQuery) {
          setData(result.data);
        }
      } catch (error) {
        console.error("Failed to load fallback data:", error);
      }
    };

    fetchFallbackData();
  }, [debouncedQuery]);

  const isDataEmpty = data
    ? data.shows.length === 0 && data.articles.length === 0 && data.artists.length === 0
    : true;

  if (!data) {
    return (
      <>
        <section className="bg-offBlack border-b-2 border-black">
          <div className="p-4 sm:p-8 xl:p-12 text-center">
            <input
              disabled
              className="max-w-full bg-offBlack text-white placeholder-white border-r-0 border-t-0 border-b-0 border-l-2 text-4xl xl:text-5xl font-serif border-white focus:ring-white focus:ring-2 focus:border-offBlack"
              placeholder="Loading..."
              type="search"
            />
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="bg-offBlack border-b-2 border-black">
        <div className="p-4 sm:p-8 xl:p-12 text-center">
          <input
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            autoFocus
            className="max-w-full bg-offBlack text-white placeholder-white border-r-0 border-t-0 border-b-0 border-l-2 text-4xl xl:text-5xl font-serif border-white focus:ring-white focus:ring-2 focus:border-offBlack"
            id="search"
            name="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Oroko"
            type="search"
          />
        </div>
      </section>

      {isDataEmpty && debouncedQuery && (
        <section className="bg-orokoBlue min-h-[70vh]">
          <div className="p-4 sm:p-8">
            <div className="pt-10">
              <p className="text-4xl xl:text-5xl font-serif">
                No results for{" "}
                <span className="font-medium">{`"${debouncedQuery}"`}</span>
              </p>
            </div>
          </div>
        </section>
      )}

      {debouncedQuery && isValidating && (
        <section className="bg-orokoBlue">
          <div className="p-4 sm:p-8">
            <div className="flex justify-center items-center min-h-[400px] pt-10">
              <ScaleLoader />
            </div>
          </div>
        </section>
      )}

      {data.shows.length > 0 && (
        <section className="bg-orokoBlue border-b-2 border-black p-4 py-12">
          <div className="flex justify-center items-end mb-12">
            <h2 className="font-serif text-4xl md:text-5xl xl:text-6xl mr-2 inline">
              Shows
            </h2>
            {debouncedQuery ? <span>({data.shows.length})</span> : null}
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-y-10 sm:gap-8">
            {data.shows.map((show) => (
              <li
                key={show.slug}
                className="border-2 border-black bg-white"
              >
                <Card
                  imageUrl={
                    (typeof show.coverImage === "object" &&
                      show.coverImage?.sizes?.["small-full"]?.url) ||
                    (typeof show.coverImage === "object" && show.coverImage?.url) ||
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
                        {Array.isArray(show.artists) && show.artists &&
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

      {data.artists.length > 0 && (
        <section className="bg-orokoRed border-b-2 border-black p-4 py-12">
          <div className="flex justify-center items-end mb-12">
            <h2 className="font-serif text-4xl md:text-5xl xl:text-6xl mr-2 inline">
              Artists
            </h2>
            {debouncedQuery ? <span>({data.artists.length})</span> : null}
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-y-6 sm:gap-8">
            {data.artists.map((artist) => (
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

      {data.articles.length > 0 && (
        <section className="bg-orokoGray p-4 py-12">
          <div className="flex justify-center items-end mb-12">
            <h2 className="font-serif text-4xl md:text-5xl xl:text-6xl mr-2 inline">
              News
            </h2>
            {debouncedQuery ? <span>({data.articles.length})</span> : null}
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-y-10 sm:gap-8">
            {data.articles.map((article) => (
              <li
                key={article.slug}
                className="border-black border-2 bg-white"
              >
                <Card
                  imageUrl={
                    (typeof article.coverImage === "object" &&
                      article.coverImage?.sizes?.["small-full"]?.url) ||
                    (typeof article.coverImage === "object" && article.coverImage?.url) ||
                    ""
                  }
                  title={article.title}
                  link={`/news/${article.slug}`}
                >
                  <div className="p-4">
                    <div className="flex flex-wrap gap-1 mb-6">
                      {typeof article.city === "object" && article.city && (
                        <Tag
                          text={article.city.name}
                          color="black"
                          card
                        />
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