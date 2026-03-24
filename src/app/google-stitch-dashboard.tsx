'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  googleStitchColors, 
  googleStitchTypography,
  googleStitchComponents,
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
}

const StitchButton = ({ variant, children, onClick, className = '' }: StitchButtonProps) => {
  const styles = googleStitchComponents.buttons[variant]
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity ${className}`}
      style={{
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        border: styles.border,
        borderRadius: styles.borderRadius,
        padding: styles.padding,
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
        textTransform: styles.textTransform,
        boxShadow: 'boxShadow' in styles ? styles.boxShadow : undefined,
        fontFamily: googleStitchTypography.fontFamily.primary
      }}
    >
      {children}
    </button>
  )
}

// Google Stitch Card Component
interface StitchCardProps {
  variant?: 'primary' | 'elevated'
  children: React.ReactNode
  className?: string
}

const StitchCard = ({ variant = 'primary', children, className = '' }: StitchCardProps) => {
  const styles = googleStitchComponents.cards[variant]
  return (
    <div
      className={`${className}`}
      style={{
        backgroundColor: styles.backgroundColor,
        border: styles.border,
        borderRadius: styles.borderRadius,
        padding: styles.padding,
        boxShadow: 'boxShadow' in styles ? styles.boxShadow : undefined
      }}
    >
      {children}
    </div>
  )
}

// Metric Card with Google Stitch Design
interface MetricCardProps {
  title: string
  value: string
  subtitle?: string
  icon: string
  color: 'primary' | 'secondary' | 'tertiary'
  trend?: {
    direction: 'up' | 'down' | 'stable'
    value: string
  }
}

const MetricCard = ({ title, value, subtitle, icon, color, trend }: MetricCardProps) => {
  const colorMap = {
    primary: googleStitchColors.primary,
    secondary: googleStitchColors.secondary,
    tertiary: googleStitchColors.tertiary
  }

  const accentColor = colorMap[color]

  return (
    <StitchCard variant="elevated" className="h-full">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Title */}
          <div 
            className="text-xs font-medium mb-3 uppercase tracking-wider"
            style={{ 
              color: googleStitchColors.text.secondary,
              ...googleStitchTypography.label.medium
            }}
          >
            {title}
          </div>
          
          {/* Value */}
          <div 
            className="mb-2"
            style={{ 
              color: googleStitchColors.text.primary,
              ...googleStitchTypography.headline.medium
            }}
          >
            {value}
          </div>
          
          {/* Subtitle */}
          {subtitle && (
            <div 
              className="mb-3"
              style={{ 
                color: googleStitchColors.text.tertiary,
                ...googleStitchTypography.body.small
              }}
            >
              {subtitle}
            </div>
          )}
          
          {/* Trend */}
          {trend && (
            <div className="flex items-center gap-2">
              <MaterialIcon 
                name={trend.direction === 'up' ? 'trending_up' : trend.direction === 'down' ? 'trending_down' : 'trending_flat'}
                className="text-sm"
              />
              <span 
                className="text-xs font-medium"
                style={{ 
                  color: googleStitchColors.text.secondary,
                  ...googleStitchTypography.label.small
                }}
              >
                {trend.value}
              </span>
            </div>
          )}
        </div>
        
        {/* Icon */}
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
        >
          <MaterialIcon name={icon} className="text-xl" />
        </div>
      </div>
    </StitchCard>
  )
}

// Navigation Component
const Navigation = () => {
  const navigationItems = [
    { icon: 'dashboard', label: 'Overview', href: '/' },
    { icon: 'smart_toy', label: 'Agents', href: '/agents' },
    { icon: 'assignment', label: 'Tasks', href: '/task-board' },
    { icon: 'people', label: 'Teams', href: '/teams' },
    { icon: 'analytics', label: 'Operations', href: '/operations' },
    { icon: 'settings', label: 'System', href: '/system' }
  ]

  return (
    <nav className="p-6">
      <div className="space-y-2">
        {navigationItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:opacity-80"
            style={{
              backgroundColor: index === 0 ? `${googleStitchColors.primary}20` : 'transparent',
              color: index === 0 ? googleStitchColors.primary : googleStitchColors.text.secondary
            }}
          >
            <MaterialIcon name={item.icon} className="text-lg" />
            <span style={{ ...googleStitchTypography.body.medium, fontWeight: '500' }}>
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  )
}

// Search Component
const SearchBar = () => (
  <div 
    className="flex items-center gap-3 max-w-md"
    style={googleStitchComponents.search.container}
  >
    <MaterialIcon name="search" />
    <input
      type="text"
      placeholder="Search agents, tasks, or teams..."
      style={googleStitchComponents.search.input}
    />
  </div>
)

// Main Dashboard
export default function GoogleStitchDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
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
          {/* Left Section */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:opacity-80"
              style={{ color: googleStitchColors.text.primary }}
            >
              <MaterialIcon name="menu" />
            </button>
            
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: googleStitchColors.primary }}
              >
                <MaterialIcon name="dashboard" className="text-white text-xl" />
              </div>
              <div>
                <h1 
                  style={{ 
                    ...googleStitchTypography.headline.small,
                    fontWeight: '600',
                    color: googleStitchColors.text.primary
                  }}
                >
                  Mission Control
                </h1>
                <p 
                  style={{ 
                    ...googleStitchTypography.body.small,
                    color: googleStitchColors.text.secondary
                  }}
                >
                  OpenClaw Agent Dashboard
                </p>
              </div>
            </div>
            
            {/* Search */}
            <SearchBar />
          </div>
          
          {/* Right Section */}
          <div className="flex items-center gap-4">
            <StitchButton variant="outlined" onClick={handleRefresh}>
              <MaterialIcon 
                name="refresh" 
                className={refreshing ? 'animate-spin' : ''} 
              />
              Refresh
            </StitchButton>
            
            <StitchButton variant="primary">
              <MaterialIcon name="add" />
              New Task
            </StitchButton>
            
            <button 
              className="p-2 rounded-lg hover:opacity-80"
              style={{ color: googleStitchColors.text.secondary }}
            >
              <MaterialIcon name="notifications" />
            </button>
            
            <button 
              className="p-2 rounded-lg hover:opacity-80"
              style={{ color: googleStitchColors.text.secondary }}
            >
              <MaterialIcon name="account_circle" className="text-2xl" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside 
          className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-30 w-64 transform border-r transition-transform lg:relative lg:translate-x-0`}
          style={{ 
            backgroundColor: googleStitchColors.surface.secondary,
            borderColor: googleStitchColors.border.primary
          }}
        >
          <Navigation />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Status Bar */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 
                style={{ 
                  ...googleStitchTypography.headline.medium,
                  fontWeight: '600',
                  color: googleStitchColors.text.primary
                }}
              >
                Dashboard Overview
              </h2>
              <p 
                style={{ 
                  ...googleStitchTypography.body.medium,
                  color: googleStitchColors.text.secondary
                }}
              >
                Real-time monitoring and control center
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: googleStitchColors.tertiary }}
              ></div>
              <span 
                style={{ 
                  ...googleStitchTypography.label.medium,
                  color: googleStitchColors.tertiary
                }}
              >
                All Systems Operational
              </span>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Active Agents"
              value="42"
              subtitle="12 idle, 30 working"
              icon="smart_toy"
              color="primary"
              trend={{ direction: 'up', value: '+5 from yesterday' }}
            />
            <MetricCard
              title="Tasks Completed"
              value="1,247"
              subtitle="Today"
              icon="check_circle"
              color="tertiary"
              trend={{ direction: 'up', value: '+15% vs yesterday' }}
            />
            <MetricCard
              title="Error Rate"
              value="0.8%"
              subtitle="Last 24 hours"
              icon="error_outline"
              color="secondary"
              trend={{ direction: 'down', value: '-2.1% improvement' }}
            />
            <MetricCard
              title="Response Time"
              value="120ms"
              subtitle="Average"
              icon="speed"
              color="primary"
              trend={{ direction: 'stable', value: 'Within normal range' }}
            />
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Agent Activity */}
            <div className="lg:col-span-2">
              <StitchCard>
                <div className="mb-6 flex items-center justify-between">
                  <h3 
                    style={{ 
                      ...googleStitchTypography.headline.small,
                      fontWeight: '600',
                      color: googleStitchColors.text.primary
                    }}
                  >
                    Agent Activity
                  </h3>
                  <StitchButton variant="outlined">
                    <MaterialIcon name="visibility" />
                    View All
                  </StitchButton>
                </div>
                
                <div className="space-y-4">
                  {[
                    { name: 'Agent Alpha', status: 'Processing task #1247', time: '2 min ago', type: 'active' },
                    { name: 'Agent Beta', status: 'Completed deployment', time: '5 min ago', type: 'success' },
                    { name: 'Agent Gamma', status: 'Awaiting instructions', time: '12 min ago', type: 'idle' },
                    { name: 'Agent Delta', status: 'Error in task execution', time: '15 min ago', type: 'error' }
                  ].map((agent, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: googleStitchColors.surface.tertiary }}>
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ 
                            backgroundColor: agent.type === 'active' ? googleStitchColors.primary :
                                          agent.type === 'success' ? googleStitchColors.tertiary :
                                          agent.type === 'error' ? googleStitchColors.error :
                                          googleStitchColors.text.tertiary
                          }}
                        ></div>
                        <div>
                          <div style={{ ...googleStitchTypography.body.medium, fontWeight: '500', color: googleStitchColors.text.primary }}>
                            {agent.name}
                          </div>
                          <div style={{ ...googleStitchTypography.body.small, color: googleStitchColors.text.secondary }}>
                            {agent.status}
                          </div>
                        </div>
                      </div>
                      <span style={{ ...googleStitchTypography.label.small, color: googleStitchColors.text.tertiary }}>
                        {agent.time}
                      </span>
                    </div>
                  ))}
                </div>
              </StitchCard>
            </div>

            {/* Quick Actions */}
            <div>
              <StitchCard>
                <h3 
                  className="mb-6"
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
                    <MaterialIcon name="add" />
                    Create New Agent
                  </StitchButton>
                  <StitchButton variant="outlined" className="w-full justify-start">
                    <MaterialIcon name="assignment" />
                    View Task Board
                  </StitchButton>
                  <StitchButton variant="outlined" className="w-full justify-start">
                    <MaterialIcon name="analytics" />
                    Performance Report
                  </StitchButton>
                  <StitchButton variant="outlined" className="w-full justify-start">
                    <MaterialIcon name="settings" />
                    System Settings
                  </StitchButton>
                </div>
              </StitchCard>
            </div>
          </div>
        </main>
      </div>

      {/* Material Icons Font */}
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
    </div>
  )
}