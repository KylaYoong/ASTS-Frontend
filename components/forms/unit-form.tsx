import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function UnitForm() {
  const [unitCode, setUnitCode] = useState("")
  const [unitName, setUnitName] = useState("")
  const [unitLevel, setUnitLevel] = useState("")
  const [unitDescription, setUnitDescription] = useState("")
  const [unitCreditPoint, setCreditPoint] = useState("")
  const [unitClassHoursPerWeek, setClassHour] = useState("")
  const [unitStatus, setStatus] = useState("continuous")
  const [unitMaximumEnrolmentCount, setMaxEnrolment] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const payload = {
      unitCode,
      unitName,
      unitLevel: parseInt(unitLevel),
      unitDescription,
      unitCreditPoint: parseInt(unitCreditPoint),
      unitClassHoursPerWeek: parseInt(unitClassHoursPerWeek),
      unitStatus,
      unitMaximumEnrolmentCount: parseInt(unitMaximumEnrolmentCount),
    };
  
    try {
      const response = await fetch("http://localhost:8080/asts/info/unit/insertOrUpdate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const responseData = await response.json(); // Parse the response as JSON
  
      if (responseData.data) {
        // If `data` is truthy, we consider it a success
        setMessage("✅ Unit inserted/updated successfully!");
        // Reset the form fields
        setUnitCode("");
        setUnitName("");
        setUnitLevel("");
        setClassHour("");
        setMaxEnrolment("");
        setUnitDescription("");
        setCreditPoint("");
        setStatus("continuous");
      } else {
        // If `data` is null, show the error message
        setMessage(`❌ Error: ${responseData.resultMessage}`);
      }
    } catch (err) {
      // Handle any errors from the fetch request
      setMessage(`❌ Error: ${err}`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-8">Unit</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-lg">Unit Code:</label>
          <Input 
            value={unitCode} 
            onChange={(e) => setUnitCode(e.target.value)} 
            placeholder="Enter Unit Code (Eg. FIT9136)"
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg">Unit Name:</label>
          <Input 
            value={unitName} 
            onChange={(e) => setUnitName(e.target.value)} 
            placeholder="Enter Unit Name"
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg">Unit Level:</label>
          <Input 
            type="number" 
            value={unitLevel} 
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              if ((value >= 1 && value <= 10) || e.target.value === "") {
                setUnitLevel(e.target.value);
              }
            }}
            placeholder="Enter Unit Level (1-10)"
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg">Unit Description:</label>
          <Textarea 
            value={unitDescription} 
            onChange={(e) => setUnitDescription(e.target.value)} 
            placeholder="Enter Unit Description"
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg">Unit Credit Point:</label>
          <Input 
            type="number" 
            value={unitCreditPoint} 
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              if ((value >= 1 && value <= 20) || e.target.value === "") {
                setCreditPoint(e.target.value);
              }
            }}
            placeholder="Enter Unit Credit Point (1-20)"
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg">Unit Class Hours Per Week:</label>
          <Input 
            type="number" 
            value={unitClassHoursPerWeek} 
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              if ((value >= 1 && value <= 168) || e.target.value === "") {
                setClassHour(e.target.value);
              }
            }}
            placeholder="Enter Unit Class Hours Per Week (1 hour - 168 hours)"
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg">Unit Maximum Enrolment Count:</label>
          <Input 
            type="number" 
            value={unitMaximumEnrolmentCount} 
            onChange={(e) => setMaxEnrolment(e.target.value)} 
            placeholder="Enter Unit Max Enrolment Count"
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg block mb-2">Status:</label>
          <RadioGroup value={unitStatus} onValueChange={setStatus} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ACTIVE" id="continuous" />
              <Label htmlFor="continuous">Active</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="DISCONTINUED" id="archived" />
              <Label htmlFor="archived">Discontinued</Label>
            </div>
          </RadioGroup>
        </div>

        <Button type="submit" className="bg-black text-white px-8 py-2 rounded-lg text-lg hover:bg-black/90">
          Save
        </Button>
      </form>
      {message && <p className="text-base mt-4">{message}</p>}
    </div>
  )
}
