/**
 * Dashboard type definitions
 * 
 * Types for dashboard data structures and components
 */

import { Metric, Trend } from './common';
import { 
  CallVolumeDataPoint,
  StaffingRequirement,
  QuarterlyVolumeData,
  CampaignPerformanceDataPoint,
  AgentPerformanceDataPoint
} from './charts';

// Dashboard data types
export interface DashboardData {
  callVolumeData?: CallVolumeDataPoint[];
  staffingRequirements?: StaffingRequirement[];
  quarterlyVolume?: QuarterlyVolumeData[];
  historicalCallData?: any;
  weekDemand?: any[];
  calendarData?: any[];
  campaignPerformance?: CampaignPerformanceDataPoint[];
  agentPerformance?: AgentPerformanceDataPoint[];
  metrics?: any;
}

// Dashboard summary for dashboard listing
export interface DashboardSummary {
  id: string;
  title: string;
  description: string;
  metrics: Metric[];
  status: string;
  badges: string[];
  trend?: Trend;
  lastUpdated?: string;
}

// Recent report for dashboard listing
export interface RecentReport {
  id: string;
  title: string;
  description: string;
  lastUpdated: string;
}

// Response for dashboard listings
export interface DashboardSummaryResponse {
  dashboards: DashboardSummary[];
  recentReports: RecentReport[];
}

// Dashboard card props
export interface DashboardCardProps {
  id: string;
  title: string;
  description: string;
  metrics: Metric[];
  status: string;
  badges: string[];
  trend?: Trend;
  lastUpdated?: string;
  onClick?: () => void;
}