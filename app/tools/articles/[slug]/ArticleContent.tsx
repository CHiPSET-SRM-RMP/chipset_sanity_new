"use client";

import React, { useState } from "react";
import { Calendar, User, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface ArticleImage {
  url?: string;
  alt?: string;
  _type?: string;
}

interface Article {
  _id: string;
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: number;
  mainImage?: string;
  content?: ArticleImage[];
  tags: string[];
}

export default function ArticleContent({ article }: { article: Article }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = (article.content || []).filter(
    (item) => item._type === "image" && !!item.url
  );

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex flex-col">
      {/* Compact Header */}
      <div className="px-4 md:px-8 pt-4 pb-3 flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <Link
            href="/tools/articles"
            className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition"
          >
            <ChevronLeft size={14} /> Back
          </Link>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <User size={12} />
              {article.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {new Date(article.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span>{article.readTime} min</span>
          </div>
        </div>
        <h1 className="text-lg md:text-xl font-bold text-white tracking-tight line-clamp-1">
          {article.title}
        </h1>
        <p className="text-slate-400 text-xs md:text-sm mt-1 line-clamp-1">
          {article.description}
        </p>
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded-full text-[10px] font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Image Gallery - fills remaining space */}
      {images.length > 0 ? (
        <div className="flex-1 flex flex-col min-h-0">
          {/* Main Image */}
          <div className="flex-1 relative flex items-center justify-center px-4 md:px-10 min-h-0">
            <img
              src={images[currentImageIndex].url || ""}
              alt={images[currentImageIndex].alt || `Page ${currentImageIndex + 1}`}
              className="max-h-full max-w-full object-contain rounded-lg border border-slate-700/70"
            />

            {/* Page counter */}
            <div className="absolute top-2 right-6 bg-slate-900/80 text-white px-2.5 py-1 rounded-full text-xs font-semibold border border-slate-600/70">
              {currentImageIndex + 1} / {images.length}
            </div>

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 bg-slate-100 hover:bg-white text-gray-900 p-2 rounded-full transition z-20 shadow-md"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 bg-slate-100 hover:bg-white text-gray-900 p-2 rounded-full transition z-20 shadow-md"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex-shrink-0 border-t border-slate-800 px-4 md:px-6 py-2.5">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-md overflow-hidden border-2 transition ${
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
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-slate-400">
          <p>No images available for this article</p>
        </div>
      )}
    </div>
  );
}
