"use client";

import React from "react";
import DynamicArticleRenderer from "@/components/Reusable/DynamicArticleRenderer";

interface Article {
  _id: string;
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: number;
  mainImage?: string;
  content?: any[];
  tags: string[];
  displayType?: "gallery" | "blog" | "hybrid" | "pdf";
  pdfUrl?: string;
}

export default function ArticleContent({ article }: { article: Article }) {
  return <DynamicArticleRenderer article={article} />;
}

