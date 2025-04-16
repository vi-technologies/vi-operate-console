/**
 * Source type definitions
 * 
 * Sources represent data integration points with external systems
 */

import { BaseEntity, Status, HealthStatus, IconData } from './common';

// Source types
export type SourceType = 'callCenter' | 'wfm' | 'crm' | 'scheduling';

// Source connection configuration
export interface SourceConnectionConfig {
  apiKey?: string;
  endpoint?: string;
  refreshInterval?: number;
  [key: string]: any;
}

// Database Source model
export interface Source extends BaseEntity {
  name: string;
  description?: string;
  type: SourceType;
  connectionConfig?: SourceConnectionConfig;
  status: Status;
  lastSyncAt?: Date;
}

// Source UI model with additional display properties
export interface SourceViewModel {
  id: number;
  name: string;
  type: string;
  status: 'healthy' | 'profiling' | 'error';
  icon: React.ReactNode;
  iconBg: string;
  datasets: number;
  models: number;
}

// Source connection card props
export interface SourceConnectionCardProps extends SourceViewModel {
  expandedId: number | null;
  onToggleExpand: (id: number) => void;
  children?: React.ReactNode;
}

// Connection option for source setup
export interface ConnectionOption {
  name: string;
  icon: React.ReactNode;
  iconBg: string;
  hoverBorder: string;
}

// Create source request payload
export interface CreateSourcePayload {
  name: string;
  description?: string;
  type: SourceType;
  connectionConfig?: SourceConnectionConfig;
}

// Update source request payload
export interface UpdateSourcePayload {
  name?: string;
  description?: string;
  type?: SourceType;
  connectionConfig?: Partial<SourceConnectionConfig>;
  status?: Status;
}

// Source search response
export interface SourceSearchResponse {
  sources: Source[];
  total: number;
}