import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function UnitOfferingForm() {
  // Generate years for dropdown (current year and 5 years into the future)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 6 }, (_, i) => currentYear + i)

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Unit Offering</h1>
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
          <label className="text-lg">Offering Year:</label>
          <Select>
            <SelectTrigger className="w-full rounded-lg text-lg p-3 h-auto">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-lg">Offering Semester:</label>
          <Select>
            <SelectTrigger className="w-full rounded-lg text-lg p-3 h-auto">
              <SelectValue placeholder="Select semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Semester 1</SelectItem>
              <SelectItem value="2">Semester 2</SelectItem>
              <SelectItem value="summer">Summer</SelectItem>
              <SelectItem value="winter">Winter</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="bg-black text-white px-8 py-2 rounded-lg text-lg hover:bg-black/90">
          Save
        </Button>
      </form>
    </div>
  )
}

