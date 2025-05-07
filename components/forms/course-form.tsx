"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function CourseForm() {
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [enrolYear, setEnrolYear] = useState("");
  const [enrolSemester, setEnrolSemester] = useState("");
  const [cognate, setCognate] = useState(false);
  const [message, setMessage] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

  const handleTriggerClick = (e) => {
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

  const handleCognateSelect = (value) => {
    setCognate(value);
    setShowDropdown(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const payload = {
      courseCode,
      courseName,
      enrolYear,
      enrolSemester,
      cognate: cognate.toString(), // converting boolean to string for API compatibility
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
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Course</h1>
        <Button variant="outline" className="gap-2">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Upload
        </Button>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-lg">Course Code:</label>
          <Input
            type="text"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            placeholder="Enter course code"
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg">Course Name:</label>
          <Input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="Enter course name"
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg">Enrol Year:</label>
          <Input
            type="number"
            value={enrolYear}
            onChange={(e) => setEnrolYear(e.target.value)}
            placeholder="Enter enrol year"
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg">Enrol Semester:</label>
          <Input
            type="number"
            value={enrolSemester}
            onChange={(e) => setEnrolSemester(e.target.value)}
            placeholder="Enter enrol semester"
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg">Cognate:</label>
          <Button 
            type="button"
            variant="outline" 
            className="w-full justify-between cognate-dropdown"
            onClick={handleTriggerClick}
          >
            {cognate ? "Yes" : "No"}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.07102 4.5L6 8.42898L9.92898 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
          {showDropdown && (
            <div 
              className="fixed cognate-dropdown bg-white shadow-lg rounded-md border border-gray-200 z-50"
              style={{
                top: `${dropdownPosition.top}px`,
                left: `${dropdownPosition.left}px`,
                width: `${dropdownPosition.width}px`,
              }}
            >
              <Button 
                variant={cognate ? "secondary" : "ghost"} 
                className="w-full justify-start cognate-dropdown" 
                onClick={() => handleCognateSelect(true)}
              >
                Yes
              </Button>
              <Button 
                variant={!cognate ? "secondary" : "ghost"} 
                className="w-full justify-start cognate-dropdown" 
                onClick={() => handleCognateSelect(false)}
              >
                No
              </Button>
            </div>
          )}
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