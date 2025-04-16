import { ReactNode } from 'react';
import { IconData } from '@/types/common';
import {
  CallVolumeDataPoint,
  StaffingRequirement,
  QuarterlyVolumeData,
  HistoricalCallDataSeries,
  WeekDemandDataPoint,
  CalendarDataPoint,
  CampaignPerformanceDataPoint,
  AgentPerformanceDataPoint
} from '@/types/charts';
import { DashboardData } from '@/types/dashboard';
import { SourceViewModel, ConnectionOption } from '@/types/source';
import { ReportViewModel, ScheduledReportCardProps, ReportTab } from '@/types/report';
import { AutomationTab } from '@/types/automation';

/**
 * Dashboard data types
 */
export interface HistoricalCallData {
  weekday: HistoricalCallDataSeries;
  saturday: HistoricalCallDataSeries;
  holiday: HistoricalCallDataSeries;
}

export interface InboundCallCenterData extends DashboardData {
  callVolumeData: CallVolumeDataPoint[];
  staffingRequirements: StaffingRequirement[];
  quarterlyVolume: QuarterlyVolumeData[];
  historicalCallData: HistoricalCallData;
  weekDemand: WeekDemandDataPoint[];
  calendarData: CalendarDataPoint[];
}

export interface OutboundMetrics {
  totalCalls: number;
  appointments: number;
  conversionRate: number;
  activeAgents: number;
  previousMonth?: {
    totalCalls: number;
    appointments: number;
    conversionRate: number;
    activeAgents: number;
  };
}

export interface OutboundCallCenterData extends DashboardData {
  campaignPerformance: CampaignPerformanceDataPoint[];
  agentPerformance: AgentPerformanceDataPoint[];
  metrics: OutboundMetrics;
}

/**
 * Sources data types
 */
export interface SourceConnection {
  id: number;
  name: string;
  type: string;
  status: 'healthy' | 'profiling' | 'error';
  icon: IconData;
  iconBg: string;
  datasets: number;
  models: number;
  lastRefresh: string;
  refreshInterval: string;
  schema: {
    tables: number;
    views: number;
  };
  health: {
    status: string;
    metrics: {
      availability: string;
      latency: string;
      errors: string;
    };
  };
}

export interface ConnectionOption {
  name: string;
  icon: IconData;
  iconBg: string;
  hoverBorder: string;
}

/**
 * Reports data types
 */
export interface Report {
  title: string;
  description: string;
  badges?: string[];
  lastUpdated?: string;
  icon: IconData;
}

export interface ScheduledReport {
  title: string;
  description: string;
  nextDelivery: string;
  frequency: string;
  icon: IconData;
}

export interface ReportTab {
  icon: any;
  iconBg: string;
  iconColor: string;
  hover: string;
  name: string;
  value: string;
}

/**
 * Automation data types
 */
export interface AutomationTab {
  icon: any;
  iconBg: string;
  iconColor: string;
  hover: string;
  name: string;
  value: string;
}
