import React from "react";
import ArticlesImageGallery from "@/components/Reusable/ArticlesImageGallery";
import { client } from "@/sanity/lib/client";
import { Metadata } from "next";
import { articlesQuery } from "@/sanity/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  // Fetch all published articles
  const articles = await client.fetch(articlesQuery);

  // Extract unique tags from all articles
  const allTags = articles.flatMap((article: any) => article.tags || []);
  const uniqueTags = [...new Set(allTags)];

  // Extract keywords from article slugs (convert slug to readable keywords)
  const slugKeywords = articles
    .map((article: any) => article.slug.current.split('-').join(' '))
    .filter((keyword: string) => keyword.length > 3);
  
  // Combine unique tags and slug-based keywords
  const keywords = [...new Set([...uniqueTags, ...slugKeywords])];

  // Generate dynamic description mentioning article count
  const articleCount = articles.length;
  const topTags = uniqueTags.slice(0, 4).join(", ");
  const description = `Explore ${articleCount}+ in-depth technical articles, tutorials, and programming guides covering ${topTags}, and more. Written by CHIPSET community at SRM University Ramapuram.`;

  return {
    title: "Tech Articles & Programming Tutorials | CHiPSET SRM",
    description,
    keywords,
    openGraph: {
      title: "Tech Articles & Programming Tutorials - CHiPSET",
      description,
      url: "https://chipsetsrm.vercel.app/tools/articles",
      type: "website",
      siteName: "CHIPSET SRM University Ramapuram",
      images: [
        {
          url: "https://chipsetsrm.vercel.app/assets/chipset-og-image.png",
          width: 1200,
          height: 630,
          alt: "CHiPSET Tech Articles",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Tech Articles | Programming Tutorials - CHiPSET",
      description,
      images: ["https://chipsetsrm.vercel.app/assets/chipset-og-image.png"],
      creator: "@chipsetsrm",
    },
    alternates: {
      canonical: "https://chipsetsrm.vercel.app/tools/articles",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function ArticlesPage() {
  // Fetch articles for JSON-LD (top 10)
  const allArticles = await client.fetch(articlesQuery);
  const articles = allArticles.slice(0, 10);

  // JSON-LD for CollectionPage
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Tech Articles & Programming Tutorials",
    description:
      "Collection of technical articles, programming tutorials, and coding guides by CHIPSET SRM University Ramapuram",
    url: "https://chipsetsrm.vercel.app/tools/articles",
    publisher: {
      "@type": "Organization",
      name: "CHIPSET SRM University Ramapuram",
      logo: {
        "@type": "ImageObject",
        url: "https://chipsetsrm.vercel.app/assets/chipset-logo.png",
      },
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.map((article: any, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://chipsetsrm.vercel.app/tools/articles/${article.slug.current}`,
        name: article.title,
      })),
    },
  };

  // Breadcrumb schema
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://chipsetsrm.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: "https://chipsetsrm.vercel.app/tools",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Articles",
        item: "https://chipsetsrm.vercel.app/tools/articles",
      },
    ],
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ArticlesImageGallery />
    </>
  );
}
