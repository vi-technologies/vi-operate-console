/**
 * Utility functions for transforming between database models and UI view models
 * 
 * These functions handle the conversion between database representations of entities
 * and the formats needed by UI components.
 */

import { Clock, Database, Activity, BarChart3, Network } from 'lucide-react';
import React from 'react';
import { 
  Archetype, 
  ArchetypeViewModel,
  ArchetypeType 
} from '@/types/archetype';
import {
  Source,
  SourceViewModel,
  SourceType
} from '@/types/source';
import {
  Automation,
  AutomationType,
  AutomationViewModel
} from '@/types/automation';
import {
  Forecast,
  ForecastViewModel
} from '@/types/forecast';
import {
  Schedule,
  ScheduleViewModel
} from '@/types/schedule';
import {
  Report,
  ReportViewModel
} from '@/types/report';
import { formatDistanceToNow } from 'date-fns';

/**
 * Convert a database Archetype to an ArchetypeViewModel for UI display
 * 
 * @param archetype - The database archetype entity
 * @returns A view model suitable for UI components
 */
export function archetypeToViewModel(archetype: Archetype): ArchetypeViewModel {
  // Map archetype type to appropriate icon
  const getIconForType = (type: ArchetypeType) => {
    switch (type) {
      case 'forecasting':
        return <BarChart3 className="h-5 w-5" />;
      case 'scheduling':
        return <Clock className="h-5 w-5" />;
      case 'support':
        return <Activity className="h-5 w-5" />;
      default:
        return <Database className="h-5 w-5" />;
    }
  };

  // Map status to appropriate color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'inactive':
        return 'bg-gray-400';
      case 'archived':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Format status for display
  const getDisplayStatus = (status: string) => {
    switch (status) {
      case 'active':
        return 'Running...';
      case 'inactive':
        return 'Paused';
      case 'archived':
        return 'Archived';
      default:
        return status;
    }
  };

  // Format last updated
  const lastUpdated = archetype.updatedAt 
    ? formatDistanceToNow(new Date(archetype.updatedAt), { addSuffix: true })
    : 'Unknown';

  // Get table count from config params or default
  const tablesCount = archetype.configParams?.sourceMaterials?.length || 0;

  // Create mock details (in a real app, this would be populated with real data)
  const details = {
    dataTypes: archetype.configParams?.sourceMaterials || ['No data types defined'],
    dependencies: ['Hospital Capacity', 'Department Configuration'],
    frequency: archetype.configParams?.timeFrame || 'Hourly'
  };

  return {
    id: archetype.id,
    name: archetype.name,
    description: archetype.description || '',
    status: getDisplayStatus(archetype.status),
    statusColor: getStatusColor(archetype.status),
    tablesCount,
    lastUpdated,
    icon: getIconForType(archetype.type),
    details
  };
}

/**
 * Convert database Source to a SourceViewModel for UI display
 * 
 * @param source - The database source entity
 * @returns A view model suitable for UI components
 */
export function sourceToViewModel(source: Source): SourceViewModel {
  // Implementation similar to archetypeToViewModel
  // This would be filled with actual transformation logic
  return {
    id: source.id,
    name: source.name,
    type: source.type,
    status: source.status === 'active' ? 'healthy' : 'error',
    icon: <Database className="h-5 w-5 text-white" />,
    iconBg: 'bg-blue-500',
    datasets: 10, // These would be computed from actual data in a real app
    models: 5
  };
}

/**
 * Convert an array of database entities to view models
 * 
 * @param entities - Array of database entities
 * @param transformFn - Function to transform each entity
 * @returns Array of view models
 */
export function entitiesToViewModels<T, U>(
  entities: T[],
  transformFn: (entity: T) => U
): U[] {
  return entities.map(transformFn);
}