"use client";

import React, { useState } from "react";
import { Trash2, Plus } from "lucide-react";

interface Subject {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

const gradePoints: { [key: string]: number } = {
  "O": 10.0,
  "A+": 9.0,
  "A": 8.0,
  "B+": 7.0,
  "B": 6.0,
  "C": 5.0,
  "D": 4.0,
  "F": 0.0,
};

const gradeDetails: { [key: string]: { range: string; description: string; status: string } } = {
  "O": { range: "91-100", description: "Outstanding", status: "PASS" },
  "A+": { range: "81-90", description: "Excellent", status: "PASS" },
  "A": { range: "71-80", description: "Very Good", status: "PASS" },
  "B+": { range: "61-70", description: "Good", status: "PASS" },
  "B": { range: "51-60", description: "Average", status: "PASS" },
  "C": { range: "45-50", description: "Below Average", status: "PASS" },
  "D": { range: "40-44", description: "Poor", status: "PASS" },
  "F": { range: "0-39", description: "Fail", status: "FAIL" },
};

const CGPACalculator: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: "1", name: "", credits: 0, grade: "A+" },
  ]);

  const addSubject = () => {
    const newId = (Math.max(...subjects.map((s) => parseInt(s.id)), 0) + 1).toString();
    setSubjects([...subjects, { id: newId, name: "", credits: 0, grade: "A+" }]);
  };

  const removeSubject = (id: string) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter((s) => s.id !== id));
    }
  };

  const updateSubject = (id: string, field: string, value: any) => {
    setSubjects(
      subjects.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    subjects.forEach((subject) => {
      if (subject.credits > 0) {
        const points = gradePoints[subject.grade] || 0;
        totalPoints += points * subject.credits;
        totalCredits += subject.credits;
      }
    });

    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  };

  const resetCalculator = () => {
    setSubjects([{ id: "1", name: "", credits: 0, grade: "A+" }]);
  };

  const gpa = calculateGPA();

  const [previousGpas, setPreviousGpas] = useState<number[]>([]);
  const [newGpaInput, setNewGpaInput] = useState<string>("");

  const addGpaForCgpa = () => {
    const value = parseFloat(newGpaInput);
    if (!isNaN(value) && value >= 0 && value <= 10) {
      setPreviousGpas((prev) => [...prev, value]);
      setNewGpaInput("");
    }
  };

  const removeGpaAtIndex = (index: number) => {
    setPreviousGpas((prev) => prev.filter((_, i) => i !== index));
  };

  const calculateCGPAFromGpas = () => {
    if (previousGpas.length === 0) return "0.00";
    const sum = previousGpas.reduce((acc, val) => acc + val, 0);
    return (sum / previousGpas.length).toFixed(2);
  };

  const cgpa = calculateCGPAFromGpas();


  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 px-4">
      <div className="w-full max-w-5xl mx-auto p-4 md:p-6 lg:p-8 bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-2xl border border-gray-200/50">
        <div className="mb-6 md:mb-8 text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-2 md:mb-3 tracking-tight">
            SRM GPA & CGPA Calculator
          </h1>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-2">
            Free SRM CGPA calculator for SRM University students. First calculate your current semester GPA,
            then compute overall CGPA using the official SRM grading scale.
          </p>
        </div>

        <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl md:rounded-2xl p-4 md:p-6 mb-6 md:mb-8 shadow-lg border border-gray-200">
          <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-1 lg:grid-cols-2 md:gap-4 mb-4 md:mb-5">
            {/* Subject List Header - Hidden on mobile */}
            <div className="hidden md:block md:col-span-2">
              <div className="flex gap-4 font-bold text-gray-700 mb-4 px-4 text-xs uppercase tracking-wide">
                <div className="flex-1">Credits</div>
                <div className="flex-1">Grade</div>
                <div className="w-20">Action</div>
              </div>
            </div>

            {/* Subject Inputs */}
            {subjects.map((subject, index) => (
              <div key={subject.id} className="md:col-span-2">
                {/* Mobile: Stacked Layout */}
                <div className="md:hidden space-y-2 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-gray-600 uppercase">Subject {index + 1}</span>
                    <button
                      onClick={() => removeSubject(subject.id)}
                      disabled={subjects.length === 1}
                      className="px-2 py-1 bg-red-50 hover:bg-red-100 disabled:bg-gray-100 text-red-600 disabled:text-gray-400 rounded-lg transition-all disabled:cursor-not-allowed text-sm"
                      title="Delete subject"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={subject.credits || ''}
                      onChange={(e) => updateSubject(subject.id, "credits", parseFloat(e.target.value) || 0)}
                      placeholder="Credits"
                      min="0"
                      step="0.5"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f39e2f] focus:border-transparent transition-all text-sm"
                    />
                    <select
                      value={subject.grade}
                      onChange={(e) => updateSubject(subject.id, "grade", e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f39e2f] focus:border-transparent bg-white transition-all text-sm"
                    >
                      {Object.keys(gradePoints).map((grade) => (
                        <option key={grade} value={grade}>
                          {grade}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Desktop: Grid Layout */}
                <div className="hidden md:flex gap-4 items-center bg-white p-4 rounded-xl hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-gray-200">
                  <input
                    type="number"
                    value={subject.credits || ''}
                    onChange={(e) => updateSubject(subject.id, "credits", parseFloat(e.target.value) || 0)}
                    placeholder="Credits"
                    min="0"
                    step="0.5"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f39e2f] focus:border-transparent transition-all"
                  />
                  <select
                    value={subject.grade}
                    onChange={(e) => updateSubject(subject.id, "grade", e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f39e2f] focus:border-transparent bg-white transition-all"
                  >
                    {Object.keys(gradePoints).map((grade) => (
                      <option key={grade} value={grade}>
                        {grade}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => removeSubject(subject.id)}
                    disabled={subjects.length === 1}
                    className="w-20 flex justify-center items-center px-3 py-2 bg-red-50 hover:bg-red-100 disabled:bg-gray-100 text-red-600 disabled:text-gray-400 rounded-lg transition-all hover:scale-105 disabled:cursor-not-allowed disabled:hover:scale-100"
                    title="Delete subject"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Subject Button */}
          <button
            onClick={addSubject}
            className="w-full flex items-center justify-center gap-2 mt-3 md:mt-4 px-4 md:px-5 py-2.5 md:py-3 bg-gradient-to-r from-[#f39e2f] to-[#e08d1f] hover:from-[#e08d1f] hover:to-[#d67d1a] text-white rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] text-sm md:text-base"
          >
            <Plus size={20} />
            Add Subject
          </button>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* GPA Display */}
          <div className="relative group bg-gradient-to-br from-white to-orange-50 rounded-xl md:rounded-2xl p-5 md:p-6 shadow-xl border-2 border-orange-200 hover:border-orange-300 hover:shadow-2xl transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#f39e2f]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <p className="text-xs font-semibold mb-1.5 md:mb-2 text-gray-600 uppercase tracking-wider">Current Semester GPA</p>
              <p className="text-3xl md:text-4xl font-bold mb-1.5 md:mb-2 bg-gradient-to-r from-[#f39e2f] via-[#ffc107] to-[#f39e2f] bg-clip-text text-transparent">{gpa}</p>
              <p className="text-xs text-gray-500">Out of 10.0</p>
            </div>
          </div>

          {/* Statistics */}
          <div className="relative group bg-gradient-to-br from-white to-gray-50 rounded-xl md:rounded-2xl p-5 md:p-6 shadow-xl border-2 border-gray-200 hover:border-gray-300 hover:shadow-2xl transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <p className="text-xs font-semibold mb-3 md:mb-4 text-gray-600 uppercase tracking-wider">Summary</p>
              <div className="space-y-2 md:space-y-3">
                <p className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Total Subjects:</span>
                  <span className="font-bold text-xl text-gray-900">{subjects.filter((s) => s.credits > 0).length}</span>
                </p>
                <p className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Total Credits:</span>
                  <span className="font-bold text-xl text-gray-900">
                    {subjects.reduce((sum, s) => sum + s.credits, 0).toFixed(1)}
                  </span>
                </p>
                <p className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Avg Credits:</span>
                  <span className="font-bold text-xl text-gray-900">
                    {subjects.filter((s) => s.credits > 0).length > 0
                      ? (subjects.reduce((sum, s) => sum + s.credits, 0) / subjects.filter((s) => s.credits > 0).length).toFixed(1)
                      : "0"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={resetCalculator}
          className="w-full mt-4 md:mt-6 px-4 md:px-5 py-2.5 md:py-3 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 hover:border-gray-400 rounded-xl transition-all duration-300 font-semibold shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] text-sm md:text-base"
        >
          Reset GPA Calculator
        </button>

        {/* CGPA from previous GPAs */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2 bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">CGPA Calculator</h2>
            <p className="text-gray-600 mb-5 text-sm">
              Add your semester GPAs (including the one above) to get your overall CGPA as a simple average.
            </p>

            <div className="flex gap-3 mb-5">
              <input
                type="number"
                value={newGpaInput}
                onChange={(e) => setNewGpaInput(e.target.value)}
                placeholder="Enter GPA (0 - 10)"
                min="0"
                max="10"
                step="0.01"
                className="flex-1 px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f39e2f] focus:border-transparent transition-all shadow-sm"
              />
              <button
                onClick={addGpaForCgpa}
                className="px-5 py-2.5 bg-gradient-to-r from-[#f39e2f] to-[#e08d1f] hover:from-[#e08d1f] hover:to-[#d67d1a] text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                Add GPA
              </button>
            </div>

            {previousGpas.length > 0 ? (
              <ul className="space-y-3">
                {previousGpas.map((value, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-white px-5 py-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
                  >
                    <span className="text-gray-700">Sem {index + 1}: <span className="font-bold text-lg text-gray-900">{value.toFixed(2)}</span></span>
                    <button
                      onClick={() => removeGpaAtIndex(index)}
                      className="text-red-500 hover:text-red-600 text-sm font-semibold hover:scale-110 transition-transform"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center py-8 text-base">No GPAs added yet. Start by adding your semester GPAs above.</p>
            )}
          </div>

          <div className="relative group bg-gradient-to-br from-white to-orange-50 rounded-xl md:rounded-2xl p-5 md:p-6 shadow-xl border-2 border-orange-200 hover:border-orange-300 hover:shadow-2xl transition-all duration-500 flex flex-col justify-center items-start overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#f39e2f]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 w-full">
              <p className="text-xs font-semibold mb-1.5 md:mb-2 text-gray-600 uppercase tracking-wider">Your CGPA</p>
              <p className="text-3xl md:text-4xl font-bold mb-1.5 md:mb-2 bg-gradient-to-r from-[#f39e2f] via-[#ffc107] to-[#f39e2f] bg-clip-text text-transparent">{cgpa}</p>
              <p className="text-xs text-gray-500">Average of all entered GPAs (0 - 10 scale)</p>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-10 p-8 bg-gradient-to-br from-orange-50 to-amber-50 border-l-4 border-[#f39e2f] rounded-2xl shadow-md">
          <h3 className="font-bold text-gray-900 mb-4 text-xl">How to use:</h3>
          <ul className="text-gray-700 space-y-3 text-base">
            <li className="flex items-start"><span className="text-[#f39e2f] mr-2 text-xl">✓</span> Enter the credit hours for each subject</li>
            <li className="flex items-start"><span className="text-[#f39e2f] mr-2 text-xl">✓</span> Select the grade you received</li>
            <li className="flex items-start"><span className="text-[#f39e2f] mr-2 text-xl">✓</span> Click &quot;Add Subject&quot; to add more courses</li>
            <li className="flex items-start"><span className="text-[#f39e2f] mr-2 text-xl">✓</span> Your semester GPA will be calculated automatically</li>
            <li className="flex items-start"><span className="text-[#f39e2f] mr-2 text-xl">✓</span> Then add each semester GPA below to compute overall CGPA</li>
            <li className="flex items-start"><span className="text-[#f39e2f] mr-2 text-xl">✓</span> Designed for SRM University grading (O, A+, A, B+, B, C, D, F)</li>
          </ul>
        </div>

        {/* Grade Scale Reference */}
        <div className="mt-8 p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-6 text-2xl">Grade Scale Reference</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300 bg-gray-100">
                  <th className="text-left py-4 px-5 font-bold text-gray-800 uppercase text-sm tracking-wide">Grade</th>
                  <th className="text-left py-4 px-5 font-bold text-gray-800 uppercase text-sm tracking-wide">Points</th>
                  <th className="text-left py-4 px-5 font-bold text-gray-800 uppercase text-sm tracking-wide">Mark Range</th>
                  <th className="text-left py-4 px-5 font-bold text-gray-800 uppercase text-sm tracking-wide">Description</th>
                  <th className="text-left py-4 px-5 font-bold text-gray-800 uppercase text-sm tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(gradePoints).map(([grade, points], idx) => (
                  <tr
                    key={grade}
                    className={`border-b ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-orange-50/50 transition-colors`}
                  >
                    <td className="py-4 px-5 font-bold text-[#f39e2f] text-xl">{grade}</td>
                    <td className="py-4 px-5 text-gray-800 font-semibold text-base">{points.toFixed(1)}</td>
                    <td className="py-4 px-5 text-gray-700 text-base">{gradeDetails[grade].range}</td>
                    <td className="py-4 px-5 text-gray-700 text-base">{gradeDetails[grade].description}</td>
                    <td className="py-4 px-5">
                      <span
                        className={`px-4 py-1.5 rounded-full text-sm font-bold ${gradeDetails[grade].status === "PASS"
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : "bg-red-100 text-red-700 border border-red-200"
                          }`}
                      >
                        {gradeDetails[grade].status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SRM-specific info block */}
        <div className="mt-8 p-8 bg-white rounded-2xl border-2 border-gray-200 shadow-md hover:shadow-lg transition-shadow">
          <h3 className="font-bold text-gray-900 mb-4 text-xl">SRM CGPA Calculator for SRM University Students</h3>
          <p className="text-gray-700 text-base mb-3 leading-relaxed">
            This SRM CGPA calculator is tailored for SRM University students who follow the SRM grading system
            (O, A+, A, B+, B, C, D, F). It helps you keep track of your semester GPA and overall CGPA on a 10 point scale.
          </p>
          <p className="text-gray-700 text-base leading-relaxed">
            Use it at the end of every semester to quickly see where you stand and what GPA you need in upcoming
            semesters to reach your target CGPA at SRM.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CGPACalculator;
