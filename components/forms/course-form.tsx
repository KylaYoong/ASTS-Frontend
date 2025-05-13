"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export function CourseForm() {
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [enrolYear, setEnrolYear] = useState("");
  const [enrolSemester, setEnrolSemester] = useState("");
  const [cognate, setCognate] = useState(false);
  const [message, setMessage] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear - 1 + i);
  
  interface DropdownPosition {
    top: number;
    left: number;
    width: number;
  }

  interface TriggerClickEvent extends React.MouseEvent<HTMLButtonElement> {}

  const handleTriggerClick = (e: TriggerClickEvent): void => {
    if (showDropdown) {
      setShowDropdown(false);
      return;
    }
    
    const rect = e.currentTarget.getBoundingClientRect();
    setDropdownPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width
    });
    setShowDropdown(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const payload = {
      courseCode,
      courseName,
      enrolYear,
      enrolSemester,
      cognate
    };
  
    try {
      const response = await fetch("http://localhost:8080/asts/info/course/insertOrUpdateCourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const responseData = await response.json(); // Parse the response as JSON
  
      if (responseData.data) {
        // If `data` is truthy, we consider it a success
        setMessage("✅ Course inserted/updated successfully!");
        // Reset the form fields
        setCourseCode("");
        setCourseName("");
        setEnrolYear("");
        setEnrolSemester("");
        setCognate(false);
      } else {
        // If `data` is null, show the error message
        setMessage(`❌ Error: ${responseData.resultMessage}`);
      }
    } catch (err) {
      // Handle any errors from the fetch request
      setMessage(`❌ Error: ${err}`);
    }
  };
  
  // Close dropdown when clicking outside
  if (typeof window !== "undefined") {
    window.addEventListener("click", (e) => {
      if (showDropdown && !(e.target as Element).closest(".cognate-dropdown")) {
        setShowDropdown(false);
      }
    });
  }
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-8">Course</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-lg">Course Code:</label>
          <Input
            type="text"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            placeholder="Enter Course Code"
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg">Course Name:</label>
          <Input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="Enter Course Name"
          />
        </div>
        
        <div className="space-y-2">
        <label className="text-lg">Course Enrol Year:</label>
        <div className="relative">
          <select
            value={enrolYear}
            onChange={(e) => setEnrolYear(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
          >
            <option value="" disabled>Select Course Enrol Year</option>
            {years.map((year) => (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            </div>
          </div>
        </div>
    
        <div className="space-y-2">
          <label className="text-lg">Course Enrol Semester:</label>
          <div className="relative">
            <select
              value={enrolSemester}
              onChange={(e) => setEnrolSemester(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
            >
              <option value="" disabled>Select Course Enrol Semester</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Checkbox
            id="cognate"
            checked={cognate}
            onCheckedChange={(val) => setCognate(Boolean(val))}
          />
          <label htmlFor="cognate" className="text-lg">Cognate</label>
        </div>

        <Button type="submit" className="bg-black text-white px-8 py-2 rounded-lg text-lg hover:bg-black/90">
          Save
        </Button>
      </form>

      {message && <p className="text-base mt-4">{message}</p>}
    </div>
  );
}

export default CourseForm;