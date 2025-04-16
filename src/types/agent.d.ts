/**
 * Agent type definitions
 * 
 * Agents represent autonomous components that perform specific tasks
 */

import { BaseEntity, Status, AgentStatus } from './common';
import React from 'react';

// Agent types
export type AgentType = 'forecasting' | 'scheduling' | 'notification' | 'integration' | 'analysis';

// Agent configuration parameters
export interface AgentConfigParams {
  runInterval?: number;
  memorySize?: number;
  timeout?: number;
  maxRetries?: number;
  inputSchema?: Record<string, any>;
  outputSchema?: Record<string, any>;
  [key: string]: any;
}

// Database Agent model
export interface Agent extends BaseEntity {
  name: string;
  description?: string;
  type: AgentType;
  configParams: AgentConfigParams;
  status: Status;
  lastRunAt?: Date;
  lastResult?: {
    success: boolean;
    output?: any;
    error?: string;
    runTime?: number;
  };
}

// Agent UI model with additional display properties
export interface AgentViewModel {
  id: number;
  name: string;
  description: string;
  type: AgentType;
  status: AgentStatus;
  statusColor: string;
  lastRun: string;
  successRate: number;
  avgRunTime: string;
  icon: React.ReactNode;
}

// Agent card props for component
export interface AgentCardProps {
  title: string;
  description: string;
  status: AgentStatus;
  lastRun?: string;
  successRate?: number;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

// Create agent request payload
export interface CreateAgentPayload {
  name: string;
  description?: string;
  type: AgentType;
  configParams: AgentConfigParams;
}

// Update agent request payload
export interface UpdateAgentPayload {
  name?: string;
  description?: string;
  type?: AgentType;
  configParams?: Partial<AgentConfigParams>;
  status?: Status;
}

// Agent run payload
export interface AgentRunPayload {
  input?: any;
  options?: {
    timeout?: number;
    waitForCompletion?: boolean;
  };
}

// Agent run result
export interface AgentRunResult {
  id: number;
  agentId: number;
  startTime: Date;
  endTime?: Date;
  status: 'running' | 'completed' | 'failed';
  input?: any;
  output?: any;
  error?: string;
  runTime?: number;
}

// Agent search response
export interface AgentSearchResponse {
  agents: Agent[];
  total: number;
}