"use client";

import React, { useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";

interface Subject {
  id: string;
  name: string;
  credits: number;
  grade: string;
  isUHV?: boolean;
}

interface CourseData {
  code: string;
  name: string;
  semester: number;
  credits: number;
  isUHV?: boolean;
}

const courseDatabase: CourseData[] = [
  // Semester 1
  { code: "21LEH101T", name: "COMMUNICATIVE ENGLISH", semester: 1, credits: 3 },
  { code: "21MAB101T", name: "CALCULUS AND LINEAR ALGEBRA", semester: 1, credits: 4 },
  { code: "21CYB101J", name: "CHEMISTRY", semester: 1, credits: 5 },
  { code: "21BTB102T", name: "INTRODUCTION TO COMPUTATIONAL BIOLOGY", semester: 1, credits: 2 },
  { code: "21CSS101J", name: "PROGRAMMING FOR PROBLEM SOLVING", semester: 1, credits: 4 },
  { code: "21CYM101T", name: "ENVIRONMENTAL SCIENCE", semester: 1, credits: 0 },
  { code: "21GNH101J", name: "PHILOSOPHY OF ENGINEERING", semester: 1, credits: 2 },
  { code: "21MES102L", name: "ENGINEERING GRAPHICS AND DESIGN", semester: 1, credits: 2 },
  { code: "21PDM101L", name: "PROFESSIONAL SKILLS AND PRACTICES", semester: 1, credits: 0 },
  // Physics option for Semester 1 (alternative)
  { code: "21PYB101J", name: "PHYSICS", semester: 1, credits: 5 },

  // Semester 2
  { code: "21LEH104T", name: "GERMAN", semester: 2, credits: 3 },
  { code: "21LEM101T", name: "CONSTITUTION OF INDIA", semester: 2, credits: 0 },
  { code: "21MAB102T", name: "ADVANCED CALCULUS AND COMPLEX ANALYSIS", semester: 2, credits: 4 },
  { code: "21PYB102J", name: "SEMICONDUCTOR PHYSICS AND COMPUTATIONAL METHODS", semester: 2, credits: 5 },
  { code: "21EES101T", name: "ELECTRICAL AND ELECTRONICS ENGINEERING", semester: 2, credits: 4 },
  { code: "21CSC101T", name: "OBJECT ORIENTED DESIGN AND PROGRAMMING", semester: 2, credits: 3 },
  { code: "21MES101L", name: "BASIC CIVIL AND MECHANICAL WORKSHOP", semester: 2, credits: 2 },
  { code: "21GNM104L", name: "NSO", semester: 2, credits: 0 },
  // Chemistry option for Semester 2 (alternative)
  { code: "21CYB102J", name: "CHEMISTRY", semester: 2, credits: 5 },

  // Semester 3
  { code: "21MAB201T", name: "TRANSFORMS AND BOUNDARY VALUE PROBLEMS", semester: 3, credits: 4 },
  { code: "21CSC201J", name: "DATA STRUCTURES AND ALGORITHMS", semester: 3, credits: 4 },
  { code: "21CSC202J", name: "OPERATING SYSTEMS", semester: 3, credits: 4 },
  { code: "21CSS201T", name: "COMPUTER ORGANIZATION AND ARCHITECTURE", semester: 3, credits: 4 },
  { code: "21CSC203P", name: "ADVANCED PROGRAMMING PRACTICE", semester: 3, credits: 4 },
  { code: "21DCS201P", name: "DESIGN THINKING AND METHODOLOGY", semester: 3, credits: 3 },
  { code: "21LEM201T", name: "PROFESSIONAL ETHICS", semester: 3, credits: 0 },

  // Semester 4
  { code: "21CSC204T", name: "PROBABILITY AND QUEUEING THEORY", semester: 4, credits: 4 },
  { code: "21CSC205J", name: "DESIGN AND ANALYSIS OF ALGORITHMS", semester: 4, credits: 4 },
  { code: "21CSC206J", name: "DATABASE MANAGEMENT SYSTEMS", semester: 4, credits: 4 },
  { code: "21CSC207J", name: "ARTIFICIAL INTELLIGENCE", semester: 4, credits: 3 },
  { code: "21CSC208J", name: "INTERNET OF THINGS", semester: 4, credits: 3 },
  { code: "21CSC209T", name: "SOCIAL ENGINEERING", semester: 4, credits: 2 },
  { code: "21GNM202T", name: "UNIVERSAL HUMAN VALUES (UNDERSTANDING HARMONY AND ETHICAL HUMAN CONDUCT)", semester: 4, credits: 3, isUHV: true },

  // Semester 5
  { code: "21CSC301T", name: "DISCRETE MATHEMATICS", semester: 5, credits: 4 },
  { code: "21CSC302J", name: "FORMAL LANGUAGE AND AUTOMATA", semester: 5, credits: 3 },
  { code: "21CSC303J", name: "COMPUTER NETWORKS", semester: 5, credits: 4 },
  { code: "21CSC304J", name: "MACHINE LEARNING", semester: 5, credits: 3 },
  { code: "21CSC305J", name: "FULL STACK WEB DEVELOPMENT", semester: 5, credits: 3 },
  { code: "21CSC306T", name: "SHORT RANGE WIRELESS COMMUNICATION", semester: 5, credits: 3 },
];

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
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);
  const [selectedSpecificSemester, setSelectedSpecificSemester] = useState<string>("");
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: "1", name: "", credits: 0, grade: "A+", isUHV: false },
  ]);

  const semesterCourses = selectedSemester 
    ? (() => {
        let semesters: number[] = [];
        if (selectedSemester === "1st") {
          semesters = [1, 2];
        } else if (selectedSemester === "2nd") {
          semesters = selectedSpecificSemester === "3rd" ? [3] : selectedSpecificSemester === "4th" ? [4] : [3, 4];
        } else if (selectedSemester === "3rd") {
          semesters = selectedSpecificSemester === "5th" ? [5] : selectedSpecificSemester === "6th" ? [6] : [5, 6];
        }
        return courseDatabase.filter((course) => semesters.includes(course.semester));
      })()
    : [];

  const handleSelectSemester = (yearGroup: string) => {
    setSelectedSemester(yearGroup);
    if (yearGroup === "1st") {
      setSelectedSpecificSemester("");
    } else if (yearGroup === "2nd") {
      setSelectedSpecificSemester("3rd"); // Default to 3rd semester
    } else if (yearGroup === "3rd") {
      setSelectedSpecificSemester("5th"); // Default to 5th semester
    }
    // Load courses based on year group
    let semesters: number[] = [];
    if (yearGroup === "1st") {
      semesters = [1, 2]; // Sem 1 and 2
    } else if (yearGroup === "2nd") {
      semesters = [3]; // Default to Sem 3
    } else if (yearGroup === "3rd") {
      semesters = [5]; // Default to Sem 5
    }

    const courses = courseDatabase.filter((course) => semesters.includes(course.semester));
    
    // For first year (semesters 1-2), include both physics and chemistry by default
    let subjectsToLoad = courses;
    
    if (semesters.includes(1) || semesters.includes(2)) {
      // Keep all courses including both physics and chemistry options
      subjectsToLoad = courses;
    }

    const newSubjects = subjectsToLoad.map((course, index) => ({
      id: (index + 1).toString(),
      name: course.name,
      credits: course.credits,
      grade: "A+",
      isUHV: course.isUHV || false,
    }));

    setSubjects(newSubjects.length > 0 ? newSubjects : [{ id: "1", name: "", credits: 0, grade: "A+", isUHV: false }]);
  };

  const handleSelectSpecificSemester = (sem: string) => {
    setSelectedSpecificSemester(sem);
    // Load courses for the selected semester
    let semesterNum = 3;
    if (sem === "3rd") semesterNum = 3;
    else if (sem === "4th") semesterNum = 4;
    else if (sem === "5th") semesterNum = 5;
    else if (sem === "6th") semesterNum = 6;

    const courses = courseDatabase.filter((course) => course.semester === semesterNum);

    const newSubjects = courses.map((course, index) => ({
      id: (index + 1).toString(),
      name: course.name,
      credits: course.credits,
      grade: "A+",
      isUHV: course.isUHV || false,
    }));

    setSubjects(newSubjects.length > 0 ? newSubjects : [{ id: "1", name: "", credits: 0, grade: "A+", isUHV: false }]);
  };

  const addSubject = () => {
    const newId = (Math.max(...subjects.map((s) => parseInt(s.id)), 0) + 1).toString();
    setSubjects([...subjects, { id: newId, name: "", credits: 0, grade: "A+", isUHV: false }]);
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
      // Skip UHV as it's generally not counted towards CGPA
      if (subject.isUHV) {
        return;
      }
      if (subject.credits > 0) {
        const points = gradePoints[subject.grade] || 0;
        totalPoints += points * subject.credits;
        totalCredits += subject.credits;
      }
    });

    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  };

  const resetCalculator = () => {
    setSelectedSemester(null);
    setSubjects([{ id: "1", name: "", credits: 0, grade: "A+", isUHV: false }]);
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
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-6 md:py-10 px-4 md:px-6">
      <div className="w-full max-w-5xl mx-auto p-6 md:p-8 bg-white rounded-2xl shadow-2xl border border-gray-200/50">
        <div className="mb-8 text-center border-b pb-8">
          <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-[#f39e2f] via-orange-500 to-[#f39e2f] bg-clip-text text-transparent mb-3 tracking-tight">
            SRM GPA & CGPA Calculator
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Calculate your semester GPA and overall CGPA using SRM University grading scale.
          </p>
        </div>

        {/* Semester Selection */}
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 mb-8 shadow-lg border border-blue-200/70">
          <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center justify-between">
            <span className="flex items-center">
              <span className="w-1.5 h-6 bg-gradient-to-b from-[#f39e2f] to-orange-500 rounded-full mr-3"></span>
              Select Your Year
            </span>
            <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">Optional</span>
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "1st Year (Sem 1 & 2)", value: "1st" },
              { label: "2nd Year (Sem 3 & 4)", value: "2nd" },
              { label: "3rd Year (Sem 5 & 6)", value: "3rd" },
            ].map((year) => (
              <button
                key={year.value}
                onClick={() => handleSelectSemester(year.value)}
                className={`py-3 px-4 rounded-lg font-bold text-[11px] md:text-sm transition-all duration-300 ${
                  selectedSemester === year.value
                    ? "bg-gradient-to-r from-[#f39e2f] to-[#e08d1f] text-white shadow-lg scale-105"
                    : "bg-white border-2 border-gray-300 text-gray-700 hover:border-[#f39e2f] hover:text-[#f39e2f]"
                }`}
              >
                {year.label}
              </button>
            ))}
          </div>
          {selectedSemester && (
            <div className="space-y-3 mt-5 pt-5 border-t border-blue-200">
              {(selectedSemester === "2nd" || selectedSemester === "3rd") && (
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Select Semester:
                  </label>
                  <select
                    value={selectedSpecificSemester}
                    onChange={(e) => handleSelectSpecificSemester(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#f39e2f] focus:border-transparent transition-all bg-white"
                  >
                    {selectedSemester === "2nd" ? (
                      <>
                        <option value="3rd">3rd Semester</option>
                        <option value="4th">4th Semester</option>
                      </>
                    ) : (
                      <>
                        <option value="5th">5th Semester</option>
                        <option value="6th">6th Semester</option>
                      </>
                    )}
                  </select>
                </div>
              )}
              <p className="text-sm text-gray-700 font-medium">
                ✨ {semesterCourses.length} courses loaded for {selectedSemester} year{selectedSpecificSemester ? ` - ${selectedSpecificSemester} Semester` : ""}. Customize below.
              </p>
              <div className="bg-blue-100/60 border-l-4 border-blue-500 rounded-lg p-3 flex items-start gap-3">
                <Trash2 size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800">
                  <span className="font-bold">Tip:</span> Use the trash icon to remove any subject from this semester.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 md:p-8 mb-8 shadow-lg border border-gray-200">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-1.5 h-6 bg-gradient-to-b from-[#f39e2f] to-orange-500 rounded-full mr-3"></span>
            Course Details
          </h2>
          <div className="space-y-4 md:space-y-3 mb-6">
            {/* Subject List Header - Hidden on mobile */}
            <div className="hidden md:block">
              <div className="flex gap-4 font-bold text-gray-700 mb-4 px-4 text-xs md:text-sm uppercase tracking-widest">
                <div className="flex-1">Subject</div>
                <div className="flex-1">Credits</div>
                <div className="flex-1">Grade</div>
                <div className="w-20">Action</div>
              </div>
            </div>

            {/* Subject Inputs */}
            {subjects.map((subject, index) => (
              <div key={subject.id}>
                {/* Mobile: Stacked Layout */}
                <div className="md:hidden space-y-2 bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">
                      {subject.name || `Subject ${index + 1}`}
                    </span>
                    <button
                      onClick={() => removeSubject(subject.id)}
                      disabled={subjects.length === 1}
                      className="px-2 py-2 bg-red-50 hover:bg-red-100 disabled:bg-gray-100 text-red-600 disabled:text-gray-400 rounded transition-all disabled:cursor-not-allowed"
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
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#f39e2f] focus:border-transparent transition-all"
                    />
                    <select
                      value={subject.grade}
                      onChange={(e) => updateSubject(subject.id, "grade", e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#f39e2f] focus:border-transparent bg-white transition-all"
                    >
                      {Object.keys(gradePoints).map((grade) => (
                        <option key={grade} value={grade}>
                          {grade}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {subject.isUHV && (
                  <div className="md:hidden mt-2 px-4 text-xs font-semibold text-orange-700 bg-orange-100 py-1.5 rounded border border-orange-300 italic">
                    ⚠️ Generally not counted towards CGPA
                  </div>
                )}

                {/* Desktop: Grid Layout */}
                <div className="hidden md:flex gap-4 items-center bg-white p-4 rounded-lg border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all duration-300">
                  {subject.name && (
                    <div className="flex-1 px-3 py-2 text-gray-700 font-medium text-sm truncate" title={subject.name}>
                      {subject.name}
                    </div>
                  )}
                  <input
                    type="number"
                    value={subject.credits || ''}
                    onChange={(e) => updateSubject(subject.id, "credits", parseFloat(e.target.value) || 0)}
                    placeholder="Credits"
                    min="0"
                    step="0.5"
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#f39e2f] focus:border-transparent transition-all flex-1"
                  />
                  <select
                    value={subject.grade}
                    onChange={(e) => updateSubject(subject.id, "grade", e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#f39e2f] focus:border-transparent bg-white transition-all flex-1"
                  >
                    {Object.keys(gradePoints).map((grade) => (
                      <option key={grade} value={grade}>
                        {grade}
                      </option>
                    ))}
                  </select>
                  {subject.isUHV ? (
                    <div className="w-40"></div>
                  ) : (
                    <div className="w-40"></div>
                  )}
                  <button
                    onClick={() => removeSubject(subject.id)}
                    disabled={subjects.length === 1}
                    className="w-20 flex justify-center items-center px-3 py-2 bg-red-50 hover:bg-red-100 disabled:bg-gray-100 text-red-600 disabled:text-gray-400 rounded-lg transition-all hover:scale-105 disabled:cursor-not-allowed disabled:hover:scale-100"
                    title="Delete subject"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                {subject.isUHV && (
                  <div className="hidden md:block mt-2 ml-4 text-xs font-semibold text-orange-700 bg-orange-100 px-2 py-1.5 rounded border border-orange-300 italic">
                    ⚠️ Generally not counted towards CGPA
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Add Subject Button */}
          <button
            onClick={addSubject}
            className="w-full flex items-center justify-center gap-2 mt-4 px-4 py-3 bg-gradient-to-r from-[#f39e2f] to-[#e08d1f] hover:from-[#e08d1f] hover:to-[#d67d1a] text-white rounded-lg transition-all duration-300 font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] text-base"
          >
            <Plus size={18} />
            Add Subject
          </button>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {/* GPA Display */}
          <div className="bg-gradient-to-br from-white to-orange-50 rounded-xl p-6 shadow-lg border-2 border-orange-200">
            <div>
              <p className="text-xs font-bold mb-2 text-gray-600 uppercase tracking-widest">Current Semester GPA</p>
              <p className="text-4xl font-black mb-2 bg-gradient-to-r from-[#f39e2f] via-[#ffc107] to-[#f39e2f] bg-clip-text text-transparent">{gpa}</p>
              <p className="text-sm text-gray-500 font-medium">Out of 10.0</p>
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg border-2 border-gray-200">
            <div>
              <p className="text-xs font-bold mb-4 text-gray-600 uppercase tracking-widest">Summary</p>
              <div className="space-y-3">
                <p className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium text-sm">Total Subjects:</span>
                  <span className="font-black text-2xl text-gray-900">{subjects.filter((s) => s.credits > 0).length}</span>
                </p>
                <p className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium text-sm">Total Credits:</span>
                  <span className="font-black text-2xl text-gray-900">
                    {subjects.reduce((sum, s) => sum + s.credits, 0).toFixed(1)}
                  </span>
                </p>
                <p className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium text-sm">Avg Credits:</span>
                  <span className="font-black text-2xl text-gray-900">
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
          className="w-full mt-4 px-4 py-3 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 hover:border-gray-400 rounded-lg transition-all duration-300 font-bold shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] text-base"
        >
          Reset GPA Calculator
        </button>

        {/* CGPA from previous GPAs */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2 bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h2 className="text-xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2 flex items-center">
              <span className="w-1.5 h-7 bg-gradient-to-b from-[#f39e2f] to-orange-500 rounded-full mr-3"></span>
              CGPA Calculator
            </h2>
            <p className="text-gray-600 mb-5 text-sm font-medium">
              Add your semester GPAs to calculate your overall CGPA as a simple average.
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
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#f39e2f] focus:border-transparent transition-all font-medium"
              />
              <button
                onClick={addGpaForCgpa}
                className="px-6 py-3 bg-gradient-to-r from-[#f39e2f] to-[#e08d1f] hover:from-[#e08d1f] hover:to-[#d67d1a] text-white rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 text-base whitespace-nowrap"
              >
                Add GPA
              </button>
            </div>

            {previousGpas.length > 0 ? (
              <ul className="space-y-3">
                {previousGpas.map((value, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 hover:shadow-md transition-all text-base font-medium"
                  >
                    <span className="text-gray-700">Sem {index + 1}: <span className="font-black text-gray-900">{value.toFixed(2)}</span></span>
                    <button
                      onClick={() => removeGpaAtIndex(index)}
                      className="text-red-500 hover:text-red-600 text-sm font-bold hover:scale-110 transition-transform"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center py-8 text-sm font-medium">No GPAs added yet. Start by adding your semester GPAs above.</p>
            )}
          </div>

          <div className="bg-gradient-to-br from-white to-orange-50 rounded-xl p-6 shadow-lg border-2 border-orange-200">
            <div>
              <p className="text-xs font-bold mb-2 text-gray-600 uppercase tracking-widest">Your CGPA</p>
              <p className="text-4xl font-black mb-2 bg-gradient-to-r from-[#f39e2f] via-[#ffc107] to-[#f39e2f] bg-clip-text text-transparent">{cgpa}</p>
              <p className="text-sm text-gray-500 font-medium">Average of all GPAs</p>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 p-6 bg-gradient-to-br from-orange-50 to-amber-50 border-l-4 border-[#f39e2f] rounded-xl shadow-lg">
          <h3 className="font-black text-gray-900 mb-4 text-lg flex items-center">
            <span className="text-xl mr-2">📚</span>How to Use
          </h3>
          <ul className="text-gray-700 space-y-3 text-base font-medium">
            <li className="flex items-start"><span className="text-[#f39e2f] mr-3 text-xl">✓</span> <span>Select your year to auto-load all courses with their credits</span></li>
            <li className="flex items-start"><span className="text-[#f39e2f] mr-3 text-xl">✓</span> <span>For 1st year: Choose between Physics and Chemistry</span></li>
            <li className="flex items-start"><span className="text-[#f39e2f] mr-3 text-xl">✓</span> <span>Add or remove subjects as needed using the buttons below</span></li>
            <li className="flex items-start"><span className="text-[#f39e2f] mr-3 text-xl">✓</span> <span>Select the grade you received for each subject</span></li>
            <li className="flex items-start"><span className="text-[#f39e2f] mr-3 text-xl">✓</span> <span>Your semester GPA is calculated automatically</span></li>
            <li className="flex items-start"><span className="text-[#f39e2f] mr-3 text-xl">✓</span> <span>Add each semester&apos;s GPA below to compute your overall CGPA</span></li>
          </ul>
        </div>

        {/* Grade Scale Reference */}
        <div className="mt-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
          <h3 className="font-black text-gray-900 mb-6 text-lg flex items-center">
            <span className="text-xl mr-2">📊</span>Grade Scale Reference
          </h3>
          <div className="overflow-x-auto text-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300 bg-gray-100">
                  <th className="text-left py-3 px-4 font-black text-gray-800 uppercase text-xs tracking-wide">Grade</th>
                  <th className="text-left py-3 px-4 font-black text-gray-800 uppercase text-xs tracking-wide">Points</th>
                  <th className="text-left py-3 px-4 font-black text-gray-800 uppercase text-xs tracking-wide">Range</th>
                  <th className="text-left py-3 px-4 font-black text-gray-800 uppercase text-xs tracking-wide">Description</th>
                  <th className="text-left py-3 px-4 font-black text-gray-800 uppercase text-xs tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(gradePoints).map(([grade, points], idx) => (
                  <tr
                    key={grade}
                    className={`border-b text-sm ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-orange-50/50 transition-colors`}
                  >
                    <td className="py-2.5 px-4 font-black text-[#f39e2f]">{grade}</td>
                    <td className="py-2.5 px-4 text-gray-800 font-bold">{points.toFixed(1)}</td>
                    <td className="py-2.5 px-4 text-gray-700">{gradeDetails[grade].range}</td>
                    <td className="py-2.5 px-4 text-gray-700">{gradeDetails[grade].description}</td>
                    <td className="py-2.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded text-xs font-bold ${gradeDetails[grade].status === "PASS"
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
        <div className="mt-8 p-6 bg-gradient-to-br from-white to-blue-50 rounded-xl border-2 border-blue-200 shadow-lg">
          <h3 className="font-black text-gray-900 mb-3 text-lg flex items-center">
            <span className="text-xl mr-2">ℹ️</span>About This Calculator
          </h3>
          <p className="text-gray-700 text-sm mb-3 font-medium leading-relaxed">
            This SRM CGPA calculator is specifically designed for SRM University students following the SRM grading system (O, A+, A, B+, B, C, D, F).
          </p>
          <p className="text-gray-700 text-sm font-medium leading-relaxed">
            Use it at the end of every semester to track your academic progress and plan your targets for upcoming semesters.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CGPACalculator;