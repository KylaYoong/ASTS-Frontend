"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VenueForm() {
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [venues, setVenues] = useState([]);

  // Fetch Venues from Supabase
  useEffect(() => {
    // async function fetchVenues() {
    //   const { data, error } = await supabase.from("venues").select("*");
    //   if (error) {
    //     console.error("Error fetching venues:", error);
    //   } else {
    //     setVenues(data);
    //   }
    // }
    // fetchVenues();
  }, []);

  // Handle Form Submission
  async function handleSubmit(e: React.FormEvent) {
    // e.preventDefault();
    // const { error } = await supabase.from("venues").insert([{ location, capacity: Number(capacity) }]);
    // if (error) {
    //   console.error("Error saving venue:", error);
    // } else {
    //   alert("Venue added successfully!");
    //   setLocation("");
    //   setCapacity("");
    // }
  }


return (
  <div className="p-8">
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
        <div>
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
      </div>
      <Button type="submit" className="bg-black text-white px-8 py-2 rounded-lg text-lg hover:bg-black/90">
          Save
        </Button>
    </form>
  </div>
);
}