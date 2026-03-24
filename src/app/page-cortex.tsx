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
  Command,
  Eye,
  Terminal,
  Gauge,
  BarChart3,
  Globe,
  Layers
} from 'lucide-react'
import Link from 'next/link'

import { fetchDashboardData, type DashboardData } from './lib/api'
import { RufloAgentGrid } from '@/components/RufloAgentGrid'
import { SwarmCoordination } from '@/components/SwarmCoordination'
import { PerformanceAnalytics } from '@/components/PerformanceAnalytics'

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
  accent: 'primary' | 'secondary' | 'tertiary' | 'success'
  info?: string
}

const MetricCard = ({ title, value, secondary, icon, accent, info }: MetricCardProps) => {
  const accentStyles: Record<MetricCardProps['accent'], string> = {
    primary: 'cortex-gradient-primary',
    secondary: 'cortex-gradient-secondary', 
    tertiary: 'cortex-gradient-success',
    success: 'cortex-gradient-success'
  }

  const iconStyles: Record<MetricCardProps['accent'], string> = {
    primary: 'bg-cortex-primary-100 text-cortex-primary-600 border-cortex-primary-200',
    secondary: 'bg-cortex-secondary-100 text-cortex-secondary-700 border-cortex-secondary-200',
    tertiary: 'bg-cortex-tertiary-100 text-cortex-tertiary-700 border-cortex-tertiary-200',
    success: 'bg-cortex-tertiary-100 text-cortex-tertiary-700 border-cortex-tertiary-200'
  }

  return (
    <div className="group relative overflow-hidden cortex-card cortex-card-interactive">
      {/* Command Center Grid Pattern */}
      <div className="absolute inset-0 bg-cortex-neutral-950/30 backdrop-blur-sm border-cortex-neutral-700/50" 
           style={{
             backgroundImage: `
               linear-gradient(rgba(41, 98, 255, 0.1) 1px, transparent 1px),
               linear-gradient(90deg, rgba(41, 98, 255, 0.1) 1px, transparent 1px)
             `,
             backgroundSize: '20px 20px'
           }}>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 p-6 h-full">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Cortex Command Title */}
            <div className="flex items-center gap-3 mb-3">
              <div className={`h-1 w-8 ${accentStyles[accent]} rounded-full`}></div>
              <h3 className="cortex-caption text-cortex-neutral-500 flex items-center gap-1">
                {title}
                {info && (
                  <Info className="h-3 w-3 text-cortex-neutral-400 hover:text-cortex-primary-500 transition-colors cursor-help" />
                )}
              </h3>
            </div>
            
            {/* Cortex Values */}
            <div className="space-y-1">
              <div className="cortex-heading-2 text-cortex-neutral-900 group-hover:text-cortex-primary-600 transition-colors">
                {value}
              </div>
              {secondary && (
                <div className="cortex-body-small text-cortex-neutral-500">
                  {secondary}
                </div>
              )}
            </div>
          </div>
          
          {/* Cortex Icon */}
          <div className={`relative p-3 rounded-xl border ${iconStyles[accent]} group-hover:scale-110 transition-transform`}>
            <div className="relative z-10">{icon}</div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
          </div>
        </div>
        
        {/* Cortex Progress Bar */}
        <div className="mt-4">
          <div className="h-1 bg-cortex-neutral-200 rounded-full overflow-hidden">
            <div className={`h-full ${accentStyles[accent]} rounded-full opacity-60 group-hover:opacity-100 transition-opacity`} 
                 style={{ width: '75%' }}></div>
          </div>
        </div>
      </div>
      
      {/* Cortex Glow Effect */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity rounded-xl ${accentStyles[accent]} blur-xl`}></div>
    </div>
  )
}

interface InfoBlockProps {
  title: string
  badge?: {
    text: string
    tone: 'online' | 'offline' | 'neutral'
  }
  rows: Array<{
    label: string
    value: string
    tone?: 'success' | 'warning' | 'danger' | 'default'
  }>
}

const InfoBlock = ({ title, badge, rows }: InfoBlockProps) => {
  const badgeStyles = {
    online: 'cortex-badge-success',
    offline: 'cortex-badge-danger', 
    neutral: 'cortex-badge-neutral'
  }

  const rowStyles = {
    success: 'text-cortex-success',
    warning: 'text-cortex-warning',
    danger: 'text-cortex-danger',
    default: 'text-cortex-neutral-800'
  }

  return (
    <div className="cortex-card p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="cortex-heading-4 text-cortex-neutral-900">{title}</h3>
        {badge && (
          <span className={`cortex-badge ${badgeStyles[badge.tone]}`}>
            {badge.text}
          </span>
        )}
      </div>
      <div className="cortex-card border-cortex-neutral-200 bg-surface-primary overflow-hidden">
        {rows.map((row, index: number) => (
          <div key={index} className={`flex items-start justify-between gap-3 px-4 py-3 ${
            index !== rows.length - 1 ? 'border-b border-cortex-neutral-100' : ''
          }`}>
            <span className="cortex-body-small text-cortex-neutral-500 min-w-0 flex-1">
              {row.label}
            </span>
            <span className={`cortex-label text-right max-w-[65%] break-words ${
              rowStyles[row.tone || 'default']
            }`}>
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CortexCommandDashboard() {
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
      setError(err instanceof Error ? err.message : 'Failed to fetch data')
      setLoading(false)
    } finally {
      setIsRefreshing(false)
    }
  }

  // Initial load and auto-refresh every 30 seconds
  useEffect(() => {
    fetchData()
    
    const interval = setInterval(fetchData, 30000) // 30 seconds as requested
    
    return () => clearInterval(interval)
  }, [])

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-cortex-neutral-950 flex items-center justify-center">
        <div className="text-center cortex-fade-in">
          <div className="cortex-gradient-primary rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-8 animate-pulse">
            <Command className="h-10 w-10 text-white" />
          </div>
          <h1 className="cortex-heading-3 text-white mb-2">CORTEX COMMAND</h1>
          <p className="cortex-body-large text-cortex-neutral-300 mb-4">Initializing Command Center</p>
          <div className="flex items-center justify-center gap-2 cortex-body-small text-cortex-neutral-400">
            <div className="cortex-status-dot cortex-status-info animate-pulse"></div>
            Establishing secure connections...
          </div>
        </div>
      </div>
    )
  }

  if (error && !data) {
    return (
      <div className="min-h-screen bg-cortex-neutral-950 flex items-center justify-center">
        <div className="text-center cortex-fade-in">
          <div className="bg-cortex-danger rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-8">
            <AlertTriangle className="h-10 w-10 text-white" />
          </div>
          <h1 className="cortex-heading-3 text-cortex-danger mb-2">COMMAND CENTER ERROR</h1>
          <p className="cortex-body text-cortex-neutral-300 mb-6">{error}</p>
          <button onClick={fetchData} className="cortex-btn-primary cortex-btn-lg">
            Retry Connection
          </button>
        </div>
      </div>
    )
  }

  if (!data) return null

  const workloadRows: InfoBlockProps['rows'] = [
    { label: 'Total Operations', value: formatNumber(data.tasks.total) },
    { label: 'Inbox', value: formatNumber(data.tasks.inbox) },
    { label: 'Active Missions', value: formatNumber(data.tasks.inProgress), tone: data.tasks.inProgress > 0 ? 'warning' as const : 'default' as const },
    { label: 'Under Review', value: formatNumber(data.tasks.review) },
    { label: 'Completed', value: formatNumber(data.tasks.completed), tone: 'success' as const }
  ]

  const performanceRows: InfoBlockProps['rows'] = [
    { label: 'Completed Operations', value: formatNumber(data.tasks.completed) },
    { label: 'Command Throughput', value: `${data.performance.completionRate.toFixed(1)}/day` },
    { label: 'System Reliability', value: `${(100 - data.performance.errorRate).toFixed(1)}%`, tone: data.performance.errorRate < 2 ? 'success' as const : 'warning' as const },
    { label: 'Response Time', value: `${data.performance.averageResponse.toFixed(0)}ms` },
    { label: 'Command Status', value: 'Operational', tone: 'success' as const }
  ]

  const gatewayRows: InfoBlockProps['rows'] = [
    { label: 'Network Status', value: data.gateways.status === 'operational' ? 'All Connected' : 'Issues Detected', tone: data.gateways.status === 'operational' ? 'success' as const : 'warning' as const },
    { label: 'Active Gateways', value: formatNumber(data.gateways.total) },
    { label: 'Online Nodes', value: formatNumber(data.gateways.connected), tone: 'success' as const },
    { label: 'Offline Nodes', value: String(data.gateways.total - data.gateways.connected), tone: data.gateways.total === data.gateways.connected ? 'success' as const : 'warning' as const },
    { label: 'System Uptime', value: data.system.uptime, tone: 'success' as const }
  ]

  return (
    <div className="min-h-screen bg-cortex-neutral-950" style={{
      backgroundImage: `
        radial-gradient(circle at 25% 25%, rgba(41, 98, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(255, 179, 0, 0.1) 0%, transparent 50%),
        linear-gradient(135deg, rgba(0, 230, 118, 0.05) 0%, transparent 100%)
      `
    }}>
      {/* Cortex Command Header */}
      <header className="relative z-50 bg-cortex-neutral-900/80 backdrop-blur-xl border-b border-cortex-neutral-700/50 sticky top-0">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="cortex-btn-ghost p-2 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="cortex-gradient-primary rounded-xl p-3 shadow-cortex-glow-primary">
                  <Command className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-cortex-success rounded-full border-2 border-cortex-neutral-950 animate-pulse"></div>
              </div>
              <div>
                <h1 className="cortex-heading-3 text-white">
                  CORTEX COMMAND CENTER
                </h1>
                <div className="cortex-body-small text-cortex-neutral-300 flex items-center gap-2">
                  <div className="cortex-status-dot cortex-status-online animate-pulse"></div>
                  Live Dynamic Data · Professional Command Interface
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={isRefreshing}
              className="cortex-btn-outlined cortex-btn-sm"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing' : 'Refresh'}
            </button>
            <div className="cortex-badge-success flex items-center gap-2">
              <div className="cortex-status-dot cortex-status-online animate-pulse"></div>
              Command Active
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Cortex Navigation Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          fixed inset-y-0 left-0 z-40 w-64 transform border-r border-cortex-neutral-700/50 
          bg-cortex-neutral-900/90 backdrop-blur-xl transition-transform lg:relative lg:translate-x-0 shadow-cortex-xl`}>
          <nav className="flex h-full flex-col">
            <div className="p-4 border-b border-cortex-neutral-700/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="cortex-gradient-primary rounded-lg p-2">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="cortex-label text-white">Command Center</p>
                  <p className="cortex-caption text-cortex-neutral-400">Professional Interface</p>
                </div>
              </div>
              
              <div className="space-y-1">
                <a href="#" className="cortex-nav-item active">
                  <LayoutGrid className="h-4 w-4" />
                  Dashboard
                </a>
                <Link href="/agents" className="cortex-nav-item">
                  <Bot className="h-4 w-4" />
                  AI Agents
                </Link>
                <Link href="/teams" className="cortex-nav-item">
                  <Users className="h-4 w-4" />
                  Teams
                </Link>
                <a href="#" className="cortex-nav-item">
                  <BarChart3 className="h-4 w-4" />
                  Analytics
                </a>
                <a href="#" className="cortex-nav-item">
                  <Network className="h-4 w-4" />
                  Gateways
                </a>
                <a href="#" className="cortex-nav-item">
                  <Terminal className="h-4 w-4" />
                  Console
                </a>
                <Link href="/system" className="cortex-nav-item">
                  <Settings className="h-4 w-4" />
                  System
                </Link>
              </div>
            </div>
            
            {/* Command Status */}
            <div className="mt-auto p-4 border-t border-cortex-neutral-700/50">
              <div className="cortex-card p-3 bg-cortex-neutral-800/50 border-cortex-neutral-700">
                <div className="flex items-center gap-2 mb-2">
                  <div className="cortex-status-dot cortex-status-online animate-pulse"></div>
                  <p className="cortex-caption text-cortex-neutral-300">System Status</p>
                </div>
                <p className="cortex-body-small text-cortex-success font-medium">All Systems Operational</p>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Cortex Interface */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            {/* Cortex Metrics Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 mb-8">
              <MetricCard
                title="AGENTS ONLINE"
                value={formatNumber(data.agents.online)}
                secondary={`${formatNumber(data.agents.total)} total agents`}
                icon={<Bot className="h-5 w-5" />}
                accent="primary"
              />
              <MetricCard
                title="ACTIVE MISSIONS"
                value={formatNumber(data.tasks.inProgress)}
                secondary={`${formatNumber(data.tasks.total)} total operations`}
                icon={<Layers className="h-5 w-5" />}
                accent="secondary"
              />
              <MetricCard
                title="SYSTEM HEALTH"
                value={`${(100 - data.performance.errorRate).toFixed(1)}%`}
                secondary={`${formatNumber(data.tasks.completed)} completed`}
                icon={<Activity className="h-5 w-5" />}
                accent="success"
              />
              <MetricCard
                title="THROUGHPUT"
                value={`${data.performance.completionRate.toFixed(1)}/day`}
                secondary="Command efficiency"
                icon={<Timer className="h-5 w-5" />}
                accent="tertiary"
                info="Based on last 7 days performance"
              />
            </div>

            {/* Cortex Information Blocks */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 mb-8">
              <InfoBlock
                title="Mission Control Operations"
                rows={workloadRows}
              />
              <InfoBlock
                title="Command Performance"
                rows={performanceRows}
              />
              <InfoBlock
                title="Gateway Network"
                badge={{ 
                  text: data.gateways.status === 'operational' ? 'All Connected' : 'Issues Detected', 
                  tone: data.gateways.status === 'operational' ? 'online' : 'offline' 
                }}
                rows={gatewayRows}
              />
            </div>

            {/* Advanced Components */}
            <div className="space-y-8">
              {/* Ruflo Agent Grid */}
              <div className="cortex-card p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="cortex-heading-4 text-cortex-neutral-900 flex items-center gap-2">
                    <Bot className="h-5 w-5 text-cortex-primary-600" />
                    Agent Command Grid
                  </h3>
                  <Link href="/agents" className="cortex-btn-outlined cortex-btn-sm">
                    <Eye className="h-4 w-4" />
                    View All
                  </Link>
                </div>
                <RufloAgentGrid />
              </div>

              {/* Performance Analytics */}
              <div className="cortex-card p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="cortex-heading-4 text-cortex-neutral-900 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-cortex-secondary-600" />
                    Command Analytics
                  </h3>
                  <button className="cortex-btn-ghost cortex-btn-sm">
                    <ArrowUpRight className="h-4 w-4" />
                    Full Report
                  </button>
                </div>
                <PerformanceAnalytics />
              </div>

              {/* Swarm Coordination */}
              <div className="cortex-card p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="cortex-heading-4 text-cortex-neutral-900 flex items-center gap-2">
                    <Network className="h-5 w-5 text-cortex-tertiary-600" />
                    Swarm Coordination
                  </h3>
                  <div className="cortex-badge-primary">
                    {data.sessions.length} Active
                  </div>
                </div>
                <SwarmCoordination />
              </div>
            </div>

            {/* Cortex Command Status Bar */}
            <div className="mt-8 cortex-card p-6 bg-cortex-neutral-900/50 border-cortex-neutral-700">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="cortex-status-dot cortex-status-online animate-pulse"></div>
                    <span className="cortex-label text-white">
                      CORTEX COMMAND STATUS: <span className="text-cortex-success">{data.system.gatewayStatus.toUpperCase()}</span>
                    </span>
                  </div>
                  <div className="hidden md:flex items-center gap-6 cortex-body-small text-cortex-neutral-400">
                    <div className="flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-cortex-primary-500" />
                      <span>CPU: <span className="font-medium text-white">{data.system.cpuUsage}%</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-cortex-secondary-600" />
                      <span>MEM: <span className="font-medium text-white">{data.system.memoryUsage}%</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Network className="h-4 w-4 text-cortex-tertiary-600" />
                      <span>NET: <span className="font-medium text-cortex-success">{data.system.networkStatus.toUpperCase()}</span></span>
                    </div>
                  </div>
                </div>
                <div className="text-right cortex-body-small text-cortex-neutral-400">
                  <p>Last Update: <span className="font-medium text-white">{data.lastUpdated.toLocaleTimeString()}</span></p>
                  <p>Uptime: <span className="font-medium text-cortex-success">{data.system.uptime}</span></p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}