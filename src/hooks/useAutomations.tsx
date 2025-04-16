import {
  AgentsList,
  ApiList,
  CronsList,
  DataList,
  EventsList,
  WorkflowsList
} from '@/app/console/automations/lists';
import { automationTabsMockData } from '@/lib/mock-data';
import { AutomationTab } from '@/types/automation';
import React from 'react';

type TabWithComponent = AutomationTab & { children: React.ReactNode };

export function useAutomationTabs(): {
  tabs: TabWithComponent[];
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
