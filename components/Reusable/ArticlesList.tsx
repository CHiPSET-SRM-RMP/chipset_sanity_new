"use client";

import React, { useState, useEffect } from "react";
import { Search, BookOpen, Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Article {
  _id: string;
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: number;
  mainImage?: string;
  slug?: { current: string };
  tags: string[];
}

const ArticlesList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/articles");
        if (!response.ok) throw new Error("Failed to fetch articles");
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.tags && article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <BookOpen size={48} className="mx-auto text-blue-600 mb-4 animate-bounce" />
          <p className="text-xl text-gray-600">Loading articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen size={32} className="text-blue-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Tech Articles</h1>
          </div>
          <p className="text-xl text-gray-600">
            Explore in-depth technical articles and learning resources for web development
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search articles by title, topic, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full font-semibold transition ${selectedCategory === null
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
              All Articles
            </button>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <div
                key={article._id}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden hover:scale-105 transform duration-300"
              >
                {/* Article Image */}
                {article.mainImage && (
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    <img
                      src={article.mainImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                  </div>
                )}

                {/* Article Content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {article.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags?.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                    <span>{article.readTime} min read</span>
                  </div>

                  {/* Author and Read More */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        C
                      </div>
                      <span className="text-sm text-gray-700 font-semibold">{article.author}</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 transition">
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-xl text-gray-500">No articles found matching your search.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory(null);
                }}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-3">📚 About Our Articles</h3>
          <p className="text-gray-700 mb-3">
            Our tech articles cover a wide range of topics including web development, programming languages,
            frameworks, and best practices. Each article is carefully curated to help you stay updated with
            the latest trends and technologies in the tech industry.
          </p>
          <p className="text-gray-600">
            Want to contribute? Contact the CHiPSET team to share your knowledge with the community!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArticlesList;
