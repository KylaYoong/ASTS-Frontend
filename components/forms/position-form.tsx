import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function PositionForm() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Position</h1>
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
          <label className="text-lg">Name:</label>
          <Input placeholder="Enter position name" className="w-full rounded-lg text-lg p-3" />
        </div>
        <div className="space-y-2">
          <label className="text-lg">Contact Hours Per Week:</label>
          <Input placeholder="Enter contact hours" type="number" className="w-full rounded-lg text-lg p-3" />
        </div>
        <Button type="submit" className="bg-black text-white px-8 py-2 rounded-lg text-lg hover:bg-black/90">
          Save
        </Button>
      </form>
    </div>
  )
}

