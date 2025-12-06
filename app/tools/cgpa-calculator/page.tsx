import React from "react";
import CGPACalculator from "@/components/Reusable/CGPACalculator";

export const metadata = {
  title: "SRM CGPA Calculator | GPA & CGPA Calculator - CHiPSET",
  description:
    "Free SRM CGPA calculator and GPA calculator for SRM University students. Calculate semester GPA and overall CGPA using the SRM grading system instantly.",
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
