"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Bell, Grid, LayoutGrid, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type React from "react"

// Type Definitions
interface NavItemProps {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
  active?: boolean
}

function NavItem({ href, icon, children, active }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn("flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg", active && "bg-gray-100")}
    >
      {icon}
      <span>{children}</span>
    </Link>
  )
}

function FolderItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
        />
      </svg>
      <span>{children}</span>
    </Link>
  )
}

export default function FileManager() {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 border-r bg-white">
        <div className="p-4">
          <h1 className="text-xl font-bold">ASTS</h1>
        </div>
        <nav className="space-y-1 px-2">
          <NavItem href="/" icon={<LayoutGrid className="h-4 w-4" />} active>
            Dashboard
          </NavItem>

          <div className="py-3">
            <div className="px-3 text-xs font-medium uppercase text-gray-500">Input Data</div>
            <div className="mt-2">
              <FolderItem href="/venue">Venue</FolderItem>
              <FolderItem href="/unit">Unit</FolderItem>
              <FolderItem href="/unit-offering">Unit Offering</FolderItem>
              <FolderItem href="/position">Position</FolderItem>
              <FolderItem href="/student">Student</FolderItem>
              <FolderItem href="/educator">Educator</FolderItem>
              <FolderItem href="/educator-availability">Educator Availability</FolderItem>
            </div>
          </div>

          <div className="py-3">
            <div className="px-3 text-xs font-medium uppercase text-gray-500">Query</div>
            <div className="mt-2">
              <FolderItem href="/query/educator">Educator</FolderItem>
              <FolderItem href="/query/student">Student</FolderItem>
              <FolderItem href="/query/unit">Unit</FolderItem>
              <FolderItem href="/query/venue">Venue</FolderItem>
            </div>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1">
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
      </div>
    </div>
  )
}

