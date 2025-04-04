import {
  AgentsList,
  ApiList,
  CronsList,
  DataList,
  EventsList,
  WorkflowsList
} from '@/app/console/automations/lists';
import { Cog, Flower, Calendar, Layers, Cpu, Link2, Grid } from 'lucide-react';

export type Tab = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconBg: string;
  iconColor: string;
  hover: string;
  value: string;
  name: string;
  children: React.ReactNode;
};

export function useAutomationTabs(): {
  tabs: Tab[];
} {
  return {
    tabs: [
      {
        icon: Flower,
        iconBg: 'bg-indigo-100',
        iconColor: 'text-indigo-600',
        hover: 'hover:border-indigo-600',
        name: 'Workflows',
        value: 'workflows',
        children: <WorkflowsList />
      },
      {
        icon: Cpu,
        iconBg: 'bg-green-100',
        iconColor: 'text-green-600',
        hover: 'hover:border-green-200',
        name: 'Agents',
        value: 'agents',
        children: <AgentsList />
      },
      {
        icon: Calendar,
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600',
        hover: 'hover:border-blue-200',
        name: 'Cron Jobs',
        value: 'cron',
        children: <CronsList />
      },
      {
        icon: Layers,
        iconBg: 'bg-red-100',
        iconColor: 'text-red-600',
        hover: 'hover:border-red-200',
        name: 'Triggered Events',
        value: 'events',
        children: <EventsList />
      },
      {
        icon: Link2,
        iconBg: 'bg-yellow-100',
        iconColor: 'text-yellow-600',
        hover: 'hover:border-yellow-200',
        name: 'Live Data Streams',
        value: 'data',
        children: <DataList />
      },
      {
        icon: Cog,
        iconBg: 'bg-purple-100',
        iconColor: 'text-purple-600',
        hover: 'hover:border-purple-200',
        name: 'API Publishing',
        value: 'api',
        children: <ApiList />
      }
    ]
  };
}
