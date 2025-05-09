"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function EducatorUnitOfferingForm() {
  const [staffId, setStaffId] = useState("");
  const [message, setMessage] = useState("");

  interface UnitEntry {
  unitCode: string;
  offeringYear: string;
  offeringSemester: string;
}

  const [units, setUnits] = useState<UnitEntry[]>([
  { unitCode: "", offeringYear: "", offeringSemester: "" },
]);


  const handleUnitChange = (index: number, field: keyof UnitEntry, value: string) => {
  const updated = [...units];
  updated[index] = { ...updated[index], [field]: value }; // safer update
  setUnits(updated);
};

  const addUnit = () => {
    setUnits([...units, { unitCode: "", offeringYear: "", offeringSemester: "" }]);
  };

  const removeUnit = (index: number) => {
    const updated = units.filter((_, i) => i !== index);
    setUnits(updated);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      staffId,
      unitCode: units.map(u => u.unitCode),
      unitOfferingYear: units.map(u => u.offeringYear),
      unitOfferingSemester: units.map(u => u.offeringSemester),
    };

    try {
      const response = await fetch("http://localhost:8080/asts/info/educator/unitOffering/insert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (responseData.data) {
        setMessage("✅ Educator unit offering submitted successfully!");
        setStaffId("");
        setUnits([{ unitCode: "", offeringYear: "", offeringSemester: "" }]);
      } else {
        setMessage(`❌ Error: ${responseData.resultMessage}`);
      }
    } catch (err) {
      setMessage(`❌ Error: ${err}`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-8">Educator Unit Offering</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-lg">Staff ID:</label>
          <Input
            value={staffId}
            onChange={(e) => setStaffId(e.target.value)}
            placeholder="Enter staff ID"
          />
        </div>

        <div className="space-y-4">
          <label className="text-lg font-medium">Units:</label>
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
                value={unit.offeringYear}
                onChange={(e) => handleUnitChange(index, "offeringYear", e.target.value)}
                placeholder="Enter offering year"
                className="w-full rounded-lg text-lg p-3"
              />
            </div>

            <div className="space-y-2">
              <label className="text-lg">Offering Semester:</label>
              <Input
                value={unit.offeringSemester}
                onChange={(e) => handleUnitChange(index, "offeringSemester", e.target.value)}
                placeholder="Enter offering semester"
                className="w-full rounded-lg text-lg p-3"
              />
            </div>

            {units.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => removeUnit(index)}
                className="absolute top-2 right-2 text-sm"
              >
                ✖
              </Button>
            )}
          </div>
        ))}
          <Button type="button" onClick={addUnit} variant="outline">
            ➕ Add Unit
          </Button>
        </div>

        <Button type="submit" className="bg-black text-white px-8 py-2 rounded-lg text-lg hover:bg-black/90">
          Submit
        </Button>
      </form>

      {message && <p className="text-base mt-4">{message}</p>}
    </div>
  );
}

export default EducatorUnitOfferingForm;
