'use client'

import { useState, useEffect } from 'react'
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

// Status Badge Component
interface StatusBadgeProps {
  status: 'running' | 'completed' | 'failed' | 'pending'
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusConfig = {
    running: {
      color: googleStitchColors.secondary,
      icon: 'play_circle_filled',
      label: 'Running'
    },
    completed: {
      color: googleStitchColors.tertiary,
      icon: 'check_circle',
      label: 'Completed'
    },
    failed: {
      color: googleStitchColors.error,
      icon: 'error',
      label: 'Failed'
    },
    pending: {
      color: googleStitchColors.primary,
      icon: 'schedule',
      label: 'Pending'
    }
  }

  const config = statusConfig[status]

  return (
    <div className="flex items-center gap-2">
      <MaterialIcon
        name={config.icon}
        style={{ color: config.color, fontSize: '16px' }}
      />
      <span
        className="text-xs font-medium uppercase tracking-wider"
        style={{
          color: config.color,
          ...googleStitchTypography.label.small
        }}
      >
        {config.label}
      </span>
    </div>
  )
}

// Operation Log Entry Component
interface Operation {
  id: string
  name: string
  type: 'deployment' | 'backup' | 'maintenance' | 'migration' | 'monitoring'
  status: 'running' | 'completed' | 'failed' | 'pending'
  startTime: Date
  duration?: number
  agent: string
  details: string
  progress?: number
}

interface OperationLogEntryProps {
  operation: Operation
}

const OperationLogEntry = ({ operation }: OperationLogEntryProps) => {
  const typeIcons = {
    deployment: 'rocket_launch',
    backup: 'backup',
    maintenance: 'build',
    migration: 'swap_horiz',
    monitoring: 'analytics'
  }

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div
      className="p-6 rounded-lg border-l-4"
      style={{
        backgroundColor: googleStitchColors.surface.secondary,
        border: `1px solid ${googleStitchColors.border.secondary}`,
        borderLeftColor: operation.status === 'completed' ? googleStitchColors.tertiary :
                         operation.status === 'failed' ? googleStitchColors.error :
                         operation.status === 'running' ? googleStitchColors.secondary :
                         googleStitchColors.primary
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{
              backgroundColor: `${googleStitchColors.primary}20`,
              color: googleStitchColors.primary
            }}
          >
            <MaterialIcon name={typeIcons[operation.type]} className="text-lg" />
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
              {operation.name}
            </h3>
            <p
              style={{
                ...googleStitchTypography.body.small,
                color: googleStitchColors.text.secondary
              }}
            >
              {operation.details}
            </p>
          </div>
        </div>

        <StatusBadge status={operation.status} />
      </div>

      {/* Progress Bar for Running Operations */}
      {operation.status === 'running' && operation.progress !== undefined && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span
              style={{
                ...googleStitchTypography.label.small,
                color: googleStitchColors.text.tertiary
              }}
            >
              Progress
            </span>
            <span
              style={{
                ...googleStitchTypography.label.small,
                color: googleStitchColors.text.primary
              }}
            >
              {operation.progress}%
            </span>
          </div>
          <div
            className="w-full h-2 rounded-full"
            style={{ backgroundColor: googleStitchColors.border.primary }}
          >
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                backgroundColor: googleStitchColors.secondary,
                width: `${operation.progress}%`
              }}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <span
            style={{
              ...googleStitchTypography.label.small,
              color: googleStitchColors.text.tertiary
            }}
          >
            Started
          </span>
          <p
            className="font-medium"
            style={{
              ...googleStitchTypography.body.small,
              color: googleStitchColors.text.primary
            }}
          >
            {formatTime(operation.startTime)}
          </p>
        </div>

        {operation.duration && (
          <div>
            <span
              style={{
                ...googleStitchTypography.label.small,
                color: googleStitchColors.text.tertiary
              }}
            >
              Duration
            </span>
            <p
              className="font-medium"
              style={{
                ...googleStitchTypography.body.small,
                color: googleStitchColors.text.primary
              }}
            >
              {formatDuration(operation.duration)}
            </p>
          </div>
        )}

        <div>
          <span
            style={{
              ...googleStitchTypography.label.small,
              color: googleStitchColors.text.tertiary
            }}
          >
            Agent
          </span>
          <p
            className="font-medium"
            style={{
              ...googleStitchTypography.body.small,
              color: googleStitchColors.text.primary
            }}
          >
            {operation.agent}
          </p>
        </div>
      </div>
    </div>
  )
}

// Live Metrics Chart Component
const LiveMetricsChart = () => {
  const [metrics, setMetrics] = useState({
    cpu: 45,
    memory: 62,
    network: 38,
    storage: 71
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        cpu: Math.floor(Math.random() * 30) + 40,
        memory: Math.floor(Math.random() * 20) + 55,
        network: Math.floor(Math.random() * 40) + 30,
        storage: Math.floor(Math.random() * 10) + 65
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const metricsList = [
    { name: 'CPU Usage', value: metrics.cpu, icon: 'memory', color: googleStitchColors.primary },
    { name: 'Memory', value: metrics.memory, icon: 'storage', color: googleStitchColors.secondary },
    { name: 'Network I/O', value: metrics.network, icon: 'wifi', color: googleStitchColors.tertiary },
    { name: 'Storage', value: metrics.storage, icon: 'hard_drive', color: googleStitchColors.error }
  ]

  return (
    <div
      className="p-6 rounded-xl"
      style={{
        backgroundColor: googleStitchColors.surface.secondary,
        border: `1px solid ${googleStitchColors.border.primary}`
      }}
    >
      <h3
        className="mb-6"
        style={{
          ...googleStitchTypography.headline.small,
          fontWeight: '600',
          color: googleStitchColors.text.primary
        }}
      >
        System Metrics
      </h3>

      <div className="grid grid-cols-2 gap-6">
        {metricsList.map((metric, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <MaterialIcon
                  name={metric.icon}
                  style={{ color: metric.color, fontSize: '16px' }}
                />
                <span
                  style={{
                    ...googleStitchTypography.label.medium,
                    color: googleStitchColors.text.secondary
                  }}
                >
                  {metric.name}
                </span>
              </div>
              <span
                className="font-bold"
                style={{
                  ...googleStitchTypography.body.medium,
                  color: googleStitchColors.text.primary,
                  fontWeight: '600'
                }}
              >
                {metric.value}%
              </span>
            </div>
            
            <div
              className="w-full h-2 rounded-full"
              style={{ backgroundColor: googleStitchColors.border.primary }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  backgroundColor: metric.color,
                  width: `${metric.value}%`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function GoogleStitchOperationsPage() {
  const [filter, setFilter] = useState<string>('all')

  // Sample operations data
  const operations: Operation[] = [
    {
      id: '1',
      name: 'Deploy Mission Control v2.1',
      type: 'deployment',
      status: 'running',
      startTime: new Date(Date.now() - 1000 * 60 * 15),
      agent: 'Agent Alpha',
      details: 'Deploying latest dashboard updates to production environment',
      progress: 78
    },
    {
      id: '2',
      name: 'Database Backup',
      type: 'backup',
      status: 'completed',
      startTime: new Date(Date.now() - 1000 * 60 * 45),
      duration: 32,
      agent: 'Agent Beta',
      details: 'Scheduled backup of all agent configuration and task data'
    },
    {
      id: '3',
      name: 'System Health Check',
      type: 'monitoring',
      status: 'running',
      startTime: new Date(Date.now() - 1000 * 60 * 8),
      agent: 'Agent Gamma',
      details: 'Comprehensive system monitoring and performance analysis',
      progress: 34
    },
    {
      id: '4',
      name: 'Security Patch Update',
      type: 'maintenance',
      status: 'pending',
      startTime: new Date(Date.now() + 1000 * 60 * 30),
      agent: 'Agent Delta',
      details: 'Critical security updates for all system components'
    },
    {
      id: '5',
      name: 'Data Migration',
      type: 'migration',
      status: 'failed',
      startTime: new Date(Date.now() - 1000 * 60 * 120),
      duration: 67,
      agent: 'Agent Alpha',
      details: 'Migration of legacy data to new schema format'
    }
  ]

  const filteredOperations = filter === 'all' 
    ? operations 
    : operations.filter(op => op.status === filter)

  const stats = {
    running: operations.filter(op => op.status === 'running').length,
    completed: operations.filter(op => op.status === 'completed').length,
    failed: operations.filter(op => op.status === 'failed').length,
    pending: operations.filter(op => op.status === 'pending').length
  }

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
                Operations Center
              </h1>
              <p
                style={{
                  ...googleStitchTypography.body.small,
                  color: googleStitchColors.text.secondary
                }}
              >
                Live system operations, deployments, and monitoring
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <StitchButton variant="outlined" size="small">
              <MaterialIcon name="refresh" />
              Refresh
            </StitchButton>
            <StitchButton variant="primary">
              <MaterialIcon name="play_arrow" />
              New Operation
            </StitchButton>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: 'Running',
              value: stats.running.toString(),
              icon: 'play_circle_filled',
              color: googleStitchColors.secondary
            },
            {
              label: 'Completed',
              value: stats.completed.toString(),
              icon: 'check_circle',
              color: googleStitchColors.tertiary
            },
            {
              label: 'Failed',
              value: stats.failed.toString(),
              icon: 'error',
              color: googleStitchColors.error
            },
            {
              label: 'Pending',
              value: stats.pending.toString(),
              icon: 'schedule',
              color: googleStitchColors.primary
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

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Operations Log */}
          <div className="xl:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h2
                style={{
                  ...googleStitchTypography.headline.small,
                  fontWeight: '600',
                  color: googleStitchColors.text.primary
                }}
              >
                Operations Log
              </h2>
              
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 rounded-lg"
                style={{
                  backgroundColor: googleStitchColors.surface.secondary,
                  border: `1px solid ${googleStitchColors.border.primary}`,
                  color: googleStitchColors.text.primary,
                  ...googleStitchTypography.body.small
                }}
              >
                <option value="all">All Operations</option>
                <option value="running">Running</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            <div className="space-y-4">
              {filteredOperations.map((operation) => (
                <OperationLogEntry key={operation.id} operation={operation} />
              ))}
            </div>
          </div>

          {/* Live Metrics */}
          <div>
            <LiveMetricsChart />
            
            {/* Quick Actions */}
            <div
              className="mt-6 p-6 rounded-xl"
              style={{
                backgroundColor: googleStitchColors.surface.secondary,
                border: `1px solid ${googleStitchColors.border.primary}`
              }}
            >
              <h3
                className="mb-4"
                style={{
                  ...googleStitchTypography.headline.small,
                  fontWeight: '600',
                  color: googleStitchColors.text.primary
                }}
              >
                Quick Actions
              </h3>
              
              <div className="space-y-3">
                <StitchButton variant="primary" className="w-full justify-start">
                  <MaterialIcon name="rocket_launch" />
                  Deploy Update
                </StitchButton>
                <StitchButton variant="outlined" className="w-full justify-start">
                  <MaterialIcon name="backup" />
                  Run Backup
                </StitchButton>
                <StitchButton variant="outlined" className="w-full justify-start">
                  <MaterialIcon name="build" />
                  Maintenance Mode
                </StitchButton>
                <StitchButton variant="outlined" className="w-full justify-start">
                  <MaterialIcon name="analytics" />
                  System Report
                </StitchButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Material Icons Font */}
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
    </div>
  )
}