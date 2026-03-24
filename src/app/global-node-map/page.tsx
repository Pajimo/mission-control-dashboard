'use client';

import React, { useState, useEffect } from 'react';
import { googleStitchDesignSystem } from '@/lib/google-stitch-tokens';
import Link from 'next/link';

// Material Icons Component
const MaterialIcon = ({ icon, size = 24, className = '', style }: { icon: string; size?: number; className?: string; style?: React.CSSProperties }) => (
  <span 
    className={`material-icons-outlined ${className}`}
    style={{ fontSize: `${size}px`, ...style }}
  >
    {icon}
  </span>
);

// Node types and their configurations
const nodeTypes = {
  datacenter: { icon: 'dns', color: googleStitchDesignSystem.colors.primary },
  agent: { icon: 'smart_toy', color: googleStitchDesignSystem.colors.tertiary },
  gateway: { icon: 'router', color: googleStitchDesignSystem.colors.secondary },
  client: { icon: 'devices', color: googleStitchDesignSystem.colors.text.secondary }
};

// Global Node Map Page
export default function GlobalNodeMapPage() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [animationEnabled, setAnimationEnabled] = useState(true);

  const nodes = [
    {
      id: 'dc-us-east',
      name: 'US East Data Center',
      type: 'datacenter' as const,
      location: { lat: 40.7128, lng: -74.0060 },
      city: 'New York',
      status: 'active' as const,
      connections: ['dc-eu-west', 'gw-mobile-1'],
      metrics: { cpu: 34, memory: 67, network: 12, agents: 8 }
    },
    {
      id: 'dc-eu-west',
      name: 'EU West Data Center',
      type: 'datacenter' as const,
      location: { lat: 51.5074, lng: -0.1278 },
      city: 'London',
      status: 'active' as const,
      connections: ['dc-us-east', 'gw-web-1'],
      metrics: { cpu: 28, memory: 45, network: 8, agents: 6 }
    },
    {
      id: 'dc-asia-pacific',
      name: 'Asia Pacific Data Center',
      type: 'datacenter' as const,
      location: { lat: 35.6762, lng: 139.6503 },
      city: 'Tokyo',
      status: 'maintenance' as const,
      connections: ['dc-us-east'],
      metrics: { cpu: 15, memory: 23, network: 4, agents: 2 }
    },
    {
      id: 'agent-ceo',
      name: 'CEO MideSquare',
      type: 'agent' as const,
      location: { lat: 40.7128, lng: -74.0060 },
      city: 'New York (US East)',
      status: 'active' as const,
      connections: ['dc-us-east'],
      metrics: { tasks: 12, performance: 98, uptime: 99.8 }
    },
    {
      id: 'agent-cto',
      name: 'CTO Bobo',
      type: 'agent' as const,
      location: { lat: 40.7128, lng: -74.0060 },
      city: 'New York (US East)',
      status: 'busy' as const,
      connections: ['dc-us-east'],
      metrics: { tasks: 8, performance: 95, uptime: 97.2 }
    },
    {
      id: 'agent-cfo',
      name: 'CFO Olamide',
      type: 'agent' as const,
      location: { lat: 51.5074, lng: -0.1278 },
      city: 'London (EU West)',
      status: 'idle' as const,
      connections: ['dc-eu-west'],
      metrics: { tasks: 3, performance: 97, uptime: 98.5 }
    },
    {
      id: 'gw-mobile-1',
      name: 'Mobile Gateway Alpha',
      type: 'gateway' as const,
      location: { lat: 37.7749, lng: -122.4194 },
      city: 'San Francisco',
      status: 'active' as const,
      connections: ['dc-us-east', 'client-mobile-1'],
      metrics: { throughput: 45, latency: 12, connections: 156 }
    },
    {
      id: 'gw-web-1',
      name: 'Web Gateway Beta',
      type: 'gateway' as const,
      location: { lat: 51.5074, lng: -0.1278 },
      city: 'London',
      status: 'active' as const,
      connections: ['dc-eu-west', 'client-web-1'],
      metrics: { throughput: 67, latency: 8, connections: 234 }
    },
    {
      id: 'client-mobile-1',
      name: 'Mobile Client Network',
      type: 'client' as const,
      location: { lat: 37.7749, lng: -122.4194 },
      city: 'San Francisco',
      status: 'active' as const,
      connections: ['gw-mobile-1'],
      metrics: { devices: 45, sessions: 189, bandwidth: 23 }
    },
    {
      id: 'client-web-1',
      name: 'Web Client Network',
      type: 'client' as const,
      location: { lat: 51.5074, lng: -0.1278 },
      city: 'London',
      status: 'active' as const,
      connections: ['gw-web-1'],
      metrics: { devices: 78, sessions: 312, bandwidth: 45 }
    }
  ];

  const filteredNodes = filterType === 'all' ? nodes : nodes.filter(node => node.type === filterType);
  const selectedNodeData = selectedNode ? nodes.find(n => n.id === selectedNode) : null;

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Icons+Outlined"
        rel="stylesheet"
      />
      
      <div 
        className="min-h-screen"
        style={{
          backgroundColor: googleStitchDesignSystem.colors.neutral,
          fontFamily: googleStitchDesignSystem.typography.fontFamily.primary,
          color: googleStitchDesignSystem.colors.text.primary
        }}
      >
        {/* Header */}
        <header 
          className="border-b px-6 py-4 flex items-center justify-between"
          style={{
            backgroundColor: googleStitchDesignSystem.colors.surface.secondary,
            borderColor: googleStitchDesignSystem.colors.border.primary
          }}
        >
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
              <MaterialIcon icon="arrow_back" size={24} />
            </Link>
            <MaterialIcon icon="public" size={32} />
            <div>
              <h1 style={{
                ...googleStitchDesignSystem.typography.headline.medium,
                color: googleStitchDesignSystem.colors.text.primary
              }}>
                Global Node Map
              </h1>
              <p style={{
                ...googleStitchDesignSystem.typography.body.medium,
                color: googleStitchDesignSystem.colors.text.secondary
              }}>
                Worldwide network topology and node status
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 rounded-lg border bg-transparent"
              style={{
                borderColor: googleStitchDesignSystem.colors.border.primary,
                color: googleStitchDesignSystem.colors.text.primary,
                backgroundColor: googleStitchDesignSystem.colors.surface.tertiary
              }}
            >
              <option value="all">All Nodes</option>
              <option value="datacenter">Data Centers</option>
              <option value="agent">Agents</option>
              <option value="gateway">Gateways</option>
              <option value="client">Clients</option>
            </select>
            
            <button 
              onClick={() => setAnimationEnabled(!animationEnabled)}
              className={`p-2 rounded-lg transition-colors ${animationEnabled ? 'bg-blue-600/20 text-blue-400' : 'bg-white/10 text-gray-400'}`}
            >
              <MaterialIcon icon="animation" size={20} />
            </button>
          </div>
        </header>

        <div className="flex h-screen">
          {/* Map Visualization */}
          <div className="flex-1 relative">
            <WorldMap 
              nodes={filteredNodes}
              selectedNode={selectedNode}
              onNodeSelect={setSelectedNode}
              animationEnabled={animationEnabled}
            />
          </div>

          {/* Node Details Sidebar */}
          {selectedNodeData && (
            <aside 
              className="w-96 border-l p-6 overflow-y-auto"
              style={{
                backgroundColor: googleStitchDesignSystem.colors.surface.secondary,
                borderColor: googleStitchDesignSystem.colors.border.primary
              }}
            >
              <NodeDetails 
                node={selectedNodeData}
                onClose={() => setSelectedNode(null)}
              />
            </aside>
          )}

          {/* Network Stats Sidebar */}
          {!selectedNodeData && (
            <aside 
              className="w-80 border-l p-6"
              style={{
                backgroundColor: googleStitchDesignSystem.colors.surface.secondary,
                borderColor: googleStitchDesignSystem.colors.border.primary
              }}
            >
              <NetworkStats nodes={nodes} />
            </aside>
          )}
        </div>
      </div>
    </>
  );
}

// World Map Component
const WorldMap = ({ 
  nodes, 
  selectedNode, 
  onNodeSelect, 
  animationEnabled 
}: { 
  nodes: any[]; 
  selectedNode: string | null; 
  onNodeSelect: (id: string) => void;
  animationEnabled: boolean;
}) => {
  return (
    <div 
      className="w-full h-full relative"
      style={{
        backgroundColor: googleStitchDesignSystem.colors.surface.secondary,
        backgroundImage: `
          radial-gradient(circle at 25% 25%, rgba(41, 98, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(0, 230, 118, 0.1) 0%, transparent 50%),
          linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: '400px 400px, 400px 400px, 50px 50px, 50px 50px'
      }}
    >
      {/* SVG Map Container */}
      <svg 
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 500"
        style={{ overflow: 'visible' }}
      >
        {/* Connection Lines */}
        {nodes.map(node => 
          node.connections.map((connId: string) => {
            const targetNode = nodes.find(n => n.id === connId);
            if (!targetNode) return null;
            
            const x1 = (node.location.lng + 180) * (1000 / 360);
            const y1 = (90 - node.location.lat) * (500 / 180);
            const x2 = (targetNode.location.lng + 180) * (1000 / 360);
            const y2 = (90 - targetNode.location.lat) * (500 / 180);
            
            return (
              <line
                key={`${node.id}-${connId}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={googleStitchDesignSystem.colors.primary}
                strokeWidth="1"
                strokeOpacity="0.3"
                strokeDasharray="5,5"
                className={animationEnabled ? 'animate-pulse' : ''}
              />
            );
          })
        )}
        
        {/* Nodes */}
        {nodes.map(node => {
          const x = (node.location.lng + 180) * (1000 / 360);
          const y = (90 - node.location.lat) * (500 / 180);
          const nodeConfig = nodeTypes[node.type as keyof typeof nodeTypes];
          const isSelected = selectedNode === node.id;
          
          return (
            <g key={node.id}>
              {/* Node Background Circle */}
              <circle
                cx={x}
                cy={y}
                r={isSelected ? 20 : 15}
                fill={node.status === 'active' ? nodeConfig.color : googleStitchDesignSystem.colors.text.disabled}
                fillOpacity={isSelected ? 0.3 : 0.2}
                stroke={isSelected ? nodeConfig.color : 'transparent'}
                strokeWidth={2}
                className="cursor-pointer transition-all duration-200"
                onClick={() => onNodeSelect(node.id)}
              />
              
              {/* Node Icon */}
              <foreignObject x={x-10} y={y-10} width="20" height="20">
                <div className="flex items-center justify-center w-full h-full">
                  <MaterialIcon 
                    icon={nodeConfig.icon} 
                    size={16} 
                    className="cursor-pointer"
                    style={{ 
                      color: node.status === 'active' ? nodeConfig.color : googleStitchDesignSystem.colors.text.disabled 
                    }}
                  />
                </div>
              </foreignObject>
              
              {/* Status Pulse for Active Nodes */}
              {node.status === 'active' && animationEnabled && (
                <circle
                  cx={x}
                  cy={y}
                  r="25"
                  fill="none"
                  stroke={nodeConfig.color}
                  strokeWidth="1"
                  strokeOpacity="0.5"
                  className="animate-ping"
                />
              )}
            </g>
          );
        })}
      </svg>
      
      {/* Node Labels */}
      {nodes.map(node => {
        const x = (node.location.lng + 180) * (1000 / 360);
        const y = (90 - node.location.lat) * (500 / 180);
        
        return (
          <div
            key={`label-${node.id}`}
            className="absolute pointer-events-none"
            style={{
              left: `${(x / 1000) * 100}%`,
              top: `${(y / 500) * 100 + 3}%`,
              transform: 'translateX(-50%)'
            }}
          >
            <div 
              className="text-xs px-2 py-1 rounded whitespace-nowrap"
              style={{
                backgroundColor: googleStitchDesignSystem.colors.surface.overlay,
                color: googleStitchDesignSystem.colors.text.secondary,
                backdropFilter: 'blur(8px)'
              }}
            >
              {node.city}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Node Details Component
const NodeDetails = ({ 
  node, 
  onClose 
}: { 
  node: any; 
  onClose: () => void;
}) => {
  const nodeConfig = nodeTypes[node.type as keyof typeof nodeTypes];
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 style={{
          ...googleStitchDesignSystem.typography.headline.small,
          color: googleStitchDesignSystem.colors.text.primary
        }}>
          Node Details
        </h3>
        <button 
          onClick={onClose}
          className="p-1 rounded hover:bg-white/10 transition-colors"
        >
          <MaterialIcon icon="close" size={20} />
        </button>
      </div>
      
      {/* Node Header */}
      <div 
        className="p-4 rounded-lg mb-4"
        style={{
          backgroundColor: googleStitchDesignSystem.colors.surface.tertiary,
          border: `1px solid ${googleStitchDesignSystem.colors.border.primary}`
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <MaterialIcon 
            icon={nodeConfig.icon} 
            size={24} 
            style={{ color: nodeConfig.color }} 
          />
          <div>
            <h4 style={{
              ...googleStitchDesignSystem.typography.label.large,
              color: googleStitchDesignSystem.colors.text.primary
            }}>
              {node.name}
            </h4>
            <p style={{
              ...googleStitchDesignSystem.typography.body.small,
              color: googleStitchDesignSystem.colors.text.tertiary,
              textTransform: 'capitalize'
            }}>
              {node.type} • {node.city}
            </p>
          </div>
        </div>
        
        <StatusBadge status={node.status} />
      </div>
      
      {/* Metrics */}
      <div className="space-y-4">
        <h4 style={{
          ...googleStitchDesignSystem.typography.label.large,
          color: googleStitchDesignSystem.colors.text.primary
        }}>
          Performance Metrics
        </h4>
        
        {node.type === 'datacenter' && (
          <div className="space-y-3">
            <MetricItem label="CPU Usage" value={`${node.metrics.cpu}%`} />
            <MetricItem label="Memory" value={`${node.metrics.memory}%`} />
            <MetricItem label="Network" value={`${node.metrics.network}%`} />
            <MetricItem label="Active Agents" value={node.metrics.agents} />
          </div>
        )}
        
        {node.type === 'agent' && (
          <div className="space-y-3">
            <MetricItem label="Active Tasks" value={node.metrics.tasks} />
            <MetricItem label="Performance" value={`${node.metrics.performance}%`} />
            <MetricItem label="Uptime" value={`${node.metrics.uptime}%`} />
          </div>
        )}
        
        {node.type === 'gateway' && (
          <div className="space-y-3">
            <MetricItem label="Throughput" value={`${node.metrics.throughput} MB/s`} />
            <MetricItem label="Latency" value={`${node.metrics.latency}ms`} />
            <MetricItem label="Connections" value={node.metrics.connections} />
          </div>
        )}
        
        {node.type === 'client' && (
          <div className="space-y-3">
            <MetricItem label="Devices" value={node.metrics.devices} />
            <MetricItem label="Active Sessions" value={node.metrics.sessions} />
            <MetricItem label="Bandwidth" value={`${node.metrics.bandwidth} MB/s`} />
          </div>
        )}
      </div>
      
      {/* Connections */}
      <div className="mt-6">
        <h4 style={{
          ...googleStitchDesignSystem.typography.label.large,
          color: googleStitchDesignSystem.colors.text.primary,
          marginBottom: '12px'
        }}>
          Connections ({node.connections.length})
        </h4>
        
        <div className="space-y-2">
          {node.connections.map((connId: string) => (
            <div 
              key={connId}
              className="text-sm p-2 rounded border"
              style={{
                backgroundColor: googleStitchDesignSystem.colors.surface.tertiary,
                borderColor: googleStitchDesignSystem.colors.border.secondary,
                color: googleStitchDesignSystem.colors.text.secondary
              }}
            >
              {connId}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Network Stats Component
const NetworkStats = ({ nodes }: { nodes: any[] }) => {
  const stats = {
    totalNodes: nodes.length,
    activeNodes: nodes.filter(n => n.status === 'active').length,
    datacenters: nodes.filter(n => n.type === 'datacenter').length,
    agents: nodes.filter(n => n.type === 'agent').length,
    gateways: nodes.filter(n => n.type === 'gateway').length,
    clients: nodes.filter(n => n.type === 'client').length
  };
  
  return (
    <div>
      <h3 style={{
        ...googleStitchDesignSystem.typography.headline.small,
        color: googleStitchDesignSystem.colors.text.primary,
        marginBottom: '24px'
      }}>
        Network Overview
      </h3>
      
      <div className="space-y-4">
        <StatCard 
          title="Total Nodes" 
          value={stats.totalNodes} 
          color={googleStitchDesignSystem.colors.primary} 
        />
        <StatCard 
          title="Active Nodes" 
          value={stats.activeNodes} 
          color={googleStitchDesignSystem.colors.tertiary} 
        />
        <StatCard 
          title="Data Centers" 
          value={stats.datacenters} 
          color={googleStitchDesignSystem.colors.primary} 
        />
        <StatCard 
          title="AI Agents" 
          value={stats.agents} 
          color={googleStitchDesignSystem.colors.tertiary} 
        />
        <StatCard 
          title="Gateways" 
          value={stats.gateways} 
          color={googleStitchDesignSystem.colors.secondary} 
        />
        <StatCard 
          title="Client Networks" 
          value={stats.clients} 
          color={googleStitchDesignSystem.colors.text.secondary} 
        />
      </div>
      
      <div className="mt-8">
        <h4 style={{
          ...googleStitchDesignSystem.typography.label.large,
          color: googleStitchDesignSystem.colors.text.primary,
          marginBottom: '16px'
        }}>
          Network Health
        </h4>
        
        <div className="space-y-3">
          <HealthItem label="Overall Status" status="Healthy" color={googleStitchDesignSystem.colors.tertiary} />
          <HealthItem label="Connectivity" status="99.8%" color={googleStitchDesignSystem.colors.tertiary} />
          <HealthItem label="Latency" status="<50ms" color={googleStitchDesignSystem.colors.tertiary} />
          <HealthItem label="Throughput" status="Normal" color={googleStitchDesignSystem.colors.secondary} />
        </div>
      </div>
    </div>
  );
};

// Status Badge Component
const StatusBadge = ({ status }: { status: 'active' | 'idle' | 'busy' | 'offline' | 'maintenance' }) => {
  const config = {
    active: { label: 'Active', color: googleStitchDesignSystem.colors.tertiary },
    idle: { label: 'Idle', color: googleStitchDesignSystem.colors.primary },
    busy: { label: 'Busy', color: googleStitchDesignSystem.colors.secondary },
    offline: { label: 'Offline', color: googleStitchDesignSystem.colors.text.disabled },
    maintenance: { label: 'Maintenance', color: googleStitchDesignSystem.colors.secondary }
  };
  
  const { label, color } = config[status];
  
  return (
    <span 
      className="px-3 py-1 rounded-full text-sm font-medium"
      style={{
        backgroundColor: color + '20',
        color: color,
        border: `1px solid ${color}40`
      }}
    >
      {label}
    </span>
  );
};

// Stat Card Component
const StatCard = ({ title, value, color }: { title: string; value: number; color: string }) => (
  <div 
    className="p-4 rounded-lg border"
    style={{
      backgroundColor: googleStitchDesignSystem.colors.surface.tertiary,
      borderColor: googleStitchDesignSystem.colors.border.primary
    }}
  >
    <div style={{
      ...googleStitchDesignSystem.typography.headline.small,
      color: color,
      marginBottom: '4px'
    }}>
      {value}
    </div>
    <span style={{
      ...googleStitchDesignSystem.typography.body.small,
      color: googleStitchDesignSystem.colors.text.tertiary
    }}>
      {title}
    </span>
  </div>
);

// Metric Item Component
const MetricItem = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex justify-between items-center">
    <span style={{
      ...googleStitchDesignSystem.typography.body.medium,
      color: googleStitchDesignSystem.colors.text.secondary
    }}>
      {label}
    </span>
    <span style={{
      ...googleStitchDesignSystem.typography.label.medium,
      color: googleStitchDesignSystem.colors.primary
    }}>
      {value}
    </span>
  </div>
);

// Health Item Component
const HealthItem = ({ label, status, color }: { label: string; status: string; color: string }) => (
  <div className="flex justify-between items-center">
    <span style={{
      ...googleStitchDesignSystem.typography.body.medium,
      color: googleStitchDesignSystem.colors.text.secondary
    }}>
      {label}
    </span>
    <span style={{
      ...googleStitchDesignSystem.typography.label.medium,
      color: color
    }}>
      {status}
    </span>
  </div>
);