/**
 * Workflow type definitions
 * 
 * Workflows represent multi-step processes that can be automated
 */

import { BaseEntity, Status } from './common';
import React from 'react';
import { Automation } from './automation';

// Workflow step types
export type WorkflowStepType = 'agent' | 'transform' | 'decision' | 'notification' | 'api';

// Workflow trigger types
export type WorkflowTriggerType = 'schedule' | 'event' | 'manual' | 'api';

// Workflow step configuration
export interface WorkflowStepConfig {
  agentId?: number;
  transformScript?: string;
  decisionCondition?: string;
  notificationTemplate?: string;
  apiEndpoint?: string;
  parameters?: Record<string, any>;
  [key: string]: any;
}

// Workflow step model
export interface WorkflowStep {
  id: number;
  name: string;
  type: WorkflowStepType;
  config: WorkflowStepConfig;
  order: number;
  dependsOn?: number[];
}

// Workflow trigger configuration
export interface WorkflowTriggerConfig {
  triggerType: WorkflowTriggerType;
  scheduleExpression?: string; // cron expression
  eventType?: string;
  [key: string]: any;
}

// Database Workflow model (extends Automation)
export interface Workflow extends Automation {
  steps: WorkflowStep[];
  triggerConfig: WorkflowTriggerConfig;
  inputSchema?: Record<string, any>;
  outputSchema?: Record<string, any>;
}

// Workflow UI model with additional display properties
export interface WorkflowViewModel {
  id: number;
  name: string;
  description: string;
  status: string;
  statusColor: string;
  stepCount: number;
  lastRun: string;
  nextRun?: string;
  avgDuration?: string;
  icon: React.ReactNode;
}

// Workflow card props for component
export interface WorkflowCardProps {
  title: string;
  description: string;
  stepCount: number;
  lastRun?: string;
  nextRun?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

// Create workflow request payload
export interface CreateWorkflowPayload {
  name: string;
  description?: string;
  triggerConfig: WorkflowTriggerConfig;
  steps: Omit<WorkflowStep, 'id'>[];
  inputSchema?: Record<string, any>;
  outputSchema?: Record<string, any>;
}

// Update workflow request payload
export interface UpdateWorkflowPayload {
  name?: string;
  description?: string;
  triggerConfig?: Partial<WorkflowTriggerConfig>;
  steps?: Partial<WorkflowStep>[];
  status?: Status;
  inputSchema?: Record<string, any>;
  outputSchema?: Record<string, any>;
}

// Workflow execution log entry
export interface WorkflowExecutionLog {
  id: number;
  workflowId: number;
  startTime: Date;
  endTime?: Date;
  status: 'running' | 'completed' | 'failed';
  stepLogs: {
    stepId: number;
    startTime: Date;
    endTime?: Date;
    status: 'waiting' | 'running' | 'completed' | 'failed';
    output?: any;
    error?: string;
  }[];
  input?: any;
  output?: any;
  error?: string;
}

// Workflow search response
export interface WorkflowSearchResponse {
  workflows: Workflow[];
  total: number;
}