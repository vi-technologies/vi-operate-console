/**
 * Schedule type definitions
 * 
 * Schedules represent resource allocation over time periods
 */

import { BaseEntity, Status, ScheduleStatus } from './common';
import React from 'react';

// Schedule types
export type ScheduleType = 'staff' | 'resource' | 'room' | 'equipment';

// Schedule configuration parameters
export interface ScheduleConfigParams {
  startDate: Date;
  endDate: Date;
  intervalMinutes: number;
  minimumStaff?: number;
  breakPeriods?: boolean;
  utilizationTarget?: number;
  [key: string]: any;
}

// Schedule assignment
export interface ScheduleAssignment {
  id: number;
  resourceId: number;
  resourceType: 'staff' | 'room' | 'equipment';
  resourceName: string;
  startTime: Date;
  endTime: Date;
  status: ScheduleStatus;
  notes?: string;
}

// Database Schedule model
export interface Schedule extends BaseEntity {
  name: string;
  description?: string;
  type: ScheduleType;
  configParams: ScheduleConfigParams;
  forecastId?: number;
  assignments: ScheduleAssignment[];
  status: Status;
  lastGeneratedAt?: Date;
  nextUpdateAt?: Date;
}

// Schedule UI model with additional display properties
export interface ScheduleViewModel {
  id: number;
  name: string;
  description: string;
  type: ScheduleType;
  startDate: string;
  endDate: string;
  status: string;
  statusColor: string;
  assignmentCount: number;
  utilizationRate: number;
  icon: React.ReactNode;
}

// Schedule card props for component
export interface ScheduleCardProps {
  title: string;
  description: string;
  dateRange: string;
  assignmentCount: number;
  utilizationRate: number;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

// Create schedule request payload
export interface CreateSchedulePayload {
  name: string;
  description?: string;
  type: ScheduleType;
  configParams: ScheduleConfigParams;
  forecastId?: number;
  assignments?: Omit<ScheduleAssignment, 'id'>[];
}

// Update schedule request payload
export interface UpdateSchedulePayload {
  name?: string;
  description?: string;
  type?: ScheduleType;
  configParams?: Partial<ScheduleConfigParams>;
  status?: Status;
  assignments?: Partial<ScheduleAssignment>[];
}

// Schedule search response
export interface ScheduleSearchResponse {
  schedules: Schedule[];
  total: number;
}