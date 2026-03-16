'use client'

import { ReactNode } from 'react'
import { Info } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string
  secondary?: string
  icon: ReactNode
  accent: 'command' | 'operational' | 'critical' | 'intel'
  info?: string
}

const EnhancedMetricCard = ({ title, value, secondary, icon, accent, info }: MetricCardProps) => {
  const accentStyles: Record<MetricCardProps['accent'], string> = {
    command: 'bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-600',
    operational: 'bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600', 
    critical: 'bg-gradient-to-br from-red-400 via-pink-500 to-purple-600',
    intel: 'bg-gradient-to-br from-blue-400 via-cyan-500 to-indigo-600'
  }

  return (
    <div className="group relative overflow-hidden rounded-lg">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm border border-slate-700/50" 
           style={{
             backgroundImage: `
               linear-gradient(rgba(148, 163, 184, 0.03) 1px, transparent 1px),
               linear-gradient(90deg, rgba(148, 163, 184, 0.03) 1px, transparent 1px)
             `,
             backgroundSize: '20px 20px'
           }}>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 p-6 h-full">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Enhanced Title */}
            <div className="flex items-center gap-2 mb-4">
              <div className={`h-1 w-8 ${accentStyles[accent]} rounded-full`}></div>
              <h3 className="text-xs font-black uppercase tracking-[0.15em] text-slate-300 font-mono">
                {title}
              </h3>
              {info && (
                <Info className="h-3 w-3 text-slate-500 hover:text-slate-300 transition-colors cursor-help" />
              )}
            </div>
            
            {/* Enhanced Value Display */}
            <div className="space-y-2">
              <div className="text-4xl font-black text-white font-mono tracking-tight leading-none bg-gradient-to-r from-white to-slate-300 bg-clip-text">
                {value}
              </div>
              {secondary && (
                <div className="text-xs text-slate-400 font-medium font-mono tracking-wide">
                  {secondary}
                </div>
              )}
            </div>
          </div>
          
          {/* Enhanced Icon */}
          <div className={`w-14 h-14 rounded-xl ${accentStyles[accent]} flex items-center justify-center shadow-2xl shadow-black/50`}>
            {icon}
          </div>
        </div>
        
        {/* Enhanced Status Indicator */}
        <div className="mt-6 flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-[10px] text-slate-400 uppercase font-mono tracking-[0.15em]">OPERATIONAL</span>
        </div>
      </div>
      
      {/* Enhanced Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
      
      {/* Corner Accent */}
      <div className={`absolute top-0 right-0 w-8 h-8 ${accentStyles[accent]} opacity-20 transform rotate-45 translate-x-4 -translate-y-4`}></div>
    </div>
  )
}

export default EnhancedMetricCard