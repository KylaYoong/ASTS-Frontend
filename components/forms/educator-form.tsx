import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function EducatorForm() {
  const [staffId, setStaffId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [message, setMessage] = useState("");

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
        setPosition("");
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
        <h1 className="text-2xl font-semibold">Educator</h1>
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
          <label className="text-lg">Name:</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            className="w-full rounded-lg text-lg p-3"
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg">Email:</label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            type="email"
            className="w-full rounded-lg text-lg p-3"
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg">Position:</label>
          <Select value={position} onValueChange={setPosition}>
            <SelectTrigger className="w-full rounded-lg text-lg p-3 h-auto">
              <SelectValue placeholder="Select position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professor">Professor</SelectItem>
              <SelectItem value="associate-professor">Associate Professor</SelectItem>
              <SelectItem value="senior-lecturer">Senior Lecturer</SelectItem>
              <SelectItem value="lecturer">Lecturer</SelectItem>
              <SelectItem value="tutor">Tutor</SelectItem>
            </SelectContent>
          </Select>
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
