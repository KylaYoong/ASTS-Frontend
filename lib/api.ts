import type { ClassEvent } from "@/app/api/timetable/route"

// Function to fetch timetable data
export async function fetchTimetableData(weekStart?: string) {
  const params = new URLSearchParams()
  if (weekStart) {
    params.append("weekStart", weekStart)
  }

  const response = await fetch(`/api/timetable?${params.toString()}`)

  if (!response.ok) {
    throw new Error("Failed to fetch timetable data")
  }

  return response.json()
}

// Function to add a new class
export async function addClass(classData: Omit<ClassEvent, "id">) {
  const response = await fetch("/api/timetable", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(classData),
  })

  if (!response.ok) {
    throw new Error("Failed to add class")
  }

  return response.json()
}

// Function to update an existing class
export async function updateClass(id: string, classData: Partial<ClassEvent>) {
  const response = await fetch(`/api/timetable/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(classData),
  })

  if (!response.ok) {
    throw new Error("Failed to update class")
  }

  return response.json()
}

// Function to delete a class
export async function deleteClass(id: string) {
  const response = await fetch(`/api/timetable/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Failed to delete class")
  }

  return response.json()
}

