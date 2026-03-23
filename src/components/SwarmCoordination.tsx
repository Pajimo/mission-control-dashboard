'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SwarmTopology, TaskAssignment, rufloAPI } from '@/lib/ruflo-api';

export function SwarmCoordination() {
  const [topology, setTopology] = useState<SwarmTopology | null>(null);
  const [tasks, setTasks] = useState<TaskAssignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [topologyData, taskData] = await Promise.all([
          rufloAPI.getSwarmTopology(),
          rufloAPI.getTasks()
        ]);
        setTopology(topologyData);
        setTasks(taskData);
      } catch (error) {
        console.error('Error fetching swarm data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>🐝 Swarm Coordination</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-20 bg-gray-100 rounded animate-pulse" />
            <div className="h-32 bg-gray-100 rounded animate-pulse" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const getTopologyIcon = (type: string) => {
    switch (type) {
      case 'hierarchical': return '👑';
      case 'mesh': return '🕸️';
      case 'ring': return '💍';
      case 'star': return '⭐';
      default: return '🔗';
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'normal': return 'text-blue-600 bg-blue-50';
      case 'low': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Swarm Topology */}
      {topology && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🐝 Swarm Coordination
              <Badge variant="outline">
                {getTopologyIcon(topology.type)} {topology.type}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{topology.currentAgents}</div>
                <div className="text-sm text-gray-600">Active Agents</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{topology.maxAgents}</div>
                <div className="text-sm text-gray-600">Max Capacity</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round(topology.coordinationLatency)}ms
                </div>
                <div className="text-sm text-gray-600">Coordination</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">{topology.protocol}</div>
                <div className="text-sm text-gray-600">Protocol</div>
              </div>
            </div>
            
            {/* Topology Visualization */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium mb-3">Topology Structure</h4>
              <div className="flex justify-center">
                {topology.type === 'hierarchical' && (
                  <div className="text-center space-y-2">
                    <div className="text-2xl">👑</div>
                    <div className="text-xs text-gray-600">Queen Coordinator</div>
                    <div className="flex gap-4 mt-4">
                      <div className="text-center">
                        <div className="text-lg">👷‍♀️</div>
                        <div className="text-xs">Coder</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg">🧪</div>
                        <div className="text-xs">Tester</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg">👁️</div>
                        <div className="text-xs">Reviewer</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📋 Active Task Queue
            <Badge variant="outline">{tasks.length} Tasks</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No active tasks
              </div>
            ) : (
              tasks.map((task) => (
                <Card key={task.taskId} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div 
                        className={`w-3 h-3 rounded-full ${getTaskStatusColor(task.status)}`}
                        title={task.status}
                      />
                      <Badge variant="secondary" className="text-xs">
                        {task.type}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getPriorityColor(task.priority)}`}
                      >
                        {task.priority}
                      </Badge>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {task.assignedAgent}
                    </Badge>
                  </div>
                  
                  <div className="mb-3">
                    <h4 className="text-sm font-medium">{task.description}</h4>
                    <div className="text-xs text-gray-500 mt-1">
                      Task ID: {task.taskId}
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{task.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Created: {new Date(task.created).toLocaleString()}</span>
                    <span>Updated: {new Date(task.updated).toLocaleTimeString()}</span>
                  </div>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}