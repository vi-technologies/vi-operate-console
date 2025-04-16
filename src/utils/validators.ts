/**
 * Data validation utilities
 * 
 * These functions help validate data at runtime to ensure type safety,
 * especially for data coming from external APIs or user input.
 */

import { Archetype, ArchetypeType } from "@/types/archetype";
import { Source, SourceType } from "@/types/source";
import { Status } from "@/types/common";

/**
 * Type guard for checking if a value is a valid Status
 */
export function isStatus(value: any): value is Status {
  return ['active', 'inactive', 'archived'].includes(value);
}

/**
 * Type guard for checking if a value is a valid ArchetypeType
 */
export function isArchetypeType(value: any): value is ArchetypeType {
  return ['forecasting', 'scheduling', 'support'].includes(value);
}

/**
 * Type guard for checking if a value is a valid SourceType
 */
export function isSourceType(value: any): value is SourceType {
  return ['callCenter', 'wfm', 'crm', 'scheduling'].includes(value);
}

/**
 * Validates an Archetype object from external data
 * Returns a sanitized version with default values for missing properties
 */
export function validateArchetype(data: any): Archetype {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid archetype data: must be an object');
  }

  const archetype: Archetype = {
    id: typeof data.id === 'number' ? data.id : 0,
    name: typeof data.name === 'string' ? data.name : 'Unnamed Archetype',
    description: typeof data.description === 'string' ? data.description : '',
    type: isArchetypeType(data.type) ? data.type : 'forecasting',
    configParams: typeof data.configParams === 'object' ? data.configParams : {},
    status: isStatus(data.status) ? data.status : 'inactive',
    createdAt: data.createdAt instanceof Date ? data.createdAt : new Date(),
    updatedAt: data.updatedAt instanceof Date ? data.updatedAt : new Date()
  };

  return archetype;
}

/**
 * Validates an array of archetypes from external data
 */
export function validateArchetypes(data: any[]): Archetype[] {
  if (!Array.isArray(data)) {
    throw new Error('Invalid archetypes data: must be an array');
  }
  
  return data.map(item => validateArchetype(item));
}

/**
 * Validates a Source object from external data
 * Returns a sanitized version with default values for missing properties
 */
export function validateSource(data: any): Source {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid source data: must be an object');
  }

  const source: Source = {
    id: typeof data.id === 'number' ? data.id : 0,
    name: typeof data.name === 'string' ? data.name : 'Unnamed Source',
    description: typeof data.description === 'string' ? data.description : '',
    type: isSourceType(data.type) ? data.type : 'callCenter',
    connectionConfig: typeof data.connectionConfig === 'object' ? data.connectionConfig : {},
    status: isStatus(data.status) ? data.status : 'inactive',
    lastSyncAt: data.lastSyncAt instanceof Date ? data.lastSyncAt : undefined,
    createdAt: data.createdAt instanceof Date ? data.createdAt : new Date(),
    updatedAt: data.updatedAt instanceof Date ? data.updatedAt : new Date()
  };

  return source;
}

/**
 * Validates an array of sources from external data
 */
export function validateSources(data: any[]): Source[] {
  if (!Array.isArray(data)) {
    throw new Error('Invalid sources data: must be an array');
  }
  
  return data.map(item => validateSource(item));
}