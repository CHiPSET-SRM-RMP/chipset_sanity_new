import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ArticleContent from "./ArticleContent";

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
  const article = await client.fetch(
    `*[_type == "articles" && slug.current == $slug][0]`,
    { slug: params.slug }
  );

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: article.title,
    description: article.description,
    keywords: article.tags?.join(", "),
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://chipsetsrm.vercel.app/tools/articles/${params.slug}`,
      type: "article",
    },
    alternates: {
      canonical: `https://chipsetsrm.vercel.app/tools/articles/${params.slug}`,
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
  const article = await client.fetch(
    `*[_type == "articles" && slug.current == $slug && published == true][0]{
      _id,
      title,
      description,
      author,
      date,
      readTime,
      "mainImage": mainImage.asset->url,
      "content": content[]{
        ...,
        _type == "image" => {
          "url": asset->url,
          alt,
          _type
        }
      },
      tags,
      slug
    }`,
    { slug: params.slug }
  );

  if (!article) {
    notFound();
  }

  return <ArticleContent article={article} />;
}
