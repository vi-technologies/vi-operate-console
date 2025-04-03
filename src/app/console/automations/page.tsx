'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/_common/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/_common/ui/tabs';
import {
  Cog,
  Flower,
  Calendar,
  Layers,
  Cpu,
  Link2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Tag,
  Clock,
  Code,
  ExternalLink,
  ChevronRight,
  Database
} from 'lucide-react';
import { Button } from '@/components/_common/ui/button';
import { Input } from '@/components/_common/ui/input';
import { Badge } from '@/components/_common/ui/badge';
import { Page } from '@/components/_common/layout/page';

export default function AutomationsPage() {
  const [showCreateAutomation, setShowCreateAutomation] = useState(false);
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [userPrompt, setUserPrompt] = useState('');
  const [activeAutomation, setActiveAutomation] = useState({
    frequency: 'Real Time',
    source: 'LOC_PATIENT_REFERRALS',
    destination: 'REDUCE ATTRITION'
  });

  const handleStartCreateAutomation = () => {
    setShowCreateAutomation(true);
  };

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userPrompt.trim()) {
      setShowAiAssistant(true);
    }
  };

  const closeCreateAutomation = () => {
    setShowCreateAutomation(false);
    setShowAiAssistant(false);
    setUserPrompt('');
  };

  const renderDefaultView = () => (
    <Page
      title="Automations"
      actionButton={{
        label: "Create Automation",
        onClick: handleStartCreateAutomation
      }}
    >
      <Tabs defaultValue="workflows" className="w-full">
        <TabsList className="grid grid-cols-6 w-full mb-4">
          <TabsTrigger value="workflows" className="flex items-center gap-1">
            <Flower className="h-4 w-4" />
            Workflows
          </TabsTrigger>
          <TabsTrigger value="agents" className="flex items-center gap-1">
            <Cpu className="h-4 w-4" />
            Agents
          </TabsTrigger>
          <TabsTrigger value="cron" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Cron Jobs
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-1">
            <Layers className="h-4 w-4" />
            Triggered Events
          </TabsTrigger>
          <TabsTrigger value="data" className="flex items-center gap-1">
            <Link2 className="h-4 w-4" />
            Live Data Streams
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-1">
            <Cog className="h-4 w-4" />
            API Publishing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="workflows" className="border-none p-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Labor Forecast Workflow</CardTitle>
                <Flower className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm">Automated call volume prediction and staffing requirements</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Scheduling Workflow</CardTitle>
                <Flower className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm">Generate optimized staff schedules based on forecasts</div>
              </CardContent>
            </Card>
            <Card
              className="border-dashed border-2 cursor-pointer hover:shadow-md transition-all"
              onClick={handleStartCreateAutomation}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Create New Workflow</CardTitle>
                <Flower className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm">Build a custom workflow to automate your processes</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="agents" className="border-none p-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Forecasting Agent</CardTitle>
                <Cpu className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm">Analyzes historical data to generate accurate forecasts</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Scheduling Agent</CardTitle>
                <Cpu className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm">Creates optimal schedules based on forecasts and constraints</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Support Knowledge Agent</CardTitle>
                <Cpu className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm">Retrieves relevant knowledge to assist human agents</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cron" className="border-none p-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Daily Forecast Update</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm">Runs at 1 AM daily to update forecasts</div>
                <div className="mt-2 text-xs text-muted-foreground">Schedule: 0 1 * * *</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Weekly Schedule Generation</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm">Runs every Monday at 2 AM to create weekly schedules</div>
                <div className="mt-2 text-xs text-muted-foreground">Schedule: 0 2 * * 1</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Data Cleanup Job</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm">Archives old data and cleans up temporary storage</div>
                <div className="mt-2 text-xs text-muted-foreground">Schedule: 0 3 * * 0</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="events" className="border-none p-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Agent Knowledge Assistance</CardTitle>
                <Layers className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm">Triggered when agents need knowledge support</div>
                <div className="mt-2 text-xs text-muted-foreground">Trigger: Chat/Voice Pattern Match</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Call Volume Spike Alert</CardTitle>
                <Layers className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm">Triggered when call volume exceeds forecast by 20%</div>
                <div className="mt-2 text-xs text-muted-foreground">Trigger: Metric Threshold</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Schedule Conflict Resolution</CardTitle>
                <Layers className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm">Triggered when schedule conflicts are detected</div>
                <div className="mt-2 text-xs text-muted-foreground">Trigger: Data Validation Error</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="data" className="border-none p-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Real-Time Call Center Metrics</CardTitle>
                <Link2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm">Live stream of call center performance metrics</div>
                <div className="mt-2 text-xs text-muted-foreground">Status: Active</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Epic Scheduling Integration</CardTitle>
                <Link2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm">Continuous sync with Epic Scheduling System</div>
                <div className="mt-2 text-xs text-muted-foreground">Status: Active</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Agent Activity Monitor</CardTitle>
                <Link2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm">Real-time monitoring of agent activity and status</div>
                <div className="mt-2 text-xs text-muted-foreground">Status: Paused</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="api" className="border-none p-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Forecast Data API</CardTitle>
                <Cog className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm">Exposes forecast data to external systems</div>
                <div className="mt-2 text-xs text-muted-foreground">Endpoint: /api/forecasts</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Schedule API</CardTitle>
                <Cog className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm">Allows external systems to access and update schedules</div>
                <div className="mt-2 text-xs text-muted-foreground">Endpoint: /api/schedules</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Metrics Webhook</CardTitle>
                <Cog className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm">Pushes real-time metrics to external dashboards</div>
                <div className="mt-2 text-xs text-muted-foreground">Webhook: Configurable</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </Page>
  );

  const renderCreateAutomation = () => (
    <div className="flex flex-col md:flex-row h-[80vh]">
      {/* Left side - Creation form */}
      <div className="flex-1 flex flex-col bg-gray-50 p-8 relative">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMxLjIyOSAwIDIuMjIyLjk5NiAyLjIyMiAyLjIyMiAwIDEuMjI5LS45OTYgMi4yMjItMi4yMjIgMi4yMjItMS4yMjYgMC0yLjIyMi0uOTk2LTIuMjIyLTIuMjIyIDAtMS4yMjYuOTk2LTIuMjIyIDIuMjIyLTIuMjIyek0yNCAxOGMxLjIyOSAwIDIuMjIyLjk5NiAyLjIyMiAyLjIyMiAwIDEuMjI5LS45OTYgMi4yMjItMi4yMjIgMi4yMjItMS4yMjYgMC0yLjIyMi0uOTk2LTIuMjIyLTIuMjIyIDAtMS4yMjYuOTk2LTIuMjIyIDIuMjIyLTIuMjIyek0yNCAzNmMxLjIyOSAwIDIuMjIyLjk5NiAyLjIyMiAyLjIyMiAwIDEuMjI5LS45OTYgMi4yMjItMi4yMjIgMi4yMjItMS4yMjYgMC0yLjIyMi0uOTk2LTIuMjIyLTIuMjIyIDAtMS4yMjYuOTk2LTIuMjIyIDIuMjIyLTIuMjIyek0zNiAzNmMxLjIyOSAwIDIuMjIyLjk5NiAyLjIyMiAyLjIyMiAwIDEuMjI5LS45OTYgMi4yMjItMi4yMjIgMi4yMjItMS4yMjYgMC0yLjIyMi0uOTk2LTIuMjIyLTIuMjIyIDAtMS4yMjYuOTk2LTIuMjIyIDIuMjIyLTIuMjIyeiIgZmlsbD0iI0UwRTBFMCIvPjwvZz48L3N2Zz4=')] opacity-10"></div>

        <Sparkles className="h-8 w-8 text-purple-500 mb-4 absolute top-6 right-24" />

        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={closeCreateAutomation} className="mr-2">
            <ArrowRight className="h-4 w-4 rotate-180" />
          </Button>
          <h1 className="text-2xl font-bold">Create New Automation</h1>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-lg font-medium">What do you want to know?</h2>
            <form onSubmit={handlePromptSubmit} className="flex flex-col space-y-4">
              <div className="relative">
                <label className="font-medium mb-2 block">I would like to...</label>
                <Input
                  type="text"
                  value={userPrompt || (showAiAssistant ? 'start tracking patient referral events' : '')}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  placeholder="I would like to..."
                  className="pl-4 pr-12 py-6 text-base"
                />
                {!showAiAssistant && (
                  <Button
                    type="submit"
                    size="sm"
                    className="absolute right-2 top-1/2 mt-4 bg-purple-600 hover:bg-purple-700"
                  >
                    <span className="mr-1">Next</span>
                    <Sparkles className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </form>
          </div>

          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              <span className="text-sm">You have added the minimum amount of required sources.</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              <span className="text-sm">You have 2 running models.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - AI assistant */}
      {showAiAssistant && (
        <div className="flex-1 border-l border-gray-200 p-8 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Create New Automation</h2>
            <Button>Save & Add</Button>
          </div>

          <div className="flex-1 overflow-auto mb-6 space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg max-w-[80%]">
              <p className="text-sm">I'd like to start tracking patient referral events</p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg ml-auto max-w-[80%]">
              <div className="flex items-center space-x-2 mb-2">
                <div className="bg-purple-100 text-purple-800 font-medium px-2 py-1 rounded text-xs">Vi</div>
                <span className="text-xs text-gray-500">Just now</span>
              </div>
              <p className="text-sm mb-3">I'll help you set up an automation to track patient referral events. I've identified a suitable data source in your connected systems.</p>

              <div className="flex flex-wrap gap-2 mb-3">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 font-normal px-2 py-1">
                  <Database className="h-3 w-3 mr-1" />
                  LOC_PATIENT_REFERRALS
                </Badge>
              </div>

              <p className="text-sm mb-3">How frequently would you like to track these events?</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 bg-white p-2 rounded border border-purple-300">
                  <div className="w-4 h-4 rounded-full bg-purple-600 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <span className="text-sm">Real Time</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded">
                  <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                  <span className="text-sm">Weekly</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded">
                  <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                  <span className="text-sm">Monthly</span>
                </div>
              </div>

              <div className="bg-gray-50 p-2 rounded-lg max-w-[80%] text-sm mb-4">
                Let's do real time
              </div>

              <div className="flex items-center text-xs text-blue-600 mb-4">
                <ExternalLink className="h-3 w-3 mr-1" />
                <span>View references and citations</span>
              </div>

              <Button variant="outline" size="sm" className="flex items-center">
                <Code className="h-3.5 w-3.5 mr-1" />
                Preview code
              </Button>

              <p className="text-sm mt-4">Is there anything else I can do to help you create this automated task?</p>
            </div>
          </div>

          {/* Preview section */}
          <div className="border border-gray-200 rounded-lg p-4 mb-4">
            <h3 className="text-sm font-medium mb-3">Preview</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm">Frequency:</span>
                </div>
                <span className="text-sm">Real time</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Source:</span>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 font-normal">
                  LOC_PATIENT_REFERRALS
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Sent to:</span>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200 font-normal">
                  REDUCE ATTRITION
                </Badge>
              </div>
            </div>
          </div>

          <Button className="w-full flex justify-between items-center">
            <span>No thanks just save and add it</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );

  return showCreateAutomation ? renderCreateAutomation() : renderDefaultView();
}