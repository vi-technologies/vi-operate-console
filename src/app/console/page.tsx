'use client';

import { useEffect, useState } from 'react';
import { 
  Search, 
  BarChart3, 
  Database, 
  Layers, 
  Zap, 
  FileText,
  Code,
  Command,
  AlertCircle,
  Clock,
  Activity
} from 'lucide-react';
import { AnimatedBackground } from '@/components/_common/layout/animated-background';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/_common/ui/card';
import { Input } from '@/components/_common/ui/input';
import { Badge } from '@/components/_common/ui/badge';

export default function ConsolePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [commandInput, setCommandInput] = useState('');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Mock data for real-time metrics
  const systemStatus = [
    { name: 'API Gateway', status: 'operational', latency: '24ms' },
    { name: 'Data Pipeline', status: 'operational', latency: '46ms' },
    { name: 'ML Services', status: 'operational', latency: '112ms' },
    { name: 'Storage', status: 'operational', latency: '18ms' }
  ];

  const recentActivities = [
    { action: 'Data sync completed', resource: 'MySQL Connector', time: '2 minutes ago' },
    { action: 'Report generated', resource: 'Q1 Performance', time: '15 minutes ago' },
    { action: 'Automation triggered', resource: 'Daily ETL Process', time: '1 hour ago' },
    { action: 'New model trained', resource: 'Customer Churn Predictor', time: '3 hours ago' }
  ];

  const quickCommands = [
    { command: 'sync data', description: 'Trigger a data synchronization' },
    { command: 'generate report', description: 'Create a new report' },
    { command: 'system status', description: 'Check system health' },
    { command: 'help', description: 'Show available commands' }
  ];

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] bg-sidebar">
      <AnimatedBackground />
      
      <div className={`relative z-20 flex flex-col items-center w-full h-full transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Central command input */}
        <div className="flex flex-col items-center justify-center flex-grow w-full max-w-3xl px-4">
          <div className="w-24 h-24 mb-6 opacity-80">
            <img 
              src="/assets/images/Logo.svg" 
              alt="Logo" 
              className="w-full h-full"
            />
          </div>
          
          <div className="relative w-full mb-8">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Command className="w-5 h-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Type a command or search..."
              className="w-full py-6 pl-10 pr-4 text-lg bg-sidebar-accent/10 border-gray-700 focus:border-primary focus:ring-primary"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <kbd className="px-2 py-1 text-xs font-semibold text-gray-400 bg-gray-800 rounded">⌘K</kbd>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {quickCommands.map((cmd, index) => (
              <button 
                key={index}
                onClick={() => setCommandInput(cmd.command)}
                className="px-3 py-1 text-sm text-gray-300 bg-gray-800/60 rounded-full hover:bg-gray-700/80 transition-colors"
              >
                {cmd.command}
              </button>
            ))}
          </div>
        </div>
        
        {/* Real-time metrics and status cards */}
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-4 px-4 pb-8">
          {/* System Status */}
          <Card className="bg-sidebar-accent/10 border-gray-800 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-sm font-medium text-gray-400">
                <Activity className="w-4 h-4 mr-2" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {systemStatus.map((system, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">{system.name}</span>
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2 bg-green-500/10 text-green-400 border-green-500/30">
                        {system.status}
                      </Badge>
                      <span className="text-xs text-gray-400">{system.latency}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Activity */}
          <Card className="bg-sidebar-accent/10 border-gray-800 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-sm font-medium text-gray-400">
                <Clock className="w-4 h-4 mr-2" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">{activity.action}</span>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                    <span className="text-xs text-gray-400">{activity.resource}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Quick Access */}
          <Card className="bg-sidebar-accent/10 border-gray-800 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-sm font-medium text-gray-400">
                <AlertCircle className="w-4 h-4 mr-2" />
                Alerts & Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center h-full py-6 text-center">
                <div className="p-3 mb-2 rounded-full bg-gray-800/60">
                  <AlertCircle className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm text-gray-300">No active alerts</p>
                <p className="text-xs text-gray-500">All systems operating normally</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
