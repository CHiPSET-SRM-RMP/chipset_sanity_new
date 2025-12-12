import AttendanceCalculator from "@/components/Reusable/AttendanceCalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Attendance Calculator",
    description: "Track your SRM attendance and calculate how many hours you can miss while maintaining 75% or 90% attendance.",
    keywords: ["attendance calculator", "SRM attendance", "attendance tracker", "SRM University", "class attendance"],
};

export default function AttendanceCalculatorPage() {
    return <AttendanceCalculator />;
}
