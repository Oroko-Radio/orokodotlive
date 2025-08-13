import { NextRequest, NextResponse } from "next/server";
import { searchContent } from "@/lib/payload/pages/search";
import { SEARCH_PAGE_SIZE } from "@/constants";

// Cache initial data (empty query) for 5 minutes
export const revalidate = 300;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";
  const showsLimit = parseInt(searchParams.get("showsLimit") || SEARCH_PAGE_SIZE.toString());
  const articlesLimit = parseInt(searchParams.get("articlesLimit") || SEARCH_PAGE_SIZE.toString());
  const artistsLimit = parseInt(searchParams.get("artistsLimit") || SEARCH_PAGE_SIZE.toString());

  try {
    const results = await searchContent({ 
      query,
      limits: {
        shows: showsLimit,
        articles: articlesLimit,
        artists: artistsLimit
      }
    });
    
    // Set cache headers - cache empty queries longer, search queries shorter
    const cacheTime = query ? 60 : 300; // 1 min for searches, 5 min for initial data
    
    return NextResponse.json({ data: results }, {
      headers: {
        'Cache-Control': `public, s-maxage=${cacheTime}, stale-while-revalidate=${cacheTime * 2}`
      }
    });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Search failed" },
      { status: 500 }
    );
  }
}