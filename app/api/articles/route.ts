import { sanityFetch } from "@/sanity/lib/sanityFetch";
import { articlesQuery } from "@/sanity/lib/queries";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const articles = await sanityFetch({
      query: articlesQuery,
    });

    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}
