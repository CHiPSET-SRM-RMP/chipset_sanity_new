import React from "react";
import ArticlesImageGallery from "@/components/Reusable/ArticlesImageGallery";
import { client } from "@/sanity/lib/client";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  // Fetch all published articles with their tags
  const articles = await client.fetch<{ title: string; tags: string[] }[]>(
    `*[_type == "articles" && published == true]{ title, tags }`
  );

  // Extract unique tags from all articles
  const allTags = articles.flatMap((article) => article.tags || []);
  const uniqueTags = [...new Set(allTags)];

  // Base keywords that are always included
  const baseKeywords = [
    "tech articles",
    "programming tutorials",
    "web development articles",
    "coding tutorials",
    "srm tech blog",
    "chipset articles",
    "technology blog",
    "software development tutorials",
  ];

  // Combine base keywords with dynamic tags from articles
  const keywords = [...baseKeywords, ...uniqueTags];

  // Generate dynamic description mentioning article count
  const articleCount = articles.length;
  const description = `Read ${articleCount}+ in-depth technical articles, tutorials, and guides on ${uniqueTags.slice(0, 3).join(", ")}, and more by CHIPSET SRM University Ramapuram.`;

  return {
    title: "Tech Articles | Programming & Web Development Tutorials - CHiPSET SRM",
    description,
    keywords,
    openGraph: {
      title: "Tech Articles | Programming & Web Development Tutorials - CHiPSET",
      description,
      url: "https://chipsetsrm.vercel.app/tools/articles",
      type: "website",
      siteName: "CHIPSET SRM University Ramapuram",
    },
    twitter: {
      card: "summary_large_image",
      title: "Tech Articles | Programming Tutorials - CHiPSET",
      description,
    },
    alternates: {
      canonical: "https://chipsetsrm.vercel.app/tools/articles",
    },
  };
}

export default function ArticlesPage() {
  return <ArticlesImageGallery />;
}
