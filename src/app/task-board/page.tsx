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

// Priority Badge Component
interface PriorityBadgeProps {
  priority: 'high' | 'medium' | 'low'
}

const PriorityBadge = ({ priority }: PriorityBadgeProps) => {
  const priorityConfig = {
    high: {
      color: googleStitchColors.error,
      label: 'High Priority'
    },
    medium: {
      color: googleStitchColors.secondary,
      label: 'Medium Priority'
    },
    low: {
      color: googleStitchColors.primary,
      label: 'Low Priority'
    }
  }

  const config = priorityConfig[priority]

  return (
    <span
      className="px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider"
      style={{
        backgroundColor: `${config.color}20`,
        color: config.color,
        border: `1px solid ${config.color}40`,
        ...googleStitchTypography.label.small
      }}
    >
      {priority}
    </span>
  )
}

// Task Card Component
interface Task {
  id: string
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  assignee: string
  tags: string[]
  dueDate?: string
}

interface TaskCardProps {
  task: Task
  onMove?: (taskId: string, newColumn: string) => void
}

const TaskCard = ({ task, onMove }: TaskCardProps) => {
  return (
    <div
      className="p-4 mb-4 rounded-lg cursor-pointer transition-all hover:opacity-80"
      style={{
        backgroundColor: googleStitchColors.surface.secondary,
        border: `1px solid ${googleStitchColors.border.secondary}`
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4
            className="font-semibold mb-1"
            style={{
              ...googleStitchTypography.body.large,
              color: googleStitchColors.text.primary,
              fontWeight: '600'
            }}
          >
            {task.title}
          </h4>
          <p
            style={{
              ...googleStitchTypography.body.small,
              color: googleStitchColors.text.secondary
            }}
          >
            {task.description}
          </p>
        </div>
        <button className="ml-2 p-1 rounded hover:opacity-70">
          <MaterialIcon
            name="more_vert"
            style={{ color: googleStitchColors.text.tertiary, fontSize: '16px' }}
          />
        </button>
      </div>

      {/* Priority */}
      <div className="mb-3">
        <PriorityBadge priority={task.priority} />
      </div>

      {/* Tags */}
      {task.tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {task.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 rounded text-xs"
              style={{
                backgroundColor: `${googleStitchColors.primary}10`,
                color: googleStitchColors.text.tertiary,
                ...googleStitchTypography.label.small
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MaterialIcon
            name="person"
            style={{ color: googleStitchColors.text.tertiary, fontSize: '16px' }}
          />
          <span
            style={{
              ...googleStitchTypography.label.small,
              color: googleStitchColors.text.secondary
            }}
          >
            {task.assignee}
          </span>
        </div>

        {task.dueDate && (
          <span
            style={{
              ...googleStitchTypography.label.small,
              color: googleStitchColors.text.tertiary
            }}
          >
            Due {task.dueDate}
          </span>
        )}
      </div>
    </div>
  )
}

// Column Component
interface Column {
  id: string
  title: string
  color: string
  tasks: Task[]
}

interface ColumnComponentProps {
  column: Column
  onTaskMove?: (taskId: string, newColumn: string) => void
}

const ColumnComponent = ({ column, onTaskMove }: ColumnComponentProps) => {
  return (
    <div className="flex-1 min-w-0">
      {/* Column Header */}
      <div
        className="p-4 mb-4 rounded-lg"
        style={{
          backgroundColor: googleStitchColors.surface.tertiary,
          border: `1px solid ${googleStitchColors.border.primary}`
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: column.color }}
            />
            <h3
              className="font-semibold"
              style={{
                ...googleStitchTypography.body.large,
                color: googleStitchColors.text.primary,
                fontWeight: '600'
              }}
            >
              {column.title}
            </h3>
            <span
              className="px-2 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: `${googleStitchColors.text.tertiary}20`,
                color: googleStitchColors.text.tertiary,
                ...googleStitchTypography.label.small
              }}
            >
              {column.tasks.length}
            </span>
          </div>
          
          <button className="p-1 rounded hover:opacity-70">
            <MaterialIcon
              name="add"
              style={{ color: googleStitchColors.text.secondary, fontSize: '18px' }}
            />
          </button>
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-0">
        {column.tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onMove={onTaskMove}
          />
        ))}
      </div>
    </div>
  )
}

export default function GoogleStitchTaskBoard() {
  const [filter, setFilter] = useState<string>('all')

  // Sample data
  const columns: Column[] = [
    {
      id: 'todo',
      title: 'To Do',
      color: googleStitchColors.text.secondary,
      tasks: [
        {
          id: '1',
          title: 'Implement Google Stitch Design System',
          description: 'Transform all 6 screens to use Material Design components',
          priority: 'high',
          assignee: 'Agent Alpha',
          tags: ['UI/UX', 'Design System'],
          dueDate: 'Today'
        },
        {
          id: '2',
          title: 'Optimize Database Queries',
          description: 'Improve response times for dashboard API endpoints',
          priority: 'medium',
          assignee: 'Agent Beta',
          tags: ['Backend', 'Performance'],
          dueDate: 'Tomorrow'
        },
        {
          id: '3',
          title: 'Create User Documentation',
          description: 'Write comprehensive guides for new features',
          priority: 'low',
          assignee: 'Agent Gamma',
          tags: ['Documentation', 'Content']
        }
      ]
    },
    {
      id: 'inprogress',
      title: 'In Progress',
      color: googleStitchColors.secondary,
      tasks: [
        {
          id: '4',
          title: 'Deploy Mission Control Dashboard',
          description: 'Complete deployment pipeline setup and testing',
          priority: 'high',
          assignee: 'Agent Alpha',
          tags: ['DevOps', 'Deployment'],
          dueDate: 'Today'
        },
        {
          id: '5',
          title: 'Financial API Integration',
          description: 'Connect trading algorithms with market data feeds',
          priority: 'medium',
          assignee: 'Agent Delta',
          tags: ['Finance', 'API']
        }
      ]
    },
    {
      id: 'review',
      title: 'Under Review',
      color: googleStitchColors.primary,
      tasks: [
        {
          id: '6',
          title: 'Security Audit Report',
          description: 'Comprehensive security assessment of all systems',
          priority: 'high',
          assignee: 'Agent Gamma',
          tags: ['Security', 'Audit'],
          dueDate: 'Yesterday'
        }
      ]
    },
    {
      id: 'done',
      title: 'Completed',
      color: googleStitchColors.tertiary,
      tasks: [
        {
          id: '7',
          title: 'Set Up Organizational Structure',
          description: 'Implement proper agent hierarchy and reporting',
          priority: 'high',
          assignee: 'CEO MideSquare',
          tags: ['Organization', 'Structure']
        },
        {
          id: '8',
          title: 'Configure CI/CD Pipeline',
          description: 'Automated testing and deployment workflows',
          priority: 'medium',
          assignee: 'Agent Alpha',
          tags: ['DevOps', 'Automation']
        }
      ]
    }
  ]

  const allTasks = columns.reduce((acc, col) => acc + col.tasks.length, 0)
  const highPriorityTasks = columns.reduce((acc, col) => 
    acc + col.tasks.filter(task => task.priority === 'high').length, 0
  )

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
                Task Board
              </h1>
              <p
                style={{
                  ...googleStitchTypography.body.small,
                  color: googleStitchColors.text.secondary
                }}
              >
                Kanban-style project management and task tracking
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Filter Dropdown */}
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
              <option value="all">All Tasks</option>
              <option value="high">High Priority</option>
              <option value="mine">My Tasks</option>
            </select>

            <StitchButton variant="outlined" size="small">
              <MaterialIcon name="filter_list" />
              Filter
            </StitchButton>
            <StitchButton variant="primary">
              <MaterialIcon name="add" />
              New Task
            </StitchButton>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: 'Total Tasks',
              value: allTasks.toString(),
              icon: 'assignment',
              color: googleStitchColors.primary
            },
            {
              label: 'In Progress',
              value: columns.find(c => c.id === 'inprogress')?.tasks.length.toString() || '0',
              icon: 'pending',
              color: googleStitchColors.secondary
            },
            {
              label: 'High Priority',
              value: highPriorityTasks.toString(),
              icon: 'priority_high',
              color: googleStitchColors.error
            },
            {
              label: 'Completed',
              value: columns.find(c => c.id === 'done')?.tasks.length.toString() || '0',
              icon: 'check_circle',
              color: googleStitchColors.tertiary
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

        {/* Kanban Board */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {columns.map((column) => (
            <ColumnComponent
              key={column.id}
              column={column}
              onTaskMove={(taskId, newColumn) => {
                // Handle task movement between columns
                console.log(`Moving task ${taskId} to ${newColumn}`)
              }}
            />
          ))}
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