import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function VenueForm() {
  const [venueType, setVenueType] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [message, setMessage] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const [venueTypes, setVenueTypes] = useState([]); // State for venue types

  // Fetch venue types on component mount
  useEffect(() => {
    async function fetchVenueTypes() {
      try {
        const response = await fetch("http://localhost:8080/asts/info/venue/fetchAllVenueTypes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const responseData = await response.json();
        if (responseData.data) {
          setVenueTypes(responseData.data); // Update state with fetched venue types
        } else {
          setMessage(`❌ Error: ${responseData.resultMessage}`);
        }
      } catch (err) {
        setMessage(`❌ Error: ${err}`);
      }
    }

    fetchVenueTypes();
  }, []); // Empty dependency array ensures this runs only once

  const handleTriggerClick = (e) => {
    if (showDropdown) {
      setShowDropdown(false);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    setDropdownPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
    });
    setShowDropdown(true);
  };

  const handleTypeSelect = (type) => {
    setVenueType(type);
    setShowDropdown(false);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      venueType,
      location,
      capacity: Number(capacity),
    };

    try {
      const response = await fetch("http://localhost:8080/asts/info/venue/insertOrUpdate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (responseData.data) {
        setMessage("✅ Venue inserted/updated successfully!");
        setLocation("");
        setCapacity("");
        setVenueType("");
      } else {
        setMessage(`❌ Error: ${responseData.resultMessage}`);
      }
    } catch (err) {
      setMessage(`❌ Error: ${err}`);
    }
  }

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
        {/* <Button variant="outline" className="gap-2">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Upload
        </Button> */}
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-lg">Venue Type:</label>
          <div className="relative">
            <select
              value={venueType}
              onChange={(e) => setVenueType(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
            >
              <option value="" disabled>Select Venue Type</option>
              {venueTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
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
          <label className="text-lg">Location:</label>
          <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter Location"
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg">Capacity:</label>
          <Input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            placeholder="Enter Capacity"
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