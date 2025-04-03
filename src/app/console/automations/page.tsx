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
import useWorkflows from '@/hooks/useWorkflows';
import useAgents from '@/hooks/useAgents';
import Workflows from './Workflows';
import AgentsContent from './AgentsContent';
import CronContent from './CronContent';
import EventsContent from './EventsContent';
import DataContent from './DataContent';
import ApiContent from './ApiContent';

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

        <TabsContent value="workflows" children={<Workflows />} />
        <TabsContent value="agents" children={<AgentsContent />} />
        <TabsContent value="cron" children={<CronContent />} />
        <TabsContent value="events" children={<EventsContent />} />
        <TabsContent value="data" children={<DataContent />} />
        <TabsContent value="api" children={<ApiContent />} />
      </Tabs>
    </Page>
  );
}

function mapCardIcon(Icon: React.ReactNode) {
  return ({
    title,
    children
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <CardIcon
      key={title}
      title={title}
      icon={Icon}
      children={children}
      // onClick={() => router.push(`/console/automations/${workflow.title}`)}
    />
  );
}

export function Workflows() {
  const router = useRouter();
  const { workflows } = useWorkflows();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {workflows.map(mapCardIcon(<Flower />))}

      <CardIcon
        title="Create New Workflow"
        icon={<Flower />}
        onClick={() => router.push('/console/automations/create')}
        className="border-dashed border-2 cursor-pointer hover:shadow-md transition-all"
      >
        Build a custom workflow to automate your processes
      </CardIcon>
    </div>
  );
}

export function AgentsContent() {
  const { agents } = useAgents();
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {agents.map(mapCardIcon(<Cpu />))}
    </div>
  );
}

export function CronContent() {
  return (
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
  );
}

export function EventsContent() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <CardIcon title="Agent Knowledge Assistance" icon={<Layers />}>
        Triggered when agents need knowledge support
        <div className="mt-2 text-xs text-muted-foreground">
          Trigger: Chat/Voice Pattern Match
        </div>
      </CardIcon>
      <CardIcon title="Call Volume Spike Alert" icon={<Layers />}>
        Triggered when call volume exceeds forecast by 20%
        <div className="mt-2 text-xs text-muted-foreground">
          Trigger: Metric Threshold
        </div>
      </CardIcon>
      <CardIcon title="Schedule Conflict Resolution" icon={<Layers />}>
        Triggered when schedule conflicts are detected
        <div className="mt-2 text-xs text-muted-foreground">
          Trigger: Data Validation Error
        </div>
      </CardIcon>
    </div>
  );
}

export function DataContent() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <CardIcon title="Real-Time Call Center Metrics" icon={<Link2 />}>
        Live stream of call center performance metrics
        <div className="mt-2 text-xs text-muted-foreground">Status: Active</div>
      </CardIcon>
      <CardIcon title="Epic Scheduling Integration" icon={<Link2 />}>
        Continuous sync with Epic Scheduling System
        <div className="mt-2 text-xs text-muted-foreground">Status: Active</div>
      </CardIcon>
      <CardIcon title="Agent Activity Monitor" icon={<Link2 />}>
        Real-time monitoring of agent activity and status
        <div className="mt-2 text-xs text-muted-foreground">Status: Paused</div>
      </CardIcon>
    </div>
  );
}

export function ApiContent() {
  return (
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
  );
}
