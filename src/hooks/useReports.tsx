import { ReportsList, ScheduledReportsList } from '@/app/console/reports/lists';
import { reportsMockData, scheduledReportsMockData, reportTabsMockData } from '@/lib/mock-data';
import { Tab } from './useAutomations';
import * as LucideIcons from 'lucide-react';
import React from 'react';

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

// Helper function to render icon data objects
const renderIcon = (iconData: any): React.ReactNode => {
  if (!iconData) return null;
  
  const IconComponent = (LucideIcons as any)[iconData.type];
  if (!IconComponent) return null;
  
  return React.createElement(IconComponent, iconData.props);
};

export function useReports(): {
  reports: Report[];
  scheduledReports: ScheduledReport[];
} {
  // Convert icon data objects to React elements
  const reports = reportsMockData.map(report => ({
    ...report,
    icon: renderIcon(report.icon)
  }));
  
  const scheduledReports = scheduledReportsMockData.map(report => ({
    ...report,
    icon: renderIcon(report.icon)
  }));
  
  return {
    reports,
    scheduledReports
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
