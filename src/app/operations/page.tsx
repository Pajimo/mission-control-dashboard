'use client';

import { useState, useEffect } from 'react';
import { UnifiedLayout } from '@/components/layout/UnifiedLayout';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { designTokens, componentTokens, getStatusColor } from '@/lib/design-tokens';
import { Activity, Zap, Clock, CheckCircle, AlertTriangle, TrendingUp, Database, Cpu, Network } from 'lucide-react';

interface Operation {
  id: string;
  title: string;
  type: 'deployment' | 'analysis' | 'monitoring' | 'optimization';
  status: 'active' | 'idle' | 'busy' | 'completed';
  progress: number;
  department: string;
  assignedAgent: string;
  startTime: string;
  estimatedCompletion?: string;
  priority: 'low' | 'normal' | 'high' | 'critical';
}

interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: 'healthy' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  icon: React.ComponentType<{ className?: string }>;
}

export default function OperationsPage() {
  const [operations, setOperations] = useState<Operation[]>([
    {
      id: 'op-001',
      title: 'Mission Control Reconstruction',
      type: 'deployment',
      status: 'busy',
      progress: 35,
      department: 'Software',
      assignedAgent: 'Chief Architect Agent',
      startTime: '2026-03-23T16:47:00Z',
      estimatedCompletion: '2026-04-15T18:00:00Z',
      priority: 'critical'
    },
    {
      id: 'op-002', 
      title: 'Ruflo Agent Integration',
      type: 'optimization',
      status: 'completed',
      progress: 100,
      department: 'Software',
      assignedAgent: 'Master Coder Agent',
      startTime: '2026-03-23T16:20:00Z',
      priority: 'high'
    },
    {
      id: 'op-003',
      title: 'Finance Department Trading Analysis',
      type: 'analysis',
      status: 'active',
      progress: 78,
      department: 'Finance',
      assignedAgent: 'CFO Olamide',
      startTime: '2026-03-23T14:30:00Z',
      estimatedCompletion: '2026-03-23T18:00:00Z',
      priority: 'normal'
    },
    {
      id: 'op-004',
      title: 'System Performance Monitoring',
      type: 'monitoring',
      status: 'active',
      progress: 0,
      department: 'System',
      assignedAgent: 'Performance Agent',
      startTime: '2026-03-23T16:00:00Z',
      priority: 'normal'
    }
  ]);

  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([
    { name: 'CPU Usage', value: 67, unit: '%', status: 'healthy', trend: 'stable', icon: Cpu },
    { name: 'Memory Usage', value: 84, unit: '%', status: 'warning', trend: 'up', icon: Database },
    { name: 'Network I/O', value: 23, unit: 'MB/s', status: 'healthy', trend: 'stable', icon: Network },
    { name: 'Active Agents', value: 12, unit: '', status: 'healthy', trend: 'up', icon: Activity }
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deployment': return Zap;
      case 'analysis': return TrendingUp;
      case 'monitoring': return Activity;
      case 'optimization': return CheckCircle;
      default: return Clock;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400 bg-red-400';
      case 'high': return 'text-orange-400 bg-orange-400';
      case 'normal': return 'text-blue-400 bg-blue-400';
      case 'low': return 'text-slate-400 bg-slate-400';
      default: return 'text-slate-400 bg-slate-400';
    }
  };

  const getMetricStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-emerald-400 bg-emerald-400';
      case 'warning': return 'text-yellow-400 bg-yellow-400';
      case 'critical': return 'text-red-400 bg-red-400';
      default: return 'text-slate-400 bg-slate-400';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now.getTime() - time.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 0) {
      return `${diffHours}h ${diffMinutes}m ago`;
    }
    return `${diffMinutes}m ago`;
  };

  const activeOperations = operations.filter(op => op.status === 'active' || op.status === 'busy');
  const completedOperations = operations.filter(op => op.status === 'completed');

  return (
    <UnifiedLayout title="OPERATIONS CENTER" subtitle="LIVE OPERATIONAL MONITORING & TASK COORDINATION">
      <div className={`${designTokens.spacing.lg} space-y-8`}>
        
        {/* Operations Statistics */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <Card className={componentTokens.metricCard}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className={`${designTokens.typography.sizes['2xl']} ${designTokens.typography.weights.black} ${designTokens.colors.accent.primary.split(' ')[0]}`}>
                    {activeOperations.length}
                  </div>
                  <div className={`${designTokens.typography.sizes.sm} ${designTokens.colors.text.tertiary} uppercase ${designTokens.typography.tracking.wider} ${designTokens.typography.fonts.mono}`}>
                    Active Ops
                  </div>
                </div>
                <Activity className={`h-8 w-8 ${designTokens.colors.accent.primary.split(' ')[0]}`} />
              </div>
            </CardContent>
          </Card>

          <Card className={componentTokens.metricCard}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className={`${designTokens.typography.sizes['2xl']} ${designTokens.typography.weights.black} ${designTokens.colors.accent.success.split(' ')[0]}`}>
                    {completedOperations.length}
                  </div>
                  <div className={`${designTokens.typography.sizes.sm} ${designTokens.colors.text.tertiary} uppercase ${designTokens.typography.tracking.wider} ${designTokens.typography.fonts.mono}`}>
                    Completed
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
                  <div className={`${designTokens.typography.sizes['2xl']} ${designTokens.typography.weights.black} ${designTokens.colors.accent.secondary.split(' ')[0]}`}>
                    {Math.round(operations.reduce((sum, op) => sum + op.progress, 0) / operations.length)}%
                  </div>
                  <div className={`${designTokens.typography.sizes.sm} ${designTokens.colors.text.tertiary} uppercase ${designTokens.typography.tracking.wider} ${designTokens.typography.fonts.mono}`}>
                    Avg Progress
                  </div>
                </div>
                <TrendingUp className={`h-8 w-8 ${designTokens.colors.accent.secondary.split(' ')[0]}`} />
              </div>
            </CardContent>
          </Card>

          <Card className={componentTokens.metricCard}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className={`${designTokens.typography.sizes['2xl']} ${designTokens.typography.weights.black} ${designTokens.colors.accent.primary.split(' ')[0]}`}>
                    98.5%
                  </div>
                  <div className={`${designTokens.typography.sizes.sm} ${designTokens.colors.text.tertiary} uppercase ${designTokens.typography.tracking.wider} ${designTokens.typography.fonts.mono}`}>
                    Uptime
                  </div>
                </div>
                <Zap className={`h-8 w-8 ${designTokens.colors.accent.primary.split(' ')[0]}`} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
          {/* Active Operations */}
          <div className="xl:col-span-2">
            <Card className={componentTokens.commandCard}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${designTokens.typography.fonts.mono} uppercase ${designTokens.typography.tracking.wider}`}>
                  <Activity className="h-5 w-5" />
                  Active Operations
                  <Badge variant="outline" className={designTokens.typography.fonts.mono}>
                    {operations.length} Total
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {operations.map((operation) => {
                  const TypeIcon = getTypeIcon(operation.type);
                  const statusColor = getStatusColor(operation.status);
                  const priorityColor = getPriorityColor(operation.priority);
                  
                  return (
                    <Card key={operation.id} className={`${componentTokens.metricCard} p-4`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 ${statusColor.split(' ')[1]} ${designTokens.radius.lg} flex items-center justify-center`}>
                            <TypeIcon className="h-4 w-4 text-slate-900" />
                          </div>
                          <div>
                            <h4 className={`${designTokens.typography.weights.medium}`}>{operation.title}</h4>
                            <div className={`${designTokens.typography.sizes.sm} ${designTokens.colors.text.tertiary}`}>
                              {operation.department} • {operation.assignedAgent}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={`${priorityColor.split(' ')[0]} border-current`}>
                            {operation.priority.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className={`${statusColor.split(' ')[0]} border-current`}>
                            {operation.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className={designTokens.colors.text.tertiary}>Progress</span>
                          <span className={designTokens.typography.weights.medium}>{operation.progress}%</span>
                        </div>
                        <div className={`w-full ${designTokens.colors.background.tertiary} rounded-full h-2`}>
                          <div 
                            className={`${statusColor.split(' ')[1]} h-2 rounded-full transition-all duration-300`}
                            style={{ width: `${operation.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className={`${designTokens.colors.text.tertiary}`}>
                          Started {formatTimeAgo(operation.startTime)}
                        </span>
                        {operation.estimatedCompletion && (
                          <span className={`${designTokens.colors.text.tertiary}`}>
                            ETA: {new Date(operation.estimatedCompletion).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* System Metrics */}
          <div>
            <Card className={componentTokens.commandCard}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${designTokens.typography.fonts.mono} uppercase ${designTokens.typography.tracking.wider}`}>
                  <Database className="h-5 w-5" />
                  System Metrics
                  <Badge variant="outline" className={designTokens.typography.fonts.mono}>
                    Live
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {systemMetrics.map((metric) => {
                  const MetricIcon = metric.icon;
                  const statusColor = getMetricStatusColor(metric.status);
                  
                  return (
                    <div key={metric.name} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <MetricIcon className={`h-5 w-5 ${statusColor.split(' ')[0]}`} />
                        <div>
                          <div className={`${designTokens.typography.weights.medium}`}>{metric.name}</div>
                          <div className={`${designTokens.typography.sizes.sm} ${designTokens.colors.text.tertiary}`}>
                            {metric.status}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`${designTokens.typography.weights.bold} ${statusColor.split(' ')[0]}`}>
                          {metric.value}{metric.unit}
                        </div>
                        <div className={`${designTokens.typography.sizes.xs} ${designTokens.colors.text.tertiary}`}>
                          {metric.trend === 'up' && '↗'} 
                          {metric.trend === 'down' && '↘'} 
                          {metric.trend === 'stable' && '→'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className={`${componentTokens.commandCard} mt-6`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${designTokens.typography.fonts.mono} uppercase ${designTokens.typography.tracking.wider}`}>
                  <Zap className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  'System Health Check',
                  'Performance Analysis',
                  'Agent Deployment',
                  'Resource Optimization'
                ].map((action) => (
                  <button 
                    key={action}
                    className={`w-full text-left p-3 hover:${designTokens.colors.background.tertiary} ${designTokens.radius.lg} transition-colors ${designTokens.typography.sizes.sm}`}
                  >
                    {action}
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </UnifiedLayout>
  );
}