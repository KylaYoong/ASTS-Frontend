"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";

type TimetableClass = {
  classType: string;
  classDay: number;
  classTimeStart: string;
  classTimeEnd: string;
  unitCode: string;
  venueLocation: string;
};

type TimetableResponse = {
  resultCode: string;
  resultMessage: string;
  data: {
    offeringYear: string;
    offeringSemester: string;
    educatorName: string;
    classList: TimetableClass[];
  };
};

export function EducatorTimetable() {
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [educatorId, setEducatorId] = useState<string>("");
  const [timetableData, setTimetableData] = useState<TimetableClass[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [educatorName, setEducatorName] = useState<string>("");

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear - 1 + i);

  const handleGenerateTimetable = async () => {
    if (!selectedYear || !selectedSemester || !educatorId) return;

    setIsLoading(true);
    setError(null);
    setTimetableData([]);

    try {
      const response = await fetch("http://localhost:8080/asts/info/timetable/getEducatorTimetable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offeringYear: selectedYear,
          offeringSemester: selectedSemester,
          educatorId,
        }),
      });

      const result: TimetableResponse = await response.json();

      if (result.resultCode === "0001") {
        setTimetableData(result.data.classList || []);
        setEducatorName(result.data.educatorName || "");
      } else {
        setError(`❌ Error: ${result.resultMessage}`);
      }
    } catch (err) {
      setError(`❌ Request failed: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <User className="h-5 w-5 text-gray-500" />
        <h1 className="text-2xl font-semibold">Educator Timetable</h1>
      </div>

      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <p className="text-gray-700 mb-6">
          Please select an academic year, semester, and educator ID to view the timetable.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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

          {/* Educator ID Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Educator ID</label>
            <div className="relative">
              <Input
                type="text"
                value={educatorId}
                onChange={(e) => setEducatorId(e.target.value)}
                placeholder="Enter Educator ID"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={handleGenerateTimetable}
          disabled={!selectedYear || !selectedSemester || !educatorId || isLoading}
          className={`text-white ${
            selectedYear && selectedSemester && educatorId && !isLoading
              ? "bg-green-600 hover:bg-green-700"
              : "bg-black hover:bg-black/90"
          }`}
        >
          {isLoading ? "Loading..." : "Generate Timetable"}
        </Button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">{error}</div>}

      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h2 className="text-lg font-medium mb-4">
          {educatorName ? `Timetable for ${educatorName}` : "Timetable Results"}
        </h2>

        {timetableData.length > 0 ? (
          <div className="border rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Day
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Unit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Venue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Class Type
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {timetableData.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][item.classDay]}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.classTimeStart} - {item.classTimeEnd}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.unitCode}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.venueLocation}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.classType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            {selectedYear && selectedSemester && educatorId && !isLoading
              ? "No timetable data available for the selected filters."
              : "Select a year, semester, and educator ID to view the timetable."}
          </div>
        )}
      </div>
    </div>
  );
}
