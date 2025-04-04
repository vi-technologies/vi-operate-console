'use client';

import React from 'react';
import {
  Database,
  Snowflake,
  CloudCog,
  Boxes,
  BarChart4,
  LayoutGrid,
  Layers
} from 'lucide-react';

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
  // Mock source data
  const sources: SourceConnectionType[] = [
    {
      id: 1,
      name: 'Primary Data Lake',
      type: 'BigQuery',
      status: 'healthy',
      icon: <Database className="h-5 w-5 text-blue-600" />,
      iconBg: 'bg-blue-100',
      datasets: 42,
      models: 6,
      lastRefresh: '1 hour ago',
      refreshInterval: '6 hours',
      schema: {
        tables: 65,
        views: 23
      },
      health: {
        status: 'Healthy',
        metrics: {
          availability: '99.9%',
          latency: '54ms',
          errors: '0.01%'
        }
      }
    },
    {
      id: 2,
      name: 'Patient Demographics and History',
      type: 'Snowflake',
      status: 'healthy',
      icon: <Snowflake className="h-5 w-5 text-cyan-600" />,
      iconBg: 'bg-cyan-100',
      datasets: 18,
      models: 4,
      lastRefresh: '3 hours ago',
      refreshInterval: '12 hours',
      schema: {
        tables: 32,
        views: 14
      },
      health: {
        status: 'Healthy',
        metrics: {
          availability: '99.8%',
          latency: '125ms',
          errors: '0.02%'
        }
      }
    },
    {
      id: 3,
      name: 'Specialist Scheduling Data',
      type: 'Amazon Redshift',
      status: 'profiling',
      icon: <CloudCog className="h-5 w-5 text-purple-600" />,
      iconBg: 'bg-purple-100',
      datasets: 12,
      models: 3,
      lastRefresh: '2 days ago',
      refreshInterval: '1 day',
      schema: {
        tables: 18,
        views: 7
      },
      health: {
        status: 'Profiling',
        metrics: {
          availability: '98.2%',
          latency: '210ms',
          errors: '1.2%'
        }
      }
    },
    {
      id: 4,
      name: 'Discharge and Follow-Up Logs',
      type: 'PostgreSQL',
      status: 'healthy',
      icon: <Database className="h-5 w-5 text-green-600" />,
      iconBg: 'bg-green-100',
      datasets: 9,
      models: 2,
      lastRefresh: '5 hours ago',
      refreshInterval: '8 hours',
      schema: {
        tables: 14,
        views: 5
      },
      health: {
        status: 'Healthy',
        metrics: {
          availability: '99.7%',
          latency: '87ms',
          errors: '0.05%'
        }
      }
    }
  ];

  const connectionOptions: ConnectionOptionType[] = [
    {
      name: 'Azure Blob Storage',
      icon: <Boxes className="h-6 w-6 text-red-600" />,
      iconBg: 'bg-red-100',
      hoverBorder: 'hover:border-red-200'
    },
    {
      name: 'BigQuery',
      icon: <Database className="h-6 w-6 text-blue-600" />,
      iconBg: 'bg-blue-100',
      hoverBorder: 'hover:border-blue-200'
    },
    {
      name: 'Snowflake',
      icon: <Snowflake className="h-6 w-6 text-cyan-600" />,
      iconBg: 'bg-cyan-100',
      hoverBorder: 'hover:border-cyan-200'
    },
    {
      name: 'Databricks',
      icon: <Layers className="h-6 w-6 text-red-600" />,
      iconBg: 'bg-red-100',
      hoverBorder: 'hover:border-red-200'
    },
    {
      name: 'Google Analytics',
      icon: <BarChart4 className="h-6 w-6 text-amber-600" />,
      iconBg: 'bg-amber-100',
      hoverBorder: 'hover:border-amber-200'
    },
    {
      name: 'Custom Source',
      icon: <LayoutGrid className="h-6 w-6 text-slate-600" />,
      iconBg: 'bg-slate-100',
      hoverBorder: 'hover:border-slate-200'
    }
  ];

  return {
    sources,
    connectionOptions
  };
}