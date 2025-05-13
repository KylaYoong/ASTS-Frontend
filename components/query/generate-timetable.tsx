"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function GenerateTimetable() {
  const [year, setYear] = useState("")
  const [semester, setSemester] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const generateTimetable = async () => {
    setIsLoading(true)
    setMessage("")

    try {
      const response = await fetch("http://localhost:8080/asts/info/timetable/generateTimetable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ year, semester }),
      })

      const result = await response.json()

      if (result.resultCode === "0001" && result.data === true) {
        setMessage("✅ Timetable generated successfully!")
      } else {
        setMessage(`❌ Failed: ${result.resultMessage}`)
      }
    } catch (error) {
      setMessage(`❌ Request error: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-4 space-y-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold">Generate Timetable</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year (e.g. 2025)" />
        <Input value={semester} onChange={(e) => setSemester(e.target.value)} placeholder="Semester (e.g. 1)" />
      </div>

      <Button onClick={generateTimetable} disabled={isLoading}>
        {isLoading ? "Generating..." : "Generate Timetable"}
      </Button>

      {message && <p className="text-sm mt-2">{message}</p>}
    </div>
  )
}
