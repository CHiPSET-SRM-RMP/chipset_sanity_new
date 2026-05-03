"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GalleryImage {
  url?: string;
  alt?: string;
  _type?: string;
  _key?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  title?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, title }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Filter out images without valid URLs
  const validImages = images?.filter((img) => img.url) || [];

  if (!validImages || validImages.length === 0) {
    return null;
  }

  const handlePrev = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? validImages.length - 1 : prev - 1;
    });
  };

  const handleNext = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => {
      if (prev === null) return null;
      return prev === validImages.length - 1 ? 0 : prev + 1;
    });
  };

  const handleClose = () => {
    setSelectedImageIndex(null);
  };

  return (
    <>
      {/* Gallery Section */}
      <div className="my-12">
        {title && (
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            {title}
          </h2>
        )}

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {validImages.map((image, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImageIndex(idx)}
              className="relative group overflow-hidden rounded-lg aspect-square"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.url}
                alt={image.alt || `Gallery image ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white text-center">
                    <div className="text-sm font-medium">Click to view</div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal Lightbox */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-50 bg-white hover:bg-slate-200 text-black p-2 rounded-full transition"
          >
            <X size={24} />
          </button>

          {/* Main Image */}
          <div className="relative w-full max-w-4xl flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={validImages[selectedImageIndex].url}
              alt={validImages[selectedImageIndex].alt || `Image ${selectedImageIndex + 1}`}
              className="max-h-[75vh] max-w-full object-contain rounded-lg"
            />

            {/* Image Counter */}
            <div className="absolute bottom-4 left-4 bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-semibold border border-slate-600">
              {selectedImageIndex + 1} / {validImages.length}
            </div>

            {/* Navigation Buttons */}
            {validImages.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-slate-200 text-black p-2 md:p-3 rounded-full transition z-20"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-slate-200 text-black p-2 md:p-3 rounded-full transition z-20"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          {/* Image Caption */}
          {validImages[selectedImageIndex].alt && (
            <div className="absolute bottom-16 left-4 right-4 text-center text-slate-300 text-sm">
              {validImages[selectedImageIndex].alt}
            </div>
          )}

          {/* Thumbnails */}
          {validImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 justify-center flex-wrap max-w-md max-h-24 overflow-y-auto">
              {validImages.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`flex-shrink-0 w-12 h-12 rounded-md overflow-hidden border-2 transition ${
                    idx === selectedImageIndex
                      ? "border-blue-500"
                      : "border-slate-600 hover:border-slate-400"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.url}
                    alt={image.alt || `Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ImageGallery;
