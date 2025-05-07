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
            placeholder="Enter course code"
            className="w-full rounded-lg text-lg p-3"
          />
        </div>

        {units.map((unit, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-4 relative">
            <div className="space-y-2">
              <label className="text-lg">Unit Code {index + 1}:</label>
              <Input
                value={unit.unitCode}
                onChange={(e) => handleUnitChange(index, "unitCode", e.target.value)}
                placeholder="Enter unit code"
                className="w-full rounded-lg text-lg p-3"
              />
            </div>

            <div className="space-y-2">
              <label className="text-lg">Offering Year:</label>
              <Input
                value={unit.year}
                onChange={(e) => handleUnitChange(index, "year", e.target.value)}
                placeholder="Enter offering year"
                className="w-full rounded-lg text-lg p-3"
              />
            </div>

            <div className="space-y-2">
              <label className="text-lg">Offering Semester:</label>
              <Input
                value={unit.semester}
                onChange={(e) => handleUnitChange(index, "semester", e.target.value)}
                placeholder="Enter offering semester"
                className="w-full rounded-lg text-lg p-3"
              />
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

        <Button type="button" variant="outline" onClick={addUnitField}>
          ➕ Add another unit
        </Button>

        <div className="space-y-2">
          <label className="text-lg">Enrol Year:</label>
          <Input
            value={enrolYear}
            onChange={(e) => setEnrolYear(e.target.value)}
            placeholder="Enter enrol year"
            className="w-full rounded-lg text-lg p-3"
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg">Enrol Semester:</label>
          <Input
            value={enrolSemester}
            onChange={(e) => setEnrolSemester(e.target.value)}
            placeholder="Enter enrol semester"
            className="w-full rounded-lg text-lg p-3"
          />
        </div>

        <div className="flex items-center gap-3">
          <Checkbox
            id="cognate"
            checked={cognate}
            onCheckedChange={(val) => setCognate(Boolean(val))}
          />
          <label htmlFor="cognate" className="text-lg">Cognate</label>
        </div>

        <Button type="submit" className="bg-black text-white px-8 py-2 rounded-lg text-lg hover:bg-black/90">
          Save
        </Button>
      </form>

      {message && <p className="text-base mt-4">{message}</p>}
    </div>
  );
}
