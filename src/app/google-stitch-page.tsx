'use client';

import React from 'react';
import { googleStitchDesignSystem } from '@/lib/google-stitch-tokens';

// Google Fonts Import Component
const GoogleFontsLoader = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@300;400;500;600;700&display=swap"
    rel="stylesheet"
  />
);

// Material Icons Component
const MaterialIcon = ({ icon, size = 24, className = '' }: { icon: string; size?: number; className?: string }) => (
  <span 
    className={`material-icons-outlined ${className}`}
    style={{ fontSize: `${size}px` }}
  >
    {icon}
  </span>
);

// Button Component Library
const Button = ({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}: {
  variant?: 'primary' | 'secondary' | 'inverted' | 'outlined';
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) => {
  const styles = googleStitchDesignSystem.components.buttons[variant];
  
  return (
    <button
      className={`transition-all duration-200 hover:scale-105 active:scale-95 ${className}`}
      style={{
        ...styles,
        fontFamily: googleStitchDesignSystem.typography.fontFamily.primary
      }}
      {...props}
    >
      {children}
    </button>
  );
};

// Search Interface Component
const SearchInterface = ({ placeholder = "Search agents, tasks, logs..." }: { placeholder?: string }) => (
  <div 
    style={{
      ...googleStitchDesignSystem.components.search.container,
      fontFamily: googleStitchDesignSystem.typography.fontFamily.primary
    }}
  >
    <MaterialIcon icon="search" size={20} />
    <input
      type="text"
      placeholder={placeholder}
      style={{
        ...googleStitchDesignSystem.components.search.input,
        fontFamily: googleStitchDesignSystem.typography.fontFamily.primary
      }}
    />
  </div>
);

// Card Component
const Card = ({ 
  children, 
  elevated = false, 
  className = '', 
  title = '',
  ...props 
}: {
  children: React.ReactNode;
  elevated?: boolean;
  className?: string;
  title?: string;
  [key: string]: any;
}) => {
  const styles = elevated 
    ? googleStitchDesignSystem.components.cards.elevated
    : googleStitchDesignSystem.components.cards.primary;
  
  return (
    <div 
      className={`${className}`}
      style={{
        ...styles,
        fontFamily: googleStitchDesignSystem.typography.fontFamily.primary
      }}
      {...props}
    >
      {title && (
        <h3 style={{
          ...googleStitchDesignSystem.typography.headline.small,
          color: googleStitchDesignSystem.colors.text.primary,
          marginBottom: '16px'
        }}>
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

// Status Indicator Component
const StatusIndicator = ({ status }: { status: 'active' | 'idle' | 'busy' | 'offline' }) => {
  const colors = {
    active: googleStitchDesignSystem.colors.tertiary,    // #00E676
    idle: googleStitchDesignSystem.colors.primary,       // #2962FF
    busy: googleStitchDesignSystem.colors.secondary,     // #FFB300
    offline: googleStitchDesignSystem.colors.text.disabled // #616161
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

// Main Command Center Page
export default function GoogleStitchPage() {
  return (
    <>
      <GoogleFontsLoader />
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
            <MaterialIcon icon="dashboard" size={32} />
            <h1 style={{
              ...googleStitchDesignSystem.typography.headline.medium,
              color: googleStitchDesignSystem.colors.text.primary
            }}>
              Mission Control
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <SearchInterface />
            <Button variant="outlined">
              <MaterialIcon icon="notifications" size={20} />
            </Button>
            <Button variant="primary">
              <MaterialIcon icon="account_circle" size={20} />
            </Button>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar Navigation */}
          <nav 
            className="w-64 border-r min-h-screen p-4"
            style={{
              backgroundColor: googleStitchDesignSystem.colors.surface.secondary,
              borderColor: googleStitchDesignSystem.colors.border.primary
            }}
          >
            <div className="space-y-2">
              <NavItem icon="dashboard" label="Overview" active />
              <NavItem icon="smart_toy" label="Agent Status" />
              <NavItem icon="assignment" label="Task Board" />
              <NavItem icon="account_circle" label="Agent Profile" />
              <NavItem icon="public" label="Global Node Map" />
              <NavItem icon="description" label="Execution Logs" />
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Agent Status Cards */}
              <div className="lg:col-span-2">
                <Card title="Active Agents" elevated>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AgentCard 
                      name="CEO MideSquare" 
                      status="active" 
                      tasks={12} 
                      performance={98} 
                    />
                    <AgentCard 
                      name="CTO Bobo" 
                      status="busy" 
                      tasks={8} 
                      performance={95} 
                    />
                    <AgentCard 
                      name="CFO Olamide" 
                      status="idle" 
                      tasks={3} 
                      performance={97} 
                    />
                    <AgentCard 
                      name="PM Bimbo" 
                      status="active" 
                      tasks={15} 
                      performance={94} 
                    />
                  </div>
                </Card>
              </div>

              {/* Performance Metrics */}
              <div className="space-y-6">
                <Card title="System Health" elevated>
                  <div className="space-y-4">
                    <MetricItem 
                      label="CPU Usage" 
                      value="34%" 
                      color={googleStitchDesignSystem.colors.tertiary}
                    />
                    <MetricItem 
                      label="Memory" 
                      value="67%" 
                      color={googleStitchDesignSystem.colors.secondary}
                    />
                    <MetricItem 
                      label="Network" 
                      value="12%" 
                      color={googleStitchDesignSystem.colors.primary}
                    />
                  </div>
                </Card>
                
                <Card title="Quick Actions">
                  <div className="space-y-3">
                    <Button variant="primary" className="w-full">
                      Deploy Agent
                    </Button>
                    <Button variant="secondary" className="w-full">
                      View Logs
                    </Button>
                    <Button variant="outlined" className="w-full">
                      System Backup
                    </Button>
                  </div>
                </Card>
              </div>

            </div>
          </main>
        </div>
      </div>
    </>
  );
}

// Navigation Item Component
const NavItem = ({ 
  icon, 
  label, 
  active = false 
}: { 
  icon: string; 
  label: string; 
  active?: boolean;
}) => (
  <div 
    className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
      active ? 'bg-blue-600/20' : 'hover:bg-white/5'
    }`}
    style={{
      borderLeft: active ? `3px solid ${googleStitchDesignSystem.colors.primary}` : '3px solid transparent'
    }}
  >
    <MaterialIcon 
      icon={icon} 
      size={20} 
      className={active ? 'text-blue-400' : 'text-gray-400'} 
    />
    <span style={{
      ...googleStitchDesignSystem.typography.body.medium,
      color: active 
        ? googleStitchDesignSystem.colors.primary 
        : googleStitchDesignSystem.colors.text.secondary
    }}>
      {label}
    </span>
  </div>
);

// Agent Status Card Component
const AgentCard = ({ 
  name, 
  status, 
  tasks, 
  performance 
}: { 
  name: string; 
  status: 'active' | 'idle' | 'busy' | 'offline'; 
  tasks: number;
  performance: number;
}) => (
  <div 
    className="p-4 rounded-lg border"
    style={{
      backgroundColor: googleStitchDesignSystem.colors.surface.tertiary,
      borderColor: googleStitchDesignSystem.colors.border.primary
    }}
  >
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-3">
        <StatusIndicator status={status} />
        <span style={{
          ...googleStitchDesignSystem.typography.label.large,
          color: googleStitchDesignSystem.colors.text.primary
        }}>
          {name}
        </span>
      </div>
      <span style={{
        ...googleStitchDesignSystem.typography.body.small,
        color: googleStitchDesignSystem.colors.text.tertiary,
        textTransform: 'capitalize'
      }}>
        {status}
      </span>
    </div>
    
    <div className="grid grid-cols-2 gap-4">
      <div>
        <span style={{
          ...googleStitchDesignSystem.typography.body.small,
          color: googleStitchDesignSystem.colors.text.tertiary
        }}>
          Tasks
        </span>
        <div style={{
          ...googleStitchDesignSystem.typography.headline.small,
          color: googleStitchDesignSystem.colors.text.primary
        }}>
          {tasks}
        </div>
      </div>
      <div>
        <span style={{
          ...googleStitchDesignSystem.typography.body.small,
          color: googleStitchDesignSystem.colors.text.tertiary
        }}>
          Performance
        </span>
        <div style={{
          ...googleStitchDesignSystem.typography.headline.small,
          color: googleStitchDesignSystem.colors.tertiary
        }}>
          {performance}%
        </div>
      </div>
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
  <div className="flex items-center justify-between">
    <span style={{
      ...googleStitchDesignSystem.typography.body.medium,
      color: googleStitchDesignSystem.colors.text.secondary
    }}>
      {label}
    </span>
    <span 
      style={{
        ...googleStitchDesignSystem.typography.label.large,
        color: color
      }}
    >
      {value}
    </span>
  </div>
);