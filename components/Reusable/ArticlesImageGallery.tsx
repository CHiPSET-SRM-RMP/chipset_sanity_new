"use client";

import React, { useState, useEffect } from "react";
import { Search, BookOpen, Calendar, User, X, ChevronLeft, ChevronRight } from "lucide-react";

interface Article {
  _id: string;
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: number;
  mainImage?: string;
  content?: Array<{ url?: string; alt?: string; _type?: string }>;
  tags: string[];
}

const ArticlesImageGallery: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const getArticleImages = (article: Article) => {
    if (article.content && Array.isArray(article.content)) {
      // Take any block that has a URL (image pages)
      return article.content.filter((item) => !!item.url);
    }
    return [];
  };

  const handlePrevImage = () => {
    if (!selectedArticle) return;
    const images = getArticleImages(selectedArticle);
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    if (!selectedArticle) return;
    const images = getArticleImages(selectedArticle);
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen size={32} className="text-blue-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Tech Articles</h1>
          </div>
          <p className="text-xl text-gray-600">
            Explore visual tech articles and learning resources
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
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
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredArticles.map((article) => {
              const images = getArticleImages(article);
              const hasImages = images.length > 0;

              return (
                <div
                  key={article._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden group cursor-pointer"
                  onClick={() => {
                    if (hasImages) {
                      setSelectedArticle(article);
                      setCurrentImageIndex(0);
                    }
                  }}
                >
                  {/* Main Image Preview */}
                  {article.mainImage && (
                    <div className="relative h-48 overflow-hidden bg-gray-200">
                      <img
                        src={article.mainImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      />
                      <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {images.length} images
                      </div>
                    </div>
                  )}

                  {/* Article Info */}
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
                      <span>{article.readTime} min</span>
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {article.author?.charAt(0).toUpperCase() || "A"}
                      </div>
                      <span className="text-sm text-gray-700 font-semibold">{article.author}</span>
                    </div>

                    {/* Click to View */}
                    {hasImages && (
                      <div className="mt-3 text-center text-blue-600 font-semibold text-sm">
                        Click to view article →
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-xl text-gray-500">No articles found matching your search.</p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Info Section */}
        <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">📸 Visual Learning</h3>
          <p className="text-gray-700">
            Each article contains a collection of images with visual explanations. Click on any article to view its image gallery and explore the content step by step.
          </p>
        </div>
      </div>

      {/* Image Viewer Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800/60 rounded-xl shadow-[0_18px_60px_rgba(15,23,42,0.9)] max-w-5xl w-full max-h-[92vh] overflow-hidden flex flex-col">
            {/* Image Content with floating header */}
            <div className="flex-1 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
              {getArticleImages(selectedArticle).length > 0 ? (
                <div className="w-full h-full flex flex-col">
                  {/* Main Image + floating header */}
                  <div className="flex-1 relative overflow-hidden px-3 pt-2 pb-4 md:px-8 md:pt-4 md:pb-6">
                    {/* Gradient overlay at top so header blends with image */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/75 via-black/45 to-transparent z-10" />

                    {/* Header over image */}
                    <div className="relative z-20 px-2 md:px-1 pb-1 flex justify-between items-start text-white">
                      <div className="flex-1 pr-3">
                        <h2 className="text-xl md:text-2xl font-bold mb-1 tracking-tight">
                          {selectedArticle.title}
                        </h2>
                        <p className="text-slate-100/90 mb-1.5 text-xs md:text-sm line-clamp-2">
                          {selectedArticle.description}
                        </p>
                        <div className="flex items-center gap-3 text-[11px] md:text-xs text-slate-100/80">
                          <span className="flex items-center gap-1">
                            <User size={14} />
                            {selectedArticle.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(selectedArticle.date).toLocaleDateString()}
                          </span>
                          <span>{selectedArticle.readTime} min read</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedArticle(null)}
                        className="ml-2 text-white/90 hover:bg-black/40 border border-white/10 p-1.5 rounded-md transition"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    {/* Centered image */}
                    <div className="w-full h-full flex items-center justify-center pt-2 relative z-10">
                      <img
                        src={getArticleImages(selectedArticle)[currentImageIndex].url || ""}
                        alt={
                          getArticleImages(selectedArticle)[currentImageIndex].alt ||
                          `Step ${currentImageIndex + 1}`
                        }
                        className="max-h-[58vh] md:max-h-[62vh] w-auto object-contain rounded-xl shadow-[0_10px_35px_rgba(15,23,42,0.9)] border border-slate-700/70 bg-slate-900/50"
                      />

                      {/* Page counter - top right */}
                      <div className="absolute top-4 right-4 bg-slate-900/80 text-white px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold tracking-wide shadow-md border border-slate-600/70">
                        {currentImageIndex + 1} / {getArticleImages(selectedArticle).length}
                      </div>

                      {/* Navigation Buttons */}
                      {getArticleImages(selectedArticle).length > 1 && (
                        <>
                          <button
                            onClick={handlePrevImage}
                            className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 bg-slate-100 hover:bg-white text-gray-900 p-2.5 md:p-3 rounded-full transition z-20 shadow-md border border-slate-300/70"
                          >
                            <ChevronLeft size={24} />
                          </button>
                          <button
                            onClick={handleNextImage}
                            className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 bg-slate-100 hover:bg-white text-gray-900 p-2.5 md:p-3 rounded-full transition z-20 shadow-md border border-slate-300/70"
                          >
                            <ChevronRight size={24} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Image Counter and Thumbnails */}
                  <div className="bg-slate-950/95 border-t border-slate-800 px-4 md:px-5 py-3">
                    <div className="flex items-center justify-between mb-3 text-xs md:text-sm text-slate-300">
                      <span className="font-medium">
                        Page {currentImageIndex + 1} of {getArticleImages(selectedArticle).length}
                      </span>
                      <span className="text-slate-400 hidden sm:inline">
                        Scroll thumbnails to jump between pages
                      </span>
                    </div>

                    {/* Thumbnail Strip */}
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {getArticleImages(selectedArticle).map((image, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border transition shadow-sm ${idx === currentImageIndex
                              ? "border-blue-500 shadow-[0_0_0_1px_rgba(59,130,246,0.7)]"
                              : "border-slate-700 hover:border-slate-400/90"
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
                <div className="flex items-center justify-center h-full text-white">
                  <p>No images available for this article</p>
                </div>
              )}
            </div>

            {/* Footer with Tags */}
            <div className="bg-slate-950/95 border-t border-slate-800 px-4 md:px-5 py-4">
              <div className="flex flex-wrap gap-2">
                {selectedArticle.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="bg-slate-800 text-slate-100 px-3 py-1.5 rounded-full font-semibold text-xs md:text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticlesImageGallery;
