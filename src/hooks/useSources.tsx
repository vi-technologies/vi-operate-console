'use client';

import { sourcesConnectionsMockData, connectionOptionsMockData } from '@/lib/mock-data';

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

export function useSources() {
  return {
    sources: sourcesConnectionsMockData,
    connectionOptions: connectionOptionsMockData
  };
}
