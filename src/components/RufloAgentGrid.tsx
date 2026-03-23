'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RufloAgent, rufloAPI } from '@/lib/ruflo-api';

const statusColors = {
  active: 'bg-green-500',
  idle: 'bg-blue-500', 
  busy: 'bg-yellow-500',
  offline: 'bg-gray-500'
} as const;

const statusLabels = {
  active: 'Active',
  idle: 'Idle',
  busy: 'Busy', 
  offline: 'Offline'
} as const;

export function RufloAgentGrid() {
  const [agents, setAgents] = useState<RufloAgent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true);
        const agentData = await rufloAPI.getAgents();
        setAgents(agentData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch Ruflo agents');
        console.error('Error fetching agents:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchAgents, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🤖 Ruflo Agent Network
            <Badge variant="outline">Loading...</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">❌ Error Loading Agents</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }

  const activeAgents = agents.filter(a => a.status === 'active').length;
  const busyAgents = agents.filter(a => a.status === 'busy').length;
  const idleAgents = agents.filter(a => a.status === 'idle').length;

  return (
    <div className="space-y-6">
      {/* Agent Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🤖 Ruflo Agent Network
            <Badge variant="outline">{agents.length} Total Agents</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{activeAgents}</div>
              <div className="text-sm text-gray-600">Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{busyAgents}</div>
              <div className="text-sm text-gray-600">Busy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{idleAgents}</div>
              <div className="text-sm text-gray-600">Idle</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(agents.reduce((acc, a) => acc + a.performance.successRate, 0) / agents.length * 100)}%
              </div>
              <div className="text-sm text-gray-600">Avg Success</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Agent Grid */}
      <Card>
        <CardHeader>
          <CardTitle>👥 Agent Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {agents.map((agent) => (
              <Card key={agent.id} className="relative overflow-hidden">
                {/* Status Indicator */}
                <div 
                  className={`absolute top-0 right-0 w-3 h-3 rounded-full m-2 ${statusColors[agent.status]}`}
                  title={statusLabels[agent.status]}
                />
                
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium truncate">
                      {agent.name}
                    </CardTitle>
                  </div>
                  <Badge variant="secondary" className="text-xs w-fit">
                    {agent.type}
                  </Badge>
                </CardHeader>
                
                <CardContent className="pt-0 space-y-2">
                  {/* Performance Metrics */}
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tasks:</span>
                      <span className="font-medium">{agent.performance.tasksCompleted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Success:</span>
                      <span className="font-medium">
                        {Math.round(agent.performance.successRate * 100)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg Time:</span>
                      <span className="font-medium">
                        {Math.round(agent.performance.avgResponseTime)}ms
                      </span>
                    </div>
                  </div>

                  {/* Capabilities */}
                  <div className="flex flex-wrap gap-1">
                    {agent.capabilities.slice(0, 2).map((capability) => (
                      <Badge 
                        key={capability} 
                        variant="outline" 
                        className="text-xs px-2 py-0"
                      >
                        {capability.replace('-', ' ')}
                      </Badge>
                    ))}
                    {agent.capabilities.length > 2 && (
                      <Badge variant="outline" className="text-xs px-2 py-0">
                        +{agent.capabilities.length - 2}
                      </Badge>
                    )}
                  </div>

                  {/* Last Activity */}
                  {agent.lastActivity && (
                    <div className="text-xs text-gray-500">
                      Last active: {new Date(agent.lastActivity).toLocaleTimeString()}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}