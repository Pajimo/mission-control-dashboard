'use client'

import { useState } from 'react'
import { UnifiedLayout } from '@/components/layout/UnifiedLayout'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { designTokens, componentTokens } from '@/lib/design-tokens'
import { 
  Crown,
  Briefcase,
  Award,
  UserCheck,
  Building,
  Target,
  Users,
  Activity,
  Zap
} from 'lucide-react'

// Helper function for status colors
const getStatusColorForChart = (status: string) => {
  const colors = {
    online: 'text-emerald-400 bg-emerald-400',
    busy: 'text-yellow-400 bg-yellow-400',
    offline: 'text-slate-500 bg-slate-500'
  };
  return colors[status as keyof typeof colors] || colors.offline;
};

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
  const statusColor = getStatusColorForChart(agent.status)

  const levelConfig = {
    ceo: {
      bgColor: `${designTokens.colors.background.card} border-4 ${designTokens.colors.border.accent}`,
      textColor: designTokens.colors.accent.primary.split(' ')[0],
      icon: <Crown className={`h-4 w-4 ${designTokens.colors.accent.primary.split(' ')[0]}`} />
    },
    head: {
      bgColor: `${designTokens.colors.background.secondary} border-2 ${designTokens.colors.border.primary}`,
      textColor: designTokens.colors.accent.secondary.split(' ')[0],
      icon: <Briefcase className={`h-4 w-4 ${designTokens.colors.accent.secondary.split(' ')[0]}`} />
    },
    specialist: {
      bgColor: `${designTokens.colors.background.tertiary} border-2 ${designTokens.colors.border.secondary}`,
      textColor: designTokens.colors.text.secondary,
      icon: <Award className={`h-4 w-4 ${designTokens.colors.text.secondary}`} />
    },
    team: {
      bgColor: `${designTokens.colors.background.tertiary} border ${designTokens.colors.border.primary}`,
      textColor: designTokens.colors.text.primary,
      icon: <UserCheck className={`h-4 w-4 ${designTokens.colors.text.secondary}`} />
    }
  }

  const config = levelConfig[level]

  return (
    <div className="flex flex-col items-center">
      {/* Agent Node */}
      <div className={`relative ${designTokens.radius.lg} ${config.bgColor} ${designTokens.spacing.sm} ${designTokens.shadows.lg} transition hover:scale-105 hover:shadow-xl min-w-[220px] backdrop-blur-sm`}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {config.icon}
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`${designTokens.typography.weights.bold} ${config.textColor}`}>{agent.name}</h3>
                <span className={`inline-block h-2 w-2 rounded-full ${statusColor.split(' ')[1]}`} />
              </div>
              <p className={`${designTokens.typography.sizes.sm} ${designTokens.typography.weights.medium} ${designTokens.colors.text.secondary}`}>{agent.role}</p>
              {agent.department && (
                <p className={`${designTokens.typography.sizes.xs} ${designTokens.colors.text.tertiary}`}>{agent.department}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Connection Lines and Children */}
      {children && (
        <div className="mt-4 flex flex-col items-center">
          <div className={`h-8 w-0.5 ${designTokens.colors.border.primary.replace('border-', 'bg-')}`}></div>
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
          <div className={`h-8 w-0.5 ${designTokens.colors.border.primary.replace('border-', 'bg-')} mt-4`}></div>
          <div className="relative">
            {/* Horizontal line for multiple members */}
            {members.length > 1 && (
              <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 h-0.5 ${designTokens.colors.border.primary.replace('border-', 'bg-')}`} 
                   style={{ width: `${(members.length - 1) * 240 + 220}px` }} />
            )}
            
            {/* Team members */}
            <div className="flex items-start gap-8 pt-4">
              {members.map((member, index) => (
                <div key={member.id} className="flex flex-col items-center">
                  {members.length > 1 && (
                    <div className={`h-4 w-0.5 ${designTokens.colors.border.primary.replace('border-', 'bg-')}`}></div>
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
      name: 'Chief Architect Agent',
      role: 'Enhanced CTO',
      status: 'online' as const,
      department: 'Software Department'
    },
    {
      id: 'olamide', 
      name: 'CFO Olamide',
      role: 'Chief Financial Officer',
      status: 'online' as const,
      department: 'Finance Department'
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
      id: 'master-coder',
      name: 'Master Coder Agent',
      role: 'Advanced Programming Specialist', 
      status: 'busy' as const,
      department: 'Software'
    },
    {
      id: 'swarm-coordinator',
      name: 'Swarm Coordinator Agent',
      role: 'Multi-Agent Orchestration',
      status: 'online' as const,
      department: 'Software'
    },
    {
      id: 'rusty',
      name: 'Rusty',
      role: 'Technical Specialist', 
      status: 'busy' as const,
      department: 'Software'
    }
  ]

  const financeTeam = [
    {
      id: 'tunde',
      name: 'TradFi Scout Tunde',
      role: 'LSE Specialist',
      status: 'online' as const,
      department: 'Finance'
    },
    {
      id: 'kemi',
      name: 'DeFAI Scout Kemi',
      role: 'Solana/Sui Auditor',
      status: 'busy' as const,
      department: 'Finance'
    },
    {
      id: 'adebayo',
      name: 'Risk Manager Adebayo',
      role: 'The Guardian',
      status: 'online' as const,
      department: 'Finance'
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
      name: 'The Auditor',
      role: 'Technical Validation',
      status: 'online' as const,
      department: 'Mercor'
    },
    {
      id: 'qc-judge',
      name: 'QC Judge', 
      role: 'Executive Oversight',
      status: 'online' as const,
      department: 'Mercor'
    },
    {
      id: 'narrator',
      name: 'The Narrator',
      role: 'Narrative Design',
      status: 'online' as const,
      department: 'Mercor'
    },
    {
      id: 'architect',
      name: 'The Architect',
      role: 'System Architecture',
      status: 'busy' as const,
      department: 'Mercor'
    },
    {
      id: 'rubricist',
      name: 'The Rubricist',
      role: 'Scientific Evaluation',
      status: 'online' as const,
      department: 'Mercor'
    }
  ]

  const totalAgents = 1 + departmentHeads.length + softwareTeam.length + financeTeam.length + contentTeam.length + mercorTeam.length
  const onlineAgents = [ceo, ...departmentHeads, ...softwareTeam, ...financeTeam, ...contentTeam, ...mercorTeam].filter(a => a.status === 'online').length
  const busyAgents = [ceo, ...departmentHeads, ...softwareTeam, ...financeTeam, ...contentTeam, ...mercorTeam].filter(a => a.status === 'busy').length

  return (
    <UnifiedLayout title="ORGANIZATIONAL CHART" subtitle="VISUAL HIERARCHY • LIVE STATUS • ENHANCED STRUCTURE">
      <div className={`${designTokens.spacing.lg} space-y-8`}>
        
        {/* Organization Statistics */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <Card className={componentTokens.metricCard}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className={`${designTokens.typography.sizes['2xl']} ${designTokens.typography.weights.black} ${designTokens.colors.accent.primary.split(' ')[0]}`}>
                    {totalAgents}
                  </div>
                  <div className={`${designTokens.typography.sizes.sm} ${designTokens.colors.text.tertiary} uppercase ${designTokens.typography.tracking.wider} ${designTokens.typography.fonts.mono}`}>
                    Total Agents
                  </div>
                </div>
                <Users className={`h-8 w-8 ${designTokens.colors.accent.primary.split(' ')[0]}`} />
              </div>
            </CardContent>
          </Card>

          <Card className={componentTokens.metricCard}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className={`${designTokens.typography.sizes['2xl']} ${designTokens.typography.weights.black} ${designTokens.colors.accent.success.split(' ')[0]}`}>
                    {onlineAgents}
                  </div>
                  <div className={`${designTokens.typography.sizes.sm} ${designTokens.colors.text.tertiary} uppercase ${designTokens.typography.tracking.wider} ${designTokens.typography.fonts.mono}`}>
                    Online Now
                  </div>
                </div>
                <Activity className={`h-8 w-8 ${designTokens.colors.accent.success.split(' ')[0]}`} />
              </div>
            </CardContent>
          </Card>

          <Card className={componentTokens.metricCard}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className={`${designTokens.typography.sizes['2xl']} ${designTokens.typography.weights.black} ${designTokens.colors.accent.warning.split(' ')[0]}`}>
                    {busyAgents}
                  </div>
                  <div className={`${designTokens.typography.sizes.sm} ${designTokens.colors.text.tertiary} uppercase ${designTokens.typography.tracking.wider} ${designTokens.typography.fonts.mono}`}>
                    Active Tasks
                  </div>
                </div>
                <Zap className={`h-8 w-8 ${designTokens.colors.accent.warning.split(' ')[0]}`} />
              </div>
            </CardContent>
          </Card>

          <Card className={componentTokens.metricCard}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className={`${designTokens.typography.sizes['2xl']} ${designTokens.typography.weights.black} ${designTokens.colors.accent.secondary.split(' ')[0]}`}>
                    {departmentHeads.length}
                  </div>
                  <div className={`${designTokens.typography.sizes.sm} ${designTokens.colors.text.tertiary} uppercase ${designTokens.typography.tracking.wider} ${designTokens.typography.fonts.mono}`}>
                    Departments
                  </div>
                </div>
                <Building className={`h-8 w-8 ${designTokens.colors.accent.secondary.split(' ')[0]}`} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Legend */}
        <Card className={componentTokens.commandCard}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${designTokens.typography.fonts.mono} uppercase ${designTokens.typography.tracking.wider}`}>
              Legend
              <Badge variant="outline" className={designTokens.typography.fonts.mono}>
                Hierarchy Guide
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-6">
              <div className="flex items-center gap-3">
                <Crown className={`h-5 w-5 ${designTokens.colors.accent.primary.split(' ')[0]}`} />
                <span className={`${designTokens.typography.sizes.sm} ${designTokens.typography.weights.medium} ${designTokens.colors.text.primary}`}>CEO Level</span>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className={`h-5 w-5 ${designTokens.colors.accent.secondary.split(' ')[0]}`} />
                <span className={`${designTokens.typography.sizes.sm} ${designTokens.typography.weights.medium} ${designTokens.colors.text.primary}`}>Department Head</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className={`h-5 w-5 ${designTokens.colors.text.secondary}`} />
                <span className={`${designTokens.typography.sizes.sm} ${designTokens.typography.weights.medium} ${designTokens.colors.text.primary}`}>Specialist</span>
              </div>
              <div className="flex items-center gap-3">
                <UserCheck className={`h-5 w-5 ${designTokens.colors.text.secondary}`} />
                <span className={`${designTokens.typography.sizes.sm} ${designTokens.typography.weights.medium} ${designTokens.colors.text.primary}`}>Team Member</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className={`inline-block h-2 w-2 rounded-full ${designTokens.colors.accent.success.split(' ')[1]}`}></span>
                <span className={`${designTokens.typography.sizes.sm} ${designTokens.colors.text.secondary}`}>Online</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`inline-block h-2 w-2 rounded-full ${designTokens.colors.accent.warning.split(' ')[1]}`}></span>
                <span className={`${designTokens.typography.sizes.sm} ${designTokens.colors.text.secondary}`}>Busy</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`inline-block h-2 w-2 rounded-full bg-slate-500`}></span>
                <span className={`${designTokens.typography.sizes.sm} ${designTokens.colors.text.secondary}`}>Offline</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Organizational Chart */}
        <Card className={componentTokens.commandCard}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${designTokens.typography.fonts.mono} uppercase ${designTokens.typography.tracking.wider}`}>
              <Target className="h-5 w-5" />
              Organizational Structure
              <Badge variant="outline" className={designTokens.typography.fonts.mono}>
                Live Status
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <div className="flex flex-col items-center min-w-[1200px] py-8">
              {/* CEO Level */}
              <ChartNode agent={ceo} level="ceo">
                {/* Department Heads Level */}
                <div className="flex items-start gap-12">
                  {/* Software Department */}
                  <DepartmentBranch
                    head={departmentHeads[0]}
                    members={softwareTeam}
                    title="Enhanced Software Department"
                    color="blue"
                  />

                  {/* Finance Department */}
                  <DepartmentBranch
                    head={departmentHeads[1]}
                    members={financeTeam}
                    title="Finance Department"
                    color="amber"
                  />

                  {/* Content Department */}
                  <DepartmentBranch
                    head={departmentHeads[2]}
                    members={contentTeam}
                    title="Content & Presentations"
                    color="purple"
                  />

                  {/* Mercor Division */}
                  <DepartmentBranch
                    head={departmentHeads[3]}
                    members={mercorTeam}
                    title="Mercor Project Division"
                    color="emerald"
                  />
                </div>
              </ChartNode>
            </div>
          </CardContent>
        </Card>

        {/* Department Summary */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Enhanced Software Department */}
          <Card className={componentTokens.metricCard}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${designTokens.colors.accent.secondary.split(' ')[0]}`}>
                <Briefcase className="h-5 w-5" />
                Enhanced Software Department
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <p className={`${designTokens.typography.sizes.sm} ${designTokens.colors.text.secondary}`}>
                  <strong>Head:</strong> Chief Architect Agent (Ruflo Enhanced)
                </p>
                <p className={`${designTokens.typography.sizes.sm} ${designTokens.colors.text.secondary}`}>
                  <strong>Members:</strong> {1 + softwareTeam.length} Active Agents
                </p>
                <p className={`${designTokens.typography.sizes.sm} ${designTokens.colors.text.secondary}`}>
                  <strong>Focus:</strong> AI Orchestration & Advanced Development
                </p>
              </div>
              <div className="space-y-1">
                <p className={`${designTokens.typography.sizes.xs} ${designTokens.typography.weights.medium} ${designTokens.colors.text.tertiary} uppercase ${designTokens.typography.tracking.wider}`}>
                  Team Members:
                </p>
                <div className="flex flex-wrap gap-1">
                  {softwareTeam.map(member => (
                    <Badge key={member.id} variant="outline" className={`${designTokens.typography.sizes.xs}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${getStatusColorForChart(member.status).split(' ')[1]} mr-1`}></span>
                      {member.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Finance Department */}
          <Card className={componentTokens.metricCard}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${designTokens.colors.accent.primary.split(' ')[0]}`}>
                <Crown className="h-5 w-5" />
                Finance Department
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <p className={`${designTokens.typography.sizes.sm} ${designTokens.colors.text.secondary}`}>
                  <strong>Head:</strong> CFO Olamide
                </p>
                <p className={`${designTokens.typography.sizes.sm} ${designTokens.colors.text.secondary}`}>
                  <strong>Members:</strong> {1 + financeTeam.length} Trading Specialists
                </p>
                <p className={`${designTokens.typography.sizes.sm} ${designTokens.colors.text.secondary}`}>
                  <strong>Focus:</strong> Trading Operations & Risk Management
                </p>
              </div>
              <div className="space-y-1">
                <p className={`${designTokens.typography.sizes.xs} ${designTokens.typography.weights.medium} ${designTokens.colors.text.tertiary} uppercase ${designTokens.typography.tracking.wider}`}>
                  Team Members:
                </p>
                <div className="flex flex-wrap gap-1">
                  {financeTeam.map(member => (
                    <Badge key={member.id} variant="outline" className={`${designTokens.typography.sizes.xs}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${getStatusColorForChart(member.status).split(' ')[1]} mr-1`}></span>
                      {member.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Department */}
          <Card className={componentTokens.metricCard}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${designTokens.colors.text.secondary}`}>
                <Building className="h-5 w-5" />
                Content & Presentations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <p className={`${designTokens.typography.sizes.sm} ${designTokens.colors.text.secondary}`}>
                  <strong>Head:</strong> Bimbo (PM-Content)
                </p>
                <p className={`${designTokens.typography.sizes.sm} ${designTokens.colors.text.secondary}`}>
                  <strong>Members:</strong> {1 + contentTeam.length} Content Specialists
                </p>
                <p className={`${designTokens.typography.sizes.sm} ${designTokens.colors.text.secondary}`}>
                  <strong>Focus:</strong> Presentation Excellence & Content Standards
                </p>
              </div>
              <div className="space-y-1">
                <p className={`${designTokens.typography.sizes.xs} ${designTokens.typography.weights.medium} ${designTokens.colors.text.tertiary} uppercase ${designTokens.typography.tracking.wider}`}>
                  Team Members:
                </p>
                <div className="flex flex-wrap gap-1">
                  {contentTeam.map(member => (
                    <Badge key={member.id} variant="outline" className={`${designTokens.typography.sizes.xs}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${getStatusColorForChart(member.status).split(' ')[1]} mr-1`}></span>
                      {member.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mercor Division */}
          <Card className={componentTokens.metricCard}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${designTokens.colors.accent.success.split(' ')[0]}`}>
                <Target className="h-5 w-5" />
                Mercor Project Division
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <p className={`${designTokens.typography.sizes.sm} ${designTokens.colors.text.secondary}`}>
                  <strong>Head:</strong> Pajimo (PM-Mercor)
                </p>
                <p className={`${designTokens.typography.sizes.sm} ${designTokens.colors.text.secondary}`}>
                  <strong>Members:</strong> {1 + mercorTeam.length} Quality Specialists
                </p>
                <p className={`${designTokens.typography.sizes.sm} ${designTokens.colors.text.secondary}`}>
                  <strong>Focus:</strong> Project Quality & Technical Evaluation
                </p>
              </div>
              <div className="space-y-1">
                <p className={`${designTokens.typography.sizes.xs} ${designTokens.typography.weights.medium} ${designTokens.colors.text.tertiary} uppercase ${designTokens.typography.tracking.wider}`}>
                  Team Members:
                </p>
                <div className="flex flex-wrap gap-1">
                  {mercorTeam.slice(0, 3).map(member => (
                    <Badge key={member.id} variant="outline" className={`${designTokens.typography.sizes.xs}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${getStatusColorForChart(member.status).split(' ')[1]} mr-1`}></span>
                      {member.name}
                    </Badge>
                  ))}
                  {mercorTeam.length > 3 && (
                    <Badge variant="outline" className={`${designTokens.typography.sizes.xs}`}>
                      +{mercorTeam.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </UnifiedLayout>
  )
}