import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ArticleContent from "./ArticleContent";
import { articlesQuery } from "@/sanity/lib/queries";

// Revalidate every 1 hour - new articles automatically appear
export const revalidate = 3600;

// Allow dynamic params for new articles not pre-built
export const dynamicParams = true;

interface ArticleParams {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ArticleParams): Promise<Metadata> {
  const articles = await client.fetch(articlesQuery);
  const article = articles.find((a: any) => a.slug.current === params.slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  const articleUrl = `https://www.chipsetsrm.live/tools/articles/${params.slug}`;
  const imageUrl = article.mainImage || "https://www.chipsetsrm.live/assets/chipset-og-image.png";

  return {
    title: `${article.title} | CHiPSET Tech Articles`,
    description: article.description,
    keywords: [
      ...(article.tags || []),
      "programming tutorial",
      "tech article",
      "chipset srm",
      "web development",
      "coding guide",
    ],
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.description,
      url: articleUrl,
      siteName: "CHIPSET SRM University Ramapuram",
      type: "article",
      publishedTime: article.date,
      modifiedTime: article._updatedAt,
      authors: [article.author],
      tags: article.tags,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [imageUrl],
      creator: "@chipsetsrm",
    },
    alternates: {
      canonical: articleUrl,
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

export async function generateStaticParams() {
  const articles = await client.fetch(
    `*[_type == "articles" && published == true]{ "slug": slug.current }`
  );

  return articles.map((article: { slug: string }) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: ArticleParams) {
  const articles = await client.fetch(articlesQuery);
  const article = articles.find((a: any) => a.slug.current === params.slug);

  if (!article) {
    notFound();
  }

  const articleUrl = `https://www.chipsetsrm.live/tools/articles/${params.slug}`;
  const imageUrl = article.mainImage || "https://www.chipsetsrm.live/assets/chipset-og-image.png";

  // JSON-LD structured data for Article
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: imageUrl,
    datePublished: article.date,
    dateModified: article._updatedAt || article.date,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "CHIPSET SRM University Ramapuram",
      logo: {
        "@type": "ImageObject",
        url: "https://www.chipsetsrm.live/assets/chipset-logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    keywords: article.tags?.join(", "),
    articleSection: "Technology",
    inLanguage: "en-US",
  };

  // Breadcrumb structured data
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.chipsetsrm.live",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: "https://www.chipsetsrm.live/tools",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Articles",
        item: "https://www.chipsetsrm.live/tools/articles",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: article.title,
        item: articleUrl,
      },
    ],
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ArticleContent article={article} />
    </>
  );
}
