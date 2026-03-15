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
  Crown,
  Briefcase,
  UserCheck,
  GitBranch,
  Award,
  ChevronRight,
  Building,
  Target
} from 'lucide-react'
import Link from 'next/link'

// Agent Structure Data
const organizationalData = {
  ceo: {
    id: 'main',
    name: 'MideSquare', 
    role: 'CEO',
    status: 'online',
    model: 'Claude Sonnet 4',
    description: 'Strategic oversight, final approval, delegation',
    lastActive: new Date(Date.now() - 1000 * 60 * 2),
    tokensUsed: 45230,
    tokensMax: 200000,
    authority: 'Full organizational authority',
    department: 'Executive'
  },
  departmentHeads: [
    {
      id: 'bobo',
      name: 'Bobo',
      role: 'CTO',
      status: 'online',
      model: 'Claude Sonnet 4',
      description: 'Chief Technology Officer - Software Department',
      authority: 'Technical decisions, development oversight',
      department: 'Software Department',
      lastActive: new Date(Date.now() - 1000 * 60 * 5),
      tokensUsed: 28150,
      tokensMax: 200000,
      subordinates: ['rusty', 'dolly']
    },
    {
      id: 'bimbo',
      name: 'Bimbo',
      role: 'PM-Content',
      status: 'online',
      model: 'Claude Sonnet 4',
      description: 'Presentation & Content Creation Manager',
      authority: 'Content strategy, presentation standards',
      department: 'Content & Presentations',
      lastActive: new Date(Date.now() - 1000 * 60 * 8),
      tokensUsed: 19420,
      tokensMax: 200000,
      subordinates: ['deckbuilder']
    },
    {
      id: 'pajimo',
      name: 'Pajimo',
      role: 'PM-Mercor', 
      status: 'online',
      model: 'Claude Sonnet 4',
      description: 'Project Manager & Head of Mercor Project Division',
      authority: 'Full departmental authority, direct CEO reporting',
      department: 'Mercor Project Division',
      lastActive: new Date(Date.now() - 1000 * 60 * 3),
      tokensUsed: 32180,
      tokensMax: 200000,
      subordinates: ['auditor', 'qc-judge', 'narrator', 'architect', 'rubricist']
    }
  ],
  specialists: [
    {
      id: 'rusty',
      name: 'Rusty',
      role: 'Technical Specialist',
      status: 'busy',
      model: 'Claude Sonnet 4',
      description: 'Senior Developer, multi-department technical support',
      department: 'Software Department',
      manager: 'Bobo (CTO)',
      lastActive: new Date(Date.now() - 1000 * 60 * 1),
      tokensUsed: 15680,
      tokensMax: 200000
    }
  ],
  mercorTeam: [
    {
      id: 'auditor',
      name: 'Auditor',
      role: 'Quality Auditor',
      status: 'online',
      model: 'Claude Sonnet 4',
      description: 'Quality assessment and compliance auditing',
      department: 'Mercor Project Division',
      manager: 'Pajimo',
      lastActive: new Date(Date.now() - 1000 * 60 * 12),
      tokensUsed: 8940,
      tokensMax: 200000
    },
    {
      id: 'qc-judge',
      name: 'QC Judge',
      role: 'Quality Control Judge',
      status: 'online', 
      model: 'Claude Sonnet 4',
      description: 'Final quality control assessment',
      department: 'Mercor Project Division',
      manager: 'Pajimo',
      lastActive: new Date(Date.now() - 1000 * 60 * 7),
      tokensUsed: 11230,
      tokensMax: 200000
    },
    {
      id: 'narrator',
      name: 'Narrator',
      role: 'Technical Narrator',
      status: 'online',
      model: 'Claude Sonnet 4',
      description: 'Technical documentation and narrative creation',
      department: 'Mercor Project Division',
      manager: 'Pajimo', 
      lastActive: new Date(Date.now() - 1000 * 60 * 15),
      tokensUsed: 7850,
      tokensMax: 200000
    },
    {
      id: 'architect',
      name: 'Architect',
      role: 'Solution Architect',
      status: 'busy',
      model: 'Claude Sonnet 4',
      description: 'Technical architecture and system design',
      department: 'Mercor Project Division',
      manager: 'Pajimo',
      lastActive: new Date(Date.now() - 1000 * 60 * 4),
      tokensUsed: 18920,
      tokensMax: 200000
    },
    {
      id: 'rubricist',
      name: 'Rubricist',
      role: 'Evaluation Specialist',
      status: 'online',
      model: 'Claude Sonnet 4',
      description: 'Assessment criteria and evaluation frameworks',
      department: 'Mercor Project Division',
      manager: 'Pajimo',
      lastActive: new Date(Date.now() - 1000 * 60 * 9),
      tokensUsed: 9750,
      tokensMax: 200000
    }
  ]
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

const formatNumber = (num: number) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}m`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`
  return num.toString()
}

interface AgentCardProps {
  agent: any
  level: 'ceo' | 'head' | 'specialist' | 'team'
  showReportingLine?: boolean
}

const AgentCard = ({ agent, level, showReportingLine = false }: AgentCardProps) => {
  const statusColors = {
    online: 'bg-emerald-500',
    busy: 'bg-amber-500',
    offline: 'bg-slate-400'
  }

  const levelConfig = {
    ceo: {
      borderColor: 'border-amber-300',
      bgColor: 'bg-gradient-to-r from-amber-50 to-yellow-50',
      icon: <Crown className="h-5 w-5 text-amber-600" />,
      iconBg: 'bg-amber-100'
    },
    head: {
      borderColor: 'border-blue-300',
      bgColor: 'bg-gradient-to-r from-blue-50 to-indigo-50',
      icon: <Briefcase className="h-5 w-5 text-blue-600" />,
      iconBg: 'bg-blue-100'
    },
    specialist: {
      borderColor: 'border-violet-300',
      bgColor: 'bg-gradient-to-r from-violet-50 to-purple-50',
      icon: <Award className="h-5 w-5 text-violet-600" />,
      iconBg: 'bg-violet-100'
    },
    team: {
      borderColor: 'border-emerald-300',
      bgColor: 'bg-gradient-to-r from-emerald-50 to-green-50',
      icon: <UserCheck className="h-5 w-5 text-emerald-600" />,
      iconBg: 'bg-emerald-100'
    }
  }

  const config = levelConfig[level]

  return (
    <div className={`rounded-xl border-2 ${config.borderColor} ${config.bgColor} p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg`}>
      {showReportingLine && agent.manager && (
        <div className="mb-4 flex items-center gap-2 text-sm text-slate-600">
          <ChevronRight className="h-4 w-4" />
          <span>Reports to: <strong>{agent.manager}</strong></span>
        </div>
      )}
      
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className={`${config.iconBg} rounded-lg p-3`}>
            {config.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-lg font-bold text-slate-900">{agent.name}</h3>
              <span className={`inline-block h-2.5 w-2.5 rounded-full ${statusColors[agent.status as keyof typeof statusColors] || 'bg-slate-400'}`} />
            </div>
            <p className="text-sm font-medium text-slate-700 mb-1">{agent.role}</p>
            <p className="text-sm text-slate-600 mb-3">{agent.description}</p>
            
            {agent.department && (
              <div className="flex items-center gap-1 mb-3">
                <Building className="h-4 w-4 text-slate-500" />
                <span className="text-sm text-slate-600">{agent.department}</span>
              </div>
            )}
            
            {agent.authority && (
              <div className="rounded-lg bg-white/50 border border-white/20 p-3 mb-3">
                <p className="text-xs font-medium text-slate-700 mb-1">AUTHORITY:</p>
                <p className="text-xs text-slate-600">{agent.authority}</p>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-500">Model:</p>
                <p className="font-medium text-slate-700">{agent.model}</p>
              </div>
              <div>
                <p className="text-slate-500">Last Active:</p>
                <p className="font-medium text-slate-700">{formatRelativeTime(agent.lastActive)}</p>
              </div>
              <div>
                <p className="text-slate-500">Token Usage:</p>
                <p className="font-medium text-slate-700">
                  {formatNumber(agent.tokensUsed)}/{formatNumber(agent.tokensMax)} 
                  <span className="text-slate-500 ml-1">
                    ({Math.round((agent.tokensUsed / agent.tokensMax) * 100)}%)
                  </span>
                </p>
              </div>
              <div>
                <p className="text-slate-500">Status:</p>
                <p className={`font-medium capitalize ${
                  agent.status === 'online' ? 'text-emerald-600' :
                  agent.status === 'busy' ? 'text-amber-600' : 'text-slate-600'
                }`}>
                  {agent.status}
                </p>
              </div>
            </div>
            
            {agent.subordinates && agent.subordinates.length > 0 && (
              <div className="mt-4 pt-4 border-t border-white/30">
                <p className="text-xs font-medium text-slate-700 mb-2">MANAGES:</p>
                <div className="flex flex-wrap gap-2">
                  {agent.subordinates.map((sub: string) => (
                    <span key={sub} className="inline-flex items-center gap-1 rounded-full bg-white/60 px-2 py-1 text-xs font-medium text-slate-700">
                      <Users className="h-3 w-3" />
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AgentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'hierarchy' | 'list'>('hierarchy')

  const allAgents = [
    organizationalData.ceo,
    ...organizationalData.departmentHeads,
    ...organizationalData.specialists,
    ...organizationalData.mercorTeam
  ]

  const stats = {
    total: allAgents.length,
    online: allAgents.filter(agent => agent.status === 'online').length,
    busy: allAgents.filter(agent => agent.status === 'busy').length,
    departments: 4
  }

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
                <h1 className="text-xl font-bold text-slate-900">Agent Directory</h1>
                <p className="text-sm text-slate-500">Organizational Structure · Live Status</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-slate-200 bg-white p-1">
              <button
                onClick={() => setViewMode('hierarchy')}
                className={`rounded px-3 py-1 text-sm font-medium transition ${
                  viewMode === 'hierarchy' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <GitBranch className="mr-1 inline h-4 w-4" />
                Hierarchy
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`rounded px-3 py-1 text-sm font-medium transition ${
                  viewMode === 'list' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <LayoutGrid className="mr-1 inline h-4 w-4" />
                List
              </button>
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
                <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-50">
                  <LayoutGrid className="h-4 w-4" />
                  Dashboard
                </Link>
                <a href="#" className="flex items-center gap-3 rounded-lg bg-blue-50 px-3 py-2 text-blue-700">
                  <Bot className="h-4 w-4" />
                  Agents
                </a>
                <Link href="/chart" className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-50 transition">
                  <GitBranch className="h-4 w-4" />
                  Org Chart
                </Link>
                <button 
                  onClick={() => setViewMode(viewMode === 'hierarchy' ? 'list' : 'hierarchy')}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-50 transition"
                >
                  <Users className="h-4 w-4" />
                  {viewMode === 'hierarchy' ? 'Switch to List' : 'Switch to Hierarchy'}
                </button>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-50 transition"
                >
                  <Activity className="h-4 w-4" />
                  Back to Top
                </button>
                <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-50 transition">
                  <Network className="h-4 w-4" />
                  System Status
                </Link>
                <button 
                  onClick={() => window.location.reload()}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-50 transition"
                >
                  <Settings className="h-4 w-4" />
                  Refresh View
                </button>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            {/* Stats */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4 mb-8">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Agents</p>
                    <p className="text-4xl font-bold text-slate-900 mt-2">{stats.total}</p>
                  </div>
                  <div className="rounded-lg bg-blue-50 p-3">
                    <Bot className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>
              
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Online</p>
                    <p className="text-4xl font-bold text-emerald-600 mt-2">{stats.online}</p>
                  </div>
                  <div className="rounded-lg bg-emerald-50 p-3">
                    <CheckCircle className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Busy</p>
                    <p className="text-4xl font-bold text-amber-600 mt-2">{stats.busy}</p>
                  </div>
                  <div className="rounded-lg bg-amber-50 p-3">
                    <Clock className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Departments</p>
                    <p className="text-4xl font-bold text-violet-600 mt-2">{stats.departments}</p>
                  </div>
                  <div className="rounded-lg bg-violet-50 p-3">
                    <Building className="h-6 w-6 text-violet-600" />
                  </div>
                </div>
              </div>
            </div>

            {viewMode === 'hierarchy' ? (
              <div className="space-y-8">
                {/* CEO Level */}
                <div>
                  <div className="mb-6 flex items-center gap-3">
                    <Crown className="h-6 w-6 text-amber-600" />
                    <h2 className="text-2xl font-bold text-slate-900">Executive Level</h2>
                  </div>
                  <AgentCard agent={organizationalData.ceo} level="ceo" />
                </div>

                {/* Department Heads */}
                <div>
                  <div className="mb-6 flex items-center gap-3">
                    <Briefcase className="h-6 w-6 text-blue-600" />
                    <h2 className="text-2xl font-bold text-slate-900">Department Heads</h2>
                  </div>
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                    {organizationalData.departmentHeads.map((agent) => (
                      <AgentCard key={agent.id} agent={agent} level="head" />
                    ))}
                  </div>
                </div>

                {/* Mercor Project Division */}
                <div>
                  <div className="mb-6 flex items-center gap-3">
                    <Target className="h-6 w-6 text-emerald-600" />
                    <h2 className="text-2xl font-bold text-slate-900">Mercor Project Division</h2>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                      Under Pajimo
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                    {organizationalData.mercorTeam.map((agent) => (
                      <AgentCard key={agent.id} agent={agent} level="team" showReportingLine />
                    ))}
                  </div>
                </div>

                {/* Specialists */}
                <div>
                  <div className="mb-6 flex items-center gap-3">
                    <Award className="h-6 w-6 text-violet-600" />
                    <h2 className="text-2xl font-bold text-slate-900">Technical Specialists</h2>
                  </div>
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                    {organizationalData.specialists.map((agent) => (
                      <AgentCard key={agent.id} agent={agent} level="specialist" showReportingLine />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">All Agents</h2>
                  <p className="text-slate-600">Complete directory of organizational agents</p>
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {allAgents.map((agent) => {
                    const level = 
                      agent.id === 'main' ? 'ceo' :
                      organizationalData.departmentHeads.some(h => h.id === agent.id) ? 'head' :
                      organizationalData.mercorTeam.some(m => m.id === agent.id) ? 'team' : 'specialist'
                    
                    return (
                      <AgentCard 
                        key={agent.id} 
                        agent={agent} 
                        level={level} 
                        showReportingLine={level !== 'ceo' && level !== 'head'}
                      />
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}