/**
 * Chart and visualization data types
 * 
 * These types define the data structures used for various charts and visualizations
 * throughout the application.
 */

import { IconData } from './common';
import React from 'react';

// Generic data point with name and multiple possible values
export interface DataPoint {
  name: string;
  [key: string]: string | number;
}

// Line chart types
export interface LineChartProps {
  data: DataPoint[];
  lines: {
    dataKey: string;
    stroke: string;
    name?: string;
  }[];
  xAxisDataKey?: string;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
}

// Bar chart types
export interface BarChartProps {
  data: DataPoint[];
  bars: {
    dataKey: string;
    fill: string;
    name?: string;
  }[];
  xAxisDataKey?: string;
  height?: number;
  stackId?: string;
  showGrid?: boolean;
  showLegend?: boolean;
}

// Scatter chart types
export interface ScatterDataPoint {
  x: number;
  y: number;
}

export interface ScatterSeries {
  name: string;
  color: string;
  points: ScatterDataPoint[];
}

export interface ScatterChartProps {
  data: ScatterSeries[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  xAxisName?: string;
  yAxisName?: string;
  showTrendLine?: boolean;
}

// Calendar heatmap types
export interface CalendarDataPoint {
  date: string;
  value: number;
}

export interface CalendarHeatmapProps {
  data: CalendarDataPoint[];
  colorScale?: string[];
  height?: number;
  width?: number | string;
}

// Call center specific data types
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

export interface WeekDemandDataPoint {
  name: string;
  'Call Volume': number;
  'Service Level': number;
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

// Historical call data series
export interface HistoricalCallDataSeries {
  name: string;
  color: string;
  points: ScatterDataPoint[];
}

// Insight alert props for displaying important notifications
export interface InsightAlertProps {
  title: string;
  message: string;
  icon: React.ReactNode;
  severity: 'info' | 'warning' | 'success' | 'error';
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
}