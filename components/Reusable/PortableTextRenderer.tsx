"use client";

import React from "react";

interface PortableTextBlock {
  _type?: string;
  _key?: string;
  style?: string;
  children?: Array<{
    _type: string;
    _key?: string;
    text: string;
    marks?: string[];
  }>;
  level?: number;
  listItem?: string;
  markDefs?: Array<{
    _type: string;
    _key: string;
    href?: string;
  }>;
  url?: string;
  alt?: string;
  asset?: {
    _ref: string;
  };
}

interface PortableTextRendererProps {
  content: PortableTextBlock[];
  imageComponent?: React.ComponentType<{
    src: string;
    alt: string;
    className?: string;
  }>;
}

const PortableTextRenderer: React.FC<PortableTextRendererProps> = ({
  content,
  imageComponent: ImageComponent,
}) => {
  if (!Array.isArray(content)) {
    return null;
  }

  const renderMark = (
    text: string,
    marks?: string[],
    markDefs?: Array<{ _type: string; _key: string; href?: string }>
  ) => {
    if (!marks || marks.length === 0) {
      return <span key={Math.random()}>{text}</span>;
    }

    return marks.reduce((element, mark) => {
      const markDef = markDefs?.find((m) => m._key === mark);

      if (mark === "strong") {
        return <strong key={Math.random()}>{element}</strong>;
      }
      if (mark === "em") {
        return <em key={Math.random()}>{element}</em>;
      }
      if (mark === "code") {
        return (
          <code
            key={Math.random()}
            className="bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded text-sm font-mono"
          >
            {element}
          </code>
        );
      }
      if (mark === "underline") {
        return (
          <u key={Math.random()} className="underline">
            {element}
          </u>
        );
      }
      if (markDef?.href) {
        return (
          <a
            key={Math.random()}
            href={markDef.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {element}
          </a>
        );
      }
      return element;
    }, <span key={Math.random()}>{text}</span>);
  };

  const renderBlock = (block: PortableTextBlock, index: number) => {
    // Handle text blocks
    if (block._type === "block") {
      const children = block.children || [];
      const content = children.map((child, idx) => {
        const markedText = renderMark(child.text, child.marks, block.markDefs);
        return <React.Fragment key={idx}>{markedText}</React.Fragment>;
      });

      const style = block.style || "normal";

      if (style === "h1") {
        return (
          <h1
            key={index}
            className="text-4xl md:text-5xl font-bold text-white mt-8 mb-4 tracking-tight"
          >
            {content}
          </h1>
        );
      }
      if (style === "h2") {
        return (
          <h2
            key={index}
            className="text-3xl md:text-4xl font-bold text-white mt-7 mb-3 tracking-tight"
          >
            {content}
          </h2>
        );
      }
      if (style === "h3") {
        return (
          <h3
            key={index}
            className="text-2xl md:text-3xl font-bold text-white mt-6 mb-3 tracking-tight"
          >
            {content}
          </h3>
        );
      }

      // Check for list items
      if (block.listItem === "bullet") {
        return (
          <li key={index} className="ml-6 text-slate-300 leading-relaxed">
            <span className="mr-3">•</span>
            {content}
          </li>
        );
      }
      if (block.listItem === "number") {
        return (
          <li key={index} className="ml-6 text-slate-300 leading-relaxed">
            <span className="mr-3 font-semibold">
              {index + 1}
            </span>
            {content}
          </li>
        );
      }

      // Default paragraph
      return (
        <p key={index} className="text-slate-300 leading-relaxed mb-4 text-base md:text-lg">
          {content}
        </p>
      );
    }

    // Handle images
    if (block._type === "image") {
      const imageUrl = block.url;
      const alt = block.alt || "Image";

      // Skip rendering if no image URL
      if (!imageUrl) {
        return null;
      }

      if (ImageComponent) {
        return (
          <div key={index} className="my-8">
            <ImageComponent src={imageUrl} alt={alt} className="rounded-lg w-full" />
            {alt && (
              <p className="text-slate-400 text-sm mt-2 italic text-center">{alt}</p>
            )}
          </div>
        );
      }

      return (
        <div key={index} className="my-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={alt}
            className="rounded-lg w-full max-w-2xl mx-auto"
            loading="lazy"
          />
          {alt && (
            <p className="text-slate-400 text-sm mt-2 italic text-center">{alt}</p>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="prose prose-invert max-w-none">
      {content.map((block, index) => renderBlock(block, index))}
    </div>
  );
};

export default PortableTextRenderer;
