import {
  AgentsList,
  ApiList,
  CronsList,
  DataList,
  EventsList,
  WorkflowsList
} from '@/app/console/automations/lists';
import { Cog, Flower, Calendar, Layers, Cpu, Link2, Grid } from 'lucide-react';

type Tab = {
  icon: React.ReactNode;
  id: string;
  name: string;
  children: React.ReactNode;
};

export function useAutomationTabs(): {
  tabs: Tab[];
} {
  return {
    tabs: [
      {
        icon: <Flower />,
        name: 'Workflows',
        id: 'workflows',
        children: <WorkflowsList />
      },
      {
        icon: <Cpu />,
        name: 'Agents',
        id: 'agents',
        children: <AgentsList />
      },
      {
        icon: <Calendar />,
        name: 'Cron Jobs',
        id: 'cron',
        children: <CronsList />
      },
      {
        icon: <Layers />,
        name: 'Triggered Events',
        id: 'events',
        children: <EventsList />
      },
      {
        icon: <Link2 />,
        name: 'Live Data Streams',
        id: 'data',
        children: <DataList />
      },
      {
        icon: <Cog />,
        name: 'API Publishing',
        id: 'api',
        children: <ApiList />
      }
    ]
  };
}
