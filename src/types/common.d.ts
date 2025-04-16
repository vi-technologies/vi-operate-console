/**
 * Common type definitions
 * 
 * Shared types used across the application
 */

// Base entity with common fields
export interface BaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

// Status for entities
export type Status = 'active' | 'inactive' | 'archived';

// Health status for connections
export type HealthStatus = 'healthy' | 'profiling' | 'error';

// Status for agents
export type AgentStatus = 'available' | 'busy' | 'offline' | 'error';

// Status for schedules
export type ScheduleStatus = 'scheduled' | 'completed' | 'cancelled' | 'pending';

// Icon data structure that can be serialized
export interface IconData {
  type: string;
  props: {
    className: string;
    [key: string]: any;
  };
}

// Metric for dashboards and reports
export interface Metric {
  label: string;
  value: string | number;
}

// Trend information for dashboards
export interface Trend {
  direction: 'up' | 'down' | 'neutral';
  value: string;
  text: string;
}