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
        icon: (
          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
            <Flower className="h-5 w-5 text-indigo-600" />
          </div>
        ),
        name: 'Workflows',
        id: 'workflows',
        children: <WorkflowsList />
      },
      {
        icon: (
          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
            <Cpu className="h-5 w-5 text-green-600" />
          </div>
        ),
        name: 'Agents',
        id: 'agents',
        children: <AgentsList />
      },
      {
        icon: (
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <Calendar className="h-5 w-5 text-blue-600" />
          </div>
        ),
        name: 'Cron Jobs',
        id: 'cron',
        children: <CronsList />
      },
      {
        icon: (
          <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
            <Layers className="h-5 w-5 text-red-600" />
          </div>
        ),
        name: 'Triggered Events',
        id: 'events',
        children: <EventsList />
      },
      {
        icon: (
          <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
            <Link2 className="h-5 w-5 text-yellow-600" />
          </div>
        ),
        name: 'Live Data Streams',
        id: 'data',
        children: <DataList />
      },
      {
        icon: (
          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
            <Cog className="h-5 w-5 text-purple-600" />
          </div>
        ),
        name: 'API Publishing',
        id: 'api',
        children: <ApiList />
      }
    ]
  };
}
