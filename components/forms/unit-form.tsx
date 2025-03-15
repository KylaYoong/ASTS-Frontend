import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function UnitForm() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Unit</h1>
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
      <form className="space-y-6">
        <div className="space-y-2">
          <label className="text-lg">Unit Code:</label>
          <Input placeholder="Enter unit code" className="w-full rounded-lg text-lg p-3" />
        </div>
        <div className="space-y-2">
          <label className="text-lg">Unit Name:</label>
          <Input placeholder="Enter unit name" className="w-full rounded-lg text-lg p-3" />
        </div>
        <div className="space-y-2">
          <label className="text-lg">Unit Level:</label>
          <Select>
            <SelectTrigger className="w-full rounded-lg text-lg p-3 h-auto">
              <SelectValue placeholder="Select unit level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Level 1</SelectItem>
              <SelectItem value="2">Level 2</SelectItem>
              <SelectItem value="3">Level 3</SelectItem>
              <SelectItem value="4">Level 4</SelectItem>
              <SelectItem value="5">Level 5</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-lg">Unit Description:</label>
          <Textarea placeholder="Enter unit description" className="w-full rounded-lg text-lg p-3 min-h-[100px]" />
        </div>
        <div className="space-y-2">
          <label className="text-lg">Credit Point:</label>
          <Input placeholder="Enter credit point" type="number" className="w-full rounded-lg text-lg p-3" />
        </div>
        <div className="space-y-2">
          <label className="text-lg block mb-2">Status:</label>
          <RadioGroup defaultValue="continuous" className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="continuous" id="continuous" />
              <Label htmlFor="continuous">Continuous</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="archived" id="archived" />
              <Label htmlFor="archived">Archived</Label>
            </div>
          </RadioGroup>
        </div>
        <Button type="submit" className="bg-black text-white px-8 py-2 rounded-lg text-lg hover:bg-black/90">
          Save
        </Button>
      </form>
    </div>
  )
}

