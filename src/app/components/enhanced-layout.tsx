'use client'

import { ReactNode } from 'react'

interface EnhancedLayoutProps {
  children: ReactNode
}

export default function EnhancedLayout({ children }: EnhancedLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Enhanced Background System */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black"></div>
      <div 
        className="fixed inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148, 163, 184, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Accent Lines */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-600 opacity-60"></div>
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-cyan-500 to-indigo-600 opacity-40"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}