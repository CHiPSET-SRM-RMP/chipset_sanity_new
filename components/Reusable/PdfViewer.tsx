"use client";

import React, { useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download,
  FileText,
  Maximize2,
  Minimize2,
  RotateCw,
} from "lucide-react";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Set up the worker for react-pdf v7
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PdfViewerProps {
  url: string;
  title: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ url, title }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.2);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  // Use our proxy to bypass CORS - this URL is same-origin so pdf.js can fetch it
  const proxyUrl = `/api/pdf-proxy?url=${encodeURIComponent(url)}`;

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
  }, []);

  const onDocumentLoadError = useCallback((error: Error) => {
    console.error("PDF load error:", error);
    setLoadError(true);
    setIsLoading(false);
  }, []);

  const goToPrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () => setPageNumber((prev) => Math.min(prev + 1, numPages));
  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));
  const rotate = () => setRotation((prev) => (prev + 90) % 360);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      setScale(1.5);
    } else {
      setScale(1.2);
    }
  };

  // Error / fallback state
  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <FileText size={64} className="text-red-400 mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Unable to load PDF</h3>
        <p className="text-slate-400 mb-6 text-center max-w-md">
          The PDF viewer couldn&apos;t load this document. You can still download it directly.
        </p>
        <a
          href={proxyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition shadow-lg"
        >
          <Download size={18} />
          Download PDF
        </a>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col ${
        isFullscreen
          ? "fixed inset-0 z-50 bg-slate-950"
          : "w-full"
      }`}
    >
      {/* Toolbar */}
      <div className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/60 px-3 md:px-6 py-2.5 flex items-center justify-between gap-2 sticky top-0 z-30">
        {/* Left: Page navigation */}
        <div className="flex items-center gap-1.5 md:gap-2">
          <button
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className="p-2 rounded-lg hover:bg-slate-700/80 disabled:opacity-30 disabled:cursor-not-allowed text-slate-200 transition"
            title="Previous page"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-1.5 bg-slate-800/80 rounded-lg px-3 py-1.5 border border-slate-700/50">
            <input
              type="number"
              min={1}
              max={numPages}
              value={pageNumber}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (val >= 1 && val <= numPages) setPageNumber(val);
              }}
              className="w-10 md:w-12 text-center bg-transparent text-white text-sm font-medium focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="text-slate-400 text-sm">/</span>
            <span className="text-slate-300 text-sm font-medium">{numPages || "..."}</span>
          </div>

          <button
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            className="p-2 rounded-lg hover:bg-slate-700/80 disabled:opacity-30 disabled:cursor-not-allowed text-slate-200 transition"
            title="Next page"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Center: Zoom controls */}
        <div className="flex items-center gap-1 md:gap-1.5">
          <button
            onClick={zoomOut}
            disabled={scale <= 0.5}
            className="p-2 rounded-lg hover:bg-slate-700/80 disabled:opacity-30 text-slate-200 transition"
            title="Zoom out"
          >
            <ZoomOut size={18} />
          </button>

          <span className="text-slate-300 text-xs md:text-sm font-medium min-w-[45px] text-center bg-slate-800/60 px-2 py-1 rounded border border-slate-700/40">
            {Math.round(scale * 100)}%
          </span>

          <button
            onClick={zoomIn}
            disabled={scale >= 3}
            className="p-2 rounded-lg hover:bg-slate-700/80 disabled:opacity-30 text-slate-200 transition"
            title="Zoom in"
          >
            <ZoomIn size={18} />
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1 md:gap-1.5">
          <button
            onClick={rotate}
            className="p-2 rounded-lg hover:bg-slate-700/80 text-slate-200 transition hidden md:block"
            title="Rotate"
          >
            <RotateCw size={18} />
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg hover:bg-slate-700/80 text-slate-200 transition"
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>

          <a
            href={proxyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs md:text-sm font-semibold rounded-lg transition shadow-sm"
          >
            <Download size={14} />
            <span className="hidden md:inline">Download</span>
          </a>
        </div>
      </div>

      {/* PDF Document Area */}
      <div
        className={`flex-1 overflow-auto bg-gradient-to-b from-slate-800/40 via-slate-900/60 to-slate-950/80 ${
          isFullscreen ? "h-[calc(100vh-52px)]" : "min-h-[80vh]"
        }`}
      >
        {/* Loading skeleton */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-slate-600 border-t-blue-500 rounded-full animate-spin" />
            <p className="text-slate-400 text-sm font-medium">Loading PDF...</p>
          </div>
        )}

        <div className="flex justify-center py-4 md:py-6">
          <Document
            file={proxyUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading=""
            className="flex justify-center"
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              rotate={rotation}
              className="shadow-[0_8px_40px_rgba(0,0,0,0.6)] rounded-sm"
              renderTextLayer={true}
              renderAnnotationLayer={true}
            />
          </Document>
        </div>
      </div>

      {/* Bottom page strip (quick navigation) */}
      {numPages > 1 && (
        <div className="bg-slate-950/95 border-t border-slate-800 px-4 py-2.5 flex items-center justify-center gap-2">
          <div className="flex gap-1 overflow-x-auto max-w-full pb-0.5">
            {Array.from({ length: Math.min(numPages, 20) }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setPageNumber(page)}
                  className={`flex-shrink-0 w-8 h-8 rounded-md text-xs font-semibold transition ${
                    pageNumber === page
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700/50"
                  }`}
                >
                  {page}
                </button>
              )
            )}
            {numPages > 20 && (
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-slate-500 text-xs">
                ...
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfViewer;
