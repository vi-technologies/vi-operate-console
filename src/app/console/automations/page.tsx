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

        <TabsContent
          value="workflows"
          className="border-none p-0"
          children={<Workflows />}
        />

        <TabsContent value="agents" className="border-none p-0" children={<AgentsContent />} />

        <TabsContent value="cron" className="border-none p-0" children={<CronContent />} />

        <TabsContent value="events" className="border-none p-0" children={<EventsContent />} />

        <TabsContent value="data" className="border-none p-0" children={<DataContent />} />

        <TabsContent value="api" className="border-none p-0" children={<ApiContent />} />
      </Tabs>
    </Page>
  );
}

export function Workflows() {
  const router = useRouter();
  const { workflows } = useWorkflows();

  const handleStartCreateAutomation = () => {
    router.push('/console/automations/create');
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {workflows.map(({ title, children }) => (
        <CardIcon
          key={title}
          title={title}
          icon={<Flower />}
          children={children}
          // onClick={() => router.push(`/console/automations/${workflow.title}`)}
        />
      ))}
      <CardIcon
        title="Create New Workflow"
        icon={<Flower />}
        onClick={handleStartCreateAutomation}
        className="border-dashed border-2 cursor-pointer hover:shadow-md transition-all"
      >
        Build a custom workflow to automate your processes
      </CardIcon>
    </div>
  );
}
