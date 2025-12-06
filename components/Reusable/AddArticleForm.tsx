"use client";

import React, { useState } from "react";
import { Upload, X, Plus, Loader } from "lucide-react";
import Image from "next/image";

interface ArticleImage {
  id: string;
  file: File;
  preview: string;
  caption: string;
}

interface FormData {
  title: string;
  description: string;
  author: string;
  readTime: number;
  tags: string[];
  images: ArticleImage[];
  mainImageId: string;
}

const AddArticleForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    author: "",
    readTime: 5,
    tags: [],
    images: [],
    mainImageId: "",
  });

  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImage: ArticleImage = {
          id: Date.now().toString(),
          file,
          preview: event.target?.result as string,
          caption: "",
        };

        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, newImage],
          mainImageId: prev.mainImageId || newImage.id,
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id: string) => {
    setFormData((prev) => {
      const updatedImages = prev.images.filter((img) => img.id !== id);
      return {
        ...prev,
        images: updatedImages,
        mainImageId:
          prev.mainImageId === id && updatedImages.length > 0
            ? updatedImages[0].id
            : "",
      };
    });
  };

  const updateImageCaption = (id: string, caption: string) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.map((img) =>
        img.id === id ? { ...img, caption } : img
      ),
    }));
  };

  const addTag = () => {
    if (newTag.trim() && formData.tags.length < 5) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (!formData.title || !formData.description || formData.images.length === 0) {
        throw new Error("Please fill all required fields and upload at least one image");
      }

      // Create FormData for multipart upload
      const uploadFormData = new FormData();
      uploadFormData.append("title", formData.title);
      uploadFormData.append("description", formData.description);
      uploadFormData.append("author", formData.author);
      uploadFormData.append("readTime", formData.readTime.toString());
      uploadFormData.append("tags", JSON.stringify(formData.tags));
      uploadFormData.append("mainImageId", formData.mainImageId);

      // Add images and their captions
      formData.images.forEach((img) => {
        uploadFormData.append("images", img.file);
        uploadFormData.append(`caption_${img.id}`, img.caption);
      });

      const response = await fetch("/api/articles/upload", {
        method: "POST",
        body: uploadFormData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload article");
      }

      setMessage({
        type: "success",
        text: "Article uploaded successfully! Check Sanity Studio to publish it.",
      });

      // Reset form
      setFormData({
        title: "",
        description: "",
        author: "",
        readTime: 5,
        tags: [],
        images: [],
        mainImageId: "",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "An error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Add New Article</h1>
          <p className="text-gray-600">Create an image-based tech article</p>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === "success"
                ? "bg-green-100 text-green-800 border border-green-300"
                : "bg-red-100 text-red-800 border border-red-300"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Basic Information</h2>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Article Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter article title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Brief description (max 200 chars)"
                maxLength={200}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.description.length}/200
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Author *
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
                placeholder="Author name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Read Time (minutes)
              </label>
              <input
                type="number"
                value={formData.readTime}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    readTime: parseInt(e.target.value) || 5,
                  })
                }
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Tags</h2>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTag()}
                placeholder="Add a tag (max 5)"
                disabled={formData.tags.length >= 5}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
              <button
                type="button"
                onClick={addTag}
                disabled={formData.tags.length >= 5}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg transition flex items-center gap-2"
              >
                <Plus size={18} />
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(idx)}
                    className="text-blue-800 hover:text-blue-900"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Article Images *</h2>

            {/* Upload Area */}
            <div className="mb-6 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition cursor-pointer">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="mx-auto mb-3 text-gray-400" size={32} />
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  Click to upload images
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB each
                </p>
              </label>
            </div>

            {/* Images Grid */}
            {formData.images.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Uploaded Images ({formData.images.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.images.map((img) => (
                    <div
                      key={img.id}
                      className={`border-2 rounded-lg overflow-hidden transition ${
                        formData.mainImageId === img.id
                          ? "border-blue-600 shadow-lg"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {/* Image Preview */}
                      <div className="relative w-full h-40 bg-gray-100">
                        <img
                          src={img.preview}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                        {formData.mainImageId === img.id && (
                          <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            Main Image
                          </div>
                        )}
                      </div>

                      {/* Caption & Actions */}
                      <div className="p-4 space-y-3">
                        <textarea
                          value={img.caption}
                          onChange={(e) =>
                            updateImageCaption(img.id, e.target.value)
                          }
                          placeholder="Image caption/description"
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                mainImageId: img.id,
                              })
                            }
                            className={`flex-1 px-3 py-2 rounded text-sm font-semibold transition ${
                              formData.mainImageId === img.id
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {formData.mainImageId === img.id
                              ? "Main Image"
                              : "Set as Main"}
                          </button>
                          <button
                            type="button"
                            onClick={() => removeImage(img.id)}
                            className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded text-sm font-semibold transition"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading || formData.images.length === 0}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold rounded-lg transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={20} />
                  Create Article
                </>
              )}
            </button>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-4 text-sm text-gray-700">
            <p className="font-semibold mb-2">ℹ️ Note:</p>
            <p>
              Your article will be created as a draft in Sanity Studio. Visit your Sanity
              dashboard to review and publish it.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddArticleForm;
