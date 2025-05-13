import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function VenueTypeForm() {
  // State hooks to capture form inputs
  const [typeName, setVenueTypeName] = useState("");
  const [message, setMessage] = useState("");

  // Handle Form Submission
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload = {
        typeName,
    };

    try {
      const response = await fetch("http://localhost:8080/asts/info/venue/venueType/insert", {
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
        setVenueTypeName("");
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
      <h1 className="text-2xl font-semibold mb-8">Venue Type</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-lg">Name:</label>
          <Input
            value={typeName}
            onChange={(e) => setVenueTypeName(e.target.value)}
            placeholder="Enter Position Name"
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
