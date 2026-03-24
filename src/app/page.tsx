import GoogleStitchDashboard from './google-stitch-dashboard'

<<<<<<< HEAD
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
  Layers,
  Radio,
  Target,
  Radar,
  Satellite,
  Power,
  HardDrive,
  Monitor,
  Wifi,
  Server,
  X,
  Home,
  Map,
  Flag,
  Search,
  Bell,
  User,
  LogOut
} from 'lucide-react'
import Link from 'next/link'

// Mock data for Cortex Command interface
const generateMockData = () => ({
  agents: {
    total: 47,
    online: 42,
    active: 28,
    standby: 14,
    offline: 5
  },
  missions: {
    total: 156,
    active: 23,
    pending: 8,
    completed: 125,
    failed: 0
  },
  systems: {
    cpu: 34,
    memory: 62,
    network: 98,
    storage: 45
  },
  performance: {
    throughput: 847.3,
    latency: 12.5,
    uptime: 99.8,
    efficiency: 94.2
  },
  lastUpdated: new Date()
})

const formatNumber = (num: number) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}

interface MetricCardProps {
  title: string
  value: string
  subtitle?: string
  icon: React.ReactNode
  variant: 'primary' | 'secondary' | 'accent' | 'success'
  trend?: {
    value: number
    label: string
  }
}

const MetricCard = ({ title, value, subtitle, icon, variant, trend }: MetricCardProps) => {
  const variants = {
    primary: 'border-cortex-primary/30 bg-gradient-to-br from-cortex-bg-secondary to-cortex-bg-tertiary',
    secondary: 'border-cortex-secondary/30 bg-gradient-to-br from-cortex-bg-secondary to-cortex-bg-tertiary',
    accent: 'border-cortex-accent/30 bg-gradient-to-br from-cortex-bg-secondary to-cortex-bg-tertiary',
    success: 'border-cortex-success/30 bg-gradient-to-br from-cortex-bg-secondary to-cortex-bg-tertiary'
  }

  const iconVariants = {
    primary: 'text-cortex-primary bg-cortex-primary/10',
    secondary: 'text-cortex-secondary bg-cortex-secondary/10',
    accent: 'text-cortex-accent bg-cortex-accent/10',
    success: 'text-cortex-success bg-cortex-success/10'
  }

  return (
    <div className={`cortex-card p-6 group hover:scale-105 transition-all duration-300 ${variants[variant]}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${iconVariants[variant]}`}>
          {icon}
        </div>
        {trend && (
          <div className={`text-xs font-medium ${trend.value >= 0 ? 'text-cortex-success' : 'text-cortex-danger'}`}>
            {trend.value >= 0 ? '+' : ''}{trend.value}% {trend.label}
          </div>
        )}
      </div>
      <div className="cortex-label mb-1">{title}</div>
      <div className="cortex-metric-value text-2xl">{value}</div>
      {subtitle && (
        <div className="cortex-body-small text-cortex-text-tertiary mt-1">{subtitle}</div>
      )}
    </div>
  )
}

const SystemStatus = () => {
  const [data, setData] = useState(generateMockData())
  
  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateMockData())
    }, 30000) // Update every 30 seconds
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <MetricCard
        title="AGENTS ONLINE"
        value={`${data.agents.online}/${data.agents.total}`}
        subtitle={`${data.agents.active} active missions`}
        icon={<Bot className="h-6 w-6" />}
        variant="primary"
        trend={{ value: 2.3, label: '24h' }}
      />
      <MetricCard
        title="ACTIVE MISSIONS"
        value={data.missions.active.toString()}
        subtitle={`${data.missions.pending} pending`}
        icon={<Target className="h-6 w-6" />}
        variant="secondary"
        trend={{ value: 8.1, label: '1h' }}
      />
      <MetricCard
        title="SYSTEM HEALTH"
        value={`${data.performance.uptime}%`}
        subtitle="All systems operational"
        icon={<Activity className="h-6 w-6" />}
        variant="success"
        trend={{ value: 0.2, label: '1h' }}
      />
      <MetricCard
        title="THROUGHPUT"
        value={`${data.performance.throughput}/s`}
        subtitle={`${data.performance.latency}ms latency`}
        icon={<Zap className="h-6 w-6" />}
        variant="accent"
        trend={{ value: 12.7, label: '15m' }}
      />
    </div>
  )
}

const QuickActions = () => {
  const actions = [
    { icon: <Target className="h-4 w-4" />, label: 'New Mission', href: '/missions/new' },
    { icon: <Bot className="h-4 w-4" />, label: 'Deploy Agent', href: '/agents/deploy' },
    { icon: <Terminal className="h-4 w-4" />, label: 'Command Console', href: '/console' },
    { icon: <BarChart3 className="h-4 w-4" />, label: 'System Report', href: '/reports' },
  ]

  return (
    <div className="cortex-card p-6">
      <h3 className="cortex-heading-2 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className="cortex-btn cortex-btn-outline flex items-center gap-2 p-3 text-sm"
          >
            {action.icon}
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function CortexCommandCenter() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [data, setData] = useState(generateMockData())

  useEffect(() => {
    // Auto-refresh data every 30 seconds
    const interval = setInterval(() => {
      setData(generateMockData())
    }, 30000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-cortex-bg-primary cortex-grid-bg">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* CORTEX COMMAND SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-80 cortex-sidebar transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header */}
        <div className="cortex-sidebar-header">
          <div className="cortex-sidebar-logo">
            <div className="cortex-sidebar-logo-icon">
              <Command className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="cortex-sidebar-brand-text">CORTEX COMMAND</div>
              <div className="cortex-sidebar-subtitle">Mission Control Center</div>
            </div>
          </div>
          
          {/* Command Status Indicator */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="cortex-status-dot cortex-status-online cortex-pulse"></div>
              <span className="cortex-body-small text-cortex-success">SYSTEM ONLINE</span>
            </div>
            <div className="cortex-body-small text-cortex-text-tertiary">
              {data.lastUpdated.toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="cortex-nav flex-1">
          {/* Primary Navigation */}
          <div className="cortex-nav-section">
            <div className="cortex-nav-section-title">Command Center</div>
            <Link href="/" className="cortex-nav-item active">
              <Home className="cortex-nav-item-icon" />
              <span className="cortex-nav-item-text">Dashboard</span>
            </Link>
            <Link href="/missions" className="cortex-nav-item">
              <Target className="cortex-nav-item-icon" />
              <span className="cortex-nav-item-text">Missions</span>
              <span className="cortex-nav-item-badge">{data.missions.active}</span>
            </Link>
            <Link href="/agents" className="cortex-nav-item">
              <Bot className="cortex-nav-item-icon" />
              <span className="cortex-nav-item-text">AI Agents</span>
              <span className="cortex-nav-item-badge">{data.agents.online}</span>
            </Link>
            <Link href="/radar" className="cortex-nav-item">
              <Radar className="cortex-nav-item-icon" />
              <span className="cortex-nav-item-text">Tactical Radar</span>
            </Link>
          </div>

          {/* Operations */}
          <div className="cortex-nav-section">
            <div className="cortex-nav-section-title">Operations</div>
            <Link href="/teams" className="cortex-nav-item">
              <Users className="cortex-nav-item-icon" />
              <span className="cortex-nav-item-text">Strike Teams</span>
            </Link>
            <Link href="/intelligence" className="cortex-nav-item">
              <Search className="cortex-nav-item-icon" />
              <span className="cortex-nav-item-text">Intelligence</span>
            </Link>
            <Link href="/communications" className="cortex-nav-item">
              <Radio className="cortex-nav-item-icon" />
              <span className="cortex-nav-item-text">Communications</span>
            </Link>
            <Link href="/mapping" className="cortex-nav-item">
              <Map className="cortex-nav-item-icon" />
              <span className="cortex-nav-item-text">Tactical Map</span>
            </Link>
          </div>

          {/* Systems */}
          <div className="cortex-nav-section">
            <div className="cortex-nav-section-title">Systems</div>
            <Link href="/network" className="cortex-nav-item">
              <Network className="cortex-nav-item-icon" />
              <span className="cortex-nav-item-text">Network Grid</span>
            </Link>
            <Link href="/servers" className="cortex-nav-item">
              <Server className="cortex-nav-item-icon" />
              <span className="cortex-nav-item-text">Server Farm</span>
            </Link>
            <Link href="/monitoring" className="cortex-nav-item">
              <Monitor className="cortex-nav-item-icon" />
              <span className="cortex-nav-item-text">System Monitor</span>
            </Link>
            <Link href="/console" className="cortex-nav-item">
              <Terminal className="cortex-nav-item-icon" />
              <span className="cortex-nav-item-text">Console</span>
            </Link>
          </div>

          {/* Analytics */}
          <div className="cortex-nav-section">
            <div className="cortex-nav-section-title">Analytics</div>
            <Link href="/analytics" className="cortex-nav-item">
              <BarChart3 className="cortex-nav-item-icon" />
              <span className="cortex-nav-item-text">Performance</span>
            </Link>
            <Link href="/reports" className="cortex-nav-item">
              <Flag className="cortex-nav-item-icon" />
              <span className="cortex-nav-item-text">Battle Reports</span>
            </Link>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="cortex-sidebar-footer">
          <div className="cortex-user-profile">
            <div className="cortex-user-avatar">
              <User className="h-4 w-4" />
            </div>
            <div className="cortex-user-info">
              <div className="cortex-user-name">Commander MideSquare</div>
              <div className="cortex-user-role">Chief Executive Officer</div>
            </div>
            <button className="cortex-btn-ghost p-2">
              <Settings className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <button className="cortex-btn cortex-btn-outline cortex-btn text-xs">
              <Bell className="h-3 w-3" />
              Alerts
            </button>
            <button className="cortex-btn cortex-btn-ghost cortex-btn text-xs">
              <LogOut className="h-3 w-3" />
              Exit
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="lg:ml-80">
        {/* Command Header */}
        <header className="bg-cortex-bg-secondary/80 backdrop-blur-xl border-b border-cortex-border sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="cortex-btn cortex-btn-ghost p-2 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <h1 className="cortex-heading-brand">MISSION CONTROL</h1>
                <p className="cortex-body-small text-cortex-text-tertiary">
                  Real-time Command & Control Interface
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-cortex-primary" />
                  <span className="text-cortex-text-secondary">CPU: {data.systems.cpu}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-cortex-secondary" />
                  <span className="text-cortex-text-secondary">MEM: {data.systems.memory}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wifi className="h-4 w-4 text-cortex-success" />
                  <span className="text-cortex-text-secondary">NET: {data.systems.network}%</span>
                </div>
              </div>
              
              <button className="cortex-btn cortex-btn-primary">
                <RefreshCw className="h-4 w-4" />
                Sync Data
              </button>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="p-6 space-y-6">
          {/* System Metrics */}
          <SystemStatus />

          {/* Command Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Mission Status */}
            <div className="cortex-card p-6 xl:col-span-2">
              <h3 className="cortex-heading-2 mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-cortex-primary" />
                Active Missions
              </h3>
              <div className="space-y-3">
                {[
                  { id: 'M-001', name: 'Operation Thunderstrike', status: 'active', progress: 75, agent: 'Alpha-7' },
                  { id: 'M-002', name: 'Data Extraction Phoenix', status: 'pending', progress: 0, agent: 'Beta-3' },
                  { id: 'M-003', name: 'Network Infiltration', status: 'active', progress: 43, agent: 'Gamma-1' },
                  { id: 'M-004', name: 'Tactical Reconnaissance', status: 'completed', progress: 100, agent: 'Delta-9' },
                ].map((mission) => (
                  <div key={mission.id} className="flex items-center justify-between p-4 bg-cortex-bg-tertiary rounded-lg border border-cortex-border">
                    <div className="flex items-center gap-3">
                      <div className={`cortex-status-dot ${
                        mission.status === 'active' ? 'cortex-status-info cortex-pulse' :
                        mission.status === 'completed' ? 'cortex-status-online' :
                        'cortex-status-warning'
                      }`}></div>
                      <div>
                        <div className="font-medium text-cortex-text-primary">{mission.name}</div>
                        <div className="cortex-body-small text-cortex-text-tertiary">{mission.id} • Agent {mission.agent}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="cortex-body-small text-cortex-text-secondary">{mission.progress}%</div>
                      <div className="w-20 h-2 bg-cortex-bg-primary rounded-full mt-1">
                        <div 
                          className={`h-full rounded-full transition-all duration-300 ${
                            mission.status === 'completed' ? 'bg-cortex-success' :
                            mission.status === 'active' ? 'bg-cortex-primary' :
                            'bg-cortex-warning'
                          }`}
                          style={{ width: `${mission.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <QuickActions />
          </div>

          {/* Network Status Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <div className="cortex-card p-6 text-center">
              <div className="cortex-sidebar-logo-icon mx-auto mb-4">
                <Server className="h-6 w-6" />
              </div>
              <div className="cortex-heading-3 text-cortex-primary">47</div>
              <div className="cortex-label">Active Servers</div>
            </div>
            
            <div className="cortex-card p-6 text-center">
              <div className="cortex-sidebar-logo-icon mx-auto mb-4 bg-cortex-secondary/20">
                <Network className="h-6 w-6 text-cortex-secondary" />
              </div>
              <div className="cortex-heading-3 text-cortex-secondary">12</div>
              <div className="cortex-label">Gateway Nodes</div>
            </div>
            
            <div className="cortex-card p-6 text-center">
              <div className="cortex-sidebar-logo-icon mx-auto mb-4 bg-cortex-accent/20">
                <Satellite className="h-6 w-6 text-cortex-accent" />
              </div>
              <div className="cortex-heading-3 text-cortex-accent">8</div>
              <div className="cortex-label">Satellite Links</div>
            </div>
            
            <div className="cortex-card p-6 text-center">
              <div className="cortex-sidebar-logo-icon mx-auto mb-4 bg-cortex-success/20">
                <Shield className="h-6 w-6 text-cortex-success" />
              </div>
              <div className="cortex-heading-3 text-cortex-success">100%</div>
              <div className="cortex-label">Security Status</div>
            </div>
          </div>

          {/* Command Terminal Simulation */}
          <div className="cortex-card p-6">
            <h3 className="cortex-heading-2 mb-4 flex items-center gap-2">
              <Terminal className="h-5 w-5 text-cortex-accent" />
              Command Terminal
            </h3>
            <div className="bg-cortex-bg-primary rounded-lg p-4 font-mono text-sm">
              <div className="text-cortex-success">[CORTEX@COMMAND]$ system status --all</div>
              <div className="text-cortex-text-secondary mt-2">
                ✓ All agents online and responsive<br/>
                ✓ Network grid operational at 98% capacity<br/>
                ✓ Mission pipeline processing normally<br/>
                ✓ No security breaches detected<br/>
              </div>
              <div className="text-cortex-primary mt-2">[CORTEX@COMMAND]$ █</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
=======
export default function MissionControlPage() {
  return <GoogleStitchDashboard />
>>>>>>> 0a2c7e5f (Deploy Google Stitch Design System - URGENT CEO REQUEST)
}