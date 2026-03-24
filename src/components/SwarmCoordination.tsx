'use client'

import { useState } from 'react'
import { Network, Users, Zap, Target, Activity, ArrowRight } from 'lucide-react'

interface SwarmNode {
  id: string
  type: 'coordinator' | 'agent' | 'relay'
  name: string
  connections: string[]
  load: number
  status: 'active' | 'idle' | 'overload'
}

const mockSwarmData: SwarmNode[] = [
  { 
    id: 'coord-1', 
    type: 'coordinator', 
    name: 'Central Command', 
    connections: ['agent-1', 'agent-2', 'relay-1'], 
    load: 67, 
    status: 'active' 
  },
  { 
    id: 'agent-1', 
    type: 'agent', 
    name: 'Strike Team Alpha', 
    connections: ['agent-3', 'agent-4'], 
    load: 45, 
    status: 'active' 
  },
  { 
    id: 'agent-2', 
    type: 'agent', 
    name: 'Intel Division', 
    connections: ['relay-2'], 
    load: 89, 
    status: 'overload' 
  },
  { 
    id: 'relay-1', 
    type: 'relay', 
    name: 'Comm Relay 1', 
    connections: ['agent-5', 'agent-6'], 
    load: 23, 
    status: 'idle' 
  },
  { 
    id: 'agent-3', 
    type: 'agent', 
    name: 'Support Team Beta', 
    connections: [], 
    load: 56, 
    status: 'active' 
  },
]

export function SwarmCoordination() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  const getNodeColor = (node: SwarmNode) => {
    if (node.status === 'overload') return 'bg-cortex-danger text-white'
    if (node.status === 'idle') return 'bg-cortex-text-muted text-cortex-text-primary'
    if (node.type === 'coordinator') return 'bg-cortex-primary text-white'
    if (node.type === 'agent') return 'bg-cortex-secondary text-white'
    return 'bg-cortex-accent text-cortex-bg-primary'
  }

  const getNodeIcon = (type: SwarmNode['type']) => {
    switch (type) {
      case 'coordinator':
        return <Target className="h-4 w-4" />
      case 'agent':
        return <Users className="h-4 w-4" />
      case 'relay':
        return <Network className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Swarm Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="cortex-card p-4 text-center">
          <div className="text-2xl font-bold text-cortex-primary mb-1">5</div>
          <div className="cortex-label">Total Nodes</div>
        </div>
        <div className="cortex-card p-4 text-center">
          <div className="text-2xl font-bold text-cortex-success mb-1">87%</div>
          <div className="cortex-label">Network Health</div>
        </div>
        <div className="cortex-card p-4 text-center">
          <div className="text-2xl font-bold text-cortex-accent mb-1">1.2K</div>
          <div className="cortex-label">Messages/sec</div>
        </div>
      </div>

      {/* Node Network Visualization */}
      <div className="cortex-card p-6">
        <h4 className="cortex-heading-3 mb-4 flex items-center gap-2">
          <Network className="h-5 w-5 text-cortex-primary" />
          Swarm Network Topology
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockSwarmData.map((node) => (
            <div
              key={node.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:scale-105 ${
                selectedNode === node.id 
                  ? 'border-cortex-primary shadow-cortex-glow-primary' 
                  : 'border-cortex-border hover:border-cortex-border-light'
              }`}
              onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${getNodeColor(node)}`}>
                    {getNodeIcon(node.type)}
                  </div>
                  <div>
                    <div className="font-medium text-cortex-text-primary text-sm">{node.name}</div>
                    <div className="cortex-body-small text-cortex-text-tertiary capitalize">{node.type}</div>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  node.status === 'active' ? 'bg-cortex-success/20 text-cortex-success' :
                  node.status === 'overload' ? 'bg-cortex-danger/20 text-cortex-danger' :
                  'bg-cortex-text-muted/20 text-cortex-text-muted'
                }`}>
                  {node.status}
                </div>
              </div>
              
              <div className="mb-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="cortex-body-small text-cortex-text-secondary">Load</span>
                  <span className="cortex-body-small text-cortex-text-primary font-medium">{node.load}%</span>
                </div>
                <div className="w-full h-2 bg-cortex-bg-primary rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      node.load > 80 ? 'bg-cortex-danger' :
                      node.load > 60 ? 'bg-cortex-warning' :
                      'bg-cortex-success'
                    }`}
                    style={{ width: `${node.load}%` }}
                  />
                </div>
              </div>
              
              {node.connections.length > 0 && (
                <div className="cortex-body-small text-cortex-text-tertiary">
                  Connected to {node.connections.length} node{node.connections.length !== 1 ? 's' : ''}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Connection Flow */}
      <div className="cortex-card p-6">
        <h4 className="cortex-heading-3 mb-4 flex items-center gap-2">
          <Activity className="h-5 w-5 text-cortex-accent" />
          Active Data Flows
        </h4>
        
        <div className="space-y-3">
          {[
            { from: 'Central Command', to: 'Strike Team Alpha', type: 'Mission Orders', volume: 'High' },
            { from: 'Intel Division', to: 'Central Command', type: 'Recon Data', volume: 'Critical' },
            { from: 'Comm Relay 1', to: 'Support Team Beta', type: 'Status Updates', volume: 'Normal' },
          ].map((flow, index) => (
            <div key={index} className="flex items-center gap-4 p-3 bg-cortex-bg-tertiary rounded-lg">
              <div className="cortex-body-small text-cortex-text-secondary min-w-0 flex-1">
                {flow.from}
              </div>
              <ArrowRight className="h-4 w-4 text-cortex-primary" />
              <div className="cortex-body-small text-cortex-text-secondary min-w-0 flex-1">
                {flow.to}
              </div>
              <div className="text-right">
                <div className="cortex-body-small text-cortex-text-primary font-medium">{flow.type}</div>
                <div className={`cortex-body-small font-medium ${
                  flow.volume === 'Critical' ? 'text-cortex-danger' :
                  flow.volume === 'High' ? 'text-cortex-warning' :
                  'text-cortex-success'
                }`}>
                  {flow.volume}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}