/**
 * Automation type definitions
 * 
 * Automations represent processes that deliver forecasting and scheduling outputs
 */

import { BaseEntity, Status, IconData } from './common';


// Automation types
export type AutomationType = 'workflow' | 'agent' | 'cron' | 'event' | 'data' | 'api';

// Automation schedule configuration
export interface AutomationScheduleConfig {
  cronExpression?: string;
  startDate?: Date;
  endDate?: Date;
  timezone?: string;
}

// Automation trigger configuration
export interface AutomationTriggerConfig {
  triggerType: 'event' | 'schedule' | 'manual';
  eventName?: string;
  scheduleConfig?: AutomationScheduleConfig;
}

// Database Automation model
export interface Automation extends BaseEntity {
  name: string;
  description?: string;
  type: AutomationType;
  triggerConfig: AutomationTriggerConfig;
  workflowSteps?: WorkflowStep[];
  status: Status;
  lastRunAt?: Date;
  nextRunAt?: Date;
}

// Workflow step definition
export interface WorkflowStep {
  id: number;
  name: string;
  type: 'agent' | 'transform' | 'decision' | 'notification';
  config: any;
  order: number;
  dependsOn?: number[];
}

// Automation UI model with additional display properties
export interface AutomationViewModel {
  id: number;
  name: string;
  description: string;
  type: AutomationType;
  status: string;
  statusBadgeColor: string;
  lastRun?: string;
  nextRun?: string;
  icon: React.ReactNode;
}

// Automation card props
export interface AutomationCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  additionalInfo?: string;
  onClick?: () => void;
  className?: string;
}

// Automation tab definition
export interface AutomationTab {
  icon: any;
  iconBg: string;
  iconColor: string;
  hover: string;
  name: string;
  value: string;
}

// Create automation request payload
export interface CreateAutomationPayload {
  name: string;
  description?: string;
  type: AutomationType;
  triggerConfig: AutomationTriggerConfig;
  workflowSteps?: WorkflowStep[];
}

// Update automation request payload
export interface UpdateAutomationPayload {
  name?: string;
  description?: string;
  type?: AutomationType;
  triggerConfig?: Partial<AutomationTriggerConfig>;
  workflowSteps?: WorkflowStep[];
  status?: Status;
}

// Automation search response
export interface AutomationSearchResponse {
  automations: Automation[];
  total: number;
}