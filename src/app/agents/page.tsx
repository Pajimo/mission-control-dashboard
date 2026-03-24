'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  googleStitchColors, 
  googleStitchTypography,
  materialIcons 
} from '@/lib/google-stitch-tokens'

// Material Design Icons Component
const MaterialIcon = ({ name, className = '', style }: { name: string; className?: string; style?: React.CSSProperties }) => (
  <span className={`material-icons ${className}`} style={{ fontFamily: 'Material Icons', ...style }}>
    {name}
  </span>
)

// Google Stitch Button Component
interface StitchButtonProps {
  variant: 'primary' | 'secondary' | 'inverted' | 'outlined'
  children: React.ReactNode
  onClick?: () => void
  className?: string
  size?: 'small' | 'medium' | 'large'
}

const StitchButton = ({ variant, children, onClick, className = '', size = 'medium' }: StitchButtonProps) => {
  const baseStyles = {
    primary: {
      backgroundColor: googleStitchColors.primary,
      color: '#FFFFFF',
      border: 'none',
    },
    secondary: {
      backgroundColor: 'transparent',
      color: googleStitchColors.primary,
      border: `1px solid ${googleStitchColors.primary}`,
    },
    inverted: {
      backgroundColor: '#FFFFFF',
      color: googleStitchColors.neutral,
      border: 'none',
    },
    outlined: {
      backgroundColor: 'transparent',
      color: googleStitchColors.text.primary,
      border: `1px solid ${googleStitchColors.border.primary}`,
    }
  }

  const sizeStyles = {
    small: { padding: '8px 16px', fontSize: '12px' },
    medium: { padding: '12px 24px', fontSize: '14px' },
    large: { padding: '16px 32px', fontSize: '16px' }
  }

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium hover:opacity-90 transition-opacity ${className}`}
      style={{
        ...baseStyles[variant],
        ...sizeStyles[size],
        fontFamily: googleStitchTypography.fontFamily.primary,
        fontWeight: '500'
      }}
    >
      {children}
    </button>
  )
}

// Agent Card Component
interface Agent {
  id: string
  name: string
  status: 'active' | 'idle' | 'error'
  department: string
  currentTask: string
  performance: number
  uptime: string
  lastUpdate: string
  tasksCompleted?: number
  errorRate?: number
}

interface AgentCardProps {
  agent: Agent
  isSelected: boolean
  onSelect: (id: string) => void
}

const AgentCard = ({ agent, isSelected, onSelect }: AgentCardProps) => {
  const statusColors = {
    active: googleStitchColors.tertiary,
    idle: googleStitchColors.secondary,
    error: googleStitchColors.error
  }

  const statusIcons = {
    active: 'play_circle_filled',
    idle: 'pause_circle_filled',
    error: 'error'
  }

  return (
    <div
      className={`p-6 rounded-xl cursor-pointer transition-all hover:opacity-80 ${isSelected ? 'ring-2' : ''}`}
      style={{
        backgroundColor: googleStitchColors.surface.secondary,
        border: `1px solid ${isSelected ? googleStitchColors.primary : googleStitchColors.border.secondary}`,
        ...(isSelected && {
          '--tw-ring-color': `${googleStitchColors.primary}40`
        })
      }}
      onClick={() => onSelect(agent.id)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${googleStitchColors.primary}20`, color: googleStitchColors.primary }}
          >
            <MaterialIcon name="smart_toy" className="text-xl" />
          </div>
          <div>
            <h3 
              className="font-semibold mb-1"
              style={{ 
                ...googleStitchTypography.body.large,
                color: googleStitchColors.text.primary,
                fontWeight: '600'
              }}
            >
              {agent.name}
            </h3>
            <p 
              className="uppercase tracking-wider"
              style={{ 
                ...googleStitchTypography.label.small,
                color: googleStitchColors.text.secondary
              }}
            >
              {agent.department}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <MaterialIcon 
            name={statusIcons[agent.status]}
            style={{ color: statusColors[agent.status], fontSize: '20px' }}
          />
        </div>
      </div>

      {/* Current Task */}
      <div className="mb-6">
        <p 
          className="uppercase tracking-wider mb-2"
          style={{ 
            ...googleStitchTypography.label.small,
            color: googleStitchColors.text.tertiary
          }}
        >
          Current Status
        </p>
        <p 
          style={{ 
            ...googleStitchTypography.body.medium,
            color: googleStitchColors.text.primary
          }}
        >
          {agent.currentTask}
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p 
            className="mb-1"
            style={{ 
              ...googleStitchTypography.label.small,
              color: googleStitchColors.text.tertiary
            }}
          >
            Performance
          </p>
          <div className="flex items-center gap-2">
            <p 
              className="font-bold"
              style={{ 
                ...googleStitchTypography.body.medium,
                color: googleStitchColors.text.primary,
                fontWeight: '600'
              }}
            >
              {agent.performance}%
            </p>
            <div 
              className="flex-1 h-2 rounded-full"
              style={{ backgroundColor: `${googleStitchColors.border.primary}` }}
            >
              <div 
                className="h-full rounded-full"
                style={{ 
                  backgroundColor: agent.performance > 90 ? googleStitchColors.tertiary : 
                                  agent.performance > 70 ? googleStitchColors.secondary : 
                                  googleStitchColors.error,
                  width: `${agent.performance}%`
                }}
              />
            </div>
          </div>
        </div>
        
        <div>
          <p 
            className="mb-1"
            style={{ 
              ...googleStitchTypography.label.small,
              color: googleStitchColors.text.tertiary
            }}
          >
            Uptime
          </p>
          <p 
            className="font-bold"
            style={{ 
              ...googleStitchTypography.body.medium,
              color: googleStitchColors.text.primary,
              fontWeight: '600'
            }}
          >
            {agent.uptime}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div 
        className="pt-4 border-t flex items-center justify-between"
        style={{ borderColor: googleStitchColors.border.primary }}
      >
        <span 
          style={{ 
            ...googleStitchTypography.label.small,
            color: googleStitchColors.text.tertiary
          }}
        >
          Updated {agent.lastUpdate}
        </span>
        
        <div 
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: statusColors[agent.status] }}
        />
      </div>
    </div>
  )
}

export default function GoogleStitchAgentsPage() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)

  const agents: Agent[] = [
    {
      id: '001',
      name: 'Agent Alpha',
      status: 'active',
      department: 'Software Development',
      currentTask: 'Deploying mission control dashboard updates',
      performance: 98.2,
      uptime: '72h 14m',
      lastUpdate: '2 mins ago',
      tasksCompleted: 247,
      errorRate: 0.8
    },
    {
      id: '002',
      name: 'Agent Beta',
      status: 'idle',
      department: 'Finance Operations',
      currentTask: 'Monitoring market conditions, awaiting trading signal',
      performance: 95.7,
      uptime: '156h 33m',
      lastUpdate: '5 mins ago',
      tasksCompleted: 189,
      errorRate: 1.2
    },
    {
      id: '003',
      name: 'Agent Gamma',
      status: 'active',
      department: 'Content Creation',
      currentTask: 'Generating marketing presentation slides',
      performance: 87.4,
      uptime: '24h 8m',
      lastUpdate: '1 min ago',
      tasksCompleted: 156,
      errorRate: 2.1
    },
    {
      id: '004',
      name: 'Agent Delta',
      status: 'error',
      department: 'System Operations',
      currentTask: 'Error: Memory allocation exceeded during task execution',
      performance: 92.1,
      uptime: '8h 45m',
      lastUpdate: '15 mins ago',
      tasksCompleted: 203,
      errorRate: 4.3
    }
  ]

  const activeAgents = agents.filter(a => a.status === 'active').length
  const idleAgents = agents.filter(a => a.status === 'idle').length
  const errorAgents = agents.filter(a => a.status === 'error').length

  const selectedAgentData = selectedAgent ? agents.find(a => a.id === selectedAgent) : null

  return (
    <div 
      className="min-h-screen"
      style={{ 
        backgroundColor: googleStitchColors.neutral,
        color: googleStitchColors.text.primary,
        fontFamily: googleStitchTypography.fontFamily.primary
      }}
    >
      {/* Header */}
      <header 
        className="border-b px-6 py-4"
        style={{ 
          backgroundColor: googleStitchColors.surface.secondary,
          borderColor: googleStitchColors.border.primary
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <MaterialIcon name="arrow_back" />
              <span style={{ ...googleStitchTypography.body.medium, fontWeight: '500' }}>
                Back to Dashboard
              </span>
            </Link>
            
            <div 
              className="w-px h-6"
              style={{ backgroundColor: googleStitchColors.border.primary }}
            />
            
            <div>
              <h1 
                style={{ 
                  ...googleStitchTypography.headline.small,
                  fontWeight: '600',
                  color: googleStitchColors.text.primary
                }}
              >
                Agent Monitoring
              </h1>
              <p 
                style={{ 
                  ...googleStitchTypography.body.small,
                  color: googleStitchColors.text.secondary
                }}
              >
                Real-time agent status and performance tracking
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <StitchButton variant="outlined" size="small">
              <MaterialIcon name="refresh" />
              Refresh
            </StitchButton>
            <StitchButton variant="primary">
              <MaterialIcon name="add" />
              Deploy Agent
            </StitchButton>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { 
              label: 'Total Agents', 
              value: agents.length.toString(), 
              icon: 'smart_toy', 
              color: googleStitchColors.primary 
            },
            { 
              label: 'Active', 
              value: activeAgents.toString(), 
              icon: 'play_circle_filled', 
              color: googleStitchColors.tertiary 
            },
            { 
              label: 'Idle', 
              value: idleAgents.toString(), 
              icon: 'pause_circle_filled', 
              color: googleStitchColors.secondary 
            },
            { 
              label: 'Errors', 
              value: errorAgents.toString(), 
              icon: 'error', 
              color: googleStitchColors.error 
            }
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 rounded-xl"
              style={{
                backgroundColor: googleStitchColors.surface.secondary,
                border: `1px solid ${googleStitchColors.border.secondary}`
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 
                  className="uppercase tracking-wider"
                  style={{ 
                    ...googleStitchTypography.label.medium,
                    color: googleStitchColors.text.secondary
                  }}
                >
                  {stat.label}
                </h3>
                <MaterialIcon 
                  name={stat.icon}
                  style={{ color: stat.color, fontSize: '20px' }}
                />
              </div>
              <div 
                className="mb-2"
                style={{ 
                  ...googleStitchTypography.headline.medium,
                  color: googleStitchColors.text.primary,
                  fontWeight: '600'
                }}
              >
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {agents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              isSelected={selectedAgent === agent.id}
              onSelect={setSelectedAgent}
            />
          ))}
        </div>

        {/* Agent Details Panel */}
        {selectedAgentData && (
          <div
            className="p-8 rounded-xl"
            style={{
              backgroundColor: googleStitchColors.surface.secondary,
              border: `1px solid ${googleStitchColors.border.primary}`
            }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 
                style={{ 
                  ...googleStitchTypography.headline.medium,
                  fontWeight: '600',
                  color: googleStitchColors.text.primary
                }}
              >
                {selectedAgentData.name} - Detailed View
              </h2>
              <StitchButton variant="outlined" onClick={() => setSelectedAgent(null)}>
                <MaterialIcon name="close" />
                Close
              </StitchButton>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Configuration */}
              <div>
                <h3 
                  className="mb-4 uppercase tracking-wider"
                  style={{ 
                    ...googleStitchTypography.label.medium,
                    color: googleStitchColors.text.secondary
                  }}
                >
                  Configuration
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span style={{ color: googleStitchColors.text.tertiary }}>Agent ID</span>
                    <span 
                      className="font-mono"
                      style={{ color: googleStitchColors.text.primary }}
                    >
                      {selectedAgentData.id}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: googleStitchColors.text.tertiary }}>Department</span>
                    <span style={{ color: googleStitchColors.text.primary }}>
                      {selectedAgentData.department}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: googleStitchColors.text.tertiary }}>Status</span>
                    <span 
                      className="capitalize"
                      style={{ 
                        color: selectedAgentData.status === 'active' ? googleStitchColors.tertiary :
                               selectedAgentData.status === 'idle' ? googleStitchColors.secondary :
                               googleStitchColors.error
                      }}
                    >
                      {selectedAgentData.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div>
                <h3 
                  className="mb-4 uppercase tracking-wider"
                  style={{ 
                    ...googleStitchTypography.label.medium,
                    color: googleStitchColors.text.secondary
                  }}
                >
                  Performance
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span style={{ color: googleStitchColors.text.tertiary }}>Score</span>
                    <span 
                      className="font-mono"
                      style={{ color: googleStitchColors.text.primary }}
                    >
                      {selectedAgentData.performance}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: googleStitchColors.text.tertiary }}>Uptime</span>
                    <span 
                      className="font-mono"
                      style={{ color: googleStitchColors.text.primary }}
                    >
                      {selectedAgentData.uptime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: googleStitchColors.text.tertiary }}>Tasks Completed</span>
                    <span 
                      className="font-mono"
                      style={{ color: googleStitchColors.text.primary }}
                    >
                      {selectedAgentData.tasksCompleted}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: googleStitchColors.text.tertiary }}>Error Rate</span>
                    <span 
                      className="font-mono"
                      style={{ color: googleStitchColors.text.primary }}
                    >
                      {selectedAgentData.errorRate}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div>
                <h3 
                  className="mb-4 uppercase tracking-wider"
                  style={{ 
                    ...googleStitchTypography.label.medium,
                    color: googleStitchColors.text.secondary
                  }}
                >
                  Actions
                </h3>
                <div className="space-y-3">
                  <StitchButton variant="primary" className="w-full justify-center">
                    <MaterialIcon name="visibility" />
                    View Logs
                  </StitchButton>
                  <StitchButton variant="outlined" className="w-full justify-center">
                    <MaterialIcon name="refresh" />
                    Restart Agent
                  </StitchButton>
                  <StitchButton variant="outlined" className="w-full justify-center">
                    <MaterialIcon name="edit" />
                    Edit Config
                  </StitchButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Material Icons Font */}
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
    </div>
  )
}