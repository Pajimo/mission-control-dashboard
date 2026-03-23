'use client';

import { useState, useEffect } from 'react';
import { UnifiedLayout } from '@/components/layout/UnifiedLayout';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { designTokens, componentTokens, getStatusColor } from '@/lib/design-tokens';
import { 
  Terminal, 
  Cpu, 
  Database, 
  Network, 
  HardDrive,
  MemoryStick,
  Wifi,
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react';

interface SystemService {
  name: string;
  status: 'running' | 'stopped' | 'error';
  uptime: string;
  cpu: number;
  memory: number;
  description: string;
}

interface SystemAlert {
  id: string;
  type: 'info' | 'warning' | 'error';
  message: string;
  timestamp: string;
  resolved: boolean;
}

export default function SystemPage() {
  const [systemServices, setSystemServices] = useState<SystemService[]>([
    {
      name: 'OpenClaw Gateway',
      status: 'running',
      uptime: '7d 14h 32m',
      cpu: 12.5,
      memory: 245,
      description: 'Main gateway service for agent communication'
    },
    {
      name: 'Ruflo Daemon',
      status: 'running',
      uptime: '2h 15m',
      cpu: 8.3,
      memory: 189,
      description: 'Agent orchestration and swarm coordination'
    },
    {
      name: 'Vector Database',
      status: 'running',
      uptime: '7d 14h 29m',
      cpu: 15.7,
      memory: 512,
      description: 'HNSW vector search and memory storage'
    },
    {
      name: 'Mission Control API',
      status: 'running',
      uptime: '3d 8h 45m',
      cpu: 5.2,
      memory: 128,
      description: 'Dashboard API and data aggregation'
    },
    {
      name: 'Finance Module',
      status: 'running',
      uptime: '1d 12h 18m',
      cpu: 22.1,
      memory: 356,
      description: 'Trading and financial analysis services'
    },
    {
      name: 'Security Scanner',
      status: 'error',
      uptime: '0m',
      cpu: 0,
      memory: 0,
      description: 'AIDefence security monitoring (needs restart)'
    }
  ]);

  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>([
    {
      id: 'alert-001',
      type: 'warning',
      message: 'High CPU usage detected on Vector Database service',
      timestamp: '2026-03-23T16:45:00Z',
      resolved: false
    },
    {
      id: 'alert-002',
      type: 'error',
      message: 'Security Scanner service failed to start',
      timestamp: '2026-03-23T16:30:00Z',
      resolved: false
    },
    {
      id: 'alert-003',
      type: 'info',
      message: 'Ruflo Daemon successfully deployed with 8 agents',
      timestamp: '2026-03-23T16:25:00Z',
      resolved: true
    }
  ]);

  const [systemStats] = useState({
    cpu: { usage: 67, cores: 8, temperature: 72 },
    memory: { usage: 84, total: 32, available: 5.1 },
    disk: { usage: 45, total: 1000, available: 550 },
    network: { in: 23.5, out: 12.8, latency: 12 }
  });

  const getServiceStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-emerald-400 bg-emerald-400';
      case 'stopped': return 'text-yellow-400 bg-yellow-400';
      case 'error': return 'text-red-400 bg-red-400';
      default: return 'text-slate-400 bg-slate-400';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'info': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return AlertTriangle;
      default: return CheckCircle;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'info': return 'text-blue-400 bg-blue-400';
      case 'warning': return 'text-yellow-400 bg-yellow-400';
      case 'error': return 'text-red-400 bg-red-400';
      default: return 'text-slate-400 bg-slate-400';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now.getTime() - time.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    
    if (diffMinutes < 60) {
      return `${diffMinutes}m ago`;
    }
    const diffHours = Math.floor(diffMinutes / 60);
    return `${diffHours}h ${diffMinutes % 60}m ago`;
  };

  const runningServices = systemServices.filter(s => s.status === 'running').length;
  const errorServices = systemServices.filter(s => s.status === 'error').length;
  const activeAlerts = systemAlerts.filter(a => !a.resolved).length;

  return (
    <UnifiedLayout title="SYSTEM MONITORING" subtitle="INFRASTRUCTURE HEALTH & PERFORMANCE ANALYTICS">
      <div className={`${designTokens.spacing.lg} space-y-8`}>
        
        {/* System Overview */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <Card className={componentTokens.metricCard}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className={`${designTokens.typography.sizes['2xl']} ${designTokens.typography.weights.black} ${designTokens.colors.accent.success.split(' ')[0]}`}>
                    {runningServices}
                  </div>
                  <div className={`${designTokens.typography.sizes.sm} ${designTokens.colors.text.tertiary} uppercase ${designTokens.typography.tracking.wider} ${designTokens.typography.fonts.mono}`}>
                    Services Running
                  </div>
                </div>
                <CheckCircle className={`h-8 w-8 ${designTokens.colors.accent.success.split(' ')[0]}`} />
              </div>
            </CardContent>
          </Card>

          <Card className={componentTokens.metricCard}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className={`${designTokens.typography.sizes['2xl']} ${designTokens.typography.weights.black} ${systemStats.cpu.usage > 80 ? designTokens.colors.accent.danger : designTokens.colors.accent.primary}.split(' ')[0]`}>
                    {systemStats.cpu.usage}%
                  </div>
                  <div className={`${designTokens.typography.sizes.sm} ${designTokens.colors.text.tertiary} uppercase ${designTokens.typography.tracking.wider} ${designTokens.typography.fonts.mono}`}>
                    CPU Usage
                  </div>
                </div>
                <Cpu className={`h-8 w-8 ${systemStats.cpu.usage > 80 ? 'text-red-400' : designTokens.colors.accent.primary.split(' ')[0]}`} />
              </div>
            </CardContent>
          </Card>

          <Card className={componentTokens.metricCard}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className={`${designTokens.typography.sizes['2xl']} ${designTokens.typography.weights.black} ${systemStats.memory.usage > 85 ? 'text-red-400' : designTokens.colors.accent.secondary.split(' ')[0]}`}>
                    {systemStats.memory.usage}%
                  </div>
                  <div className={`${designTokens.typography.sizes.sm} ${designTokens.colors.text.tertiary} uppercase ${designTokens.typography.tracking.wider} ${designTokens.typography.fonts.mono}`}>
                    Memory Usage
                  </div>
                </div>
                <MemoryStick className={`h-8 w-8 ${systemStats.memory.usage > 85 ? 'text-red-400' : designTokens.colors.accent.secondary.split(' ')[0]}`} />
              </div>
            </CardContent>
          </Card>

          <Card className={componentTokens.metricCard}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className={`${designTokens.typography.sizes['2xl']} ${designTokens.typography.weights.black} ${activeAlerts > 0 ? 'text-red-400' : designTokens.colors.accent.success.split(' ')[0]}`}>
                    {activeAlerts}
                  </div>
                  <div className={`${designTokens.typography.sizes.sm} ${designTokens.colors.text.tertiary} uppercase ${designTokens.typography.tracking.wider} ${designTokens.typography.fonts.mono}`}>
                    Active Alerts
                  </div>
                </div>
                <AlertTriangle className={`h-8 w-8 ${activeAlerts > 0 ? 'text-red-400' : designTokens.colors.accent.success.split(' ')[0]}`} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
          {/* System Services */}
          <div className="xl:col-span-2">
            <Card className={componentTokens.commandCard}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${designTokens.typography.fonts.mono} uppercase ${designTokens.typography.tracking.wider}`}>
                  <Terminal className="h-5 w-5" />
                  System Services
                  <Badge variant="outline" className={designTokens.typography.fonts.mono}>
                    {systemServices.length} Total
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {systemServices.map((service) => {
                  const statusColor = getServiceStatusColor(service.status);
                  
                  return (
                    <Card key={service.name} className={`${componentTokens.metricCard} p-4`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 ${statusColor.split(' ')[1]} rounded-full ${service.status === 'running' ? 'animate-pulse' : ''}`} />
                          <div>
                            <h4 className={`${designTokens.typography.weights.medium}`}>{service.name}</h4>
                            <div className={`${designTokens.typography.sizes.sm} ${designTokens.colors.text.tertiary}`}>
                              {service.description}
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className={`${statusColor.split(' ')[0]} border-current`}>
                          {service.status.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className={`${designTokens.colors.text.tertiary}`}>Uptime</div>
                          <div className={designTokens.typography.weights.medium}>{service.uptime}</div>
                        </div>
                        <div>
                          <div className={`${designTokens.colors.text.tertiary}`}>CPU</div>
                          <div className={designTokens.typography.weights.medium}>{service.cpu}%</div>
                        </div>
                        <div>
                          <div className={`${designTokens.colors.text.tertiary}`}>Memory</div>
                          <div className={designTokens.typography.weights.medium}>{service.memory}MB</div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* System Alerts & Performance */}
          <div className="space-y-6">
            {/* System Alerts */}
            <Card className={componentTokens.commandCard}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${designTokens.typography.fonts.mono} uppercase ${designTokens.typography.tracking.wider}`}>
                  <AlertTriangle className="h-5 w-5" />
                  System Alerts
                  <Badge variant="outline" className={designTokens.typography.fonts.mono}>
                    {activeAlerts} Active
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {systemAlerts.slice(0, 5).map((alert) => {
                  const AlertIcon = getAlertIcon(alert.type);
                  const alertColor = getAlertColor(alert.type);
                  
                  return (
                    <div 
                      key={alert.id} 
                      className={`p-3 ${alert.resolved ? 'opacity-60' : ''} bg-slate-800/30 rounded-lg`}
                    >
                      <div className="flex items-start gap-3">
                        <AlertIcon className={`h-4 w-4 ${alertColor.split(' ')[0]} flex-shrink-0 mt-0.5`} />
                        <div className="flex-1 min-w-0">
                          <div className={`${designTokens.typography.sizes.sm} ${designTokens.typography.weights.medium}`}>
                            {alert.message}
                          </div>
                          <div className={`${designTokens.typography.sizes.xs} ${designTokens.colors.text.tertiary} mt-1`}>
                            {formatTimeAgo(alert.timestamp)}
                          </div>
                        </div>
                        {alert.resolved && (
                          <CheckCircle className={`h-4 w-4 ${designTokens.colors.accent.success.split(' ')[0]}`} />
                        )}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className={componentTokens.commandCard}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${designTokens.typography.fonts.mono} uppercase ${designTokens.typography.tracking.wider}`}>
                  <Activity className="h-5 w-5" />
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`${designTokens.typography.sizes.sm} ${designTokens.colors.text.tertiary}`}>CPU Usage</span>
                    <span className={`${designTokens.typography.sizes.sm} ${designTokens.typography.weights.medium}`}>{systemStats.cpu.usage}%</span>
                  </div>
                  <div className={`w-full bg-slate-800 rounded-full h-2`}>
                    <div 
                      className={`${systemStats.cpu.usage > 80 ? 'bg-red-400' : 'bg-blue-400'} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${systemStats.cpu.usage}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`${designTokens.typography.sizes.sm} ${designTokens.colors.text.tertiary}`}>Memory Usage</span>
                    <span className={`${designTokens.typography.sizes.sm} ${designTokens.typography.weights.medium}`}>{systemStats.memory.usage}%</span>
                  </div>
                  <div className={`w-full bg-slate-800 rounded-full h-2`}>
                    <div 
                      className={`${systemStats.memory.usage > 85 ? 'bg-red-400' : 'bg-cyan-400'} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${systemStats.memory.usage}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`${designTokens.typography.sizes.sm} ${designTokens.colors.text.tertiary}`}>Disk Usage</span>
                    <span className={`${designTokens.typography.sizes.sm} ${designTokens.typography.weights.medium}`}>{systemStats.disk.usage}%</span>
                  </div>
                  <div className={`w-full bg-slate-800 rounded-full h-2`}>
                    <div 
                      className="bg-emerald-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${systemStats.disk.usage}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="text-center">
                    <div className={`${designTokens.typography.sizes.lg} ${designTokens.typography.weights.bold} ${designTokens.colors.accent.success.split(' ')[0]}`}>
                      {systemStats.network.latency}ms
                    </div>
                    <div className={`${designTokens.typography.sizes.xs} ${designTokens.colors.text.tertiary}`}>
                      Network Latency
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`${designTokens.typography.sizes.lg} ${designTokens.typography.weights.bold} ${designTokens.colors.accent.secondary.split(' ')[0]}`}>
                      99.8%
                    </div>
                    <div className={`${designTokens.typography.sizes.xs} ${designTokens.colors.text.tertiary}`}>
                      Uptime
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </UnifiedLayout>
  );
}