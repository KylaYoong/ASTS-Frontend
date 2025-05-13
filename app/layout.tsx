import "@/app/globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ASTS",
  description: "Manage academic resources and scheduling",
    // generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

import './globals.css'