/**
 * Forecast type definitions
 * 
 * Forecasts represent predictions of future demand and resource requirements
 */

import { BaseEntity, Status } from './common';
import React from 'react';

// Forecast types
export type ForecastType = 'labor' | 'supplies' | 'volume' | 'capacity';

// Forecast configuration parameters
export interface ForecastConfigParams {
  timeFrame: string;
  granularity: 'hourly' | 'daily' | 'weekly' | 'monthly';
  forecastHorizon: number;
  lookbackPeriod: number;
  seasonalFactors: boolean;
  confidenceIntervals: boolean;
  [key: string]: any;
}

// Data point in a forecast series
export interface ForecastDataPoint {
  timestamp: Date;
  value: number;
  lowerBound?: number;
  upperBound?: number;
  actual?: number;
}

// Database Forecast model
export interface Forecast extends BaseEntity {
  name: string;
  description?: string;
  type: ForecastType;
  configParams: ForecastConfigParams;
  archetypeId: number;
  status: Status;
  data?: ForecastDataPoint[];
  lastGeneratedAt?: Date;
  nextUpdateAt?: Date;
}

// Forecast UI model with additional display properties
export interface ForecastViewModel {
  id: number;
  name: string;
  description: string;
  type: ForecastType;
  status: string;
  statusColor: string;
  lastGenerated: string;
  nextUpdate: string;
  accuracy: number;
  icon: React.ReactNode;
}

// Forecast card props for component
export interface ForecastCardProps {
  title: string;
  description: string;
  lastUpdated: string;
  nextUpdate: string;
  accuracy: number;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

// Create forecast request payload
export interface CreateForecastPayload {
  name: string;
  description?: string;
  type: ForecastType;
  configParams: ForecastConfigParams;
  archetypeId: number;
}

// Update forecast request payload
export interface UpdateForecastPayload {
  name?: string;
  description?: string;
  type?: ForecastType;
  configParams?: Partial<ForecastConfigParams>;
  status?: Status;
}

// Forecast search response
export interface ForecastSearchResponse {
  forecasts: Forecast[];
  total: number;
}