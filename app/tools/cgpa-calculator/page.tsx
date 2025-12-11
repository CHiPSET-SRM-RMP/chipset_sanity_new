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
    url: "https://chipsetsrm.vercel.app/tools/cgpa-calculator",
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
    canonical: "https://chipsetsrm.vercel.app/tools/cgpa-calculator",
  },
};

export default function CGPACalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <CGPACalculator />
      </div>
    </div>
  );
}
