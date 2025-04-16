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
  Activity,
  Info
} from 'lucide-react';
import { AnimatedBackground } from '@/components/_common/layout/animated-background';
import { InteractiveBackground } from '@/components/_common/layout/interactive-background/interactive-background';
import { BarChart } from '@/components/_common/ux/charts/bar-chart';
import { LineChart } from '@/components/_common/ux/charts/line-chart';
import { CalendarHeatmap } from '@/components/_common/ux/charts/calendar-heatmap';
import { useRef, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/_common/ui/card';
import { Input } from '@/components/_common/ui/input';
import { Badge } from '@/components/_common/ui/badge';
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent
} from '@/components/_common/ui/hover-card';

export default function ConsolePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [commandInput, setCommandInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [showCommandHistory, setShowCommandHistory] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsLoaded(true);
    // Focus the input when the page loads
    setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
  }, []);

  const handleCommandSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (commandInput.trim()) {
      setCommandHistory(prev => [commandInput, ...prev].slice(0, 10));
      // Here you would handle the command processing
      setCommandInput('');
    }
  }, [commandInput]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowCommandHistory(false);
    } else if (e.key === 'ArrowUp') {
      setShowCommandHistory(true);
    }
  }, []);

  // Mock data for real-time metrics
  const systemStatus = [
    { name: 'API Gateway', status: 'operational', latency: '24ms' },
    { name: 'Data Pipeline', status: 'operational', latency: '46ms' },
    { name: 'ML Services', status: 'operational', latency: '112ms' },
    { name: 'Storage', status: 'operational', latency: '18ms' }
  ];

  const recentActivities = [
    {
      action: 'Data sync completed',
      resource: 'MySQL Connector',
      time: '2 minutes ago'
    },
    {
      action: 'Report generated',
      resource: 'Q1 Performance',
      time: '15 minutes ago'
    },
    {
      action: 'Automation triggered',
      resource: 'Daily ETL Process',
      time: '1 hour ago'
    },
    {
      action: 'New model trained',
      resource: 'Customer Churn Predictor',
      time: '3 hours ago'
    }
  ];

  const quickCommands = [
    { command: 'sync data', description: 'Trigger a data synchronization' },
    { command: 'generate report', description: 'Create a new report' },
    { command: 'system status', description: 'Check system health' },
    { command: 'help', description: 'Show available commands' }
  ];

  return (
    <div className="relative w-full h-[100vh] bg-sidebar">
      <AnimatedBackground />
      <InteractiveBackground className="z-10" />

      <div
        className={`relative z-20 flex flex-col items-center w-full h-full transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Central command input */}
        <div className="flex flex-col items-center justify-center flex-grow w-full max-w-3xl px-4">
          <h1 className="text-4xl font-bold text-white mb-6">Console</h1>

          <form onSubmit={handleCommandSubmit} className="relative w-full mb-8">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Command className="w-5 h-5 text-gray-400" />
            </div>
            <Input
              ref={inputRef}
              type="text"
              placeholder="Type a command or search..."
              className="w-full py-6 pl-10 pr-4 text-lg text-white bg-sidebar-accent/10 border-gray-700 focus:border-primary focus:ring-primary"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <kbd className="px-2 py-1 text-xs font-semibold text-gray-400 bg-gray-800 rounded">
                ⌘K
              </kbd>
            </div>
            
            {showCommandHistory && commandHistory.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-gray-900/95 border border-gray-700 rounded-md shadow-lg z-10">
                <div className="p-2 text-xs text-gray-400 border-b border-gray-700">Recent commands</div>
                <div className="max-h-48 overflow-y-auto">
                  {commandHistory.map((cmd, i) => (
                    <button
                      key={i}
                      className="w-full text-left px-3 py-2 text-sm text-white hover:bg-gray-800/80 transition-colors"
                      onClick={() => {
                        setCommandInput(cmd);
                        setShowCommandHistory(false);
                        inputRef.current?.focus();
                      }}
                    >
                      {cmd}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </form>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {quickCommands.map((cmd, index) => (
              <HoverCard key={index}>
                <HoverCardTrigger asChild>
                  <button
                    onClick={() => setCommandInput(cmd.command)}
                    className="px-3 py-1 text-sm text-white bg-gray-800/60 rounded-full hover:bg-gray-700/80 transition-colors"
                  >
                    {cmd.command}
                  </button>
                </HoverCardTrigger>
                <HoverCardContent className="bg-gray-900/95 border-gray-700 text-white">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center">
                      <Info className="w-4 h-4 mr-2 text-primary" />
                      <span className="font-medium">{cmd.command}</span>
                    </div>
                    <p className="text-sm text-gray-200">{cmd.description}</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </div>

        {/* Interactive cards with hover effects */}
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-4 px-4 pb-8">
          {/* System Status */}
          <HoverCard openDelay={0} closeDelay={200}>
            <HoverCardTrigger asChild>
              <div className="bg-sidebar-accent/10 border border-gray-800 backdrop-blur-sm rounded-lg p-4 cursor-pointer hover:bg-sidebar-accent/20 transition-colors shadow-lg hover:shadow-purple-500/20">
                <div className="flex items-center text-white mb-2">
                  <Activity className="w-5 h-5 mr-2 text-primary" />
                  <h3 className="font-medium">System Status</h3>
                </div>
                <p className="text-sm text-white/70">All systems operational</p>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="bg-gray-900/95 border-gray-700 text-white w-96 p-0 overflow-hidden">
              <div className="h-48 w-full">
                <BarChart 
                  data={systemStatus.map(s => ({ 
                    name: s.name, 
                    latency: parseInt(s.latency), 
                    threshold: 100 
                  }))} 
                  bars={[
                    { dataKey: 'latency', fill: '#8b5cf6', name: 'Current Latency (ms)' },
                    { dataKey: 'threshold', fill: '#4c1d95', name: 'Threshold' }
                  ]} 
                  height={180} 
                  xAxisDataKey="name"
                />
              </div>
              <div className="space-y-1 p-4">
                {systemStatus.map((system, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-white">{system.name}</span>
                    <div className="flex items-center">
                      <Badge
                        variant="outline"
                        className="mr-2 bg-green-500/10 text-green-400 border-green-500/30"
                      >
                        {system.status}
                      </Badge>
                      <span className="text-xs text-white/70">
                        {system.latency}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </HoverCardContent>
          </HoverCard>

          {/* Recent Activity */}
          <HoverCard openDelay={0} closeDelay={200}>
            <HoverCardTrigger asChild>
              <div className="bg-sidebar-accent/10 border border-gray-800 backdrop-blur-sm rounded-lg p-4 cursor-pointer hover:bg-sidebar-accent/20 transition-colors shadow-lg hover:shadow-purple-500/20">
                <div className="flex items-center text-white mb-2">
                  <Clock className="w-5 h-5 mr-2 text-primary" />
                  <h3 className="font-medium">Recent Activity</h3>
                </div>
                <p className="text-sm text-white/70">4 recent activities</p>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="bg-gray-900/95 border-gray-700 text-white w-96 p-0 overflow-hidden">
              <div className="h-48 w-full">
                <LineChart 
                  data={[
                    { name: '3h', events: 1 },
                    { name: '2h', events: 0 },
                    { name: '1h', events: 1 },
                    { name: '30m', events: 0 },
                    { name: 'Now', events: 1 }
                  ]} 
                  lines={[
                    { dataKey: 'events', stroke: '#8b5cf6', name: 'Events' }
                  ]} 
                  height={180} 
                  xAxisDataKey="name"
                  showGrid={false}
                />
              </div>
              <div className="space-y-2 p-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white">
                        {activity.action}
                      </span>
                      <span className="text-xs text-white/50">
                        {activity.time}
                      </span>
                    </div>
                    <span className="text-xs text-white/70">
                      {activity.resource}
                    </span>
                  </div>
                ))}
              </div>
            </HoverCardContent>
          </HoverCard>

          {/* Alerts & Notifications */}
          <HoverCard openDelay={0} closeDelay={200}>
            <HoverCardTrigger asChild>
              <div className="bg-sidebar-accent/10 border border-gray-800 backdrop-blur-sm rounded-lg p-4 cursor-pointer hover:bg-sidebar-accent/20 transition-colors shadow-lg hover:shadow-purple-500/20">
                <div className="flex items-center text-white mb-2">
                  <AlertCircle className="w-5 h-5 mr-2 text-primary" />
                  <h3 className="font-medium">Alerts & Activity</h3>
                </div>
                <p className="text-sm text-white/70">No active alerts</p>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="bg-gray-900/95 border-gray-700 text-white w-96 p-0 overflow-hidden">
              <div className="h-48 w-full">
                <CalendarHeatmap 
                  data={Array.from({ length: 60 }).map((_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() - i);
                    // Generate some random alert data - mostly zeros with occasional values
                    const value = Math.random() > 0.8 ? Math.floor(Math.random() * 3) + 1 : 0;
                    return {
                      date: date.toISOString().split('T')[0],
                      value
                    };
                  })} 
                  height={180} 
                  width="100%"
                  colorScale={['#f3f4f6', '#c4b5fd', '#a78bfa', '#8b5cf6']}
                />
              </div>
              <div className="flex flex-col items-center justify-center py-4 text-center">
                <div className="p-2 mb-2 rounded-full bg-gray-800/60">
                  <AlertCircle className="w-5 h-5 text-white/70" />
                </div>
                <p className="text-sm text-white">No active alerts</p>
                <p className="text-xs text-white/50">
                  All systems operating normally
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
    </div>
  );
}
