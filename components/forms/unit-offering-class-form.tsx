import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function UnitOfferingClassDetailsForm() {
  // State hooks to capture form inputs
  const [unitCode, setUnitCode] = useState("");
  const [offeringYear, setOfferingYear] = useState("");
  const [offeringSemester, setOfferingSemester] = useState("");
  const [classType, setClassType] = useState("");
  const [classDuration, setClassDuration] = useState("");
  const [numberOfStudents, setNumberOfStudents] = useState("");
  const [message, setMessage] = useState("");

  // Handle Form Submission
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Create the payload to send to the API
    const payload = {
      unitCode,
      offeringYear,
      offeringSemester,
      classType,
      classDuration,
      numberOfStudents,
    };

    try {
      const response = await fetch("http://localhost:8080/asts/info/unitOffering/classDetails/insertOrUpdate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (responseData.data) {
        // If the response contains data, it indicates success
        setMessage("✅ Unit Offering Class Details inserted/updated successfully!");
        // Reset the form fields
        setUnitCode("");
        setOfferingYear("");
        setOfferingSemester("");
        setClassType("");
        setClassDuration("");
        setNumberOfStudents("");
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
        <h1 className="text-2xl font-semibold">Unit Offering Class Details</h1>
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
          <label className="text-lg">Unit Code:</label>
          <Input
            placeholder="Enter unit code"
            value={unitCode}
            onChange={(e) => setUnitCode(e.target.value)}
            className="w-full rounded-lg text-lg p-3"
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg">Offering Year:</label>
          <Input
            type="number"
            value={offeringYear}
            onChange={(e) => setOfferingYear(e.target.value)}
            placeholder="Enter offering year (e.g., 2025)"
            className="w-full rounded-lg text-lg p-3"
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg">Offering Semester:</label>
          <Input
            type="text"
            value={offeringSemester}
            onChange={(e) => setOfferingSemester(e.target.value)}
            placeholder="Enter offering semester (e.g., 1, 2, Summer, Winter)"
            className="w-full rounded-lg text-lg p-3"
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg">Class Type:</label>
          <Input
            type="text"
            value={classType}
            onChange={(e) => setClassType(e.target.value)}
            placeholder="Enter class type (e.g., WORKSHOP, TUTORIAL)"
            className="w-full rounded-lg text-lg p-3"
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg">Class Duration (in minutes):</label>
          <Input
            type="number"
            value={classDuration}
            onChange={(e) => setClassDuration(e.target.value)}
            placeholder="Enter class duration"
            className="w-full rounded-lg text-lg p-3"
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg">Number of Students:</label>
          <Input
            type="number"
            value={numberOfStudents}
            onChange={(e) => setNumberOfStudents(e.target.value)}
            placeholder="Enter number of students"
            className="w-full rounded-lg text-lg p-3"
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
