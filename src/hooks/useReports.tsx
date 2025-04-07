import { ReportsList, ScheduledReportsList } from '@/app/console/reports/lists';
import { reportsMockData, scheduledReportsMockData, reportTabsMockData } from '@/lib/mock-data';
import { Tab } from './useAutomations';

export type Report = {
  title: string;
  description: string;
  badges?: string[];
  lastUpdated?: string;
  icon?: React.ReactNode;
};

export type ScheduledReport = {
  title: string;
  description: string;
  nextDelivery: string;
  frequency: string;
  icon?: React.ReactNode;
};

export function useReports(): {
  reports: Report[];
  scheduledReports: ScheduledReport[];
} {
  return {
    reports: reportsMockData,
    scheduledReports: scheduledReportsMockData
  };
}

export function useReportTabs(): { tabs: Tab[] } {
  const tabComponents = {
    reports: <ReportsList />,
    scheduled: <ScheduledReportsList />
  };

  const tabsWithComponents = reportTabsMockData.map(tab => ({
    ...tab,
    children: tabComponents[tab.value as keyof typeof tabComponents]
  }));

  return {
    tabs: tabsWithComponents
  };
}
