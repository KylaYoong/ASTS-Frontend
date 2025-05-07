import { NextResponse } from "next/server"

// Define the class event type
export interface ClassEvent {
  id: string
  title: string
  location: string
  type: string
  code: string
  room: string
  day: number // 0-6 for Monday-Sunday
  startTime: number // Hours in 24h format
  endTime: number // Hours in 24h format
  color: string
}

// Sample class data - in a real app, this would come from a database
const classes: ClassEvent[] = [
  {
    id: "1",
    title: "ETW3482_MA_S1",
    location: "CAMPUS",
    type: "Tutorial",
    code: "07",
    room: "MA_Tutorial_6210",
    day: 3, // Thursday
    startTime: 8,
    endTime: 10,
    color: "bg-green-100",
  },
  {
    id: "2",
    title: "FIT3152_MA_S1",
    location: "CAMPUS",
    type: "Seminar",
    code: "01",
    room: "MA_Active_Learning_Classroom_9401",
    day: 1, // Tuesday
    startTime: 10,
    endTime: 12,
    color: "bg-yellow-100",
  },
  {
    id: "3",
    title: "FIT3152_MA_S1",
    location: "CAMPUS",
    type: "Applied",
    code: "02",
    room: "MA_ClassRoom_6103",
    day: 3, // Thursday
    startTime: 10,
    endTime: 12,
    color: "bg-blue-100",
  },
  {
    id: "4",
    title: "FIT3155_MA_S1",
    location: "CAMPUS",
    type: "Laboratory",
    code: "01",
    room: "MA_Active_Learning_Classroom_6103",
    day: 4, // Friday
    startTime: 10,
    endTime: 13,
    color: "bg-pink-200",
  },
  {
    id: "5",
    title: "FIT3162_MA_S1",
    location: "CAMPUS",
    type: "Tutorial",
    code: "02",
    room: "MA_NextGen_Four",
    day: 1, // Tuesday
    startTime: 14,
    endTime: 16,
    color: "bg-green-100",
  },
  {
    id: "6",
    title: "FIT3162_MA_S1",
    location: "CAMPUS",
    type: "Seminar",
    code: "01",
    room: "MA_LT_5001",
    day: 0, // Monday
    startTime: 16,
    endTime: 18,
    color: "bg-yellow-100",
  },
  {
    id: "7",
    title: "FIT3155_MA_S1",
    location: "CAMPUS",
    type: "Workshop",
    code: "01",
    room: "MA_LT_4108",
    day: 0, // Monday
    startTime: 19,
    endTime: 21,
    color: "bg-green-100",
  },
]

// GET handler to fetch timetable data
export async function GET(request: Request) {
  // Get query parameters
  const { searchParams } = new URL(request.url)
  const weekStart = searchParams.get("weekStart")

  // In a real app, you would filter classes based on the week start date
  // For now, we'll just return all classes

  return NextResponse.json({ classes })
}

// POST handler to add or update a class
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate the incoming data
    if (!body.title || body.day === undefined || body.startTime === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real app, you would add this to a database
    // For now, we'll just return the data as if it was saved

    // Generate a new ID if this is a new class
    const newClass = {
      id: body.id || `${Date.now()}`,
      ...body,
      // Set a default color based on class type if not provided
      color: body.color || getColorForClassType(body.type),
    }

    return NextResponse.json({ class: newClass, success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}

// Helper function to determine color based on class type
function getColorForClassType(type: string): string {
  switch (type.toLowerCase()) {
    case "tutorial":
      return "bg-green-100"
    case "seminar":
      return "bg-yellow-100"
    case "laboratory":
      return "bg-pink-200"
    case "applied":
      return "bg-blue-100"
    case "workshop":
      return "bg-green-100"
    default:
      return "bg-gray-100"
  }
}

