/**
 * Report type definitions
 * 
 * Types for reports and report-related components
 */

import { BaseEntity, Status } from './common';
import React from 'react';

// Report types
export type ReportType = 'standard' | 'custom' | 'scheduled';

// Report configuration parameters
export interface ReportConfigParams {
  timeFrame?: string;
  filters?: Record<string, any>;
  visualizationSettings?: Record<string, any>;
  [key: string]: any;
}

// Database Report model
export interface Report extends BaseEntity {
  name: string;
  description?: string;
  type: ReportType;
  configParams?: ReportConfigParams;
  status: Status;
  lastGeneratedAt?: Date;
}

// Report UI view model
export interface ReportViewModel {
  title: string;
  description: string;
  badges?: string[];
  lastUpdated?: string;
  icon?: React.ReactNode;
  onViewReport?: () => void;
  onExport?: () => void;
}

// Report card component props
export interface ReportCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  badges?: string[];
  lastUpdated?: string;
  onViewReport?: () => void;
  onExport?: () => void;
  className?: string;
}

// Scheduled report view model
export interface ScheduledReportCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  nextDelivery: string;
  frequency: string;
  className?: string;
}

// Report tab interface
export interface ReportTab {
  icon: any;
  iconBg: string;
  iconColor: string;
  hover: string;
  name: string;
  value: string;
}

// Create report request payload
export interface CreateReportPayload {
  name: string;
  description?: string;
  type: ReportType;
  configParams?: ReportConfigParams;
}

// Update report request payload
export interface UpdateReportPayload {
  name?: string;
  description?: string;
  type?: ReportType;
  configParams?: Partial<ReportConfigParams>;
  status?: Status;
}

// Report search response
export interface ReportSearchResponse {
  reports: Report[];
  total: number;
}