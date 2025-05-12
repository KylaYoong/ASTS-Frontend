
"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Grid, Search } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { Sidebar } from "./ui/sidebar"
import {VenueForm} from "./forms/venue-form"
import  {VenueTypeForm}  from "./forms/venue-type-form"
import { UnitForm } from "./forms/unit-form"
import { UnitOfferingForm } from "./forms/unit-offering-form"
import { PositionForm } from "./forms/position-form"
import { StudentForm } from "./forms/student-form"
import { EducatorForm } from "./forms/educator-form"
import { EducatorAvailabilityForm } from "./forms/educator-availability-form"
import {EducatorUnitOfferingForm} from "./forms/educator-unit-offering-form"
import { Dashboard } from "./dashboard/dashboard"
import { CourseForm } from "./forms/course-form"
import { UnitOfferingClassDetailsForm } from "./forms/unit-offering-class-form"
import { CourseUnitOfferingForm } from "./forms/course-unit-offering-form"

type ActiveView =
  | "dashboard"
  | "venue"
  | "venue-type"
  | "course"
  | "unit"
  | "unit-offering"
  | "unit-offering-class-details"
  | "position"
  | "student"
  | "educator"
  | "educator-availability"
  | "course-unit-offering" 
  | "educator-unit-offering"
  | "course-unit-offering" 
  | "general"

export function FileManager() {
  const [activeView, setActiveView] = useState<ActiveView>("dashboard")

  const renderMainContent = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />
      case "venue":
        return <VenueForm />
      case "venue-type":
        return <VenueTypeForm />
      case "course":
        return <CourseForm />
      case "unit":
        return <UnitForm />
      case "unit-offering":
        return <UnitOfferingForm />
      case "unit-offering-class-details":
        return <UnitOfferingClassDetailsForm />
      case "position":
        return <PositionForm />
      case "student":
        return <StudentForm />
      case "educator":
        return <EducatorForm />
      case "educator-availability":
        return <EducatorAvailabilityForm />
      case "educator-unit-offering":
        return <EducatorUnitOfferingForm />
      case "course-unit-offering": 
        return <CourseUnitOfferingForm />
      default:
        return <div className="p-8">Content for {activeView}</div>
    }
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar activeView={activeView} setActiveView={setActiveView} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between border-b px-6 py-4">
          <div className="w-96">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input type="search" placeholder="Search files..." className="pl-9" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <div className="h-8 w-8 overflow-hidden rounded-full">
              <Image
                src="/placeholder.svg"
                alt="Avatar"
                width={32}
                height={32}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto">{renderMainContent()}</div>
      </div>
    </div>
  )
}