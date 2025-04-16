import { ReportsList, ScheduledReportsList } from '@/app/console/reports/lists';
import { reportsMockData, scheduledReportsMockData, reportTabsMockData } from '@/lib/mock-data';
import { AutomationTab } from '@/types/automation';
import { ReportViewModel, ScheduledReportCardProps, ReportTab } from '@/types/report';
import { IconData } from '@/types/common';
import * as LucideIcons from 'lucide-react';
import React from 'react';

// Helper function to render icon data objects
const renderIcon = (iconData: IconData): React.ReactNode => {
  if (!iconData) return null;
  
  const IconComponent = (LucideIcons as Record<string, React.ComponentType<any>>)[iconData.type];
  if (!IconComponent) return null;
  
  return React.createElement(IconComponent, iconData.props);
};

export function useReports(): {
  reports: ReportViewModel[];
  scheduledReports: ScheduledReportCardProps[];
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

type TabWithComponent = ReportTab & { children: React.ReactNode };

export function useReportTabs(): { tabs: TabWithComponent[] } {
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
