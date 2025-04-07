"use client"

import { cn } from "@/lib/utils"
import { LayoutGrid } from "lucide-react"
import type React from "react"

type ActiveView =
  | "dashboard"
  | "venue"
  | "unit"
  | "unit-offering"
  | "position"
  | "student"
  | "educator"
  | "educator-availability"
  | "general" // Added general for timetable view

interface SidebarProps {
  activeView: ActiveView | string
  setActiveView: (view: ActiveView | string) => void
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
            <FolderItem onClick={() => setActiveView("venue")} active={activeView === "venue"}>
              Venue
            </FolderItem>
            <FolderItem onClick={() => setActiveView("unit")} active={activeView === "unit"}>
              Unit
            </FolderItem>
            <FolderItem onClick={() => setActiveView("unit-offering")} active={activeView === "unit-offering"}>
              Unit Offering
            </FolderItem>
            <FolderItem onClick={() => setActiveView("position")} active={activeView === "position"}>
              Position
            </FolderItem>
            <FolderItem onClick={() => setActiveView("student")} active={activeView === "student"}>
              Student
            </FolderItem>
            <FolderItem onClick={() => setActiveView("educator")} active={activeView === "educator"}>
              Educator
            </FolderItem>
            <FolderItem
              onClick={() => setActiveView("educator-availability")}
              active={activeView === "educator-availability"}
            >
              Educator Availability
            </FolderItem>
          </div>
        </div>

        <div className="py-3">
          <div className="px-3 text-xs font-medium uppercase text-gray-500">QUERY</div>
          <div className="mt-2">
            <FolderItem onClick={() => setActiveView("general")} active={activeView === "general"}>
              General
            </FolderItem>
            <FolderItem onClick={() => setActiveView("educator-query")} active={activeView === "educator-query"}>
              Educator
            </FolderItem>
            <FolderItem onClick={() => setActiveView("student-query")} active={activeView === "student-query"}>
              Student
            </FolderItem>
            <FolderItem onClick={() => setActiveView("unit-query")} active={activeView === "unit-query"}>
              Unit
            </FolderItem>
            <FolderItem onClick={() => setActiveView("venue-query")} active={activeView === "venue-query"}>
              Venue
            </FolderItem>
          </div>
        </div>
      </nav>
    </div>
  )
}

