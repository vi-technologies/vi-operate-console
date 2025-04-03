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
import useCronJobs from '@/hooks/useCronJobs';
import useEvents from '@/hooks/useEvents';
import useDataContent from '@/hooks/useDataContent';
import useApiContent from '@/hooks/useApiContent';

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
  const { cronJobs } = useCronJobs();
  const router = useRouter();
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cronJobs.map(mapCardIcon(<Calendar />))}
    </div>
  );
}

export function EventsContent() {
  const { events } = useEvents();
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {events.map(mapCardIcon(<Layers />))}
    </div>
  );
}

export function DataContent() {
  const { dataContent } = useDataContent();
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {dataContent.map(mapCardIcon(<Link2 />))}
    </div>
  );
}

export function ApiContent() {
  const { apiContent } = useApiContent();
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {apiContent.map(mapCardIcon(<Cog />))}
    </div>
  );
}
