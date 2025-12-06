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
    <div className="w-full max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">SRM GPA & CGPA Calculator</h1>
        <p className="text-gray-600">
          Free SRM CGPA calculator for SRM University students. First calculate your current semester GPA,
          then compute overall CGPA using the official SRM grading scale.
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 mb-8 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Subject List Header */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-12 gap-4 font-bold text-gray-700 mb-4 px-4">
              <div className="col-span-4">Subject Name</div>
              <div className="col-span-3">Credits</div>
              <div className="col-span-3">Grade</div>
              <div className="col-span-2">Action</div>
            </div>
          </div>

          {/* Subject Inputs */}
          {subjects.map((subject, index) => (
            <div key={subject.id} className="md:col-span-2">
              <div className="grid grid-cols-12 gap-4 items-center bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition">
                {/* Subject Name */}
                <input
                  type="text"
                  value={subject.name}
                  onChange={(e) => updateSubject(subject.id, "name", e.target.value)}
                  placeholder={`Subject ${index + 1}`}
                  className="col-span-4 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Credits */}
                <input
                  type="number"
                  value={subject.credits}
                  onChange={(e) => updateSubject(subject.id, "credits", parseFloat(e.target.value) || 0)}
                  placeholder="0"
                  min="0"
                  step="0.5"
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Grade */}
                <select
                  value={subject.grade}
                  onChange={(e) => updateSubject(subject.id, "grade", e.target.value)}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {Object.keys(gradePoints).map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>

                {/* Delete Button */}
                <button
                  onClick={() => removeSubject(subject.id)}
                  disabled={subjects.length === 1}
                  className="col-span-2 flex justify-center items-center px-3 py-2 bg-red-100 hover:bg-red-200 disabled:bg-gray-200 text-red-600 disabled:text-gray-400 rounded-lg transition disabled:cursor-not-allowed"
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
          className="w-full flex items-center justify-center gap-2 mt-6 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition font-semibold"
        >
          <Plus size={20} />
          Add Subject
        </button>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* GPA Display */}
        <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-xl p-8 text-white shadow-lg">
          <p className="text-lg font-semibold mb-2 opacity-90">Current Semester GPA</p>
          <p className="text-5xl font-bold mb-2">{gpa}</p>
          <p className="text-sm opacity-75">Out of 10.0</p>
        </div>

        {/* Statistics */}
        <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl p-8 text-white shadow-lg">
          <p className="text-lg font-semibold mb-4">Summary</p>
          <div className="space-y-2">
            <p className="flex justify-between">
              <span>Total Subjects:</span>
              <span className="font-bold">{subjects.filter((s) => s.credits > 0).length}</span>
            </p>
            <p className="flex justify-between">
              <span>Total Credits:</span>
              <span className="font-bold">
                {subjects.reduce((sum, s) => sum + s.credits, 0).toFixed(1)}
              </span>
            </p>
            <p className="flex justify-between">
              <span>Avg Credits:</span>
              <span className="font-bold">
                {subjects.filter((s) => s.credits > 0).length > 0
                  ? (subjects.reduce((sum, s) => sum + s.credits, 0) / subjects.filter((s) => s.credits > 0).length).toFixed(1)
                  : "0"}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={resetCalculator}
        className="w-full mt-6 px-4 py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-lg transition font-semibold"
      >
        Reset GPA Calculator
      </button>

      {/* CGPA from previous GPAs */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-2 bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">CGPA Calculator</h2>
          <p className="text-gray-600 mb-4 text-sm">
            Add your semester GPAs (including the one above) to get your overall CGPA as a simple average.
          </p>

          <div className="flex gap-3 mb-4">
            <input
              type="number"
              value={newGpaInput}
              onChange={(e) => setNewGpaInput(e.target.value)}
              placeholder="Enter GPA (0 - 10)"
              min="0"
              max="10"
              step="0.01"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addGpaForCgpa}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition"
            >
              Add GPA
            </button>
          </div>

          {previousGpas.length > 0 ? (
            <ul className="space-y-2 text-sm">
              {previousGpas.map((value, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md border border-gray-200"
                >
                  <span>Sem {index + 1}: <span className="font-semibold">{value.toFixed(2)}</span></span>
                  <button
                    onClick={() => removeGpaAtIndex(index)}
                    className="text-red-500 hover:text-red-600 text-xs font-semibold"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No GPAs added yet. Start by adding your semester GPAs above.</p>
          )}
        </div>

        <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl p-6 text-white shadow-lg flex flex-col justify-center items-start">
          <p className="text-lg font-semibold mb-2 opacity-90">Your CGPA</p>
          <p className="text-5xl font-bold mb-2">{cgpa}</p>
          <p className="text-sm opacity-75">Average of all entered GPAs (0 - 10 scale)</p>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-8 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
        <h3 className="font-bold text-gray-800 mb-3">How to use:</h3>
        <ul className="text-gray-700 space-y-2 text-sm">
          <li>✓ Enter your subject name (optional but recommended)</li>
          <li>✓ Enter the credit hours for each subject</li>
          <li>✓ Select the grade you received</li>
          <li>✓ Click &quot;Add Subject&quot; to add more courses</li>
          <li>✓ Your semester GPA will be calculated automatically</li>
          <li>✓ Then add each semester GPA below to compute overall CGPA</li>
          <li>✓ Designed for SRM University grading (O, A+, A, B+, B, C, D, F)</li>
        </ul>
      </div>

      {/* Grade Scale Reference */}
      <div className="mt-6 p-6 bg-gray-50 rounded-lg">
        <h3 className="font-bold text-gray-800 mb-4">Grade Scale Reference</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-3 px-4 font-bold text-gray-700">Grade</th>
                <th className="text-left py-3 px-4 font-bold text-gray-700">Points</th>
                <th className="text-left py-3 px-4 font-bold text-gray-700">Mark Range</th>
                <th className="text-left py-3 px-4 font-bold text-gray-700">Description</th>
                <th className="text-left py-3 px-4 font-bold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(gradePoints).map(([grade, points], idx) => (
                <tr
                  key={grade}
                  className={`border-b ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-100 transition`}
                >
                  <td className="py-3 px-4 font-bold text-blue-600 text-lg">{grade}</td>
                  <td className="py-3 px-4 text-gray-700 font-semibold">{points.toFixed(1)}</td>
                  <td className="py-3 px-4 text-gray-700">{gradeDetails[grade].range}</td>
                  <td className="py-3 px-4 text-gray-700">{gradeDetails[grade].description}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        gradeDetails[grade].status === "PASS"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
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
      <div className="mt-6 p-6 bg-white rounded-lg border border-gray-200">
        <h3 className="font-bold text-gray-800 mb-3">SRM CGPA Calculator for SRM University Students</h3>
        <p className="text-gray-700 text-sm mb-2">
          This SRM CGPA calculator is tailored for SRM University students who follow the SRM grading system
          (O, A+, A, B+, B, C, D, F). It helps you keep track of your semester GPA and overall CGPA on a 10 point scale.
        </p>
        <p className="text-gray-700 text-sm">
          Use it at the end of every semester to quickly see where you stand and what GPA you need in upcoming
          semesters to reach your target CGPA at SRM.
        </p>
      </div>
    </div>
  );
};

export default CGPACalculator;
