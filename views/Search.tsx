"use client";

import { useState } from "react";
import Card from "../components/Card";
import { ScaleLoader } from "react-spinners";

export default function Search() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-heading mb-4">Search</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search shows, artists, news..."
              className="w-full p-4 text-lg border-2 border-black rounded-none bg-white"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <ScaleLoader />
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-lg">
              Search functionality will be restored when converted to Payload CMS.
            </p>
            {query && (
              <p className="text-sm text-gray-600 mt-2">
                Searching for: "{query}"
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}