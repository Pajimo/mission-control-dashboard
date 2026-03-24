'use client'

import { BarChart3, TrendingUp, TrendingDown, Activity, Clock, Zap } from 'lucide-react'

interface MetricData {
  label: string
  value: number
  previous: number
  unit: string
}

const performanceMetrics: MetricData[] = [
  { label: 'Mission Success Rate', value: 94.2, previous: 91.7, unit: '%' },
  { label: 'Average Response Time', value: 12.5, previous: 15.3, unit: 'ms' },
  { label: 'Agent Utilization', value: 78.6, previous: 82.1, unit: '%' },
  { label: 'Network Throughput', value: 847.3, previous: 723.8, unit: 'MB/s' },
  { label: 'System Uptime', value: 99.8, previous: 99.6, unit: '%' },
  { label: 'Error Rate', value: 0.3, previous: 0.7, unit: '%' },
]

const hourlyData = [
  { hour: '00:00', missions: 12, agents: 34, load: 45 },
  { hour: '02:00', missions: 8, agents: 28, load: 38 },
  { hour: '04:00', missions: 6, agents: 22, load: 32 },
  { hour: '06:00', missions: 15, agents: 41, load: 58 },
  { hour: '08:00', missions: 23, agents: 45, load: 72 },
  { hour: '10:00', missions: 28, agents: 47, load: 81 },
  { hour: '12:00', missions: 31, agents: 47, load: 89 },
  { hour: '14:00', missions: 27, agents: 44, load: 76 },
  { hour: '16:00', missions: 25, agents: 42, load: 71 },
  { hour: '18:00', missions: 22, agents: 39, load: 65 },
  { hour: '20:00', missions: 18, agents: 36, load: 52 },
  { hour: '22:00', missions: 14, agents: 32, load: 47 },
]

export function PerformanceAnalytics() {
  const getTrendIcon = (current: number, previous: number) => {
    const isPositive = current > previous
    return isPositive ? (
      <TrendingUp className="h-4 w-4 text-cortex-success" />
    ) : (
      <TrendingDown className="h-4 w-4 text-cortex-danger" />
    )
  }

  const getTrendColor = (current: number, previous: number) => {
    const isPositive = current > previous
    return isPositive ? 'text-cortex-success' : 'text-cortex-danger'
  }

  const calculatePercentChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100
    return Math.abs(change).toFixed(1)
  }

  const maxMissions = Math.max(...hourlyData.map(d => d.missions))
  const maxLoad = Math.max(...hourlyData.map(d => d.load))

  return (
    <div className="space-y-6">
      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {performanceMetrics.map((metric, index) => (
          <div key={index} className="cortex-card p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="cortex-label">{metric.label}</div>
              {getTrendIcon(metric.value, metric.previous)}
            </div>
            <div className="flex items-end gap-2 mb-2">
              <div className="text-2xl font-bold text-cortex-primary">
                {metric.value}
              </div>
              <div className="cortex-body-small text-cortex-text-tertiary">{metric.unit}</div>
            </div>
            <div className={`cortex-body-small flex items-center gap-1 ${getTrendColor(metric.value, metric.previous)}`}>
              <span>
                {metric.value > metric.previous ? '+' : '-'}
                {calculatePercentChange(metric.value, metric.previous)}%
              </span>
              <span className="text-cortex-text-tertiary">vs previous</span>
            </div>
          </div>
        ))}
      </div>

      {/* 24-Hour Activity Chart */}
      <div className="cortex-card p-6">
        <h4 className="cortex-heading-3 mb-4 flex items-center gap-2">
          <Activity className="h-5 w-5 text-cortex-primary" />
          24-Hour Activity Overview
        </h4>
        
        <div className="space-y-4">
          {/* Chart Legend */}
          <div className="flex items-center gap-6 cortex-body-small">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-cortex-primary rounded"></div>
              <span className="text-cortex-text-secondary">Active Missions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-cortex-secondary rounded"></div>
              <span className="text-cortex-text-secondary">System Load</span>
            </div>
          </div>
          
          {/* Simple Bar Chart */}
          <div className="grid grid-cols-12 gap-1 h-32">
            {hourlyData.map((data, index) => (
              <div key={index} className="flex flex-col justify-end items-center gap-1 group">
                {/* Mission Bar */}
                <div 
                  className="w-full bg-cortex-primary/60 rounded-sm transition-all duration-200 group-hover:bg-cortex-primary"
                  style={{ 
                    height: `${(data.missions / maxMissions) * 60}%`,
                    minHeight: '4px'
                  }}
                  title={`${data.missions} missions at ${data.hour}`}
                />
                {/* Load Bar */}
                <div 
                  className="w-full bg-cortex-secondary/60 rounded-sm transition-all duration-200 group-hover:bg-cortex-secondary"
                  style={{ 
                    height: `${(data.load / maxLoad) * 40}%`,
                    minHeight: '2px'
                  }}
                  title={`${data.load}% load at ${data.hour}`}
                />
                {/* Time Label */}
                <div className="cortex-body-small text-cortex-text-muted mt-1 transform -rotate-45 origin-bottom-left text-xs">
                  {data.hour.split(':')[0]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Status */}
        <div className="cortex-card p-6">
          <h4 className="cortex-heading-3 mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-cortex-accent" />
            Current Performance
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="cortex-body text-cortex-text-secondary">Active Agents</span>
              <span className="font-medium text-cortex-primary">42/47</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="cortex-body text-cortex-text-secondary">CPU Usage</span>
              <span className="font-medium text-cortex-secondary">67%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="cortex-body text-cortex-text-secondary">Memory Usage</span>
              <span className="font-medium text-cortex-accent">54%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="cortex-body text-cortex-text-secondary">Network Latency</span>
              <span className="font-medium text-cortex-success">12.5ms</span>
            </div>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="cortex-card p-6">
          <h4 className="cortex-heading-3 mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-cortex-warning" />
            Recent Events
          </h4>
          <div className="space-y-3">
            {[
              { time: '14:32', type: 'success', message: 'Mission "Operation Phoenix" completed successfully' },
              { time: '14:28', type: 'warning', message: 'Agent Beta-3 experiencing high load' },
              { time: '14:25', type: 'info', message: 'New mission assigned to Alpha-7' },
              { time: '14:20', type: 'success', message: 'Network optimization completed' },
            ].map((event, index) => (
              <div key={index} className="flex items-start gap-3 p-2 rounded-lg bg-cortex-bg-tertiary">
                <div className={`cortex-status-dot mt-2 ${
                  event.type === 'success' ? 'cortex-status-online' :
                  event.type === 'warning' ? 'cortex-status-warning' :
                  'cortex-status-info'
                }`} />
                <div className="flex-1">
                  <div className="cortex-body-small text-cortex-text-secondary mb-1">{event.time}</div>
                  <div className="cortex-body text-cortex-text-primary">{event.message}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}