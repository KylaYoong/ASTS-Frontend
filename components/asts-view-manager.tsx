"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Grid, Plus, Search } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { Sidebar } from "./ui/sidebar"
import type { ActiveView } from "./ui/sidebar"
import { Dashboard } from "./dashboard/dashboard"
import {VenueForm} from "./forms/venue-form"
import {VenueTypeForm} from "./forms/venue-type-form"
import { CourseForm } from "./forms/course-form"
import { UnitForm } from "./forms/unit-form"
import { UnitOfferingForm } from "./forms/unit-offering-form"
import { UnitOfferingClassDetailsForm } from "./forms/unit-offering-class-form"
import { PositionForm } from "./forms/position-form"
import { EducatorForm } from "./forms/educator-form"
import { EducatorAvailabilityForm } from "./forms/educator-availability-form"
import { EducatorUnitOfferingForm } from "./forms/educator-unit-offering-form"
import { CourseUnitOfferingForm } from "./forms/course-unit-offering-form"
import { GeneralTimetable } from "./query/general-timetable"
import { EducatorTimetable } from "./query/educator-timetable"
import { GenerateTimetable } from "./query/generate-timetable"

function FileCard({ title, metadata, thumbnail }: { title: string; metadata: string; thumbnail: string }) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white">
      <div className="aspect-[4/3] overflow-hidden">
        <Image
          src={thumbnail || "/placeholder.svg"}
          alt={title}
          width={400}
          height={300}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{metadata}</p>
      </div>
    </div>
  )
}

export function ASTSViewManager() {
  const [activeView, setActiveView] = useState<ActiveView>("dashboard")

  // Determine if we should show the timetable view
  // const showTimetable = activeView === "general"

  // // For debugging
  // console.log("Current activeView:", activeView)
  // console.log("Should show timetable:", showTimetable)

  const renderFormContent = () => {
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
      case "educator":
        return <EducatorForm />
      case "educator-availability":
        return <EducatorAvailabilityForm />
      case "educator-unit-offering":
        return <EducatorUnitOfferingForm />
      case "course-unit-offering":
        return <CourseUnitOfferingForm/>
      case "select-year-semester":
        return <GeneralTimetable />
      case "general-timetable":
        return <GeneralTimetable />
      case "educator-timetable":
        return <EducatorTimetable />
      case "generate-timetable":
        return <GenerateTimetable/>
      
      default:
        return <div>Content for {activeView}</div>
    }
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar activeView={activeView} setActiveView={setActiveView} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <div className="p-6">
          {renderFormContent()}
        </div>
      </div>
    </div>
  )
}