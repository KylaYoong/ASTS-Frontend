import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function PositionForm() {
  // State hooks to capture form inputs
  const [name, setName] = useState("");
  const [contactHourPerWeek, setContactHourPerWeek] = useState("");
  const [message, setMessage] = useState("");

  // Handle Form Submission
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload = {
      name,
      contactHourPerWeek,
    };

    try {
      const response = await fetch("http://localhost:8080/asts/info/educator/position/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (responseData.data) {
        // If the response contains data, it indicates success
        setMessage("✅ Position added successfully!");
        // Reset the form fields
        setName("");
        setContactHourPerWeek("");
      } else {
        // If no data is returned, show the error message
        setMessage(`❌ Error: ${responseData.resultMessage}`);
      }
    } catch (err) {
      // Handle any errors during the fetch request
      setMessage(`❌ Error: ${err}`);
    }
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Position</h1>
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
          <label className="text-lg">Name:</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter position name"
            className="w-full rounded-lg text-lg p-3"
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg">Contact Hours Per Week:</label>
          <Input
            type="number"
            value={contactHourPerWeek}
            onChange={(e) => setContactHourPerWeek(e.target.value)}
            placeholder="Enter contact hours"
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

      {message && <p className="text-base mt-4">{message}</p>}
    </div>
  );
}
