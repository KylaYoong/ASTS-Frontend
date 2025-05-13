"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Search, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type TimetableClass = {
  classType: string
  classDay: number
  classTimeStart: string
  classTimeEnd: string
  unitCode: string
  venueLocation: string
}

type TimetableResponse = {
  resultCode: string
  resultMessage: string
  data: {
    offeringYear: string
    offeringSemester: string
    educatorName: string
    classList: TimetableClass[]
  }
}

export function GeneralTimetable() {
  const [selectedYear, setSelectedYear] = useState<string>("")
  const [selectedSemester, setSelectedSemester] = useState<string>("")
  const [selectedDay, setSelectedDay] = useState<string>("")
  const [selectedUnit, setSelectedUnit] = useState<string>("")
  const [timetableData, setTimetableData] = useState<TimetableClass[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [educatorName, setEducatorName] = useState<string>("")
  const [selectedClass, setSelectedClass] = useState<TimetableClass | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [viewMode, setViewMode] = useState<"compact" | "detailed">("compact")

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 6 }, (_, i) => currentYear - 1 + i)
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  const timeSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
  ]

  const handleGenerateTimetable = async () => {
    if (!selectedYear || !selectedSemester) return

    setIsLoading(true)
    setError(null)
    setTimetableData([])

    try {
      // Create payload object and conditionally add optional fields
      const payload: Record<string, string> = {
        offeringYear: selectedYear,
        offeringSemester: selectedSemester,
      }

      if (selectedDay) {
        payload.day = selectedDay
      }

      if (selectedUnit) {
        payload.unitCode = selectedUnit
      }

      const response = await fetch("http://localhost:8080/asts/info/timetable/getTimetable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const result: TimetableResponse = await response.json()

      if (result.resultCode === "0001") {
        setTimetableData(result.data.classList || [])
        setSelectedYear(result.data.offeringYear || "")
        setSelectedSemester(result.data.offeringSemester || "")
        setEducatorName(result.data.educatorName || "")
      } else {
        setError(`❌ Error: ${result.resultMessage}`)
      }
    } catch (err) {
      setError(`❌ Request failed: ${err}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Helper function to check if a class is scheduled at a specific day and time
  const getClassesAtDayAndTime = (day: number, timeSlot: string) => {
    return timetableData.filter((cls) => {
      const classDay = cls.classDay
      const startTime = cls.classTimeStart
      const endTime = cls.classTimeEnd

      // Convert times to comparable format (hours)
      const timeSlotHour = Number.parseInt(timeSlot.split(":")[0])
      const startHour = Number.parseInt(startTime.split(":")[0])
      const endHour = Number.parseInt(endTime.split(":")[0])

      // Check if this class falls within this time slot
      return classDay === day && timeSlotHour >= startHour && timeSlotHour < endHour
    })
  }

  // Calculate class duration in hours
  const getClassDuration = (startTime: string, endTime: string) => {
    const startHour = Number.parseInt(startTime.split(":")[0])
    const endHour = Number.parseInt(endTime.split(":")[0])
    return endHour - startHour
  }

  // Handle class click to show details
  const handleClassClick = (classItem: TimetableClass) => {
    setSelectedClass(classItem)
    setIsModalOpen(true)
  }

  // Get day name from day number
  const getDayName = (dayNumber: number) => {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    return dayNames[dayNumber]
  }

  // Get class background color based on class type
  const getClassColor = (classType: string) => {
    // Map of class types to colors
    const colorMap: Record<string, string> = {
      Lecture: "bg-blue-100 border-blue-300",
      Tutorial: "bg-green-100 border-green-300",
      Workshop: "bg-purple-100 border-purple-300",
      Lab: "bg-yellow-100 border-yellow-300",
      Seminar: "bg-pink-100 border-pink-300",
      Practical: "bg-orange-100 border-orange-300",
      Consultation: "bg-teal-100 border-teal-300",
      Exam: "bg-red-100 border-red-300",
    }

    // Return the color for the class type, or a default color if not found
    return colorMap[classType] || "bg-gray-100 border-gray-300"
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <User className="h-5 w-5 text-gray-500" />
        <h1 className="text-2xl font-semibold">General Timetable</h1>
      </div>

      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <p className="text-gray-700 mb-6">
          Please select an academic year, semester, unit code (optional) and day (optional) to view the timetable.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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

          {/* Unit Code Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Unit Code</label>
            <div className="relative">
              <Input
                type="text"
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
                placeholder="Enter Unit Code"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Day Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Day</label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
            >
              <option value="">Select Day</option>
              <option value="1">Monday</option>
              <option value="2">Tuesday</option>
              <option value="3">Wednesday</option>
              <option value="4">Thursday</option>
              <option value="5">Friday</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <Button
            onClick={handleGenerateTimetable}
            disabled={!selectedYear || !selectedSemester || isLoading}
            className={`text-white ${
              selectedYear && selectedSemester && !isLoading
                ? "bg-green-600 hover:bg-green-700"
                : "bg-black hover:bg-black/90"
            }`}
          >
            {isLoading ? "Loading..." : "Generate Timetable"}
          </Button>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">View Mode:</span>
            <div className="flex border rounded-md overflow-hidden">
              <button
                onClick={() => setViewMode("compact")}
                className={`px-3 py-1 text-sm ${
                  viewMode === "compact"
                    ? "bg-gray-200 text-gray-800 font-medium"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                Compact
              </button>
              <button
                onClick={() => setViewMode("detailed")}
                className={`px-3 py-1 text-sm ${
                  viewMode === "detailed"
                    ? "bg-gray-200 text-gray-800 font-medium"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                Detailed
              </button>
            </div>
          </div>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">{error}</div>}

      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h2 className="text-lg font-medium mb-4">
          {selectedUnit ? `Timetable for ${selectedUnit}` : "Timetable Results"}
        </h2>

        {/* Class Type Legend */}
        <div className="mb-4 flex flex-wrap gap-3">
          <div className="text-sm font-medium text-gray-700 mr-2">Class Types:</div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded mr-1"></div>
            <span className="text-xs">Lecture</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-100 border border-green-300 rounded mr-1"></div>
            <span className="text-xs">Tutorial</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-purple-100 border border-purple-300 rounded mr-1"></div>
            <span className="text-xs">Workshop</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded mr-1"></div>
            <span className="text-xs">Lab</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-pink-100 border border-pink-300 rounded mr-1"></div>
            <span className="text-xs">Seminar</span>
          </div>
        </div>

        {timetableData.length > 0 ? (
          <div className="overflow-x-auto">
            <div className="grid-timetable min-w-[800px]">
              {/* Header row with days */}
              <div className="grid grid-cols-[100px_repeat(5,1fr)] border-b">
                <div className="p-2 font-medium text-gray-500 text-sm border-r bg-gray-50"></div>
                {days.map((day, index) => (
                  <div key={day} className="p-2 font-medium text-gray-500 text-sm text-center border-r bg-gray-50">
                    {day}
                  </div>
                ))}
              </div>

              {/* Time slots rows */}
              {timeSlots.map((time, timeIndex) => (
                <div key={time} className="grid grid-cols-[100px_repeat(5,1fr)] border-b">
                  {/* Time column */}
                  <div className="p-2 text-sm text-gray-500 border-r bg-gray-50 flex items-center justify-center">
                    {time}
                  </div>

                  {/* Day columns */}
                  {days.map((day, dayIndex) => {
                    // In our data, Monday is 1, Sunday is 0
                    const adjustedDayIndex = dayIndex + 1
                    const classes = getClassesAtDayAndTime(adjustedDayIndex, time)

                    return (
                      <div key={`${time}-${day}`} className="border-r p-1 min-h-[60px] relative">
                        {/* Display classes stacked vertically */}
                        <div className="flex flex-col gap-1 h-full">
                          {classes.map((cls, i) => {
                            const duration = getClassDuration(cls.classTimeStart, cls.classTimeEnd)
                            // Only render if this is the starting time slot
                            if (cls.classTimeStart.startsWith(time)) {
                              const colorClass = getClassColor(cls.classType)

                              if (viewMode === "compact") {
                                return (
                                  <TooltipProvider key={i}>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <div
                                          className={`w-full p-1 ${colorClass} rounded text-xs cursor-pointer hover:brightness-95 transition-all border`}
                                          style={{
                                            height: `${Math.max(duration * 30, 40)}px`,
                                            minHeight: "40px",
                                            zIndex: 10,
                                          }}
                                          onClick={() => handleClassClick(cls)}
                                        >
                                          <div className="font-medium">{cls.unitCode}</div>
                                          <div className="text-[10px]">{cls.classType}</div>
                                          <div className="text-[10px] text-gray-600 truncate">{cls.venueLocation}</div>
                                        </div>
                                      </TooltipTrigger>
                                      <TooltipContent side="right" className="max-w-xs">
                                        <div className="text-xs">
                                          <div className="font-bold">{cls.unitCode}</div>
                                          <div>{cls.classType}</div>
                                          <div>{cls.venueLocation}</div>
                                          <div>
                                            {cls.classTimeStart} - {cls.classTimeEnd}
                                          </div>
                                        </div>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )
                              } else {
                                return (
                                  <div
                                    key={i}
                                    className={`w-full p-2 ${colorClass} rounded text-xs cursor-pointer hover:brightness-95 transition-all border`}
                                    style={{
                                      height: `${Math.max(duration * 60, 80)}px`,
                                      minHeight: "80px",
                                      zIndex: 10,
                                      display: "flex",
                                      flexDirection: "column",
                                      justifyContent: "space-between",
                                    }}
                                    onClick={() => handleClassClick(cls)}
                                  >
                                    <div>
                                      <div className="font-medium text-sm">{cls.unitCode}</div>
                                      <div className="font-medium">{cls.classType}</div>
                                      <div className="mt-1">{cls.venueLocation}</div>
                                    </div>
                                    <div className="text-gray-600">
                                      {cls.classTimeStart} - {cls.classTimeEnd}
                                    </div>
                                  </div>
                                )
                              }
                            }
                            return null
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            {selectedYear && selectedSemester && !isLoading
              ? "No timetable data available for the selected filters."
              : "Select a year and semester to view the timetable."}
          </div>
        )}
      </div>

      {/* Class Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Class Details</DialogTitle>
            <DialogDescription>
              {selectedClass && `${selectedClass.unitCode} - ${selectedClass.classType}`}
            </DialogDescription>
          </DialogHeader>

          {selectedClass && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-[120px_1fr] gap-2">
                <div className="font-medium text-gray-700">Unit Code:</div>
                <div>{selectedClass.unitCode}</div>
              </div>

              <div className="grid grid-cols-[120px_1fr] gap-2">
                <div className="font-medium text-gray-700">Class Type:</div>
                <div>{selectedClass.classType}</div>
              </div>

              <div className="grid grid-cols-[120px_1fr] gap-2">
                <div className="font-medium text-gray-700">Day:</div>
                <div>{getDayName(selectedClass.classDay)}</div>
              </div>

              <div className="grid grid-cols-[120px_1fr] gap-2">
                <div className="font-medium text-gray-700">Time:</div>
                <div>
                  {selectedClass.classTimeStart} - {selectedClass.classTimeEnd}
                </div>
              </div>

              <div className="grid grid-cols-[120px_1fr] gap-2">
                <div className="font-medium text-gray-700">Venue:</div>
                <div>{selectedClass.venueLocation}</div>
              </div>

              <div className="grid grid-cols-[120px_1fr] gap-2">
                <div className="font-medium text-gray-700">Duration:</div>
                <div>{getClassDuration(selectedClass.classTimeStart, selectedClass.classTimeEnd)} hour(s)</div>
              </div>
            </div>
          )}

          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
