'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/_common/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/_common/ui/tabs';
import { Cog, Flower, Calendar, Layers, Cpu, Link2 } from 'lucide-react';
import { Page } from '@/components/_common/layout';
import { useRouter } from 'next/navigation';
import { CardIcon } from '@/components/universal/card-icon';

export default function AutomationsPage() {
  const [showCreateAutomation, setShowCreateAutomation] = useState(false);
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [userPrompt, setUserPrompt] = useState('');
  const router = useRouter();

  const handleStartCreateAutomation = () => {
    router.push('/console/automations/create');
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

  return (
    <Page
      title="Automations"
      actionButton={{
        label: 'Create Automation',
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
            <CardIcon title="Labor Forecast Workflow" icon={<Flower />}>
              Automated call volume prediction and staffing requirements
            </CardIcon>
            <CardIcon title="Scheduling Workflow" icon={<Flower />}>
              Generate optimized staff schedules based on forecasts
            </CardIcon>
            <CardIcon
              title="Create New Workflow"
              icon={<Flower />}
              onClick={handleStartCreateAutomation}
              className="border-dashed border-2 cursor-pointer hover:shadow-md transition-all"
            >
              Build a custom workflow to automate your processes
            </CardIcon>
          </div>
        </TabsContent>

        <TabsContent value="agents" className="border-none p-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <CardIcon title="Forecasting Agent" icon={<Cpu />}>
              Analyzes historical data to generate accurate forecasts
            </CardIcon>
            <CardIcon title="Scheduling Agent" icon={<Cpu />}>
              Creates optimal schedules based on forecasts and constraints
            </CardIcon>
            <CardIcon title="Support Knowledge Agent" icon={<Cpu />}>
              Retrieves relevant knowledge to assist human agents
            </CardIcon>
          </div>
        </TabsContent>

        <TabsContent value="cron" className="border-none p-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <CardIcon
              title="Daily Forecast Update"
              icon={<Calendar />}
              children="Runs at 1 AM daily to update forecasts. Schedule: 0 1 * * *"
            />
            <CardIcon
              title="Weekly Schedule Generation"
              icon={<Calendar />}
              children="Runs every Monday at 2 AM to create weekly schedules. Schedule: 0 2 * * 1"
            />
            <CardIcon
              title="Data Cleanup Job"
              icon={<Calendar />}
              children="Archives old data and cleans up temporary storage. Schedule: 0 3 * * 0"
            />
          </div>
        </TabsContent>

        <TabsContent value="events" className="border-none p-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  Agent Knowledge Assistance
                </CardTitle>
                <Layers className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  Triggered when agents need knowledge support
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  Trigger: Chat/Voice Pattern Match
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  Call Volume Spike Alert
                </CardTitle>
                <Layers className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  Triggered when call volume exceeds forecast by 20%
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  Trigger: Metric Threshold
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  Schedule Conflict Resolution
                </CardTitle>
                <Layers className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  Triggered when schedule conflicts are detected
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  Trigger: Data Validation Error
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="data" className="border-none p-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  Real-Time Call Center Metrics
                </CardTitle>
                <Link2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  Live stream of call center performance metrics
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  Status: Active
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  Epic Scheduling Integration
                </CardTitle>
                <Link2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  Continuous sync with Epic Scheduling System
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  Status: Active
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  Agent Activity Monitor
                </CardTitle>
                <Link2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  Real-time monitoring of agent activity and status
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  Status: Paused
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="api" className="border-none p-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <CardIcon
              title="Forecast Data API"
              icon={<Cog />}
              children="Exposes forecast data to external systems. Endpoint: /api/forecasts"
            />
            <CardIcon
              title="Schedule API"
              icon={<Cog />}
              children="Allows external systems to access and update schedules. Endpoint: /api/schedules"
            />
            <CardIcon
              title="Metrics Webhook"
              icon={<Cog />}
              children="Pushes real-time metrics to external dashboards. Webhook: Configurable"
            />
          </div>
        </TabsContent>
      </Tabs>
    </Page>
  );
}
