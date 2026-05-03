"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User, BookOpen, ArrowRight, ChevronDown } from "lucide-react";

interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  author: string;
  date: string;
  readTime: number;
  mainImage?: string;
  tags: string[];
}

interface FeaturedArticleProps {
  articles?: Article[];
  limit?: number;
}

export default function FeaturedArticle({ articles = [], limit = 3 }: FeaturedArticleProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  const featuredArticles = articles.slice(0, limit);

  return (
    <section className="w-full bg-gradient-to-br from-yellow-50 via-white to-amber-50 py-12 md:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="text-yellow-600" size={32} />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Latest Articles
            </h2>
          </div>
          <p className="text-gray-600 text-lg">
            Explore our most recent technical insights and learning resources
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArticles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/tools/articles"
            className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition-all duration-300"
          >
            View All Articles <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ArticleCard({ article }: { article: Article }) {
  const [expandDescription, setExpandDescription] = useState(false);
  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="h-full bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Image */}
      {article.mainImage && (
        <div className="relative h-48 w-full overflow-hidden group">
          <Image
            src={article.mainImage}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Tags */}
        <div className="flex gap-2 mb-3 flex-wrap">
          {article.tags && article.tags.slice(0, 2).map((tag, idx) => (
            <span
              key={idx}
              className="inline-block px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
          {article.title}
        </h3>

        {/* Description with Toggle */}
        <div className="mb-4 flex-grow">
          <p className={`text-gray-600 text-sm ${expandDescription ? "" : "line-clamp-1"}`}>
            {article.description}
          </p>
          <button
            onClick={() => setExpandDescription(!expandDescription)}
            className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-yellow-600 hover:text-yellow-700 transition-colors"
          >
            {expandDescription ? "Show Less" : "Show More"}
            <ChevronDown size={14} className={`transition-transform ${expandDescription ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Meta Information */}
        <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4 border-t pt-4">
          <div className="flex items-center gap-1">
            <Calendar size={14} className="text-yellow-600" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} className="text-yellow-600" />
            <span>{article.readTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <User size={14} className="text-yellow-600" />
            <span>{article.author}</span>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href={`/tools/articles/${article.slug.current}`}
          className="inline-block px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition-colors duration-300 text-center text-sm"
        >
          Read Article
        </Link>
      </div>
    </div>
  );
}

