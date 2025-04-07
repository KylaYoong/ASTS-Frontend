"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Grid, List, Printer, Filter, Calendar } from "lucide-react"

// Define the class event type locally to avoid dependency on API route
interface ClassEvent {
  id: string
  title: string
  location: string
  type: string
  code: string
  room: string
  day: number // 0-6 for Monday-Sunday
  startTime: number // Hours in 24h format
  endTime: number // Hours in 24h format
  color: string
}

// Sample class data as fallback
const sampleClasses: ClassEvent[] = [
  {
    id: "1",
    title: "ETW3482_MA_S1",
    location: "CAMPUS",
    type: "Tutorial",
    code: "07",
    room: "MA_Tutorial_6210",
    day: 3, // Thursday
    startTime: 8,
    endTime: 10,
    color: "bg-green-100",
  },
  {
    id: "2",
    title: "FIT3152_MA_S1",
    location: "CAMPUS",
    type: "Seminar",
    code: "01",
    room: "MA_Active_Learning_Classroom_9401",
    day: 1, // Tuesday
    startTime: 10,
    endTime: 12,
    color: "bg-yellow-100",
  },
  {
    id: "3",
    title: "FIT3152_MA_S1",
    location: "CAMPUS",
    type: "Applied",
    code: "02",
    room: "MA_ClassRoom_6103",
    day: 3, // Thursday
    startTime: 10,
    endTime: 12,
    color: "bg-blue-100",
  },
  {
    id: "4",
    title: "FIT3155_MA_S1",
    location: "CAMPUS",
    type: "Laboratory",
    code: "01",
    room: "MA_Active_Learning_Classroom_6103",
    day: 4, // Friday
    startTime: 10,
    endTime: 13,
    color: "bg-pink-200",
  },
  {
    id: "5",
    title: "FIT3162_MA_S1",
    location: "CAMPUS",
    type: "Tutorial",
    code: "02",
    room: "MA_NextGen_Four",
    day: 1, // Tuesday
    startTime: 14,
    endTime: 16,
    color: "bg-green-100",
  },
  {
    id: "6",
    title: "FIT3162_MA_S1",
    location: "CAMPUS",
    type: "Seminar",
    code: "01",
    room: "MA_LT_5001",
    day: 0, // Monday
    startTime: 16,
    endTime: 18,
    color: "bg-yellow-100",
  },
  {
    id: "7",
    title: "FIT3155_MA_S1",
    location: "CAMPUS",
    type: "Workshop",
    code: "01",
    room: "MA_LT_4108",
    day: 0, // Monday
    startTime: 19,
    endTime: 21,
    color: "bg-green-100",
  },
]

export function Timetable() {
  const [classes, setClasses] = useState<ClassEvent[]>(sampleClasses)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentWeekStart, setCurrentWeekStart] = useState<string>("2025-03-31") // Default to the week in the screenshot

  // Generate time slots from 8 AM to 8 PM
  const timeSlots = Array.from({ length: 13 }, (_, i) => i + 8)

  // Days of the week
  const days = [
    { short: "31/3 (Mon)", long: "Monday" },
    { short: "1/4 (Tue)", long: "Tuesday" },
    { short: "2/4 (Wed)", long: "Wednesday" },
    { short: "3/4 (Thu)", long: "Thursday" },
    { short: "4/4 (Fri)", long: "Friday" },
    { short: "5/4 (Sat)", long: "Saturday" },
    { short: "6/4 (Sun)", long: "Sunday" },
  ]

  // Format time for display
  const formatTime = (hour: number) => {
    if (hour === 12) {
      return "12:00 PM"
    } else if (hour === 0 || hour === 24) {
      return "12:00 AM"
    } else if (hour > 12) {
      return `${hour - 12}:00 PM`
    } else {
      return `${hour}:00 AM`
    }
  }

  // Check if this is the first hour of a class (to render the full class block)
  const isFirstHourOfClass = (day: number, time: number) => {
    return classes.find((cls) => cls.day === day && cls.startTime === time)
  }

  // Calculate the height of a class block based on duration
  const getClassHeight = (cls: ClassEvent) => {
    const duration = cls.endTime - cls.startTime
    return `${duration * 100}%`
  }

  // Navigate to previous week
  const goToPreviousWeek = () => {
    // In a real app, you would calculate the previous week's start date
    // For demo purposes, we'll just show an alert
    alert("Navigate to previous week - would update currentWeekStart state")
  }

  // Navigate to next week
  const goToNextWeek = () => {
    // In a real app, you would calculate the next week's start date
    // For demo purposes, we'll just show an alert
    alert("Navigate to next week - would update currentWeekStart state")
  }

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading timetable data...</div>
  }

  return (
    <div className="flex flex-col h-full">
      {/* Timetable header with controls */}
      <div className="bg-blue-800 text-white p-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" className="bg-gray-200 text-gray-700 hover:bg-gray-300">
            <Printer className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="bg-gray-200 text-gray-700 hover:bg-gray-300">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="bg-gray-200 text-gray-700 hover:bg-gray-300">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 text-center">
          <h2 className="font-medium">Timetable Weeks</h2>
          <div className="w-full flex items-center justify-center mt-2">
            <div className="h-1 bg-gray-300 rounded-full w-3/4 relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-gray-300"></div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" className="bg-white text-gray-800 hover:bg-gray-100">
            All Weeks <ChevronLeft className="h-4 w-4 ml-2" />
          </Button>
          <div className="flex">
            <Button variant="outline" size="icon" className="bg-blue-700 text-white hover:bg-blue-600 rounded-r-none">
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="bg-white text-gray-800 hover:bg-gray-100 rounded-l-none">
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Week navigation */}
      <div className="border-b flex items-center justify-between p-2">
        <Button variant="ghost" size="icon" onClick={goToPreviousWeek}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h3 className="text-gray-700 font-medium">31/03/2025 - 06/04/2025 (last week)</h3>
        <Button variant="ghost" size="icon" onClick={goToNextWeek}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Timetable grid */}
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-[80px_repeat(7,1fr)] min-w-[1000px]">
          {/* Header row with days */}
          <div className="border-b border-r h-12"></div>
          {days.map((day, index) => (
            <div
              key={index}
              className="border-b border-r h-12 flex items-center justify-center font-medium text-blue-800"
            >
              {day.short}
            </div>
          ))}

          {/* Time slots and classes */}
          {timeSlots.map((time) => (
            <React.Fragment key={time}>
              {/* Time label */}
              <div className="border-b border-r p-2 text-sm text-gray-700">{formatTime(time)}</div>

              {/* Day cells */}
              {days.map((_, dayIndex) => {
                const firstHourClass = isFirstHourOfClass(dayIndex, time)

                return (
                  <div key={`${time}-${dayIndex}`} className="border-b border-r relative h-16">
                    {firstHourClass && (
                      <div
                        className={`absolute inset-x-0 ${firstHourClass.color} p-1 text-xs overflow-hidden`}
                        style={{
                          height: getClassHeight(firstHourClass),
                          zIndex: 10,
                        }}
                      >
                        <div className="font-medium">{firstHourClass.title}</div>
                        <div>{firstHourClass.location}</div>
                        <div>{firstHourClass.type}</div>
                        <div>{firstHourClass.code}</div>
                        <div>{firstHourClass.room}</div>
                      </div>
                    )}
                  </div>
                )
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

