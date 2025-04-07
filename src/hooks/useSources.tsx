'use client';

import { sourcesConnectionsMockData, connectionOptionsMockData } from '@/lib/mock-data';
import * as LucideIcons from 'lucide-react';
import React from 'react';

export type SourceConnectionType = {
  id: number;
  name: string;
  type: string;
  status: 'healthy' | 'profiling' | 'error';
  icon: React.ReactNode;
  iconBg: string;
  datasets: number;
  models: number;
  lastRefresh: string;
  refreshInterval: string;
  schema: {
    tables: number;
    views: number;
  };
  health: {
    status: string;
    metrics: {
      availability: string;
      latency: string;
      errors: string;
    };
  };
};

export type ConnectionOptionType = {
  name: string;
  icon: React.ReactNode;
  iconBg: string;
  hoverBorder: string;
};

// Helper function to render icon data objects
const renderIcon = (iconData: any): React.ReactNode => {
  if (!iconData) return null;
  
  const IconComponent = (LucideIcons as any)[iconData.type];
  if (!IconComponent) return null;
  
  return React.createElement(IconComponent, iconData.props);
};

export function useSources() {
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
