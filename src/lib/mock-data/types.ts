import { ReactNode } from 'react';

/**
 * Icon data structure that can be serialized in TypeScript files
 * and converted to React elements in TSX files
 */
export interface IconData {
  type: string;
  props: {
    className: string;
    [key: string]: any;
  };
}

/**
 * Dashboard data types
 */
export interface CallVolumeDataPoint {
  name: string;
  General: number;
  Appointment: number;
  Technical: number;
  Billing: number;
}

export interface StaffingRequirement {
  name: string;
  Current: number;
  Projected: number;
}

export interface QuarterlyVolumeData {
  name: string;
  General: number;
  Appointment: number;
  Technical: number;
  Billing: number;
}

export interface HistoricalCallDataPoint {
  x: number;
  y: number;
}

export interface HistoricalCallDataSeries {
  name: string;
  color: string;
  points: HistoricalCallDataPoint[];
}

export interface HistoricalCallData {
  weekday: HistoricalCallDataSeries;
  saturday: HistoricalCallDataSeries;
  holiday: HistoricalCallDataSeries;
}

export interface WeekDemandDataPoint {
  name: string;
  'Call Volume': number;
  'Service Level': number;
}

export interface CalendarDataPoint {
  date: string;
  value: number;
}

export interface InboundCallCenterData {
  callVolumeData: CallVolumeDataPoint[];
  staffingRequirements: StaffingRequirement[];
  quarterlyVolume: QuarterlyVolumeData[];
  historicalCallData: HistoricalCallData;
  weekDemand: WeekDemandDataPoint[];
  calendarData: CalendarDataPoint[];
}

export interface CampaignPerformanceDataPoint {
  name: string;
  Appointments: number;
  Callbacks: number;
  Conversions: number;
}

export interface AgentPerformanceDataPoint {
  name: string;
  Calls: number;
  Conversions: number;
  Rate: number;
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

export interface OutboundCallCenterData {
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
