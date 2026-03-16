'use client'

import { useState, useEffect } from 'react'
import { 
  Bot, 
  LayoutGrid, 
  Activity, 
  Timer, 
  Info, 
  ArrowUpRight, 
  Shield,
  Menu,
  Settings,
  Users,
  Zap,
  CheckCircle,
  AlertTriangle,
  Clock,
  Database,
  Network,
  Cpu,
  RefreshCw,
  GitBranch,
  Command,
  Eye,
  Terminal,
  Gauge
} from 'lucide-react'
import Link from 'next/link'

import { fetchDashboardData, type DashboardData } from './lib/api'

const formatNumber = (num: number) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}

const formatRelativeTime = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  
  if (hours > 0) return `${hours}H`
  if (minutes > 0) return `${minutes}M`
  return 'NOW'
}

interface MetricCardProps {
  title: string
  value: string
  secondary?: string
  icon: React.ReactNode
  accent: 'command' | 'operational' | 'critical' | 'intel'
  info?: string
}

const MetricCard = ({ title, value, secondary, icon, accent, info }: MetricCardProps) => {
  const accentStyles: Record<MetricCardProps['accent'], string> = {
    command: 'bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-600',
    operational: 'bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600', 
    critical: 'bg-gradient-to-br from-red-400 via-pink-500 to-purple-600',
    intel: 'bg-gradient-to-br from-blue-400 via-cyan-500 to-indigo-600'
  }

  return (
    <div className="group relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50" 
           style={{
             backgroundImage: `
               linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px),
               linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)
             `,
             backgroundSize: '20px 20px'
           }}>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 p-6 h-full">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Title with accent line */}
            <div className="flex items-center gap-2 mb-3">
              <div className={`h-1 w-8 ${accentStyles[accent]} rounded-full`}></div>
              <h3 className="text-xs font-black uppercase tracking-[0.15em] text-slate-300 font-mono">
                {title}
              </h3>
              {info && (
                <Info className="h-3 w-3 text-slate-500 hover:text-slate-300 transition-colors cursor-help" />
              )}
            </div>
            
            {/* Value */}
            <div className="space-y-1">
              <div className="text-3xl font-black text-white font-mono tracking-tight leading-none">
                {value}
              </div>
              {secondary && (
                <div className="text-xs text-slate-400 font-medium">
                  {secondary}
                </div>
              )}
            </div>
          </div>
          
          {/* Icon */}
          <div className={`w-12 h-12 rounded-lg ${accentStyles[accent]} flex items-center justify-center shadow-lg`}>
            {icon}
          </div>
        </div>
        
        {/* Status Indicator */}
        <div className="mt-4 flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">OPERATIONAL</span>
        </div>
      </div>
      
      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  )
}

interface CommandBlockProps {
  title: string
  badge?: {
    text: string
    tone: 'active' | 'standby' | 'alert' | 'neutral'
  }
  children: React.ReactNode
}

const CommandBlock = ({ title, badge, children }: CommandBlockProps) => {
  const badgeStyles = {
    active: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
    standby: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
    alert: 'bg-red-500/20 text-red-300 border-red-400/30',
    neutral: 'bg-slate-500/20 text-slate-300 border-slate-400/30'
  }

  return (
    <div className="relative overflow-hidden bg-slate-900/60 border border-slate-700/50 backdrop-blur-sm">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50 bg-slate-800/50">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-white uppercase tracking-[0.1em] font-mono">
            {title}
          </h3>
          {badge && (
            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border font-mono ${badgeStyles[badge.tone]}`}>
              {badge.text}
            </span>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        {children}
      </div>
    </div>
  )
}

export default function EnhancedMissionControl() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Fetch data function
  const fetchData = async () => {
    try {
      setIsRefreshing(true)
      const dashboardData = await fetchDashboardData()
      setData(dashboardData)
      setError(null)
      setLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'CONNECTION LOST')
      setLoading(false)
    } finally {
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black"></div>
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `
                 linear-gradient(rgba(148, 163, 184, 0.03) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(148, 163, 184, 0.03) 1px, transparent 1px)
               `,
               backgroundSize: '40px 40px',
               animation: 'grid-move 20s linear infinite'
             }}>
        </div>
        
        <div className="relative text-center">
          <div className="w-16 h-16 mx-auto mb-6">
            <Command className="w-16 h-16 text-amber-400 animate-pulse" />
          </div>
          <h1 className="text-2xl font-black text-white uppercase tracking-[0.2em] font-mono mb-2">
            INITIALIZING MISSION CONTROL
          </h1>
          <div className="text-slate-400 font-mono text-sm tracking-wider">
            ESTABLISHING SECURE CONNECTION...
          </div>
          
          {/* Loading bar */}
          <div className="w-64 h-1 bg-slate-800 rounded-full mx-auto mt-6 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error && !data) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-xl font-black text-red-400 uppercase tracking-wider font-mono mb-2">
            SYSTEM ERROR
          </h1>
          <p className="text-slate-400 font-mono mb-4">{error}</p>
          <button
            onClick={fetchData}
            className="px-6 py-2 bg-red-500 text-white font-mono font-bold uppercase tracking-wider rounded hover:bg-red-600 transition-colors"
          >
            RETRY CONNECTION
          </button>
        </div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black"></div>
      <div className="fixed inset-0" 
           style={{
             backgroundImage: `
               linear-gradient(rgba(148, 163, 184, 0.02) 1px, transparent 1px),
               linear-gradient(90deg, rgba(148, 163, 184, 0.02) 1px, transparent 1px)
             `,
             backgroundSize: '50px 50px'
           }}>
      </div>

      {/* Header Command Bar */}
      <header className="relative z-20 border-b border-slate-800/50 bg-slate-900/80 backdrop-blur-xl">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
              
              {/* Command Identity */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Command className="h-7 w-7 text-slate-900" />
                </div>
                <div>
                  <h1 className="text-xl font-black uppercase tracking-[0.15em] font-mono text-white">
                    MISSION CONTROL
                  </h1>
                  <div className="text-xs text-slate-400 font-mono tracking-wider">
                    OPENCLAW COMMAND INTERFACE • v2.0 • ENHANCED
                  </div>
                </div>
              </div>
            </div>
            
            {/* Control Panel */}
            <div className="flex items-center gap-3">
              <button
                onClick={fetchData}
                disabled={isRefreshing}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-colors"
              >
                <RefreshCw className={`h-3 w-3 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'SYNCING...' : 'REFRESH'}
              </button>
              
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 border border-emerald-400/30 rounded-lg">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-mono font-bold text-emerald-300 uppercase tracking-wider">
                  LIVE FEED ACTIVE
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex relative z-10">
        {/* Command Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-30 w-72 transform border-r border-slate-800/50 bg-slate-900/90 backdrop-blur-xl transition-transform lg:relative lg:translate-x-0`}>
          <nav className="flex h-full flex-col p-6">
            <div className="space-y-2">
              <a href="#" className="flex items-center gap-3 px-4 py-3 bg-amber-500/20 border border-amber-400/30 rounded-lg text-amber-300 font-mono font-bold text-sm uppercase tracking-wider">
                <Eye className="h-4 w-4" />
                OVERVIEW
              </a>
              <Link href="/agents" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-300 font-mono font-medium text-sm uppercase tracking-wider transition-colors">
                <Bot className="h-4 w-4" />
                AGENTS
              </Link>
              <Link href="/chart" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-300 font-mono font-medium text-sm uppercase tracking-wider transition-colors">
                <GitBranch className="h-4 w-4" />
                ORG STRUCTURE
              </Link>
              <button className="flex w-full items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-300 font-mono font-medium text-sm uppercase tracking-wider transition-colors">
                <Users className="h-4 w-4" />
                TEAMS
              </button>
              <button className="flex w-full items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-300 font-mono font-medium text-sm uppercase tracking-wider transition-colors">
                <Activity className="h-4 w-4" />
                OPERATIONS
              </button>
              <button className="flex w-full items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-300 font-mono font-medium text-sm uppercase tracking-wider transition-colors">
                <Terminal className="h-4 w-4" />
                SYSTEM
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Command Center */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8 space-y-8">
            {/* Tactical Metrics */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                title="ACTIVE AGENTS"
                value={formatNumber(data.agents.online)}
                secondary={`${formatNumber(data.agents.total)} DEPLOYED`}
                icon={<Bot className="h-6 w-6 text-slate-900" />}
                accent="command"
              />
              <MetricCard
                title="OPERATIONS"
                value={formatNumber(data.tasks.inProgress)}
                secondary={`${formatNumber(data.tasks.total)} TOTAL`}
                icon={<Gauge className="h-6 w-6 text-slate-900" />}
                accent="operational"
              />
              <MetricCard
                title="ERROR RATE"
                value={`${data.performance.errorRate.toFixed(1)}%`}
                secondary={`${formatNumber(data.tasks.completed)} COMPLETE`}
                icon={<Shield className="h-6 w-6 text-slate-900" />}
                accent="critical"
              />
              <MetricCard
                title="THROUGHPUT"
                value={`${data.performance.completionRate.toFixed(1)}/DAY`}
                secondary="7-DAY AVERAGE"
                icon={<Zap className="h-6 w-6 text-slate-900" />}
                accent="intel"
                info="Based on 7-day performance metrics"
              />
            </div>

            {/* Command Blocks */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
              <CommandBlock
                title="WORKLOAD STATUS"
                badge={{ text: 'OPERATIONAL', tone: 'active' }}
              >
                <div className="space-y-3">
                  {[
                    { label: 'TOTAL OPERATIONS', value: formatNumber(data.tasks.total), status: 'neutral' },
                    { label: 'INBOX', value: formatNumber(data.tasks.inbox), status: 'neutral' },
                    { label: 'IN PROGRESS', value: formatNumber(data.tasks.inProgress), status: data.tasks.inProgress > 0 ? 'active' : 'neutral' },
                    { label: 'UNDER REVIEW', value: formatNumber(data.tasks.review), status: 'neutral' },
                    { label: 'COMPLETED', value: formatNumber(data.tasks.completed), status: 'active' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-slate-700/30 last:border-0">
                      <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">{item.label}</span>
                      <span className={`text-sm font-bold font-mono ${
                        item.status === 'active' ? 'text-emerald-400' : 
                        item.status === 'alert' ? 'text-red-400' : 'text-slate-300'
                      }`}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CommandBlock>

              <CommandBlock
                title="PERFORMANCE METRICS"
                badge={{ text: 'OPTIMAL', tone: 'active' }}
              >
                <div className="space-y-3">
                  {[
                    { label: 'COMPLETED TASKS', value: formatNumber(data.tasks.completed), status: 'active' },
                    { label: 'AVG THROUGHPUT', value: `${data.performance.completionRate.toFixed(1)}/DAY`, status: 'neutral' },
                    { label: 'ERROR RATE', value: `${data.performance.errorRate.toFixed(1)}%`, status: data.performance.errorRate < 2 ? 'active' : 'alert' },
                    { label: 'RESPONSE TIME', value: `${data.performance.averageResponse.toFixed(0)}MS`, status: 'neutral' },
                    { label: 'SYSTEM STATUS', value: 'OPERATIONAL', status: 'active' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-slate-700/30 last:border-0">
                      <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">{item.label}</span>
                      <span className={`text-sm font-bold font-mono ${
                        item.status === 'active' ? 'text-emerald-400' : 
                        item.status === 'alert' ? 'text-red-400' : 'text-slate-300'
                      }`}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CommandBlock>

              <CommandBlock
                title="GATEWAY NETWORK"
                badge={{ text: data.gateways.status === 'operational' ? 'ALL CONNECTED' : 'ISSUES DETECTED', tone: data.gateways.status === 'operational' ? 'active' : 'alert' }}
              >
                <div className="space-y-3">
                  {[
                    { label: 'GATEWAY STATUS', value: data.gateways.status === 'operational' ? 'ALL CONNECTED' : 'DEGRADED', status: data.gateways.status === 'operational' ? 'active' : 'alert' },
                    { label: 'ACTIVE GATEWAYS', value: `${formatNumber(data.gateways.connected)}/${formatNumber(data.gateways.total)}`, status: 'active' },
                    { label: 'NETWORK STATUS', value: 'STABLE', status: 'active' },
                    { label: 'SYSTEM UPTIME', value: data.system.uptime, status: 'active' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-slate-700/30 last:border-0">
                      <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">{item.label}</span>
                      <span className={`text-sm font-bold font-mono ${
                        item.status === 'active' ? 'text-emerald-400' : 
                        item.status === 'alert' ? 'text-red-400' : 'text-slate-300'
                      }`}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CommandBlock>
            </div>
          </div>
        </main>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800;900&display=swap');
        
        .font-mono {
          font-family: 'JetBrains Mono', monospace;
        }
        
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
      `}</style>
    </div>
  )
}