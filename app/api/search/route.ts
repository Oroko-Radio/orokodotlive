import { NextRequest, NextResponse } from "next/server";
import { getSearchData } from "../../../lib/contentful/pages/search";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";

    const { data } = await getSearchData(query);

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "s-maxage=1, stale-while-revalidate=59",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "An unknown error occurred";

    return NextResponse.json(
      {
        message,
      },
      { status: 400 }
    );
  }
}