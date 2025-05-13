"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Search, User } from "lucide-react"
import { Input } from "@/components/ui/input"

export function EducatorTimetable() {
  // State hooks for year, semester, and educator
  const [selectedYear, setSelectedYear] = useState<string>("")
  const [selectedSemester, setSelectedSemester] = useState<string>("")
  const [educatorId, setEducatorId] = useState<string>("")
  const [timetableData, setTimetableData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [educatorName, setEducatorName] = useState<string>("")

  // Generate a list of years (current year and 5 years into the future)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 6 }, (_, i) => currentYear - 1 + i)

  // Function to fetch educator timetable data based on selected filters
  const handleGenerateTimetable = async () => {
    if (!selectedYear || !selectedSemester || !educatorId) return

    setIsLoading(true)
    setError(null)

    try {
      // Replace with your actual API endpoint
      const response = await fetch(
        `http://localhost:8080/asts/query/educator/getEducatorTimetable?year=${selectedYear}&semester=${selectedSemester}&educatorId=${educatorId}`,
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch timetable data: ${response.statusText}`)
      }

      const data = await response.json()
      setTimetableData(data.data || [])

      // If educator name is available in the response
      if (data.educatorName) {
        setEducatorName(data.educatorName)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      console.error("Error fetching timetable data:", err)
    } finally {
      setIsLoading(false)
    }
  }

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
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
              >
                <option value="">Select Year</option>
                {years.map((year) => (
                  <option key={year} value={year.toString()}>
                    {year}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Semester Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Semester</label>
            <div className="relative">
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
              >
                <option value="">Select Semester</option>
                <option value="1">Semester 1</option>
                <option value="2">Semester 2</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
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
                className="pr-10"
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
              ? "bg-green-600 hover:bg-green-700" // Green when all fields are filled
              : "bg-black hover:bg-black/90" // Default black
          }`}
        >
          {isLoading ? "Loading..." : "Generate Timetable"}
        </Button>
      </div>

      {/* Display error if any */}
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">{error}</div>}

      {/* Timetable results will be displayed here */}
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.day || "N/A"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.startTime && item.endTime ? `${item.startTime} - ${item.endTime}` : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.unitCode || "N/A"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.venue || "N/A"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.classType || "N/A"}</td>
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
  )
}