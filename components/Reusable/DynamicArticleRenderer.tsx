"use client";

import React, { useState } from "react";
import { Calendar, User, ChevronLeft, ChevronDown, Minus } from "lucide-react";
import Link from "next/link";
import PortableTextRenderer from "./PortableTextRenderer";
import ImageGallery from "./ImageGallery";

interface ContentBlock {
  _type?: string;
  _key?: string;
  url?: string;
  alt?: string;
  children?: Array<{
    _type: string;
    _key?: string;
    text: string;
    marks?: string[];
  }>;
  style?: string;
  listItem?: string;
  markDefs?: Array<{
    _type: string;
    _key: string;
    href?: string;
  }>;
  level?: number;
}

interface Article {
  _id: string;
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: number;
  mainImage?: string;
  content?: ContentBlock[];
  tags: string[];
  displayType?: "gallery" | "blog" | "hybrid";
}

interface DynamicArticleRendererProps {
  article: Article;
}

const DynamicArticleRenderer: React.FC<DynamicArticleRendererProps> = ({
  article,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandDescription, setExpandDescription] = useState(false);
  const [minimizeHeader, setMinimizeHeader] = useState(false);
  const displayType = article.displayType || "blog";

  // Extract images and text blocks from content
  const images = (article.content || []).filter(
    (item) => item._type === "image" && !!item.url
  );

  const textContent = (article.content || []).filter(
    (item) => item._type === "block"
  );

  // Render header
  const renderHeader = () => (
    <div className="bg-gradient-to-b from-slate-950 to-slate-900 border-b border-slate-800 px-4 md:px-8 py-3 sticky top-0 z-40">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link
            href="/tools/articles"
            className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition"
          >
            <ChevronLeft size={14} /> Back to Articles
          </Link>
          <button
            onClick={() => setMinimizeHeader(!minimizeHeader)}
            className="p-1 hover:bg-slate-800 rounded transition text-slate-400 hover:text-white"
            title={minimizeHeader ? "Expand" : "Minimize"}
          >
            <Minus size={16} />
          </button>
        </div>

        {!minimizeHeader && (
          <>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
              {article.title}
            </h1>

            <div className="mb-3">
              <p className={`text-slate-400 text-sm md:text-base transition-all ${expandDescription ? "" : "line-clamp-1"}`}>
                {article.description}
              </p>
              <button
                onClick={() => setExpandDescription(!expandDescription)}
                className="mt-1 inline-flex items-center gap-1 text-xs text-yellow-500 hover:text-yellow-400 transition-colors"
              >
                {expandDescription ? "Show Less" : "Show More"}
                <ChevronDown size={14} className={`transition-transform ${expandDescription ? "rotate-180" : ""}`} />
              </button>
            </div>
          </>
        )}

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-slate-400 mb-3">
          <span className="flex items-center gap-1.5">
            <User size={14} />
            {article.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            {new Date(article.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span>{article.readTime} min</span>
        </div>

        {/* Tags */}
        {!minimizeHeader && article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium hover:bg-slate-700 transition"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Gallery Mode - Images only with minimal description
  if (displayType === "gallery") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col">
        {renderHeader()}

        {images.length > 0 ? (
          <div className="flex-1 flex flex-col min-h-0 px-4 md:px-8 py-8">
            <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
              {/* Main Image */}
              <div className="flex-1 relative flex items-center justify-center min-h-0 mb-6">
                <img
                  src={images[currentImageIndex].url || ""}
                  alt={
                    images[currentImageIndex].alt || `Page ${currentImageIndex + 1}`
                  }
                  className="max-h-full max-w-full object-contain rounded-lg border border-slate-700/70"
                />

                {/* Page counter */}
                <div className="absolute top-4 right-4 bg-slate-900/90 text-white px-2.5 py-1 rounded-full text-xs font-semibold border border-slate-600/70">
                  {currentImageIndex + 1} / {images.length}
                </div>

                {/* Navigation */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === 0 ? images.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-100 hover:bg-white text-gray-900 p-2 rounded-full transition z-20 shadow-md"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === images.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-100 hover:bg-white text-gray-900 p-2 rounded-full transition z-20 shadow-md"
                    >
                      <ChevronLeft size={20} className="rotate-180" />
                    </button>
                  </>
                )}
              </div>

              {/* Image Caption */}
              {images[currentImageIndex].alt && (
                <p className="text-slate-400 text-center text-xs italic mb-4">
                  {images[currentImageIndex].alt}
                </p>
              )}

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-1.5 overflow-x-auto pb-2 justify-center">
                  {images.map((image, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`flex-shrink-0 w-12 h-12 rounded-md overflow-hidden border-2 transition ${
                        idx === currentImageIndex
                          ? "border-blue-500"
                          : "border-slate-700 hover:border-slate-400"
                      }`}
                    >
                      <img
                        src={image.url || ""}
                        alt={image.alt || `Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400">
            <p className="text-lg">No images available for this article</p>
          </div>
        )}
      </div>
    );
  }

  // Blog Mode - Full content with inline images
  if (displayType === "blog") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {renderHeader()}

        <article className="px-4 md:px-8 py-12">
          <div className="max-w-3xl mx-auto">
            {/* Featured Image */}
            {article.mainImage && (
              <img
                src={article.mainImage}
                alt={article.title}
                className="w-full h-64 object-cover rounded-lg mb-8 border border-slate-700"
              />
            )}

            {/* Content */}
            <PortableTextRenderer content={article.content || []} />

            {/* SEO Footer */}
            <div className="mt-16 pt-8 border-t border-slate-800">
              <div className="flex flex-wrap gap-2">
                {article.tags && article.tags.length > 0 && (
                  <>
                    <span className="text-slate-400">Tags:</span>
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-blue-400 hover:text-blue-300 cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </>
                )}
              </div>

              <p className="text-slate-400 text-sm mt-6">
                Written by <span className="font-semibold">{article.author}</span> on{" "}
                {new Date(article.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </article>
      </div>
    );
  }

  // Hybrid Mode - Blog content first, gallery at bottom
  if (displayType === "hybrid") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {renderHeader()}

        <article className="px-4 md:px-8 py-12">
          <div className="max-w-3xl mx-auto">
            {/* Featured Image */}
            {article.mainImage && (
              <img
                src={article.mainImage}
                alt={article.title}
                className="w-full h-64 object-cover rounded-lg mb-8 border border-slate-700"
              />
            )}

            {/* Text Content */}
            <PortableTextRenderer content={article.content || []} />

            {/* Gallery Section at Bottom */}
            {images.length > 0 && (
              <section className="mt-16 pt-12 border-t border-slate-800">
                <h2 className="text-3xl font-bold text-white mb-8">Gallery</h2>
                <ImageGallery images={images} />
              </section>
            )}

            {/* SEO Footer */}
            <div className="mt-16 pt-8 border-t border-slate-800">
              <div className="flex flex-wrap gap-2">
                {article.tags && article.tags.length > 0 && (
                  <>
                    <span className="text-slate-400">Tags:</span>
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-blue-400 hover:text-blue-300 cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </>
                )}
              </div>

              <p className="text-slate-400 text-sm mt-6">
                Written by <span className="font-semibold">{article.author}</span> on{" "}
                {new Date(article.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </article>
      </div>
    );
  }

  // Fallback - default to blog mode
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {renderHeader()}
      <article className="px-4 md:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          {article.mainImage && (
            <img
              src={article.mainImage}
              alt={article.title}
              className="w-full h-96 object-cover rounded-lg mb-12"
            />
          )}
          <PortableTextRenderer content={article.content || []} />
        </div>
      </article>
    </div>
  );
};

export default DynamicArticleRenderer;
