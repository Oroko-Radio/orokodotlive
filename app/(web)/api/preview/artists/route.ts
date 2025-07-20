import { NextRequest, NextResponse } from "next/server";
import { getArtistsPageSingle } from "@/lib/contentful/pages/artists";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  if (secret !== process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_SECRET || !slug) {
    return NextResponse.json({ message: "Invalid token" }, { status: 400 });
  }

  try {
    const { artist } = await getArtistsPageSingle(slug, true);

    (await draftMode()).enable();
    redirect(`/artists/${artist.slug}`);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Invalid slug" }, { status: 400 });
  }
}
