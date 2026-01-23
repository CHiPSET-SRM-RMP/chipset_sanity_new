import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import { Calendar } from "lucide-react";

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
      mainImage,
      content,
      tags,
      slug
    }`,
    { slug: params.slug }
  );

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <article className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-lg md:text-xl font-bold mb-3 text-gray-900">{article.title}</h1>
          <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              <time>{new Date(article.date).toLocaleDateString()}</time>
            </div>
            <div>{article.readTime} min read</div>
            {article.author && <div>By {article.author}</div>}
          </div>
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {article.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded text-[10px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Main Image */}
        {article.mainImage && (
          <div className="mb-4 w-full h-32 md:h-48 relative rounded overflow-hidden">
            <Image
              src={article.mainImage}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Description */}
        <p className="text-sm md:text-base text-gray-700 mb-4 leading-relaxed">{article.description}</p>

        {/* Content */}
        <div className="prose prose-xs max-w-none text-gray-800 text-xs md:text-sm">
          {article.content && article.content.length > 0 && (
            <div className="space-y-3">
              {article.content.map((block: any, idx: number) => {
                if (block._type === "image" && block.url) {
                  return (
                    <div key={idx} className="my-4 w-full h-32 md:h-56 relative rounded overflow-hidden">
                      <Image
                        src={block.url}
                        alt={block.alt || "Article image"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
