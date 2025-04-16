/**
 * Archetype type definitions
 * 
 * Archetypes are data models for understanding historical patterns and forecasting future trends
 */

import { BaseEntity, Status, IconData } from './common';

// Archetype types
export type ArchetypeType = 'forecasting' | 'scheduling' | 'support';

// Config parameters for archetypes
export interface ArchetypeConfigParams {
  timeFrame?: string;
  sourceMaterials?: string[];
  [key: string]: any;
}

// Database Archetype model
export interface Archetype extends BaseEntity {
  name: string;
  description?: string;
  type: ArchetypeType;
  configParams?: ArchetypeConfigParams;
  status: Status;
}

// Archetype details for UI display
export interface ArchetypeDetails {
  dataTypes: string[];
  dependencies: string[];
  frequency: string;
}

// Archetype UI model with additional display properties
export interface ArchetypeViewModel {
  id: number;
  name: string;
  description: string;
  status: string;
  statusColor: string;
  tablesCount: number;
  lastUpdated: string;
  icon: React.ReactNode;
  details: ArchetypeDetails;
}

// Archetype card props for component
export interface ArchetypeCardProps extends ArchetypeViewModel {
  expandedId: number | null;
  onToggleExpandAction: (id: number) => void;
}

// Create archetype request payload
export interface CreateArchetypePayload {
  name: string;
  description?: string;
  type: ArchetypeType;
  configParams?: ArchetypeConfigParams;
}

// Update archetype request payload
export interface UpdateArchetypePayload {
  name?: string;
  description?: string;
  type?: ArchetypeType;
  configParams?: Partial<ArchetypeConfigParams>;
  status?: Status;
}

// Archetype search response
export interface ArchetypeSearchResponse {
  archetypes: Archetype[];
  total: number;
}