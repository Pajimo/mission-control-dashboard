import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cortex Command Center | Mission Control Dashboard',
  description: 'Advanced AI Agent Command & Control Interface - Real-time mission management, tactical operations, and system monitoring for elite AI agent deployment.',
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