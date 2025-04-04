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
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconBg: string;
  iconColor: string;
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
        icon: Flower,
        iconBg: "bg-indigo-100",
        iconColor: "text-indigo-600",
        name: 'Workflows',
        id: 'workflows',
        children: <WorkflowsList />
      },
      {
        icon: Cpu,
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
        name: 'Agents',
        id: 'agents',
        children: <AgentsList />
      },
      {
        icon: Calendar,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        name: 'Cron Jobs',
        id: 'cron',
        children: <CronsList />
      },
      {
        icon: Layers,
        iconBg: "bg-red-100",
        iconColor: "text-red-600",
        name: 'Triggered Events',
        id: 'events',
        children: <EventsList />
      },
      {
        icon: Link2,
        iconBg: "bg-yellow-100",
        iconColor: "text-yellow-600",
        name: 'Live Data Streams',
        id: 'data',
        children: <DataList />
      },
      {
        icon: Cog,
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
        name: 'API Publishing',
        id: 'api',
        children: <ApiList />
      }
    ]
  };
}
