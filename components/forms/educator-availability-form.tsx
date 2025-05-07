import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as React from "react";

export function EducatorAvailabilityForm() {
  const [staffId, setStaffId] = useState("");
  const [availableYear, setAvailableYear] = useState("");
  const [availableSemester, setAvailableSemester] = useState("");
  const [availableDay, setAvailableDay] = useState("");
  const [availableStartTime, setAvailableStartTime] = useState("");
  const [availableEndTime, setAvailableEndTime] = useState("");
  const [message, setMessage] = useState("");

  // Generate years for dropdown (current year and 5 years into the future)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear + i);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      staffId,
      availableYear,
      availableSemester,
      availableDay,
      availableStartTime,
      availableEndTime,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/asts/info/educator/availability/insert",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const responseData = await response.json();

      if (responseData.data) {
        // If the response contains data, it indicates success
        setMessage("✅ Educator availability inserted successfully!");
        // Reset form fields after successful submission
        setStaffId("");
        setAvailableYear("");
        setAvailableSemester("");
        setAvailableDay("");
        setAvailableStartTime("");
        setAvailableEndTime("");
      } else {
        // If no data is returned, show the error message
        setMessage(`❌ Error: ${responseData.resultMessage}`);
      }
    } catch (err) {
      // Handle any errors during the fetch request
      setMessage(`❌ Error: ${err}`);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Educator Availability</h1>
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
          <label className="text-lg">Staff ID:</label>
          <Input
            value={staffId}
            onChange={(e) => setStaffId(e.target.value)}
            placeholder="Enter staff ID"
            className="w-full rounded-lg text-lg p-3"
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg">Year:</label>
          <div className="relative">
            <select
              value={availableYear}
              onChange={(e) => setAvailableYear(e.target.value)}
              className="w-full rounded-lg text-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent appearance-none"
            >
              <option value="" disabled>Select year</option>
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

        <div className="space-y-2">
          <label className="text-lg">Semester:</label>
          <div className="relative">
            <select
              value={availableSemester}
              onChange={(e) => setAvailableSemester(e.target.value)}
              className="w-full rounded-lg text-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent appearance-none"
            >
              <option value="" disabled>Select semester</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              <option value="summer">Summer</option>
              <option value="winter">Winter</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-lg">Day:</label>
          <div className="relative">
            <select
              value={availableDay}
              onChange={(e) => setAvailableDay(e.target.value)}
              className="w-full rounded-lg text-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent appearance-none"
            >
              <option value="" disabled>Select day</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-lg">Start Time:</label>
          <Input
            value={availableStartTime}
            onChange={(e) => setAvailableStartTime(e.target.value)}
            placeholder="Enter start time"
            type="time"
            className="w-full rounded-lg text-lg p-3"
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg">End Time:</label>
          <Input
            value={availableEndTime}
            onChange={(e) => setAvailableEndTime(e.target.value)}
            placeholder="Enter end time"
            type="time"
            className="w-full rounded-lg text-lg p-3"
          />
        </div>

        <Button
          type="submit"
          className="bg-black text-white px-8 py-2 rounded-lg text-lg hover:bg-black/90"
        >
          Save
        </Button>
      </form>

      {/* Display error or success message */}
      {message && <p className="text-base mt-4">{message}</p>}
    </div>
  );
}