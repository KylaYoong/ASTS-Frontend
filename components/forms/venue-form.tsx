"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function VenueForm() {
  const [venueType, setVenueType] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [message, setMessage] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

  const venueTypes = [
    "Lecture Hall",
    "Computer Lab",
    "Auditorium",
    "Active Learning Classroom"
  ];

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

  const handleTypeSelect = (type) => {
    setVenueType(type);
    setShowDropdown(false);
  };

  // Handle Form Submission
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  
    const payload = {
      venueType,
      location,
      capacity: Number(capacity), // Ensure capacity is a number
    };
  
    try {
      const response = await fetch("http://localhost:8080/asts/info/venue/insertOrUpdate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const responseData = await response.json(); // Parse the response as JSON
  
      if (responseData.data) {
        // If `data` is truthy, it indicates success
        setMessage("✅ Venue inserted/updated successfully!");
        // Reset the form fields
        setLocation("");
        setCapacity("");
        setVenueType("");
      } else {
        // If `data` is null, show the error message
        setMessage(`❌ Error: ${responseData.resultMessage}`);
      }
    } catch (err) {
      // Handle any errors from the fetch request
      setMessage(`❌ Error: ${err}`);
    }
  }
  
  // Close dropdown when clicking outside
  if (typeof window !== "undefined") {
    window.addEventListener("click", (e) => {
      if (showDropdown && !(e.target as Element).closest(".venue-dropdown")) {
        setShowDropdown(false);
      }
    });
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Venue</h1>
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
          <label className="text-lg">Venue Type:</label>
          <Button 
            type="button"
            variant="outline" 
            className="w-full justify-between rounded-lg text-lg p-3 h-auto venue-dropdown"
            onClick={handleTriggerClick}
          >
            {venueType || "Select venue type"}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.07102 4.5L6 8.42898L9.92898 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
          {showDropdown && (
            <div 
              className="fixed venue-dropdown bg-white shadow-lg rounded-md border border-gray-200 z-50 p-1"
              style={{
                top: `${dropdownPosition.top}px`,
                left: `${dropdownPosition.left}px`,
                width: `${dropdownPosition.width}px`,
              }}
            >
              {venueTypes.map((type) => (
                <Button 
                  key={type}
                  variant={venueType === type ? "secondary" : "ghost"} 
                  className="w-full justify-start venue-dropdown" 
                  onClick={() => handleTypeSelect(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-lg">Location:</label>
          <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg">Capacity:</label>
          <Input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            placeholder="Enter capacity"
          />
        </div>

        <Button type="submit" className="bg-black text-white px-8 py-2 rounded-lg text-lg hover:bg-black/90">
          Save
        </Button>
      </form>

      {message && <p className="text-base mt-4">{message}</p>}
    </div>
  );
}