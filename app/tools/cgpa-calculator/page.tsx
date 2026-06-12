import React from "react";
import CGPACalculator from "@/components/Reusable/CGPACalculator";

export const metadata = {
  title: "CGPA Calculator SRM | Free SRM University GPA Calculator - CHiPSET",
  description:
    "Free CGPA calculator for SRM University students. Calculate your SRM CGPA, semester GPA, and overall CGPA instantly using the official SRM grading system. Easy, accurate, and free.",
  keywords: [
    "cgpa calculator srm",
    "srm cgpa calculator",
    "srm university cgpa calculator",
    "gpa calculator srm",
    "srm gpa calculator",
    "cgpa calculator srm ramapuram",
    "srm ramapuram cgpa calculator",
    "calculate cgpa srm",
    "srm grading system calculator",
    "srm university gpa calculator",
    "free cgpa calculator srm",
  ],
  openGraph: {
    title: "CGPA Calculator SRM | Free SRM University GPA Calculator",
    description:
      "Free CGPA calculator for SRM University students. Calculate your SRM CGPA, semester GPA, and overall CGPA instantly using the official SRM grading system.",
    url: "https://www.chipsetsrm.live/tools/cgpa-calculator",
    type: "website",
    siteName: "CHIPSET SRM University Ramapuram",
  },
  twitter: {
    card: "summary_large_image",
    title: "CGPA Calculator SRM | Free SRM University GPA Calculator",
    description:
      "Free CGPA calculator for SRM University students. Calculate your SRM CGPA and GPA instantly.",
  },
  alternates: {
    canonical: "https://www.chipsetsrm.live/tools/cgpa-calculator",
  },
};

export default function CGPACalculatorPage() {
  return (
    <div className="min-h-screen bg-white pt-20 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 text-center animate-fade-in">
          <div className="inline-block mb-4 px-4 py-2 bg-orange-50 border border-orange-200 rounded-full">
            <span className="text-[#f39e2f] text-sm font-semibold uppercase tracking-wider">
              SRM University Tool
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 tracking-tight">
            CGPA Calculator
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Calculate your SRM CGPA instantly with our official grading system calculator
          </p>
        </div>

        {/* Calculator Component */}
        <div className="mb-16">
          <CGPACalculator />
        </div>

        {/* SEO CONTENT START */}
        <section className="mt-16 space-y-12">
          {/* Section 1: Main Info */}
          <div className="bg-gray-50 rounded-2xl p-8 md:p-10 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-3xl font-bold text-black mb-4">CGPA Calculator for SRM University Students</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              This CGPA calculator is designed specifically for SRM University
              students to calculate semester GPA and overall CGPA using the
              official SRM grading system. Get instant, accurate results without any login required.
            </p>
          </div>

          {/* Section 2: What is CGPA */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold text-black mb-3 flex items-center gap-2">
                <span className="text-[#f39e2f]">●</span> What is CGPA?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                CGPA (Cumulative Grade Point Average) represents the overall academic
                performance of a student across all completed semesters at SRM
                University. It&apos;s a critical metric for academic standing and career opportunities.
              </p>
            </div>

            {/* Section 3: How CGPA is Calculated */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold text-black mb-3 flex items-center gap-2">
                <span className="text-[#f39e2f]">●</span> How is CGPA Calculated in SRM?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                SRM follows a credit-based grading system where each subject carries
                a credit value and a corresponding grade point. CGPA is calculated
                by dividing the total weighted grade points by total credits.
              </p>
            </div>
          </div>

          {/* Section 4: Why Use This Calculator */}
          <div className="bg-orange-50 rounded-2xl p-8 md:p-10 border border-orange-200 shadow-sm">
            <h3 className="text-2xl font-bold text-black mb-6">Why Use This SRM CGPA Calculator?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <span className="text-[#f39e2f] font-bold text-xl mt-1">✓</span>
                <div>
                  <p className="text-black font-semibold">Official Grading System</p>
                  <p className="text-gray-600 text-sm">Uses official SRM grading system</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#f39e2f] font-bold text-xl mt-1">✓</span>
                <div>
                  <p className="text-black font-semibold">No Login Required</p>
                  <p className="text-gray-600 text-sm">Start calculating instantly</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#f39e2f] font-bold text-xl mt-1">✓</span>
                <div>
                  <p className="text-black font-semibold">Instant Results</p>
                  <p className="text-gray-600 text-sm">Get accurate results in real-time</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#f39e2f] font-bold text-xl mt-1">✓</span>
                <div>
                  <p className="text-black font-semibold">All Campuses</p>
                  <p className="text-gray-600 text-sm">Works for all SRM campuses</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: FAQ */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-black mb-6">Frequently Asked Questions</h3>
            
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-[#f39e2f] transition-all">
              <h4 className="text-lg font-bold text-black mb-2">Is this CGPA calculator accurate for SRM?</h4>
              <p className="text-gray-700">
                Yes, this calculator follows the official SRM University grading
                scheme and credit system for accurate calculations.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-[#f39e2f] transition-all">
              <h4 className="text-lg font-bold text-black mb-2">Does arrear affect CGPA in SRM?</h4>
              <p className="text-gray-700">
                Yes, arrears can affect CGPA until they are cleared successfully.
                This calculator accounts for all grades including arrears.
              </p>
            </div>
          </div>
        </section>
        {/* SEO CONTENT END */}
      </div>
    </div>
  );
}
