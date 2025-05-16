"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarCheck } from "lucide-react";

export function GenerateTimetable() {
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear - 1 + i);

  const handleGenerateTimetable = async () => {
    if (!selectedYear || !selectedSemester) return;

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("http://localhost:8080/asts/info/timetable/generateTimetable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ year: selectedYear, semester: selectedSemester }),
      });

      const result = await response.json();

      if (result.resultCode === "0001" && result.data === true) {
        setMessage("✅ Timetable generated successfully!");
      } else {
        setMessage(`❌ Failed: ${result.resultMessage}`);
      }
    } catch (error: any) {
      setMessage(`❌ Request error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <CalendarCheck className="h-5 w-5 text-green-600" />
        <h1 className="text-2xl font-semibold">Generate Timetable</h1>
      </div>

      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <p className="text-gray-700 mb-6">Select the academic year and semester, then click the button to generate the timetable using the algorithm.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Year Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Academic Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
            >
              <option value="">Select Year</option>
              {years.map((year) => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Semester Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Semester</label>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
            >
              <option value="">Select Semester</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
            </select>
          </div>
        </div>

        <Button
          onClick={handleGenerateTimetable}
          disabled={!selectedYear || !selectedSemester || isLoading}
          className={`text-white ${
            selectedYear && selectedSemester && !isLoading
              ? "bg-green-600 hover:bg-green-700"
              : "bg-black hover:bg-black/90"
          }`}
        >
          {isLoading ? "Generating..." : "Query Timetable"}
        </Button>
      </div>

      {message && (
        <div
          className={`px-4 py-3 rounded-md border ${
            message.startsWith("✅")
              ? "bg-green-50 border-green-200 text-green-700"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
