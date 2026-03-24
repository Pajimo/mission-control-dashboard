'use client';

import React, { useState } from 'react';
import { googleStitchDesignSystem } from '@/lib/google-stitch-tokens';
import Link from 'next/link';

// Material Icons Component
const MaterialIcon = ({ icon, size = 24, className = '' }: { icon: string; size?: number; className?: string }) => (
  <span 
    className={`material-icons-outlined ${className}`}
    style={{ fontSize: `${size}px` }}
  >
    {icon}
  </span>
);

// Agent Profile Page
export default function AgentProfilePage() {
  const [selectedAgent, setSelectedAgent] = useState('ceo-midesquare');

  const agents = {
    'ceo-midesquare': {
      name: 'CEO MideSquare',
      role: 'Chief Executive Officer',
      department: 'Executive Leadership',
      status: 'active' as const,
      avatar: '👑',
      level: 'Executive',
      experience: '50+ years',
      specializations: ['Strategic Leadership', 'Organizational Design', 'AI Orchestration', 'Corporate Vision'],
      currentTasks: [
        'Strategic Planning Q2 2026',
        'Department Restructure',
        'Vision Alignment Meeting',
        'Board Presentation Prep'
      ],
      performance: {
        efficiency: 98,
        accuracy: 96,
        responsiveness: 99,
        innovation: 95
      },
      stats: {
        tasksCompleted: 247,
        projectsLed: 12,
        uptime: '99.8%',
        avgResponseTime: '2.3s'
      },
      recentActivity: [
        { time: '2 mins ago', action: 'Approved Mission Control Dashboard deployment', type: 'approval' },
        { time: '15 mins ago', action: 'Created new organizational structure', type: 'creation' },
        { time: '1 hour ago', action: 'Reviewed Software Department report', type: 'review' },
        { time: '2 hours ago', action: 'Strategic meeting with department heads', type: 'meeting' }
      ]
    },
    'cto-bobo': {
      name: 'CTO Bobo',
      role: 'Chief Technology Officer',
      department: 'Software Department',
      status: 'busy' as const,
      avatar: '🤖',
      level: 'Senior',
      experience: '25+ years',
      specializations: ['GitHub Pages Deployment', 'Next.js Development', 'Design Systems', 'DevOps'],
      currentTasks: [
        'Google Stitch Implementation',
        'Component Library Build',
        'Deployment Pipeline Setup',
        'Performance Optimization'
      ],
      performance: {
        efficiency: 95,
        accuracy: 98,
        responsiveness: 93,
        innovation: 97
      },
      stats: {
        tasksCompleted: 189,
        projectsLed: 8,
        uptime: '97.2%',
        avgResponseTime: '1.8s'
      },
      recentActivity: [
        { time: '1 min ago', action: 'Committed Google Stitch design tokens', type: 'development' },
        { time: '5 mins ago', action: 'Built agent status monitor page', type: 'development' },
        { time: '12 mins ago', action: 'Updated component library', type: 'development' },
        { time: '25 mins ago', action: 'Fixed deployment pipeline issue', type: 'fix' }
      ]
    },
    'cfo-olamide': {
      name: 'CFO Olamide',
      role: 'Chief Financial Officer', 
      department: 'Finance Department',
      status: 'idle' as const,
      avatar: '💰',
      level: 'Executive',
      experience: '30+ years',
      specializations: ['Trading Strategy', 'Risk Management', 'Alpaca Integration', 'Financial Analysis'],
      currentTasks: [
        'Q1 Financial Report',
        'Trading Algorithm Review',
        'Risk Assessment Update',
        'Compliance Check'
      ],
      performance: {
        efficiency: 97,
        accuracy: 99,
        responsiveness: 94,
        innovation: 92
      },
      stats: {
        tasksCompleted: 156,
        projectsLed: 6,
        uptime: '98.5%',
        avgResponseTime: '3.1s'
      },
      recentActivity: [
        { time: '12 mins ago', action: 'Reviewed trading performance metrics', type: 'analysis' },
        { time: '30 mins ago', action: 'Updated risk parameters', type: 'configuration' },
        { time: '1 hour ago', action: 'Generated financial dashboard', type: 'creation' },
        { time: '2 hours ago', action: 'Completed compliance audit', type: 'audit' }
      ]
    }
  };

  const currentAgent = agents[selectedAgent as keyof typeof agents];

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
            <MaterialIcon icon="account_circle" size={32} />
            <div>
              <h1 style={{
                ...googleStitchDesignSystem.typography.headline.medium,
                color: googleStitchDesignSystem.colors.text.primary
              }}>
                Agent Profiles
              </h1>
              <p style={{
                ...googleStitchDesignSystem.typography.body.medium,
                color: googleStitchDesignSystem.colors.text.secondary
              }}>
                Detailed agent information and performance metrics
              </p>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Agent Selector Sidebar */}
          <aside 
            className="w-80 border-r p-6"
            style={{
              backgroundColor: googleStitchDesignSystem.colors.surface.secondary,
              borderColor: googleStitchDesignSystem.colors.border.primary
            }}
          >
            <h3 style={{
              ...googleStitchDesignSystem.typography.label.large,
              color: googleStitchDesignSystem.colors.text.primary,
              marginBottom: '16px'
            }}>
              Select Agent
            </h3>
            
            <div className="space-y-2">
              {Object.entries(agents).map(([id, agent]) => (
                <AgentListItem 
                  key={id}
                  agent={agent}
                  selected={selectedAgent === id}
                  onClick={() => setSelectedAgent(id)}
                />
              ))}
            </div>
          </aside>

          {/* Main Profile Content */}
          <main className="flex-1 p-6">
            {/* Profile Header */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <ProfileHeader agent={currentAgent} />
              <PerformanceMetrics performance={currentAgent.performance} />
              <QuickStats stats={currentAgent.stats} />
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SpecializationsCard specializations={currentAgent.specializations} />
              <CurrentTasksCard tasks={currentAgent.currentTasks} />
              <RecentActivityCard activity={currentAgent.recentActivity} />
              <AgentConfigCard agent={currentAgent} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

// Agent List Item Component
const AgentListItem = ({ 
  agent, 
  selected, 
  onClick 
}: { 
  agent: any; 
  selected: boolean; 
  onClick: () => void;
}) => (
  <div 
    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
      selected ? 'border-blue-500' : 'border-transparent hover:bg-white/5'
    }`}
    style={{
      backgroundColor: selected 
        ? googleStitchDesignSystem.colors.primary + '10' 
        : 'transparent',
      borderColor: selected 
        ? googleStitchDesignSystem.colors.primary 
        : googleStitchDesignSystem.colors.border.primary
    }}
    onClick={onClick}
  >
    <div className="flex items-center gap-3">
      <span className="text-2xl">{agent.avatar}</span>
      <div>
        <h4 style={{
          ...googleStitchDesignSystem.typography.label.medium,
          color: selected 
            ? googleStitchDesignSystem.colors.primary 
            : googleStitchDesignSystem.colors.text.primary
        }}>
          {agent.name}
        </h4>
        <p style={{
          ...googleStitchDesignSystem.typography.body.small,
          color: googleStitchDesignSystem.colors.text.tertiary
        }}>
          {agent.role}
        </p>
      </div>
    </div>
  </div>
);

// Profile Header Component
const ProfileHeader = ({ agent }: { agent: any }) => (
  <div 
    className="col-span-1 lg:col-span-1 p-6 rounded-lg border"
    style={{
      backgroundColor: googleStitchDesignSystem.colors.surface.tertiary,
      borderColor: googleStitchDesignSystem.colors.border.primary
    }}
  >
    <div className="text-center">
      <div className="text-6xl mb-4">{agent.avatar}</div>
      <h2 style={{
        ...googleStitchDesignSystem.typography.headline.small,
        color: googleStitchDesignSystem.colors.text.primary,
        marginBottom: '8px'
      }}>
        {agent.name}
      </h2>
      <p style={{
        ...googleStitchDesignSystem.typography.body.large,
        color: googleStitchDesignSystem.colors.text.secondary,
        marginBottom: '4px'
      }}>
        {agent.role}
      </p>
      <p style={{
        ...googleStitchDesignSystem.typography.body.medium,
        color: googleStitchDesignSystem.colors.text.tertiary,
        marginBottom: '16px'
      }}>
        {agent.department}
      </p>
      
      <div className="flex items-center justify-center gap-2 mb-4">
        <StatusBadge status={agent.status} />
      </div>
      
      <div className="flex justify-center gap-1 text-xs" style={{
        color: googleStitchDesignSystem.colors.text.tertiary
      }}>
        <span>{agent.level} Level</span>
        <span>•</span>
        <span>{agent.experience}</span>
      </div>
    </div>
  </div>
);

// Status Badge Component
const StatusBadge = ({ status }: { status: 'active' | 'idle' | 'busy' | 'offline' }) => {
  const config = {
    active: { label: 'Active', color: googleStitchDesignSystem.colors.tertiary },
    idle: { label: 'Idle', color: googleStitchDesignSystem.colors.primary },
    busy: { label: 'Busy', color: googleStitchDesignSystem.colors.secondary },
    offline: { label: 'Offline', color: googleStitchDesignSystem.colors.text.disabled }
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

// Performance Metrics Component
const PerformanceMetrics = ({ performance }: { performance: any }) => (
  <div 
    className="p-6 rounded-lg border"
    style={{
      backgroundColor: googleStitchDesignSystem.colors.surface.tertiary,
      borderColor: googleStitchDesignSystem.colors.border.primary
    }}
  >
    <h3 style={{
      ...googleStitchDesignSystem.typography.label.large,
      color: googleStitchDesignSystem.colors.text.primary,
      marginBottom: '16px'
    }}>
      Performance Metrics
    </h3>
    
    <div className="space-y-4">
      <MetricBar label="Efficiency" value={performance.efficiency} color={googleStitchDesignSystem.colors.tertiary} />
      <MetricBar label="Accuracy" value={performance.accuracy} color={googleStitchDesignSystem.colors.primary} />
      <MetricBar label="Responsiveness" value={performance.responsiveness} color={googleStitchDesignSystem.colors.secondary} />
      <MetricBar label="Innovation" value={performance.innovation} color={googleStitchDesignSystem.colors.primary} />
    </div>
  </div>
);

// Metric Bar Component
const MetricBar = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <div>
    <div className="flex justify-between mb-2">
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
        {value}%
      </span>
    </div>
    <div 
      className="w-full h-2 rounded-full"
      style={{ backgroundColor: googleStitchDesignSystem.colors.surface.secondary }}
    >
      <div 
        className="h-2 rounded-full transition-all duration-300"
        style={{
          width: `${value}%`,
          backgroundColor: color
        }}
      />
    </div>
  </div>
);

// Quick Stats Component
const QuickStats = ({ stats }: { stats: any }) => (
  <div 
    className="p-6 rounded-lg border"
    style={{
      backgroundColor: googleStitchDesignSystem.colors.surface.tertiary,
      borderColor: googleStitchDesignSystem.colors.border.primary
    }}
  >
    <h3 style={{
      ...googleStitchDesignSystem.typography.label.large,
      color: googleStitchDesignSystem.colors.text.primary,
      marginBottom: '16px'
    }}>
      Quick Stats
    </h3>
    
    <div className="grid grid-cols-2 gap-4">
      <StatItem label="Tasks Completed" value={stats.tasksCompleted} />
      <StatItem label="Projects Led" value={stats.projectsLed} />
      <StatItem label="Uptime" value={stats.uptime} />
      <StatItem label="Avg Response" value={stats.avgResponseTime} />
    </div>
  </div>
);

// Stat Item Component  
const StatItem = ({ label, value }: { label: string; value: string | number }) => (
  <div>
    <div style={{
      ...googleStitchDesignSystem.typography.headline.small,
      color: googleStitchDesignSystem.colors.primary,
      lineHeight: '1'
    }}>
      {value}
    </div>
    <span style={{
      ...googleStitchDesignSystem.typography.body.small,
      color: googleStitchDesignSystem.colors.text.tertiary
    }}>
      {label}
    </span>
  </div>
);

// Specializations Card
const SpecializationsCard = ({ specializations }: { specializations: string[] }) => (
  <div 
    className="p-6 rounded-lg border"
    style={{
      backgroundColor: googleStitchDesignSystem.colors.surface.tertiary,
      borderColor: googleStitchDesignSystem.colors.border.primary
    }}
  >
    <h3 style={{
      ...googleStitchDesignSystem.typography.label.large,
      color: googleStitchDesignSystem.colors.text.primary,
      marginBottom: '16px'
    }}>
      Specializations
    </h3>
    
    <div className="flex flex-wrap gap-2">
      {specializations.map(spec => (
        <span 
          key={spec}
          className="px-3 py-1 rounded-full text-sm"
          style={{
            backgroundColor: googleStitchDesignSystem.colors.primary + '20',
            color: googleStitchDesignSystem.colors.primary
          }}
        >
          {spec}
        </span>
      ))}
    </div>
  </div>
);

// Current Tasks Card
const CurrentTasksCard = ({ tasks }: { tasks: string[] }) => (
  <div 
    className="p-6 rounded-lg border"
    style={{
      backgroundColor: googleStitchDesignSystem.colors.surface.tertiary,
      borderColor: googleStitchDesignSystem.colors.border.primary
    }}
  >
    <h3 style={{
      ...googleStitchDesignSystem.typography.label.large,
      color: googleStitchDesignSystem.colors.text.primary,
      marginBottom: '16px'
    }}>
      Current Tasks
    </h3>
    
    <div className="space-y-3">
      {tasks.map((task, index) => (
        <div key={index} className="flex items-center gap-3">
          <div 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: googleStitchDesignSystem.colors.secondary }}
          />
          <span style={{
            ...googleStitchDesignSystem.typography.body.medium,
            color: googleStitchDesignSystem.colors.text.secondary
          }}>
            {task}
          </span>
        </div>
      ))}
    </div>
  </div>
);

// Recent Activity Card
const RecentActivityCard = ({ activity }: { activity: any[] }) => (
  <div 
    className="p-6 rounded-lg border"
    style={{
      backgroundColor: googleStitchDesignSystem.colors.surface.tertiary,
      borderColor: googleStitchDesignSystem.colors.border.primary
    }}
  >
    <h3 style={{
      ...googleStitchDesignSystem.typography.label.large,
      color: googleStitchDesignSystem.colors.text.primary,
      marginBottom: '16px'
    }}>
      Recent Activity
    </h3>
    
    <div className="space-y-3">
      {activity.map((item, index) => (
        <ActivityItem key={index} activity={item} />
      ))}
    </div>
  </div>
);

// Activity Item Component
const ActivityItem = ({ activity }: { activity: any }) => (
  <div className="flex gap-3">
    <span style={{
      ...googleStitchDesignSystem.typography.body.small,
      color: googleStitchDesignSystem.colors.text.tertiary,
      minWidth: '70px'
    }}>
      {activity.time}
    </span>
    <span style={{
      ...googleStitchDesignSystem.typography.body.small,
      color: googleStitchDesignSystem.colors.text.secondary
    }}>
      {activity.action}
    </span>
  </div>
);

// Agent Config Card
const AgentConfigCard = ({ agent }: { agent: any }) => (
  <div 
    className="p-6 rounded-lg border"
    style={{
      backgroundColor: googleStitchDesignSystem.colors.surface.tertiary,
      borderColor: googleStitchDesignSystem.colors.border.primary
    }}
  >
    <h3 style={{
      ...googleStitchDesignSystem.typography.label.large,
      color: googleStitchDesignSystem.colors.text.primary,
      marginBottom: '16px'
    }}>
      Configuration
    </h3>
    
    <div className="space-y-3">
      <button 
        className="w-full py-2 px-4 rounded-lg hover:bg-blue-600/20 transition-colors"
        style={{
          backgroundColor: 'transparent',
          border: `1px solid ${googleStitchDesignSystem.colors.primary}`,
          color: googleStitchDesignSystem.colors.primary,
          fontSize: '14px'
        }}
      >
        Edit Profile
      </button>
      <button 
        className="w-full py-2 px-4 rounded-lg hover:bg-white/10 transition-colors"
        style={{
          backgroundColor: 'transparent',
          border: `1px solid ${googleStitchDesignSystem.colors.border.primary}`,
          color: googleStitchDesignSystem.colors.text.secondary,
          fontSize: '14px'
        }}
      >
        View Logs
      </button>
      <button 
        className="w-full py-2 px-4 rounded-lg hover:bg-orange-600/20 transition-colors"
        style={{
          backgroundColor: 'transparent',
          border: `1px solid ${googleStitchDesignSystem.colors.secondary}`,
          color: googleStitchDesignSystem.colors.secondary,
          fontSize: '14px'
        }}
      >
        Restart Agent
      </button>
    </div>
  </div>
);