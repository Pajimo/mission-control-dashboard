'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PerformanceMetrics, MemoryMetrics, rufloAPI } from '@/lib/ruflo-api';

export function PerformanceAnalytics() {
  const [performance, setPerformance] = useState<PerformanceMetrics | null>(null);
  const [memory, setMemory] = useState<MemoryMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [performanceData, memoryData] = await Promise.all([
          rufloAPI.getPerformanceMetrics(),
          rufloAPI.getMemoryMetrics()
        ]);
        setPerformance(performanceData);
        setMemory(memoryData);
      } catch (error) {
        console.error('Error fetching performance data:', error);
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
          <CardTitle>⚡ Performance Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      {performance && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ⚡ Performance Analytics
              <Badge variant="outline">Ruflo Enhanced</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {/* Speed Enhancement */}
              <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {performance.speedup}x
                  </div>
                  <div className="text-sm text-green-700 font-medium">Faster</div>
                  <div className="text-xs text-green-600 mt-1">Agent Booster</div>
                </div>
              </Card>

              {/* Cost Savings */}
              <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round(performance.costSavings * 100)}%
                  </div>
                  <div className="text-sm text-blue-700 font-medium">Cost Savings</div>
                  <div className="text-xs text-blue-600 mt-1">API Optimization</div>
                </div>
              </Card>

              {/* Vector Search Speed */}
              <Card className="p-4 bg-gradient-to-br from-purple-50 to-violet-50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {performance.vectorSearchLatency.toFixed(1)}ms
                  </div>
                  <div className="text-sm text-purple-700 font-medium">Vector Search</div>
                  <div className="text-xs text-purple-600 mt-1">HNSW Index</div>
                </div>
              </Card>

              {/* Neural Adaptation */}
              <Card className="p-4 bg-gradient-to-br from-orange-50 to-amber-50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {performance.neuralAdaptation.toFixed(3)}ms
                  </div>
                  <div className="text-sm text-orange-700 font-medium">Neural Adapt</div>
                  <div className="text-xs text-orange-600 mt-1">SONA Learning</div>
                </div>
              </Card>

              {/* Consensus Time */}
              <Card className="p-4 bg-gradient-to-br from-red-50 to-rose-50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {Math.round(performance.consensusTime)}ms
                  </div>
                  <div className="text-sm text-red-700 font-medium">Consensus</div>
                  <div className="text-xs text-red-600 mt-1">Byzantine</div>
                </div>
              </Card>
            </div>

            {/* Performance Insights */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100">
                <h4 className="font-semibold text-green-800 mb-2">🚀 Speed Enhancement</h4>
                <p className="text-sm text-green-700">
                  Agent Booster provides 352x faster execution for simple code transformations 
                  using WebAssembly, bypassing expensive LLM calls entirely.
                </p>
              </Card>
              
              <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100">
                <h4 className="font-semibold text-blue-800 mb-2">💰 Cost Optimization</h4>
                <p className="text-sm text-blue-700">
                  Intelligent 3-tier routing reduces API costs by 75% through optimal 
                  task-to-model matching and Agent Booster for simple operations.
                </p>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Memory & Learning Analytics */}
      {memory && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🧠 Memory & Learning Analytics
              <Badge variant="outline">Self-Learning Active</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Vector Database Size */}
              <Card className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">
                    {(memory.vectorDatabaseSize / 1000).toFixed(1)}K
                  </div>
                  <div className="text-sm text-indigo-700 font-medium">Vector DB</div>
                  <div className="text-xs text-indigo-600 mt-1">Embeddings</div>
                </div>
              </Card>

              {/* Embedding Operations */}
              <Card className="p-4 bg-gradient-to-br from-teal-50 to-teal-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-600">
                    {memory.embeddingOperations}
                  </div>
                  <div className="text-sm text-teal-700 font-medium">Operations</div>
                  <div className="text-xs text-teal-600 mt-1">Last Hour</div>
                </div>
              </Card>

              {/* Knowledge Graph */}
              <Card className="p-4 bg-gradient-to-br from-pink-50 to-pink-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-600">
                    {(memory.knowledgeGraphNodes / 1000).toFixed(1)}K
                  </div>
                  <div className="text-sm text-pink-700 font-medium">Graph Nodes</div>
                  <div className="text-xs text-pink-600 mt-1">Knowledge</div>
                </div>
              </Card>

              {/* Retrieval Speed */}
              <Card className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {memory.retrievalLatency.toFixed(1)}ms
                  </div>
                  <div className="text-sm text-yellow-700 font-medium">Retrieval</div>
                  <div className="text-xs text-yellow-600 mt-1">Avg Latency</div>
                </div>
              </Card>
            </div>

            {/* Learning Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className={`p-4 ${memory.patternLearningActive ? 'bg-gradient-to-br from-green-50 to-green-100' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${memory.patternLearningActive ? 'bg-green-500' : 'bg-gray-400'} animate-pulse`} />
                  <div>
                    <h4 className={`font-semibold ${memory.patternLearningActive ? 'text-green-800' : 'text-gray-600'}`}>
                      Pattern Learning
                    </h4>
                    <p className={`text-sm ${memory.patternLearningActive ? 'text-green-700' : 'text-gray-500'}`}>
                      {memory.patternLearningActive ? 'Active - Learning from successful patterns' : 'Idle'}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🧠</div>
                  <div>
                    <h4 className="font-semibold text-purple-800">SONA Neural Learning</h4>
                    <p className="text-sm text-purple-700">
                      Self-Optimizing Neural Architecture with EWC++ forgetting prevention
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Technical Details */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3">🔧 Technical Implementation</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <strong className="text-gray-700">Vector Search:</strong>
                  <p className="text-gray-600">HNSW indexing with 384-dimensional embeddings</p>
                </div>
                <div>
                  <strong className="text-gray-700">Learning Algorithm:</strong>
                  <p className="text-gray-600">SONA with EWC++ catastrophic forgetting prevention</p>
                </div>
                <div>
                  <strong className="text-gray-700">Memory Backend:</strong>
                  <p className="text-gray-600">Hybrid SQLite + PostgreSQL with 77+ SQL functions</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}