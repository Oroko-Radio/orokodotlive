"use client";

import type { Metadata } from "next";
import Meta from "../../../components/Meta";
import Card from "../../../components/Card";
import dayjs from "dayjs";
import { getSearchData } from "../../../lib/contentful/pages/search";
import { useDebouncedState } from "@react-hookz/web";
import useSearchData from "../../../hooks/useSearch";
// Removed ts-extras dependency
import Tag from "../../../components/Tag";
import { ScaleLoader } from "react-spinners";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const [query, querySet] = useDebouncedState("", 500);
  const [fallbackData, setFallbackData] = useState(null);

  useEffect(() => {
    getSearchData("").then(({ data }) => {
      setFallbackData(data);
    });
  }, []);

  const { data, isValidating } = useSearchData(query, { fallbackData });

  const isDataEmpty = data
    ? data.shows.length === 0 &&
      data.articles.length === 0 &&
      data.artists.length === 0
    : true;

  if (!data) {
    return (
      <>
        <Meta title="Search" />
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
      <Meta title="Search" />

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
            onChange={(e) => querySet(e.target.value)}
            placeholder="Search Oroko"
            type="search"
          />
        </div>
      </section>

      {isDataEmpty && (
        <section className="bg-orokoBlue min-h-[70vh]">
          <div className="p-4 sm:p-8">
            <div className="pt-10">
              <p className="text-4xl xl:text-5xl font-serif">
                No results for{" "}
                <span className="font-medium">{`"${query}"`}</span>
              </p>
            </div>
          </div>
        </section>
      )}

      {query && isValidating && (
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
            {query ? <span>({data.shows.length})</span> : null}
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-y-10 sm:gap-8">
            {data.shows.map((show) => (
              <li
                key={show.fields.slug}
                className="border-2 border-black bg-white"
              >
                <Card
                  imageUrl={"https:" + show.fields.coverImage.fields.file.url}
                  title={show.fields.title}
                  link={`/radio/${show.fields.slug}`}
                >
                  <div className="p-4 flex flex-col justify-between flex-1">
                    <div>
                      <p className="font-sans text-sm md:text-base mb-2 font-semibold">
                        {dayjs(show.fields.date).format("DD MMM YYYY HH:mm") +
                          "H"}
                      </p>
                      <h1 className="font-heading card-leading text-4xl">
                        {show.fields.title}
                      </h1>
                      <h2 className="font-serif text-2xl lg:text-3xl mb-4">
                        {" "}
                        With{" "}
                        {show.fields.artists &&
                          show.fields.artists.map((artist, idx) => (
                            <span key={idx}>
                              <span>{artist.fields.name}</span>
                              {idx !== show.fields.artists.length - 1 && ", "}
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
            {query ? <span>({data.artists.length})</span> : null}
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-y-6 sm:gap-8">
            {data.artists.map((artist: any) => (
              <li key={artist.fields.slug} className="border-black border-2">
                <Card
                  imageUrl={
                    artist.fields && artist.fields.photo.fields.file.url
                      ? "http:" + artist.fields.photo.fields.file.url
                      : null
                  }
                  title={artist.fields.name}
                  link={`/artists/${artist.fields.slug}`}
                >
                  <h1 className="font-heading card-leading p-4 text-4xl">
                    {artist.fields.name}
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
            {query ? <span>({data.articles.length})</span> : null}
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-y-10 sm:gap-8">
            {data.articles.map((article) => (
              <li
                key={article.fields.slug}
                className="border-black border-2 bg-white"
              >
                <Card
                  imageUrl={"http:" + article.fields.coverImage.fields.file.url}
                  title={article.fields.title}
                  link={`/news/${article.fields.slug}`}
                >
                  <div className="p-4">
                    <div className="flex flex-wrap gap-1 mb-6">
                      {article.fields.city && (
                        <Tag
                          text={article.fields.city.fields.name}
                          color="black"
                          card
                        />
                      )}
                      <Tag text={article.fields.articleType} transparent card />
                    </div>
                    <p className="font-sans mb-2 font-medium">
                      {dayjs(article.fields.date).format("DD MMMM YYYY")}
                    </p>
                    <h1 className="font-heading card-leading mb-2 text-4xl">
                      {article.fields.title}
                    </h1>
                    <p className="font-serif mb-4 text-lg md:text-2xl">
                      {article.fields.subtitle}
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
