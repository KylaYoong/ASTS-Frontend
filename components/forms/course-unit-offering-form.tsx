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

export function CourseUnitOfferingForm() {
  const [courseCode, setCourseCode] = useState("");
  const [unitCodes, setUnitCodes] = useState([""]);
  const [unitOfferingSemester, setUnitOfferingSemester] = useState("");
  const [unitOfferingYear, setUnitOfferingYear] = useState("");
  const [message, setMessage] = useState("");

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear + i);

  const handleUnitCodeChange = (index: number, value: string) => {
    const updated = [...unitCodes];
    updated[index] = value;
    setUnitCodes(updated);
  };

  const addUnitCodeField = () => {
    setUnitCodes([...unitCodes, ""]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      courseCode,
      unitCodeList: unitCodes.filter((code) => code.trim() !== ""),
      unitOfferingSemester,
      unitOfferingYear,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/asts/info/courseUnitOffering/insertOrUpdateCourseUnitOffering",
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
        setMessage("✅ Course unit offering submitted successfully!");
        setCourseCode("");
        setUnitCodes([""]);
        setUnitOfferingSemester("");
        setUnitOfferingYear("");
      } else {
        setMessage(`❌ Error: ${responseData.resultMessage}`);
      }
    } catch (err) {
      setMessage(`❌ Error: ${err}`);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Course Unit Offering</h1>
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
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            placeholder="Enter course code"
            className="w-full rounded-lg text-lg p-3"
          />
        </div>

        {unitCodes.map((code, index) => (
          <div className="space-y-2" key={index}>
            <label className="text-lg">Unit Code {index + 1}:</label>
            <Input
              value={code}
              onChange={(e) => handleUnitCodeChange(index, e.target.value)}
              placeholder={`Enter unit code ${index + 1}`}
              className="w-full rounded-lg text-lg p-3"
            />
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addUnitCodeField}
          className="rounded-lg text-md"
        >
          ➕ Add another unit code
        </Button>

        <div className="space-y-2">
            <label className="text-lg">Semester:</label>
            <Input
                value={unitOfferingSemester}
                onChange={(e) => setUnitOfferingSemester(e.target.value)}
                placeholder="Enter semester (e.g. 1, 2, summer, winter)"
                className="w-full rounded-lg text-lg p-3"
            />
        </div>

        <div className="space-y-2">
            <label className="text-lg">Year:</label>
            <Input
                value={unitOfferingYear}
                onChange={(e) => setUnitOfferingYear(e.target.value)}
                placeholder="Enter year (e.g. 2025)"
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
