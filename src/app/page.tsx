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
  GitBranch
} from 'lucide-react'
import Link from 'next/link'

import { fetchDashboardData, type DashboardData } from './lib/api'

const formatNumber = (num: number) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}m`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`
  return num.toString()
}

const formatRelativeTime = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  
  if (hours > 0) return `${hours}h ago`
  if (minutes > 0) return `${minutes}m ago`
  return 'just now'
}

interface MetricCardProps {
  title: string
  value: string
  secondary?: string
  icon: React.ReactNode
  accent: 'blue' | 'green' | 'violet' | 'emerald'
  info?: string
}

const MetricCard = ({ title, value, secondary, icon, accent, info }: MetricCardProps) => {
  const iconColors: Record<MetricCardProps['accent'], string> = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-emerald-50 text-emerald-600',
    violet: 'bg-violet-50 text-violet-600',
    emerald: 'bg-green-50 text-green-600'
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {title}
            </p>
            {info && (
              <span title={info}>
                <Info className="h-3.5 w-3.5 text-slate-400" />
              </span>
            )}
          </div>
          <div className="mt-2 flex items-end gap-2">
            <p className="font-heading text-4xl font-bold text-slate-900">{value}</p>
            {secondary && (
              <p className="pb-1 text-xs text-slate-500">{secondary}</p>
            )}
          </div>
        </div>
        <div className={`rounded-lg p-2 ${iconColors[accent]}`}>
          {icon}
        </div>
      </div>
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
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        {badge && (
          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${
            badge.tone === 'online' ? 'bg-emerald-100 text-emerald-700' :
            badge.tone === 'offline' ? 'bg-rose-100 text-rose-700' :
            'bg-slate-200 text-slate-700'
          }`}>
            {badge.text}
          </span>
        )}
      </div>
      <div className="divide-y divide-slate-100 rounded-lg border border-slate-200 bg-white">
        {rows.map((row, index: number) => (
          <div key={index} className="flex items-start justify-between gap-3 px-3 py-2">
            <span className="min-w-0 text-sm text-slate-500">{row.label}</span>
            <span className={`max-w-[65%] break-words text-right text-sm font-medium leading-5 ${
              row.tone === 'success' ? 'text-emerald-700' :
              row.tone === 'warning' ? 'text-amber-700' :
              row.tone === 'danger' ? 'text-rose-700' :
              'text-slate-800'
            }`}>
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function MissionControlDashboard() {
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading Mission Control...</p>
        </div>
      </div>
    )
  }

  if (error && !data) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto" />
          <p className="mt-4 text-red-600">Error: {error}</p>
          <button
            onClick={fetchData}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!data) return null

  const workloadRows: InfoBlockProps['rows'] = [
    { label: 'Total work items', value: formatNumber(data.tasks.total) },
    { label: 'Inbox', value: formatNumber(data.tasks.inbox) },
    { label: 'In progress', value: formatNumber(data.tasks.inProgress), tone: data.tasks.inProgress > 0 ? 'warning' as const : 'default' as const },
    { label: 'In review', value: formatNumber(data.tasks.review) },
    { label: 'Completed', value: formatNumber(data.tasks.completed), tone: 'success' as const }
  ]

  const performanceRows: InfoBlockProps['rows'] = [
    { label: 'Completed tasks', value: formatNumber(data.tasks.completed) },
    { label: 'Average throughput', value: `${data.performance.completionRate.toFixed(1)}/day` },
    { label: 'Error rate', value: `${data.performance.errorRate.toFixed(1)}%`, tone: data.performance.errorRate < 2 ? 'success' as const : 'warning' as const },
    { label: 'Avg response time', value: `${data.performance.averageResponse.toFixed(0)}ms` },
    { label: 'System health', value: 'Operational', tone: 'success' as const }
  ]

  const gatewayRows: InfoBlockProps['rows'] = [
    { label: 'Gateway status', value: data.gateways.status === 'operational' ? 'All connected' : 'Issues detected', tone: data.gateways.status === 'operational' ? 'success' as const : 'warning' as const },
    { label: 'Configured gateways', value: formatNumber(data.gateways.total) },
    { label: 'Connected gateways', value: formatNumber(data.gateways.connected), tone: 'success' as const },
    { label: 'Unavailable gateways', value: String(data.gateways.total - data.gateways.connected), tone: data.gateways.total === data.gateways.connected ? 'success' as const : 'warning' as const },
    { label: 'System uptime', value: data.system.uptime, tone: 'success' as const }
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 p-2">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">OpenClaw Mission Control</h1>
                <p className="text-sm text-slate-500">Live Dynamic Data · v2.0</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchData}
              disabled={isRefreshing}
              className="flex items-center gap-1 rounded-lg px-3 py-1 text-sm text-slate-600 hover:bg-slate-100"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>
            <div className="flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
              <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
              Live Data Active
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 transform border-r border-slate-200 bg-white transition-transform lg:relative lg:translate-x-0`}>
          <nav className="flex h-full flex-col">
            <div className="p-4">
              <div className="space-y-1">
                <a href="#" className="flex items-center gap-3 rounded-lg bg-blue-50 px-3 py-2 text-blue-700">
                  <LayoutGrid className="h-4 w-4" />
                  Dashboard
                </a>
                <Link href="/agents" className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-50">
                  <Bot className="h-4 w-4" />
                  Agents
                </Link>
                <Link href="/chart" className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-50">
                  <GitBranch className="h-4 w-4" />
                  Org Chart
                </Link>
                <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-50">
                  <Users className="h-4 w-4" />
                  Teams
                </a>
                <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-50">
                  <Activity className="h-4 w-4" />
                  Activity
                </a>
                <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-50">
                  <Network className="h-4 w-4" />
                  Gateways
                </a>
                <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-50">
                  <Settings className="h-4 w-4" />
                  Settings
                </a>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            {/* Top Metrics */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                title="Online Agents"
                value={formatNumber(data.agents.online)}
                secondary={`${formatNumber(data.agents.total)} total`}
                icon={<Bot className="h-4 w-4" />}
                accent="blue"
              />
              <MetricCard
                title="Tasks In Progress"
                value={formatNumber(data.tasks.inProgress)}
                secondary={`${formatNumber(data.tasks.total)} total`}
                icon={<LayoutGrid className="h-4 w-4" />}
                accent="green"
              />
              <MetricCard
                title="Error Rate"
                value={`${data.performance.errorRate.toFixed(1)}%`}
                secondary={`${formatNumber(data.tasks.completed)} completed`}
                icon={<Activity className="h-4 w-4" />}
                accent="violet"
              />
              <MetricCard
                title="Completion Speed"
                value={`${data.performance.completionRate.toFixed(1)}/day`}
                secondary="Last 7 days"
                icon={<Timer className="h-4 w-4" />}
                accent="emerald"
                info="Based on last 7 days"
              />
            </div>

            {/* Info Blocks */}
            <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
              <InfoBlock
                title="Workload"
                rows={workloadRows}
              />
              <InfoBlock
                title="Performance"
                rows={performanceRows}
              />
              <InfoBlock
                title="Gateway Health"
                badge={{ text: data.gateways.status === 'operational' ? 'All connected' : 'Issues', tone: data.gateways.status === 'operational' ? 'online' : 'offline' }}
                rows={gatewayRows}
              />
            </div>

            {/* Sessions, Activity, and Projects */}
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Active Sessions */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-slate-900">Active Sessions</h3>
                  <span className="text-xs text-slate-500">{data.sessions.length}</span>
                </div>
                <div className="max-h-[310px] space-y-3 overflow-y-auto">
                  {data.sessions.map((session) => (
                    <div key={session.id} className="rounded-lg border border-slate-200 bg-white p-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-slate-900">
                            <span className={`mr-2 inline-block h-2 w-2 rounded-full ${session.isMain ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                            {session.title}
                          </p>
                          <p className="mt-0.5 truncate text-xs text-slate-500">
                            {session.channel} · {session.model}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-medium text-slate-700">
                            {formatNumber(session.tokensUsed)}/{formatNumber(session.tokensMax)} ({Math.round((session.tokensUsed / session.tokensMax) * 100)}%)
                          </p>
                          <p className="text-[11px] text-slate-500">
                            {formatRelativeTime(session.lastActive)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
                  <button className="inline-flex items-center gap-1 text-xs text-slate-500 transition hover:text-slate-700">
                    View all
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="max-h-[310px] space-y-3 overflow-y-auto">
                  {data.activity.map((event) => (
                    <div key={event.id} className="rounded-lg border border-slate-200 bg-white p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-slate-900">
                            {event.message}
                          </p>
                          <p className="mt-0.5 text-xs uppercase tracking-wider text-slate-500">
                            {event.agent ? `${event.agent} · ${event.type}` : event.type}
                          </p>
                        </div>
                        <div className="text-right text-[11px] text-slate-500">
                          <p>{formatRelativeTime(event.timestamp)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Status */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-slate-900">Active Projects</h3>
                  <span className="text-xs text-slate-500">{data.projects.length}</span>
                </div>
                <div className="max-h-[310px] space-y-3 overflow-y-auto">
                  {data.projects.map((project) => (
                    <div key={project.name} className="rounded-lg border border-slate-200 bg-white p-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-slate-900">
                            {project.name}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-500">
                            {project.status} · {project.progress}% complete
                          </p>
                        </div>
                        <div className="text-right">
                          <div className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
                            project.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                            project.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                            'bg-orange-100 text-orange-700'
                          }`}>
                            {project.status}
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1">
                            {formatRelativeTime(project.lastUpdated)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Status Bar */}
            <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                    <span className="text-sm font-medium text-slate-900">System Status: {data.system.gatewayStatus}</span>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <Cpu className="h-4 w-4" />
                      <span>CPU: {data.system.cpuUsage}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Database className="h-4 w-4" />
                      <span>Memory: {data.system.memoryUsage}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Network className="h-4 w-4" />
                      <span>Network: {data.system.networkStatus}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right text-xs text-slate-500">
                  <p>Last updated: {data.lastUpdated.toLocaleTimeString()}</p>
                  <p>Uptime: {data.system.uptime}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}