"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function UnitOfferingForm() {
  const [unitCode, setUnitCode] = useState("");
  const [offeringYear, setOfferingYear] = useState("");
  const [offeringSemester, setOfferingSemester] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      unitCode,
      offeringYear,
      offeringSemester,
    };

    try {
      const response = await fetch("http://localhost:8080/asts/info/unitOffering/insertOrUpdate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (responseData.data) {
        setMessage("✅ Unit Offering inserted/updated successfully!");
        setUnitCode("");
        setOfferingYear("");
        setOfferingSemester("");
      } else {
        setMessage(`❌ Error: ${responseData.resultMessage}`);
      }
    } catch (err) {
      setMessage(`❌ Error: ${err}`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-8">Unit Offering</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-lg">Unit Code:</label>
          <Input
            value={unitCode}
            onChange={(e) => setUnitCode(e.target.value)}
            placeholder="Enter unit code"
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg">Offering Year:</label>
          <Input
            value={offeringYear}
            onChange={(e) => setOfferingYear(e.target.value)}
            placeholder="Enter offering year (e.g. 2026)"
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg">Offering Semester:</label>
          <Input
            value={offeringSemester}
            onChange={(e) => setOfferingSemester(e.target.value)}
            placeholder="Enter offering semester (e.g. 1, 2)"
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

export default UnitOfferingForm;
