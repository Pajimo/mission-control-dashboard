// Mock API for Cortex Command Center
export interface DashboardData {
  agents: {
    total: number
    online: number
    active: number
    standby: number
    offline: number
  }
  missions: {
    total: number
    active: number
    pending: number
    completed: number
    failed: number
  }
  performance: {
    throughput: number
    latency: number
    uptime: number
    efficiency: number
    completionRate: number
    errorRate: number
    averageResponse: number
  }
  system: {
    cpu: number
    memory: number
    network: number
    storage: number
    uptime: string
    gatewayStatus: string
    networkStatus: string
  }
  gateways: {
    total: number
    connected: number
    status: 'operational' | 'degraded' | 'critical'
  }
  tasks: {
    total: number
    inbox: number
    inProgress: number
    review: number
    completed: number
  }
  sessions: Array<{
    id: string
    type: string
    status: string
    lastActivity: Date
  }>
  lastUpdated: Date
}

export async function fetchDashboardData(): Promise<DashboardData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500))
  
  // Generate realistic mock data with some randomness
  const baseData = {
    agents: {
      total: 47 + Math.floor(Math.random() * 6) - 3,
      online: 0,
      active: 0,
      standby: 0,
      offline: 0
    },
    missions: {
      total: 156 + Math.floor(Math.random() * 20) - 10,
      active: 23 + Math.floor(Math.random() * 10) - 5,
      pending: 8 + Math.floor(Math.random() * 6) - 3,
      completed: 0,
      failed: Math.floor(Math.random() * 3)
    },
    performance: {
      throughput: 847.3 + Math.random() * 100 - 50,
      latency: 12.5 + Math.random() * 5 - 2.5,
      uptime: 99.8 + Math.random() * 0.2 - 0.1,
      efficiency: 94.2 + Math.random() * 5 - 2.5,
      completionRate: 15.7 + Math.random() * 5 - 2.5,
      errorRate: 0.3 + Math.random() * 0.5,
      averageResponse: 125 + Math.random() * 50 - 25
    },
    system: {
      cpu: 34 + Math.floor(Math.random() * 30),
      memory: 62 + Math.floor(Math.random() * 20) - 10,
      network: 98 + Math.floor(Math.random() * 4) - 2,
      storage: 45 + Math.floor(Math.random() * 20) - 10,
      uptime: '15d 7h 23m',
      gatewayStatus: 'operational',
      networkStatus: 'operational'
    },
    gateways: {
      total: 12,
      connected: 11 + Math.floor(Math.random() * 2),
      status: 'operational' as const
    },
    tasks: {
      total: 0,
      inbox: 12 + Math.floor(Math.random() * 8),
      inProgress: 0,
      review: 5 + Math.floor(Math.random() * 4),
      completed: 0
    },
    sessions: [
      { id: 'sess-1', type: 'agent', status: 'active', lastActivity: new Date(Date.now() - 1000 * 60 * 2) },
      { id: 'sess-2', type: 'swarm', status: 'idle', lastActivity: new Date(Date.now() - 1000 * 60 * 15) },
      { id: 'sess-3', type: 'monitor', status: 'active', lastActivity: new Date(Date.now() - 1000 * 30) },
    ],
    lastUpdated: new Date()
  }

  // Calculate derived values
  baseData.agents.offline = Math.max(0, baseData.agents.total - baseData.agents.online)
  baseData.agents.online = baseData.agents.total - baseData.agents.offline
  baseData.agents.active = Math.min(baseData.agents.online, baseData.missions.active)
  baseData.agents.standby = baseData.agents.online - baseData.agents.active

  baseData.missions.completed = Math.max(0, baseData.missions.total - baseData.missions.active - baseData.missions.pending - baseData.missions.failed)
  
  baseData.tasks.total = baseData.tasks.inbox + baseData.tasks.inProgress + baseData.tasks.review + baseData.tasks.completed
  baseData.tasks.inProgress = baseData.missions.active
  baseData.tasks.completed = baseData.missions.completed

  return baseData as DashboardData
}