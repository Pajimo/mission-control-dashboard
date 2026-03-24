'use client'

import { Bot, Activity, CheckCircle, AlertTriangle, Clock } from 'lucide-react'

interface Agent {
  id: string
  name: string
  status: 'online' | 'busy' | 'offline' | 'error'
  mission?: string
  performance: number
  lastSeen: string
}

const mockAgents: Agent[] = [
  { id: 'A001', name: 'Alpha-7', status: 'online', mission: 'Operation Thunderstrike', performance: 98, lastSeen: '2m ago' },
  { id: 'A002', name: 'Beta-3', status: 'busy', mission: 'Data Extraction Phoenix', performance: 87, lastSeen: '5m ago' },
  { id: 'A003', name: 'Gamma-1', status: 'online', performance: 94, lastSeen: '1m ago' },
  { id: 'A004', name: 'Delta-9', status: 'online', mission: 'Network Infiltration', performance: 91, lastSeen: '3m ago' },
  { id: 'A005', name: 'Echo-5', status: 'offline', performance: 0, lastSeen: '15m ago' },
  { id: 'A006', name: 'Foxtrot-2', status: 'online', performance: 96, lastSeen: '30s ago' },
]

export function RufloAgentGrid() {
  const getStatusIcon = (status: Agent['status']) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="h-4 w-4 text-cortex-success" />
      case 'busy':
        return <Activity className="h-4 w-4 text-cortex-warning animate-pulse" />
      case 'offline':
        return <AlertTriangle className="h-4 w-4 text-cortex-danger" />
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-cortex-danger" />
    }
  }

  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'online':
        return 'border-cortex-success/30 bg-cortex-success/5'
      case 'busy':
        return 'border-cortex-warning/30 bg-cortex-warning/5'
      case 'offline':
        return 'border-cortex-danger/30 bg-cortex-danger/5'
      case 'error':
        return 'border-cortex-danger/30 bg-cortex-danger/5'
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {mockAgents.map((agent) => (
        <div
          key={agent.id}
          className={`cortex-card p-4 hover:scale-105 transition-all duration-200 ${getStatusColor(agent.status)}`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-cortex-primary/10 rounded-lg">
                <Bot className="h-4 w-4 text-cortex-primary" />
              </div>
              <div>
                <div className="font-medium text-cortex-text-primary">{agent.name}</div>
                <div className="cortex-body-small text-cortex-text-tertiary">{agent.id}</div>
              </div>
            </div>
            {getStatusIcon(agent.status)}
          </div>
          
          {agent.mission && (
            <div className="mb-2">
              <div className="cortex-body-small text-cortex-text-secondary">{agent.mission}</div>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="cortex-body-small text-cortex-text-tertiary">
              Performance: {agent.performance}%
            </div>
            <div className="cortex-body-small text-cortex-text-tertiary flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {agent.lastSeen}
            </div>
          </div>
          
          <div className="mt-2 w-full h-1 bg-cortex-bg-primary rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cortex-primary to-cortex-accent transition-all duration-500"
              style={{ width: `${agent.performance}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}