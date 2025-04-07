import { Database, Snowflake, CloudCog, Boxes, BarChart4, LayoutGrid, Layers } from 'lucide-react';
import React from 'react';

// Create a function to generate the icon data
const createIconData = (Icon: any, color: string, size: 'sm' | 'md' = 'md') => ({
  type: Icon.name,
  props: {
    className: `h-${size === 'sm' ? '4' : '5'} w-${size === 'sm' ? '4' : '5'} text-${color}`
  }
});

export const sourcesConnectionsMockData = [
  {
    id: 1,
    name: 'Primary Data Lake',
    type: 'BigQuery',
    status: 'healthy',
    icon: createIconData(Database, 'blue-600'),
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
    icon: createIconData(Snowflake, 'cyan-600'),
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
    icon: createIconData(CloudCog, 'purple-600'),
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
    icon: createIconData(Database, 'green-600'),
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

export const connectionOptionsMockData = [
  {
    name: 'Azure Blob Storage',
    icon: createIconData(Boxes, 'red-600', 'md'),
    iconBg: 'bg-red-100',
    hoverBorder: 'hover:border-red-200'
  },
  {
    name: 'BigQuery',
    icon: createIconData(Database, 'blue-600', 'md'),
    iconBg: 'bg-blue-100',
    hoverBorder: 'hover:border-blue-200'
  },
  {
    name: 'Snowflake',
    icon: createIconData(Snowflake, 'cyan-600', 'md'),
    iconBg: 'bg-cyan-100',
    hoverBorder: 'hover:border-cyan-200'
  },
  {
    name: 'Databricks',
    icon: createIconData(Layers, 'red-600', 'md'),
    iconBg: 'bg-red-100',
    hoverBorder: 'hover:border-red-200'
  },
  {
    name: 'Google Analytics',
    icon: createIconData(BarChart4, 'amber-600', 'md'),
    iconBg: 'bg-amber-100',
    hoverBorder: 'hover:border-amber-200'
  },
  {
    name: 'Custom Source',
    icon: createIconData(LayoutGrid, 'slate-600', 'md'),
    iconBg: 'bg-slate-100',
    hoverBorder: 'hover:border-slate-200'
  }
];
