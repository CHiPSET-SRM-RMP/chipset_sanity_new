import AttendanceCalculator from "@/components/Reusable/AttendanceCalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Attendance Calculator SRM | Free SRM University Attendance Tracker - CHiPSET",
    description: "Free attendance calculator for SRM University students. Track your attendance, calculate how many classes you can miss while maintaining 75% or 90% attendance. Calculate required classes instantly.",
    keywords: [
        "attendance calculator srm",
        "srm attendance calculator",
        "srm university attendance calculator",
        "attendance tracker srm",
        "srm attendance tracker",
        "attendance calculator 75%",
        "srm attendance 75",
        "attendance calculator 90",
        "srm attendance requirements",
        "how many classes can i miss srm",
        "free attendance calculator srm",
    ],
    openGraph: {
        title: "Attendance Calculator SRM | Free SRM University Attendance Tracker",
        description: "Free attendance calculator for SRM University students. Track your attendance and calculate how many classes you can miss while maintaining 75% or 90%.",
        url: "https://chipsetsrm.vercel.app/tools/attendance-calculator",
        type: "website",
        siteName: "CHIPSET SRM University Ramapuram",
    },
    twitter: {
        card: "summary_large_image",
        title: "Attendance Calculator SRM | Free SRM University Attendance Tracker",
        description: "Free attendance calculator for SRM University students. Track attendance and calculate required classes instantly.",
    },
    alternates: {
        canonical: "https://chipsetsrm.vercel.app/tools/attendance-calculator",
    },
};

export default function AttendanceCalculatorPage() {
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
                        Attendance Calculator
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                        Track your SRM attendance and calculate how many classes you can miss while maintaining required attendance percentage
                    </p>
                </div>

                {/* Calculator Component */}
                <div className="mb-16">
                    <AttendanceCalculator />
                </div>

                {/* SEO CONTENT START */}
                <section className="mt-16 space-y-12">
                    {/* Section 1: Main Info */}
                    <div className="bg-gray-50 rounded-2xl p-8 md:p-10 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <h2 className="text-3xl font-bold text-black mb-4">Attendance Calculator for SRM University Students</h2>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            This attendance calculator is designed specifically for SRM University students to track their attendance and calculate how many classes they can miss while maintaining required attendance percentage. Get instant, accurate results without any login required. Track your attendance for 75% minimum requirement or higher targets.
                        </p>
                    </div>

                    {/* Section 2: What is Attendance in SRM */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-2xl font-bold text-black mb-3 flex items-center gap-2">
                                <span className="text-[#f39e2f]">●</span> What is Attendance in SRM?
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                Attendance at SRM University is mandatory for all students. It is the percentage of classes a student attends out of the total classes conducted for a subject. The attendance percentage is calculated as (Classes Attended / Total Classes Conducted) × 100.
                            </p>
                        </div>

                        {/* Section 3: SRM Attendance Requirements */}
                        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-2xl font-bold text-black mb-3 flex items-center gap-2">
                                <span className="text-[#f39e2f]">●</span> SRM Attendance Requirements
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                SRM University requires a minimum of 75% attendance for all students to be eligible to appear for end semester examinations. Students below 75% are not permitted to attend exams and may face academic consequences. Some courses may have higher requirements.
                            </p>
                        </div>
                    </div>

                    {/* Section 4: Why Use This Calculator */}
                    <div className="bg-orange-50 rounded-2xl p-8 md:p-10 border border-orange-200 shadow-sm">
                        <h3 className="text-2xl font-bold text-black mb-6">Why Use This SRM Attendance Calculator?</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3">
                                <span className="text-[#f39e2f] font-bold text-xl mt-1">✓</span>
                                <div>
                                    <p className="text-black font-semibold">Track in Real-Time</p>
                                    <p className="text-gray-600 text-sm">Monitor your attendance after every class</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-[#f39e2f] font-bold text-xl mt-1">✓</span>
                                <div>
                                    <p className="text-black font-semibold">Plan Ahead</p>
                                    <p className="text-gray-600 text-sm">Know how many classes you can safely miss</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-[#f39e2f] font-bold text-xl mt-1">✓</span>
                                <div>
                                    <p className="text-black font-semibold">Stay Eligible</p>
                                    <p className="text-gray-600 text-sm">Ensure 75% minimum for exam eligibility</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-[#f39e2f] font-bold text-xl mt-1">✓</span>
                                <div>
                                    <p className="text-black font-semibold">Instant Results</p>
                                    <p className="text-gray-600 text-sm">Get accurate calculations instantly</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 5: FAQ */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-black mb-6">Frequently Asked Questions</h3>
                        
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-[#f39e2f] transition-all">
                            <h4 className="text-lg font-bold text-black mb-2">What is the minimum attendance required at SRM?</h4>
                            <p className="text-gray-700">
                                The minimum attendance required at SRM University is 75%. Students who fall below this threshold are not eligible to appear for end semester examinations.
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-[#f39e2f] transition-all">
                            <h4 className="text-lg font-bold text-black mb-2">How many classes can I miss to maintain 75% attendance?</h4>
                            <p className="text-gray-700">
                                This depends on the total number of classes conducted. Use our attendance calculator to instantly find out how many classes you can afford to miss while maintaining 75% attendance for each subject.
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-[#f39e2f] transition-all">
                            <h4 className="text-lg font-bold text-black mb-2">What happens if I fall below 75% attendance?</h4>
                            <p className="text-gray-700">
                                If your attendance falls below 75%, you will not be eligible to appear for the end semester examination. You may need to apply for condonation or retake the course in the next semester.
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-[#f39e2f] transition-all">
                            <h4 className="text-lg font-bold text-black mb-2">Can I improve my attendance after missing classes?</h4>
                            <p className="text-gray-700">
                                Yes, you can improve your attendance by attending more classes. The percentage will increase as you attend more classes and the denominator (total classes) increases. Our calculator helps you plan exactly how many classes you need to attend to reach your target percentage.
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-[#f39e2f] transition-all">
                            <h4 className="text-lg font-bold text-black mb-2">Is this calculator accurate for SRM?</h4>
                            <p className="text-gray-700">
                                Yes, this calculator uses the official SRM University attendance calculation method: (Classes Attended / Total Classes) × 100. It provides accurate results based on the attendance policy of SRM University.
                            </p>
                        </div>
                    </div>

                    {/* Section 6: Tips for Maintaining Good Attendance */}
                    <div className="bg-blue-50 rounded-2xl p-8 md:p-10 border border-blue-200 shadow-sm">
                        <h3 className="text-2xl font-bold text-black mb-6">Tips for Maintaining Good Attendance at SRM</h3>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start gap-3">
                                <span className="text-[#f39e2f] font-bold text-lg mt-0.5">→</span>
                                <span><strong>Plan your absences:</strong> Use this calculator to determine exactly how many classes you can miss safely.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#f39e2f] font-bold text-lg mt-0.5">→</span>
                                <span><strong>Attend regularly:</strong> Try to maintain attendance above 85% to have a safety margin.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#f39e2f] font-bold text-lg mt-0.5">→</span>
                                <span><strong>Don&apos;t skip important classes:</strong> Attend classes before and after holidays or exams.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#f39e2f] font-bold text-lg mt-0.5">→</span>
                                <span><strong>Inform your professor:</strong> If you know you&apos;ll be absent, inform your professor in advance.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#f39e2f] font-bold text-lg mt-0.5">→</span>
                                <span><strong>Check frequently:</strong> Use this calculator regularly to monitor your attendance status.</span>
                            </li>
                        </ul>
                    </div>
                </section>
                {/* SEO CONTENT END */}
            </div>
        </div>
    );
}
