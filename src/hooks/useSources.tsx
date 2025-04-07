'use client';

import { sourcesConnectionsMockData, connectionOptionsMockData } from '@/lib/mock-data';
import * as LucideIcons from 'lucide-react';
import React from 'react';
import { SourceConnection, ConnectionOption, IconData } from '@/lib/mock-data/types';

export interface SourceConnectionWithReactNode extends Omit<SourceConnection, 'icon'> {
  icon: React.ReactNode;
}

export interface ConnectionOptionWithReactNode extends Omit<ConnectionOption, 'icon'> {
  icon: React.ReactNode;
}

/**
 * Converts an IconData object to a React element
 * 
 * @param iconData - The icon data object to render
 * @returns A React element representing the icon
 */
const renderIcon = (iconData: IconData): React.ReactNode => {
  if (!iconData) return null;
  
  const IconComponent = (LucideIcons as Record<string, React.ComponentType<any>>)[iconData.type];
  if (!IconComponent) return null;
  
  return React.createElement(IconComponent, iconData.props);
};

export function useSources(): {
  sources: SourceConnectionWithReactNode[];
  connectionOptions: ConnectionOptionWithReactNode[];
} {
  // Convert icon data objects to React elements
  const sources = sourcesConnectionsMockData.map(source => ({
    ...source,
    icon: renderIcon(source.icon)
  }));
  
  const connectionOptions = connectionOptionsMockData.map(option => ({
    ...option,
    icon: renderIcon(option.icon)
  }));
  
  return {
    sources,
    connectionOptions
  };
}
