import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function EducatorForm() {
  return (
    <div className="p-8">
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
      <form className="space-y-6">
        <div className="space-y-2">
          <label className="text-lg">Staff ID:</label>
          <Input placeholder="Enter staff ID" className="w-full rounded-lg text-lg p-3" />
        </div>
        <div className="space-y-2">
          <label className="text-lg">Name:</label>
          <Input placeholder="Enter name" className="w-full rounded-lg text-lg p-3" />
        </div>
        <div className="space-y-2">
          <label className="text-lg">Email:</label>
          <Input placeholder="Enter email" type="email" className="w-full rounded-lg text-lg p-3" />
        </div>
        <div className="space-y-2">
          <label className="text-lg">Educator Unit Amount Limit:</label>
          <Input placeholder="Enter unit limit" type="number" className="w-full rounded-lg text-lg p-3" />
        </div>
        <div className="space-y-2">
          <label className="text-lg">Position:</label>
          <Select>
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
        <Button type="submit" className="bg-black text-white px-8 py-2 rounded-lg text-lg hover:bg-black/90">
          Save
        </Button>
      </form>
    </div>
  )
}

