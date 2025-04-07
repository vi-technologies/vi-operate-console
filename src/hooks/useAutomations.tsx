import {
  AgentsList,
  ApiList,
  CronsList,
  DataList,
  EventsList,
  WorkflowsList
} from '@/app/console/automations/lists';
import { automationTabsMockData } from '@/lib/mock-data';

export type Tab = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconBg: string;
  iconColor: string;
  hover: string;
  value: string;
  name: string;
  children?: React.ReactNode;
};

export function useAutomationTabs(): {
  tabs: Tab[];
} {
  const tabComponents = {
    workflows: <WorkflowsList />,
    agents: <AgentsList />,
    cron: <CronsList />,
    events: <EventsList />,
    data: <DataList />,
    api: <ApiList />
  };

  const tabsWithComponents = automationTabsMockData.map(tab => ({
    ...tab,
    children: tabComponents[tab.value as keyof typeof tabComponents]
  }));

  return {
    tabs: tabsWithComponents
  };
}
