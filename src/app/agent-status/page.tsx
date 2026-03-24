'use client';

import React from 'react';
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

// Status Indicator Component
const StatusIndicator = ({ status }: { status: 'active' | 'idle' | 'busy' | 'offline' }) => {
  const colors = {
    active: googleStitchDesignSystem.colors.tertiary,
    idle: googleStitchDesignSystem.colors.primary,
    busy: googleStitchDesignSystem.colors.secondary,
    offline: googleStitchDesignSystem.colors.text.disabled
  };
  
  return (
    <div 
      className="w-3 h-3 rounded-full"
      style={{
        backgroundColor: colors[status],
        animation: status === 'active' ? 'pulse 2s infinite' : 'none'
      }}
    />
  );
};

// Agent Status Monitor Page
export default function AgentStatusPage() {
  const agents = [
    { 
      id: 1, 
      name: 'CEO MideSquare', 
      status: 'active' as const, 
      tasks: 12, 
      performance: 98, 
      uptime: '24h 15m',
      lastActivity: '2 minutes ago',
      department: 'Executive'
    },
    { 
      id: 2, 
      name: 'CTO Bobo', 
      status: 'busy' as const, 
      tasks: 8, 
      performance: 95, 
      uptime: '18h 42m',
      lastActivity: '5 minutes ago',
      department: 'Software'
    },
    { 
      id: 3, 
      name: 'CFO Olamide', 
      status: 'idle' as const, 
      tasks: 3, 
      performance: 97, 
      uptime: '22h 8m',
      lastActivity: '12 minutes ago',
      department: 'Finance'
    },
    { 
      id: 4, 
      name: 'PM Bimbo', 
      status: 'active' as const, 
      tasks: 15, 
      performance: 94, 
      uptime: '19h 33m',
      lastActivity: '1 minute ago',
      department: 'Content'
    },
    { 
      id: 5, 
      name: 'PM Pajimo', 
      status: 'active' as const, 
      tasks: 7, 
      performance: 99, 
      uptime: '25h 17m',
      lastActivity: '30 seconds ago',
      department: 'Mercor'
    },
    { 
      id: 6, 
      name: 'Agent Alpha', 
      status: 'offline' as const, 
      tasks: 0, 
      performance: 0, 
      uptime: '0h 0m',
      lastActivity: '2 hours ago',
      department: 'Software'
    }
  ];

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
            <MaterialIcon icon="smart_toy" size={32} />
            <div>
              <h1 style={{
                ...googleStitchDesignSystem.typography.headline.medium,
                color: googleStitchDesignSystem.colors.text.primary
              }}>
                Agent Status Monitor
              </h1>
              <p style={{
                ...googleStitchDesignSystem.typography.body.medium,
                color: googleStitchDesignSystem.colors.text.secondary
              }}>
                Real-time agent performance and status tracking
              </p>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <SummaryCard 
              title="Active Agents"
              value="4"
              subtitle="Currently running"
              color={googleStitchDesignSystem.colors.tertiary}
              icon="smart_toy"
            />
            <SummaryCard 
              title="Total Tasks"
              value="45"
              subtitle="In progress"
              color={googleStitchDesignSystem.colors.primary}
              icon="assignment"
            />
            <SummaryCard 
              title="Avg Performance"
              value="96.6%"
              subtitle="System efficiency"
              color={googleStitchDesignSystem.colors.secondary}
              icon="trending_up"
            />
            <SummaryCard 
              title="System Uptime"
              value="99.8%"
              subtitle="Last 30 days"
              color={googleStitchDesignSystem.colors.tertiary}
              icon="timer"
            />
          </div>

          {/* Agent Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {agents.map(agent => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// Summary Card Component
const SummaryCard = ({ 
  title, 
  value, 
  subtitle, 
  color, 
  icon 
}: { 
  title: string; 
  value: string; 
  subtitle: string; 
  color: string;
  icon: string;
}) => (
  <div 
    className="p-6 rounded-lg border"
    style={{
      backgroundColor: googleStitchDesignSystem.colors.surface.secondary,
      borderColor: googleStitchDesignSystem.colors.border.primary
    }}
  >
    <div className="flex items-center justify-between mb-4">
      <span style={{
        ...googleStitchDesignSystem.typography.body.medium,
        color: googleStitchDesignSystem.colors.text.secondary
      }}>
        {title}
      </span>
      <MaterialIcon 
        icon={icon} 
        size={24} 
        style={{ color }} 
      />
    </div>
    
    <div style={{
      ...googleStitchDesignSystem.typography.headline.large,
      color: color,
      marginBottom: '4px'
    }}>
      {value}
    </div>
    
    <span style={{
      ...googleStitchDesignSystem.typography.body.small,
      color: googleStitchDesignSystem.colors.text.tertiary
    }}>
      {subtitle}
    </span>
  </div>
);

// Agent Card Component
const AgentCard = ({ agent }: { agent: any }) => (
  <div 
    className="p-6 rounded-lg border hover:border-blue-500/30 transition-all duration-200"
    style={{
      backgroundColor: googleStitchDesignSystem.colors.surface.tertiary,
      borderColor: googleStitchDesignSystem.colors.border.primary
    }}
  >
    {/* Agent Header */}
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <StatusIndicator status={agent.status} />
        <div>
          <h3 style={{
            ...googleStitchDesignSystem.typography.label.large,
            color: googleStitchDesignSystem.colors.text.primary
          }}>
            {agent.name}
          </h3>
          <span style={{
            ...googleStitchDesignSystem.typography.body.small,
            color: googleStitchDesignSystem.colors.text.tertiary
          }}>
            {agent.department}
          </span>
        </div>
      </div>
      <span 
        className="px-3 py-1 rounded-full text-xs font-medium capitalize"
        style={{
          backgroundColor: agent.status === 'active' ? '#00E676' : 
                          agent.status === 'busy' ? '#FFB300' :
                          agent.status === 'idle' ? '#2962FF' : '#616161',
          color: '#121212'
        }}
      >
        {agent.status}
      </span>
    </div>
    
    {/* Metrics Grid */}
    <div className="grid grid-cols-2 gap-4 mb-4">
      <MetricItem 
        label="Tasks" 
        value={agent.tasks.toString()}
        color={googleStitchDesignSystem.colors.primary}
      />
      <MetricItem 
        label="Performance" 
        value={`${agent.performance}%`}
        color={googleStitchDesignSystem.colors.tertiary}
      />
      <MetricItem 
        label="Uptime" 
        value={agent.uptime}
        color={googleStitchDesignSystem.colors.secondary}
      />
      <MetricItem 
        label="Last Activity" 
        value={agent.lastActivity}
        color={googleStitchDesignSystem.colors.text.secondary}
      />
    </div>
    
    {/* Action Buttons */}
    <div className="flex gap-2">
      <button 
        className="flex-1 py-2 px-4 rounded-lg transition-colors hover:bg-blue-600/20"
        style={{
          backgroundColor: 'transparent',
          border: `1px solid ${googleStitchDesignSystem.colors.primary}`,
          color: googleStitchDesignSystem.colors.primary,
          fontSize: '12px',
          fontWeight: '500'
        }}
      >
        View Details
      </button>
      <button 
        className="py-2 px-3 rounded-lg transition-colors hover:bg-white/10"
        style={{
          backgroundColor: 'transparent',
          border: `1px solid ${googleStitchDesignSystem.colors.border.primary}`,
          color: googleStitchDesignSystem.colors.text.secondary
        }}
      >
        <MaterialIcon icon="more_vert" size={16} />
      </button>
    </div>
  </div>
);

// Metric Item Component
const MetricItem = ({ 
  label, 
  value, 
  color 
}: { 
  label: string; 
  value: string; 
  color: string;
}) => (
  <div>
    <span style={{
      ...googleStitchDesignSystem.typography.body.small,
      color: googleStitchDesignSystem.colors.text.tertiary,
      display: 'block',
      marginBottom: '2px'
    }}>
      {label}
    </span>
    <span 
      style={{
        ...googleStitchDesignSystem.typography.label.medium,
        color: color
      }}
    >
      {value}
    </span>
  </div>
);