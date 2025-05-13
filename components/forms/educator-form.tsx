import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function EducatorForm() {
  const [staffId, setStaffId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [positions, setPositions] = useState<string[]>([]); 
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/asts/info/educator/fetchAllEducatorPositionType",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const responseData = await response.json();

        if (responseData.data) {
          setPositions(responseData.data); // Store fetched positions in state
          setMessage("✅ Positions fetched successfully!");
        } else {
          setMessage(`❌ Error: ${responseData.resultMessage}`);
        }
      } catch (err) {
        setMessage(`❌ Error: ${err}`);
      }
    };

    fetchPositions();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      staffId,
      name,
      email,
      position,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/asts/info/educator/insertOrUpdate",
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
        setMessage("✅ Educator inserted/updated successfully!");
        // Reset form fields after successful submission
        setStaffId("");
        setName("");
        setEmail("");
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
      <h1 className="text-2xl font-semibold mb-8">Educator</h1>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-lg">Staff ID:</label>
          <Input
            value={staffId}
            onChange={(e) => setStaffId(e.target.value)}
            placeholder="Enter Staff ID"
            className="w-full rounded-lg text-lg p-3"
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg">Name:</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
            className="w-full rounded-lg text-lg p-3"
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg">Email:</label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            type="email"
            className="w-full rounded-lg text-lg p-3"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-lg">Position:</label>
          <div className="relative">
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
            >
              <option value="" disabled>Select Position</option>
              {positions.map((pos) => (
              <option key={pos} value={pos.toString()}>
                {pos}
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
