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

// System Status Component
interface SystemStatus {
  component: string
  status: 'healthy' | 'warning' | 'error'
  message: string
  lastChecked: Date
  uptime?: string
}

interface SystemStatusCardProps {
  status: SystemStatus
}

const SystemStatusCard = ({ status }: SystemStatusCardProps) => {
  const statusConfig = {
    healthy: {
      color: googleStitchColors.tertiary,
      icon: 'check_circle',
      bgColor: `${googleStitchColors.tertiary}20`
    },
    warning: {
      color: googleStitchColors.secondary,
      icon: 'warning',
      bgColor: `${googleStitchColors.secondary}20`
    },
    error: {
      color: googleStitchColors.error,
      icon: 'error',
      bgColor: `${googleStitchColors.error}20`
    }
  }

  const config = statusConfig[status.status]

  return (
    <div
      className="p-4 rounded-lg"
      style={{
        backgroundColor: googleStitchColors.surface.secondary,
        border: `1px solid ${googleStitchColors.border.secondary}`
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: config.bgColor }}
          >
            <MaterialIcon
              name={config.icon}
              style={{ color: config.color, fontSize: '16px' }}
            />
          </div>
          <h4
            className="font-medium"
            style={{
              ...googleStitchTypography.body.medium,
              color: googleStitchColors.text.primary,
              fontWeight: '500'
            }}
          >
            {status.component}
          </h4>
        </div>
        
        <span
          className="text-xs font-medium uppercase tracking-wider"
          style={{
            color: config.color,
            ...googleStitchTypography.label.small
          }}
        >
          {status.status}
        </span>
      </div>

      <p
        className="mb-3"
        style={{
          ...googleStitchTypography.body.small,
          color: googleStitchColors.text.secondary
        }}
      >
        {status.message}
      </p>

      <div className="flex justify-between items-center">
        <span
          style={{
            ...googleStitchTypography.label.small,
            color: googleStitchColors.text.tertiary
          }}
        >
          Last checked: {status.lastChecked.toLocaleTimeString()}
        </span>
        
        {status.uptime && (
          <span
            style={{
              ...googleStitchTypography.label.small,
              color: googleStitchColors.text.secondary
            }}
          >
            Uptime: {status.uptime}
          </span>
        )}
      </div>
    </div>
  )
}

// Configuration Panel Component
interface ConfigSetting {
  key: string
  label: string
  value: string | number | boolean
  type: 'text' | 'number' | 'boolean' | 'select'
  options?: string[]
  description?: string
}

interface ConfigPanelProps {
  title: string
  settings: ConfigSetting[]
  onSave?: (settings: ConfigSetting[]) => void
}

const ConfigPanel = ({ title, settings, onSave }: ConfigPanelProps) => {
  const [localSettings, setLocalSettings] = useState(settings)

  const handleChange = (key: string, value: any) => {
    setLocalSettings(prev => 
      prev.map(setting => 
        setting.key === key ? { ...setting, value } : setting
      )
    )
  }

  return (
    <div
      className="p-6 rounded-xl"
      style={{
        backgroundColor: googleStitchColors.surface.secondary,
        border: `1px solid ${googleStitchColors.border.primary}`
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3
          style={{
            ...googleStitchTypography.headline.small,
            fontWeight: '600',
            color: googleStitchColors.text.primary
          }}
        >
          {title}
        </h3>
        
        <StitchButton 
          variant="primary" 
          size="small"
          onClick={() => onSave?.(localSettings)}
        >
          <MaterialIcon name="save" />
          Save
        </StitchButton>
      </div>

      <div className="space-y-4">
        {localSettings.map((setting) => (
          <div key={setting.key}>
            <label
              className="block mb-2"
              style={{
                ...googleStitchTypography.label.medium,
                color: googleStitchColors.text.secondary
              }}
            >
              {setting.label}
            </label>
            
            {setting.type === 'text' && (
              <input
                type="text"
                value={setting.value as string}
                onChange={(e) => handleChange(setting.key, e.target.value)}
                className="w-full px-3 py-2 rounded-lg"
                style={{
                  backgroundColor: googleStitchColors.surface.tertiary,
                  border: `1px solid ${googleStitchColors.border.primary}`,
                  color: googleStitchColors.text.primary,
                  ...googleStitchTypography.body.small
                }}
              />
            )}
            
            {setting.type === 'number' && (
              <input
                type="number"
                value={setting.value as number}
                onChange={(e) => handleChange(setting.key, parseInt(e.target.value))}
                className="w-full px-3 py-2 rounded-lg"
                style={{
                  backgroundColor: googleStitchColors.surface.tertiary,
                  border: `1px solid ${googleStitchColors.border.primary}`,
                  color: googleStitchColors.text.primary,
                  ...googleStitchTypography.body.small
                }}
              />
            )}
            
            {setting.type === 'boolean' && (
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={setting.value as boolean}
                  onChange={(e) => handleChange(setting.key, e.target.checked)}
                  className="rounded"
                  style={{
                    accentColor: googleStitchColors.primary
                  }}
                />
                <span
                  style={{
                    ...googleStitchTypography.body.small,
                    color: googleStitchColors.text.primary
                  }}
                >
                  {setting.value ? 'Enabled' : 'Disabled'}
                </span>
              </label>
            )}
            
            {setting.type === 'select' && setting.options && (
              <select
                value={setting.value as string}
                onChange={(e) => handleChange(setting.key, e.target.value)}
                className="w-full px-3 py-2 rounded-lg"
                style={{
                  backgroundColor: googleStitchColors.surface.tertiary,
                  border: `1px solid ${googleStitchColors.border.primary}`,
                  color: googleStitchColors.text.primary,
                  ...googleStitchTypography.body.small
                }}
              >
                {setting.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
            
            {setting.description && (
              <p
                className="mt-1"
                style={{
                  ...googleStitchTypography.label.small,
                  color: googleStitchColors.text.tertiary
                }}
              >
                {setting.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function GoogleStitchSystemPage() {
  const [activeTab, setActiveTab] = useState<'status' | 'config' | 'logs'>('status')

  // Sample system status data
  const systemStatuses: SystemStatus[] = [
    {
      component: 'API Gateway',
      status: 'healthy',
      message: 'All endpoints responding normally',
      lastChecked: new Date(Date.now() - 1000 * 30),
      uptime: '99.9%'
    },
    {
      component: 'Database Cluster',
      status: 'healthy',
      message: 'Primary and backup databases operational',
      lastChecked: new Date(Date.now() - 1000 * 45),
      uptime: '99.8%'
    },
    {
      component: 'Agent Orchestrator',
      status: 'warning',
      message: 'High memory usage detected on node 2',
      lastChecked: new Date(Date.now() - 1000 * 15),
      uptime: '98.7%'
    },
    {
      component: 'Load Balancer',
      status: 'healthy',
      message: 'Traffic distributed evenly across 4 nodes',
      lastChecked: new Date(Date.now() - 1000 * 60),
      uptime: '100%'
    },
    {
      component: 'Message Queue',
      status: 'healthy',
      message: 'Processing queue within normal parameters',
      lastChecked: new Date(Date.now() - 1000 * 20),
      uptime: '99.5%'
    },
    {
      component: 'File Storage',
      status: 'error',
      message: 'Storage capacity at 95% - cleanup required',
      lastChecked: new Date(Date.now() - 1000 * 10),
      uptime: '96.2%'
    }
  ]

  // Sample configuration settings
  const generalSettings: ConfigSetting[] = [
    {
      key: 'maxAgents',
      label: 'Maximum Concurrent Agents',
      value: 50,
      type: 'number',
      description: 'Maximum number of agents that can run simultaneously'
    },
    {
      key: 'autoScaling',
      label: 'Auto Scaling',
      value: true,
      type: 'boolean',
      description: 'Automatically scale agent instances based on workload'
    },
    {
      key: 'logLevel',
      label: 'Log Level',
      value: 'info',
      type: 'select',
      options: ['debug', 'info', 'warn', 'error'],
      description: 'System logging verbosity level'
    },
    {
      key: 'sessionTimeout',
      label: 'Session Timeout (minutes)',
      value: 30,
      type: 'number',
      description: 'Idle session timeout in minutes'
    }
  ]

  const securitySettings: ConfigSetting[] = [
    {
      key: 'encryption',
      label: 'Enable Encryption',
      value: true,
      type: 'boolean',
      description: 'Encrypt all data in transit and at rest'
    },
    {
      key: 'authMethod',
      label: 'Authentication Method',
      value: 'oauth',
      type: 'select',
      options: ['basic', 'oauth', 'saml'],
      description: 'Primary authentication mechanism'
    },
    {
      key: 'passwordPolicy',
      label: 'Enforce Strong Passwords',
      value: true,
      type: 'boolean',
      description: 'Require complex passwords for all users'
    }
  ]

  const healthyCount = systemStatuses.filter(s => s.status === 'healthy').length
  const warningCount = systemStatuses.filter(s => s.status === 'warning').length
  const errorCount = systemStatuses.filter(s => s.status === 'error').length

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
                System Configuration
              </h1>
              <p
                style={{
                  ...googleStitchTypography.body.small,
                  color: googleStitchColors.text.secondary
                }}
              >
                System status monitoring and configuration management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <StitchButton variant="outlined" size="small">
              <MaterialIcon name="download" />
              Export Logs
            </StitchButton>
            <StitchButton variant="primary">
              <MaterialIcon name="backup" />
              Backup Config
            </StitchButton>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* System Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div
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
                System Health
              </h3>
              <MaterialIcon
                name="favorite"
                style={{ color: googleStitchColors.tertiary, fontSize: '20px' }}
              />
            </div>
            <div
              style={{
                ...googleStitchTypography.headline.medium,
                color: googleStitchColors.text.primary,
                fontWeight: '600'
              }}
            >
              {Math.round((healthyCount / systemStatuses.length) * 100)}%
            </div>
          </div>

          {[
            {
              label: 'Healthy',
              value: healthyCount.toString(),
              icon: 'check_circle',
              color: googleStitchColors.tertiary
            },
            {
              label: 'Warnings',
              value: warningCount.toString(),
              icon: 'warning',
              color: googleStitchColors.secondary
            },
            {
              label: 'Errors',
              value: errorCount.toString(),
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

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex gap-2">
            {[
              { key: 'status', label: 'System Status', icon: 'monitor_heart' },
              { key: 'config', label: 'Configuration', icon: 'settings' },
              { key: 'logs', label: 'System Logs', icon: 'description' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.key ? 'font-medium' : ''
                }`}
                style={{
                  backgroundColor: activeTab === tab.key 
                    ? `${googleStitchColors.primary}20` 
                    : googleStitchColors.surface.secondary,
                  color: activeTab === tab.key 
                    ? googleStitchColors.primary 
                    : googleStitchColors.text.secondary,
                  border: `1px solid ${
                    activeTab === tab.key 
                      ? googleStitchColors.primary 
                      : googleStitchColors.border.primary
                  }`,
                  ...googleStitchTypography.body.medium
                }}
              >
                <MaterialIcon name={tab.icon} style={{ fontSize: '18px' }} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'status' && (
          <div>
            <h2
              className="mb-6"
              style={{
                ...googleStitchTypography.headline.small,
                fontWeight: '600',
                color: googleStitchColors.text.primary
              }}
            >
              Component Status
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {systemStatuses.map((status, index) => (
                <SystemStatusCard key={index} status={status} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'config' && (
          <div>
            <h2
              className="mb-6"
              style={{
                ...googleStitchTypography.headline.small,
                fontWeight: '600',
                color: googleStitchColors.text.primary
              }}
            >
              System Configuration
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ConfigPanel 
                title="General Settings"
                settings={generalSettings}
                onSave={(settings) => console.log('Saving general settings:', settings)}
              />
              <ConfigPanel 
                title="Security Settings"
                settings={securitySettings}
                onSave={(settings) => console.log('Saving security settings:', settings)}
              />
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div>
            <h2
              className="mb-6"
              style={{
                ...googleStitchTypography.headline.small,
                fontWeight: '600',
                color: googleStitchColors.text.primary
              }}
            >
              System Logs
            </h2>
            <div
              className="p-6 rounded-xl font-mono text-sm"
              style={{
                backgroundColor: googleStitchColors.surface.secondary,
                border: `1px solid ${googleStitchColors.border.primary}`,
                color: googleStitchColors.text.primary
              }}
            >
              <div className="space-y-1 max-h-96 overflow-y-auto">
                <div>[2024-03-24 08:45:23] INFO: System startup completed successfully</div>
                <div>[2024-03-24 08:45:24] INFO: Agent orchestrator initialized with 50 slots</div>
                <div>[2024-03-24 08:45:25] INFO: Database connection pool established (10 connections)</div>
                <div style={{ color: googleStitchColors.secondary }}>[2024-03-24 08:45:26] WARN: High memory usage detected on node-2 (87%)</div>
                <div>[2024-03-24 08:45:27] INFO: Load balancer health check passed</div>
                <div>[2024-03-24 08:45:28] INFO: Message queue consumer started</div>
                <div style={{ color: googleStitchColors.error }}>[2024-03-24 08:45:29] ERROR: Storage capacity warning: 95% used (47.5GB/50GB)</div>
                <div>[2024-03-24 08:45:30] INFO: Authentication service ready</div>
                <div>[2024-03-24 08:45:31] INFO: API gateway listening on port 8080</div>
                <div>[2024-03-24 08:45:32] INFO: Dashboard deployment completed successfully</div>
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