'use client';

import { UnifiedLayout } from '@/components/layout/UnifiedLayout';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { designTokens, componentTokens, getStatusColor } from '@/lib/design-tokens';
import { Users, Crown, Shield, Zap, Brain, Code, Eye, Settings } from 'lucide-react';

interface Team {
  id: string;
  name: string;
  department: string;
  lead: string;
  members: number;
  status: 'active' | 'idle' | 'busy' | 'offline';
  specialization: string[];
  performance: {
    efficiency: number;
    tasksCompleted: number;
    successRate: number;
  };
}

const teams: Team[] = [
  {
    id: 'finance-dept',
    name: 'Finance Department',
    department: 'Financial Operations',
    lead: 'CFO Olamide',
    members: 4,
    status: 'active',
    specialization: ['Trading', 'Risk Management', 'Portfolio Analysis'],
    performance: {
      efficiency: 94,
      tasksCompleted: 287,
      successRate: 0.96
    }
  },
  {
    id: 'software-dept',
    name: 'Enhanced Software Department',
    department: 'Technology',
    lead: 'Chief Architect Agent',
    members: 8,
    status: 'busy',
    specialization: ['Development', 'AI Orchestration', 'System Architecture'],
    performance: {
      efficiency: 87,
      tasksCompleted: 156,
      successRate: 0.91
    }
  },
  {
    id: 'content-dept',
    name: 'Content Department',
    department: 'Content & Presentations',
    lead: 'PM Bimbo',
    members: 3,
    status: 'active',
    specialization: ['Presentations', 'Documentation', 'Visual Design'],
    performance: {
      efficiency: 92,
      tasksCompleted: 124,
      successRate: 0.94
    }
  },
  {
    id: 'mercor-dept',
    name: 'Mercor Division',
    department: 'Project Analysis',
    lead: 'PM Pajimo',
    members: 5,
    status: 'idle',
    specialization: ['Code Review', 'Quality Assurance', 'Technical Auditing'],
    performance: {
      efficiency: 89,
      tasksCompleted: 98,
      successRate: 0.97
    }
  }
];

const getDepartmentIcon = (department: string) => {
  switch (department) {
    case 'Financial Operations': return Crown;
    case 'Technology': return Code;
    case 'Content & Presentations': return Eye;
    case 'Project Analysis': return Shield;
    default: return Users;
  }
};

export default function TeamsPage() {
  const totalMembers = teams.reduce((sum, team) => sum + team.members, 0);
  const avgEfficiency = teams.reduce((sum, team) => sum + team.performance.efficiency, 0) / teams.length;
  const totalTasks = teams.reduce((sum, team) => sum + team.performance.tasksCompleted, 0);
  const avgSuccessRate = teams.reduce((sum, team) => sum + team.performance.successRate, 0) / teams.length;

  return (
    <UnifiedLayout title="TEAMS MANAGEMENT" subtitle="DEPARTMENT COORDINATION & PERFORMANCE MONITORING">
      <div className={`${designTokens.spacing.lg} space-y-8`}>
        
        {/* Team Statistics */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <Card className={componentTokens.metricCard}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className={`${designTokens.typography.sizes['2xl']} ${designTokens.typography.weights.black} ${designTokens.colors.accent.primary.split(' ')[0]}`}>
                    {teams.length}
                  </div>
                  <div className={`${designTokens.typography.sizes.sm} ${designTokens.colors.text.tertiary} uppercase ${designTokens.typography.tracking.wider} ${designTokens.typography.fonts.mono}`}>
                    Active Teams
                  </div>
                </div>
                <Users className={`h-8 w-8 ${designTokens.colors.accent.primary.split(' ')[0]}`} />
              </div>
            </CardContent>
          </Card>

          <Card className={componentTokens.metricCard}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className={`${designTokens.typography.sizes['2xl']} ${designTokens.typography.weights.black} ${designTokens.colors.accent.success.split(' ')[0]}`}>
                    {totalMembers}
                  </div>
                  <div className={`${designTokens.typography.sizes.sm} ${designTokens.colors.text.tertiary} uppercase ${designTokens.typography.tracking.wider} ${designTokens.typography.fonts.mono}`}>
                    Team Members
                  </div>
                </div>
                <Brain className={`h-8 w-8 ${designTokens.colors.accent.success.split(' ')[0]}`} />
              </div>
            </CardContent>
          </Card>

          <Card className={componentTokens.metricCard}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className={`${designTokens.typography.sizes['2xl']} ${designTokens.typography.weights.black} ${designTokens.colors.accent.secondary.split(' ')[0]}`}>
                    {Math.round(avgEfficiency)}%
                  </div>
                  <div className={`${designTokens.typography.sizes.sm} ${designTokens.colors.text.tertiary} uppercase ${designTokens.typography.tracking.wider} ${designTokens.typography.fonts.mono}`}>
                    Avg Efficiency
                  </div>
                </div>
                <Zap className={`h-8 w-8 ${designTokens.colors.accent.secondary.split(' ')[0]}`} />
              </div>
            </CardContent>
          </Card>

          <Card className={componentTokens.metricCard}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className={`${designTokens.typography.sizes['2xl']} ${designTokens.typography.weights.black} ${designTokens.colors.accent.success.split(' ')[0]}`}>
                    {Math.round(avgSuccessRate * 100)}%
                  </div>
                  <div className={`${designTokens.typography.sizes.sm} ${designTokens.colors.text.tertiary} uppercase ${designTokens.typography.tracking.wider} ${designTokens.typography.fonts.mono}`}>
                    Success Rate
                  </div>
                </div>
                <Shield className={`h-8 w-8 ${designTokens.colors.accent.success.split(' ')[0]}`} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Teams Grid */}
        <Card className={componentTokens.commandCard}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${designTokens.typography.fonts.mono} uppercase ${designTokens.typography.tracking.wider}`}>
              <Users className="h-5 w-5" />
              Department Teams
              <Badge variant="outline" className={designTokens.typography.fonts.mono}>
                {teams.length} Active
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {teams.map((team) => {
                const DepartmentIcon = getDepartmentIcon(team.department);
                const statusColor = getStatusColor(team.status);
                
                return (
                  <Card key={team.id} className={`${componentTokens.metricCard} overflow-hidden`}>
                    {/* Status indicator bar */}
                    <div className={`h-1 ${statusColor.split(' ')[1]}`} />
                    
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 ${statusColor.split(' ')[1]} ${designTokens.radius.lg} flex items-center justify-center`}>
                            <DepartmentIcon className="h-5 w-5 text-slate-900" />
                          </div>
                          <div>
                            <CardTitle className={`${designTokens.typography.sizes.lg} ${designTokens.typography.weights.bold} mb-1`}>
                              {team.name}
                            </CardTitle>
                            <div className={`${designTokens.typography.sizes.sm} ${designTokens.colors.text.tertiary}`}>
                              {team.department}
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className={`${statusColor.split(' ')[0]} border-current`}>
                          {team.status.toUpperCase()}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Team Info */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className={`${designTokens.typography.sizes.xs} ${designTokens.colors.text.tertiary} uppercase ${designTokens.typography.tracking.wider} ${designTokens.typography.fonts.mono} mb-1`}>
                            Team Lead
                          </div>
                          <div className={`${designTokens.typography.sizes.sm} ${designTokens.typography.weights.medium}`}>
                            {team.lead}
                          </div>
                        </div>
                        <div>
                          <div className={`${designTokens.typography.sizes.xs} ${designTokens.colors.text.tertiary} uppercase ${designTokens.typography.tracking.wider} ${designTokens.typography.fonts.mono} mb-1`}>
                            Members
                          </div>
                          <div className={`${designTokens.typography.sizes.sm} ${designTokens.typography.weights.medium}`}>
                            {team.members} Active
                          </div>
                        </div>
                      </div>

                      {/* Performance Metrics */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className={`${designTokens.typography.sizes.lg} ${designTokens.typography.weights.bold} ${designTokens.colors.accent.success.split(' ')[0]}`}>
                            {team.performance.efficiency}%
                          </div>
                          <div className={`${designTokens.typography.sizes.xs} ${designTokens.colors.text.tertiary}`}>
                            Efficiency
                          </div>
                        </div>
                        <div className="text-center">
                          <div className={`${designTokens.typography.sizes.lg} ${designTokens.typography.weights.bold} ${designTokens.colors.accent.secondary.split(' ')[0]}`}>
                            {team.performance.tasksCompleted}
                          </div>
                          <div className={`${designTokens.typography.sizes.xs} ${designTokens.colors.text.tertiary}`}>
                            Tasks
                          </div>
                        </div>
                        <div className="text-center">
                          <div className={`${designTokens.typography.sizes.lg} ${designTokens.typography.weights.bold} ${designTokens.colors.accent.primary.split(' ')[0]}`}>
                            {Math.round(team.performance.successRate * 100)}%
                          </div>
                          <div className={`${designTokens.typography.sizes.xs} ${designTokens.colors.text.tertiary}`}>
                            Success
                          </div>
                        </div>
                      </div>

                      {/* Specializations */}
                      <div>
                        <div className={`${designTokens.typography.sizes.xs} ${designTokens.colors.text.tertiary} uppercase ${designTokens.typography.tracking.wider} ${designTokens.typography.fonts.mono} mb-2`}>
                          Specializations
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {team.specialization.map((spec) => (
                            <Badge 
                              key={spec} 
                              variant="outline" 
                              className={`${designTokens.typography.sizes.xs} px-2 py-1`}
                            >
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </UnifiedLayout>
  );
}