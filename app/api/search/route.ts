import { NextRequest, NextResponse } from "next/server";
import { searchContent } from "@/lib/payload/pages/search";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";

  try {
    const results = await searchContent({ query });
    return NextResponse.json({ data: results });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Search failed" },
      { status: 500 }
    );
  }
}