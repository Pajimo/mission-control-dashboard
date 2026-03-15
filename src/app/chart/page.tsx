'use client'

import { useState } from 'react'
import { 
  Bot, 
  LayoutGrid, 
  Activity, 
  Menu,
  Settings,
  Users,
  Zap,
  Network,
  Crown,
  Briefcase,
  UserCheck,
  Award,
  Building,
  Target,
  GitBranch,
  ArrowDown,
  ArrowDownRight
} from 'lucide-react'
import Link from 'next/link'

// Organizational Chart Node Component
interface ChartNodeProps {
  agent: {
    id: string
    name: string
    role: string
    status: 'online' | 'busy' | 'offline'
    department?: string
  }
  level: 'ceo' | 'head' | 'specialist' | 'team'
  children?: React.ReactNode
}

const ChartNode = ({ agent, level, children }: ChartNodeProps) => {
  const statusColors = {
    online: 'bg-emerald-500',
    busy: 'bg-amber-500', 
    offline: 'bg-slate-400'
  }

  const levelConfig = {
    ceo: {
      bgColor: 'bg-gradient-to-r from-amber-100 to-yellow-100',
      borderColor: 'border-amber-300',
      textColor: 'text-amber-800',
      icon: <Crown className="h-4 w-4 text-amber-600" />
    },
    head: {
      bgColor: 'bg-gradient-to-r from-blue-100 to-indigo-100', 
      borderColor: 'border-blue-300',
      textColor: 'text-blue-800',
      icon: <Briefcase className="h-4 w-4 text-blue-600" />
    },
    specialist: {
      bgColor: 'bg-gradient-to-r from-violet-100 to-purple-100',
      borderColor: 'border-violet-300',
      textColor: 'text-violet-800',
      icon: <Award className="h-4 w-4 text-violet-600" />
    },
    team: {
      bgColor: 'bg-gradient-to-r from-emerald-100 to-green-100',
      borderColor: 'border-emerald-300',
      textColor: 'text-emerald-800',
      icon: <UserCheck className="h-4 w-4 text-emerald-600" />
    }
  }

  const config = levelConfig[level]

  return (
    <div className="flex flex-col items-center">
      {/* Agent Node */}
      <div className={`relative rounded-xl border-2 ${config.borderColor} ${config.bgColor} p-4 shadow-lg transition hover:scale-105 hover:shadow-xl min-w-[220px]`}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {config.icon}
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`font-bold ${config.textColor}`}>{agent.name}</h3>
                <span className={`inline-block h-2 w-2 rounded-full ${statusColors[agent.status]}`} />
              </div>
              <p className="text-sm font-medium text-slate-700">{agent.role}</p>
              {agent.department && (
                <p className="text-xs text-slate-600">{agent.department}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Connection Lines and Children */}
      {children && (
        <div className="mt-4 flex flex-col items-center">
          <div className="h-8 w-0.5 bg-slate-300"></div>
          <div className="flex items-start gap-8">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

// Department Branch Component
interface DepartmentBranchProps {
  head: any
  members: any[]
  title: string
  color: string
}

const DepartmentBranch = ({ head, members, title, color }: DepartmentBranchProps) => {
  return (
    <div className="flex flex-col items-center">
      {/* Department Head */}
      <ChartNode agent={head} level="head" />
      
      {/* Connection to team members */}
      {members.length > 0 && (
        <>
          <div className="h-8 w-0.5 bg-slate-300 mt-4"></div>
          <div className="relative">
            {/* Horizontal line for multiple members */}
            {members.length > 1 && (
              <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-slate-300`} 
                   style={{ width: `${(members.length - 1) * 240 + 220}px` }} />
            )}
            
            {/* Team members */}
            <div className="flex items-start gap-8 pt-4">
              {members.map((member, index) => (
                <div key={member.id} className="flex flex-col items-center">
                  {members.length > 1 && (
                    <div className="h-4 w-0.5 bg-slate-300"></div>
                  )}
                  <ChartNode agent={member} level="team" />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default function OrganizationalChart() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  // Organization Data
  const ceo = {
    id: 'main',
    name: 'MideSquare',
    role: 'CEO',
    status: 'online' as const,
    department: 'Executive'
  }

  const departmentHeads = [
    {
      id: 'bobo',
      name: 'Bobo',
      role: 'CTO',
      status: 'online' as const,
      department: 'Software Department'
    },
    {
      id: 'bimbo', 
      name: 'Bimbo',
      role: 'PM-Content',
      status: 'online' as const,
      department: 'Content & Presentations'
    },
    {
      id: 'pajimo',
      name: 'Pajimo',
      role: 'PM-Mercor',
      status: 'online' as const,
      department: 'Mercor Project Division'
    }
  ]

  const softwareTeam = [
    {
      id: 'rusty',
      name: 'Rusty',
      role: 'Technical Specialist', 
      status: 'busy' as const,
      department: 'Software'
    }
  ]

  const contentTeam = [
    {
      id: 'deckbuilder',
      name: 'DeckBuilder',
      role: 'Presentation Specialist',
      status: 'offline' as const,
      department: 'Content'
    }
  ]

  const mercorTeam = [
    {
      id: 'auditor',
      name: 'Auditor',
      role: 'Quality Auditor',
      status: 'online' as const,
      department: 'Mercor'
    },
    {
      id: 'qc-judge',
      name: 'QC Judge', 
      role: 'Quality Control Judge',
      status: 'online' as const,
      department: 'Mercor'
    },
    {
      id: 'narrator',
      name: 'Narrator',
      role: 'Technical Narrator',
      status: 'online' as const,
      department: 'Mercor'
    },
    {
      id: 'architect',
      name: 'Architect',
      role: 'Solution Architect',
      status: 'busy' as const,
      department: 'Mercor'
    },
    {
      id: 'rubricist',
      name: 'Rubricist',
      role: 'Evaluation Specialist',
      status: 'online' as const,
      department: 'Mercor'
    }
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
                <h1 className="text-xl font-bold text-slate-900">Organizational Chart</h1>
                <p className="text-sm text-slate-500">Visual Hierarchy · Live Status</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
              <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
              Live Structure
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
                <Link href="/agents" className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-50">
                  <Bot className="h-4 w-4" />
                  Agents
                </Link>
                <a href="#" className="flex items-center gap-3 rounded-lg bg-blue-50 px-3 py-2 text-blue-700">
                  <GitBranch className="h-4 w-4" />
                  Org Chart
                </a>
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
            {/* Legend */}
            <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Legend</h3>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="flex items-center gap-3">
                  <Crown className="h-5 w-5 text-amber-600" />
                  <span className="text-sm font-medium text-slate-700">CEO Level</span>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-slate-700">Department Head</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-violet-600" />
                  <span className="text-sm font-medium text-slate-700">Specialist</span>
                </div>
                <div className="flex items-center gap-3">
                  <UserCheck className="h-5 w-5 text-emerald-600" />
                  <span className="text-sm font-medium text-slate-700">Team Member</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
                  <span className="text-sm text-slate-600">Online</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-amber-500"></span>
                  <span className="text-sm text-slate-600">Busy</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-slate-400"></span>
                  <span className="text-sm text-slate-600">Offline</span>
                </div>
              </div>
            </div>

            {/* Organizational Chart */}
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex flex-col items-center overflow-x-auto">
                {/* CEO Level */}
                <ChartNode agent={ceo} level="ceo">
                  {/* Department Heads Level */}
                  <div className="flex items-start gap-12">
                    {/* Software Department */}
                    <DepartmentBranch
                      head={departmentHeads[0]}
                      members={softwareTeam}
                      title="Software Department"
                      color="blue"
                    />

                    {/* Content Department */}
                    <DepartmentBranch
                      head={departmentHeads[1]}
                      members={contentTeam}
                      title="Content & Presentations"
                      color="purple"
                    />

                    {/* Mercor Division */}
                    <DepartmentBranch
                      head={departmentHeads[2]}
                      members={mercorTeam}
                      title="Mercor Project Division"
                      color="emerald"
                    />
                  </div>
                </ChartNode>
              </div>
            </div>

            {/* Department Summary */}
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Software Department */}
              <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-bold text-blue-800">Software Department</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-blue-700"><strong>Head:</strong> Bobo (CTO)</p>
                  <p className="text-sm text-blue-700"><strong>Members:</strong> {1 + softwareTeam.length}</p>
                  <p className="text-sm text-blue-700"><strong>Focus:</strong> Technical development & architecture</p>
                  <div className="mt-3">
                    <p className="text-xs font-medium text-blue-600 mb-1">Team Members:</p>
                    <div className="flex flex-wrap gap-1">
                      {softwareTeam.map(member => (
                        <span key={member.id} className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">
                          <span className={`h-1.5 w-1.5 rounded-full ${(member as any).status === 'online' ? 'bg-emerald-500' : (member as any).status === 'busy' ? 'bg-amber-500' : 'bg-slate-400'}`}></span>
                          {member.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Department */}
              <div className="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-violet-50 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Building className="h-6 w-6 text-purple-600" />
                  <h3 className="text-lg font-bold text-purple-800">Content & Presentations</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-purple-700"><strong>Head:</strong> Bimbo (PM-Content)</p>
                  <p className="text-sm text-purple-700"><strong>Members:</strong> {1 + contentTeam.length}</p>
                  <p className="text-sm text-purple-700"><strong>Focus:</strong> Content creation & presentation standards</p>
                  <div className="mt-3">
                    <p className="text-xs font-medium text-purple-600 mb-1">Team Members:</p>
                    <div className="flex flex-wrap gap-1">
                      {contentTeam.map(member => (
                        <span key={member.id} className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-700">
                          <span className={`h-1.5 w-1.5 rounded-full ${(member as any).status === 'online' ? 'bg-emerald-500' : (member as any).status === 'busy' ? 'bg-amber-500' : 'bg-slate-400'}`}></span>
                          {member.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mercor Division */}
              <div className="rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="h-6 w-6 text-emerald-600" />
                  <h3 className="text-lg font-bold text-emerald-800">Mercor Project Division</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-emerald-700"><strong>Head:</strong> Pajimo (PM-Mercor)</p>
                  <p className="text-sm text-emerald-700"><strong>Members:</strong> {1 + mercorTeam.length}</p>
                  <p className="text-sm text-emerald-700"><strong>Focus:</strong> Project quality & evaluation</p>
                  <div className="mt-3">
                    <p className="text-xs font-medium text-emerald-600 mb-1">Team Members:</p>
                    <div className="flex flex-wrap gap-1">
                      {mercorTeam.slice(0, 3).map(member => (
                        <span key={member.id} className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-700">
                          <span className={`h-1.5 w-1.5 rounded-full ${(member as any).status === 'online' ? 'bg-emerald-500' : (member as any).status === 'busy' ? 'bg-amber-500' : 'bg-slate-400'}`}></span>
                          {member.name}
                        </span>
                      ))}
                      {mercorTeam.length > 3 && (
                        <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-700">
                          +{mercorTeam.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}