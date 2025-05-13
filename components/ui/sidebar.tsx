"use client"

import { cn } from "@/lib/utils"
import { LayoutGrid } from "lucide-react"
import type React from "react"

export type ActiveView =
  | "dashboard"
  | "venue"
  | "venue-type"
  | "course"
  | "course-unit-offering"
  | "unit"
  | "unit-offering"
  | "unit-offering-class-details"
  | "position"
  | "student"
  | "educator"
  | "educator-availability"
  | "educator-unit-offering"
  | "select-year-semester"
  | "general-timetable"
  | "educator-timetable"
  | "student-timetable"
  | "generate-timetable"

interface SidebarProps {
  activeView: ActiveView
  setActiveView: (view: ActiveView) => void
}

// Type Definitions
interface NavItemProps {
  icon: React.ReactNode
  children: React.ReactNode
  active?: boolean
  onClick?: () => void
}

function NavItem({ icon, children, active, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg w-full text-left",
        active && "bg-gray-100",
      )}
    >
      {icon}
      <span>{children}</span>
    </button>
  )
}

interface FolderItemProps {
  children: React.ReactNode
  onClick?: () => void
  active?: boolean
}

function FolderItem({ children, onClick, active }: FolderItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-3 py-2 text-sm text-gray-700 w-full text-left",
        active ? "bg-gray-100" : "hover:bg-gray-50",
      )}
    >
      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
        />
      </svg>
      <span>{children}</span>
    </button>
  )
}

export function Sidebar({ activeView, setActiveView }: SidebarProps) {
  return (
    <div className="w-64 border-r bg-white">
      <div className="p-4">
        <h1 className="text-xl font-bold">ASTS</h1>
      </div>
      <nav className="space-y-1 px-2">
        <NavItem
          icon={<LayoutGrid className="h-4 w-4" />}
          active={activeView === "dashboard"}
          onClick={() => setActiveView("dashboard")}
        >
          Dashboard
        </NavItem>

        <div className="py-3">
          <div className="px-3 text-xs font-medium uppercase text-gray-500">INPUT DATA</div>
          <div className="mt-2">
          <FolderItem 
            onClick={() => setActiveView("course")} 
            active={activeView === "course"}
          >
            Course
          </FolderItem>
          <FolderItem 
            onClick={() => setActiveView("unit")} 
            active={activeView === "unit"}
          >
            Unit
          </FolderItem>
          <FolderItem 
            onClick={() => setActiveView("position")} 
            active={activeView === "position"}
          >
            Position
          </FolderItem>
          <FolderItem 
            onClick={() => setActiveView("venue-type")} 
            active={activeView === "venue-type"}
          >
            Venue Type
          </FolderItem>
          <FolderItem 
            onClick={() => setActiveView("venue")} 
            active={activeView === "venue"}
          >
            Venue
          </FolderItem>
          <FolderItem 
            onClick={() => setActiveView("educator")} 
            active={activeView === "educator"}
          >
            Educator
          </FolderItem>
          <FolderItem
            onClick={() => setActiveView("educator-availability")}
            active={activeView === "educator-availability"}
          >
            Educator Availability
          </FolderItem>

          <FolderItem onClick={() => setActiveView("student")} active={activeView === "student"}>
            Student
          </FolderItem>
          <FolderItem 
            onClick={() => setActiveView("unit-offering")} 
            active={activeView === "unit-offering"}
          >
            Unit Offering
          </FolderItem>
          <FolderItem 
            onClick={() => setActiveView("unit-offering-class-details")} 
            active={activeView === "unit-offering-class-details"}
          >
            Unit Offering Class Details
          </FolderItem>
          <FolderItem 
            onClick={() => setActiveView("educator-unit-offering")} 
            active={activeView === "educator-unit-offering"}
          >
            Educator Unit Offering
          </FolderItem>
          <FolderItem 
            onClick ={() => setActiveView("course-unit-offering")} 
            active = {activeView === "course-unit-offering"}
          >  
            Course Unit Offering
          </FolderItem>
          

          </div>
        </div>

        <div className="py-3">
          <div className="px-3 text-xs font-medium uppercase text-gray-500">Query</div>
          <div className="mt-2">

          <FolderItem 
            onClick ={() => setActiveView("generate-timetable")} 
            active = {activeView === "generate-timetable"}
          >  
            Generate Timetable
          </FolderItem>
            
          <FolderItem 
            onClick ={() => setActiveView("general-timetable")} 
            active = {activeView === "general-timetable"}
          >  
            General Timetable
          </FolderItem>

          <FolderItem 
            onClick ={() => setActiveView("educator-timetable")} 
            active = {activeView === "educator-timetable"}
          >  
            Educator Timetable
          </FolderItem>

          </div>
        </div>
      </nav>
    </div>
  )
}

