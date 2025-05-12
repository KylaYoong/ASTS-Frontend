import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export function CourseUnitOfferingForm() {
  const [courseCode, setCourseCode] = useState("");
  const [units, setUnits] = useState([{ unitCode: "", year: "", semester: "" }]);
  const [enrolYear, setEnrolYear] = useState("");
  const [enrolSemester, setEnrolSemester] = useState("");
  const [cognate, setCognate] = useState(false);
  const [message, setMessage] = useState("");

  type UnitField = "unitCode" | "year" | "semester";

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear - 1 + i);

  const handleUnitChange = (index: number, field: UnitField, value: string) => {
    const updated = [...units];
    updated[index][field] = value;
    setUnits(updated);
  };

  const addUnitField = () => {
    setUnits([...units, { unitCode: "", year: "", semester: "" }]);
  };

  const removeUnitField = (index: number) => {
    const updated = [...units];
    updated.splice(index, 1);
    setUnits(updated);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      courseCode,
      unitCodeList: units.map((u) => u.unitCode),
      unitOfferingYear: units.map((u) => u.year),
      unitOfferingSemester: units.map((u) => u.semester),
      enrolYear,
      enrolSemester,
      cognate,
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
        setUnits([{ unitCode: "", year: "", semester: "" }]);
        setEnrolYear("");
        setEnrolSemester("");
        setCognate(false);
      } else {
        setMessage(`❌ Error: ${responseData.resultMessage}`);
      }
    } catch (err) {
      setMessage(`❌ Error: ${err}`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">Course Unit Offering</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-lg">Course Code:</label>
          <Input
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            placeholder="Enter Course Code"
            className="w-full rounded-lg text-lg p-3"
          />
        </div>
        
        <div className="space-y-2">
        <label className="text-lg">Course Enrol Year:</label>
        <div className="relative">
          <select
            value={enrolYear}
            onChange={(e) => setEnrolYear(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
          >
            <option value="" disabled>Select Course Enrol Year</option>
            {years.map((enrolYear) => (
              <option key={enrolYear} value={enrolYear.toString()}>
                {enrolYear}
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
          <label className="text-lg">Course Enrol Semester:</label>
          <div className="relative">
            <select
              value={enrolSemester}
              onChange={(e) => setEnrolSemester(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
            >
              <option value="" disabled>Select Course Enrol Semester</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Checkbox
            id="cognate"
            checked={cognate}
            onCheckedChange={(val) => setCognate(Boolean(val))}
          />
          <label htmlFor="cognate" className="text-lg">Cognate</label>
        </div>

        {units.map((unit, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-4 relative">
            <div className="space-y-2">
              <label className="text-lg">Unit Code {index + 1}:</label>
              <Input
                value={unit.unitCode}
                onChange={(e) => handleUnitChange(index, "unitCode", e.target.value)}
                placeholder="Enter Unit Code"
                className="w-full rounded-lg text-lg p-3"
              />
            </div>

          <div className="space-y-2">
              <label className="text-lg">Offering Year:</label>
              <div className="relative">
                <select
                  value={unit.year}
                  onChange={(e) => handleUnitChange(index, "year", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                >
                  <option value="" disabled>Select Offering Year</option>
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
              <label className="text-lg">Offering Semester:</label>
              <div className="relative">
                <select
                  value={unit.semester}
                  onChange={(e) => handleUnitChange(index, "semester", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                >
                  <option value="" disabled>Select Offering Semester</option>
                  <option value="1">Semester 1</option>
                  <option value="2">Semester 2</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {units.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => removeUnitField(index)}
                className="absolute top-2 right-2 text-sm"
              >
                ✖
              </Button>
            )}
          </div>
        ))}

      <div className="flex flex-col gap-2 w-fit">
        <Button type="button" variant="outline" onClick={addUnitField}>
          ➕ Add another unit
        </Button>
        <Button type="submit" className="bg-black text-white px-8 py-2 rounded-lg text-lg hover:bg-black/90">
          Save
        </Button>
      </div>
      </form>

      
      {message && <p className="text-base mt-4">{message}</p>}
    </div>
  );
}
