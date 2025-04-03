import { useState } from 'react';
import { Clock, Network, Database, Activity, BarChart3 } from 'lucide-react';
import React from 'react';

export type Archetype = {
  id: number;
  name: string;
  description: string;
  status: string;
  statusColor: string;
  tablesCount: number;
  lastUpdated: string;
  icon: React.ReactNode;
  details: {
    dataTypes: string[];
    dependencies: string[];
    frequency: string;
  };
};

export function useArchetypes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedArchetypeId, setExpandedArchetypeId] = useState<number | null>(null);

  const archetypes: Archetype[] = [
    {
      id: 1,
      name: 'Labor Staffing',
      description: 'Combines staffing schedules and patient census data for labor analysis',
      status: 'Running...',
      statusColor: 'bg-green-500',
      tablesCount: 10,
      lastUpdated: '2 min ago',
      icon: <Clock className="h-5 w-5" />,
      details: {
        dataTypes: ['Staffing Schedules', 'Patient Census', 'Labor Hours', 'Department Metrics'],
        dependencies: ['Hospital Capacity', 'Department Configuration'],
        frequency: 'Every 15 minutes'
      }
    },
    {
      id: 2,
      name: 'Inventory Management',
      description: 'Tracks supply usage and procurement records for inventory reporting',
      status: 'Running...',
      statusColor: 'bg-green-500',
      tablesCount: 8,
      lastUpdated: '5 min ago',
      icon: <Database className="h-5 w-5" />,
      details: {
        dataTypes: ['Supply Records', 'Purchase Orders', 'Procurement Logs', 'Usage Metrics'],
        dependencies: ['Vendor Database', 'Department Configuration'],
        frequency: 'Every 30 minutes'
      }
    },
    {
      id: 3,
      name: 'Operating Room Utilization',
      description: 'Links schedules and procedure logs to analyze operating room use',
      status: 'Paused',
      statusColor: 'bg-gray-400',
      tablesCount: 7,
      lastUpdated: '1 hour ago',
      icon: <Activity className="h-5 w-5" />,
      details: {
        dataTypes: ['OR Schedules', 'Procedure Logs', 'Staff Assignments', 'Equipment Usage'],
        dependencies: ['Hospital Capacity', 'Labor Staffing'],
        frequency: 'Hourly'
      }
    },
    {
      id: 4,
      name: 'Referral Data',
      description: 'Aggregates referral and follow-up data to track care coordination',
      status: 'Running...',
      statusColor: 'bg-green-500',
      tablesCount: 5,
      lastUpdated: '15 min ago',
      icon: <Network className="h-5 w-5" />,
      details: {
        dataTypes: ['Referral Records', 'Provider Information', 'Follow-up Data', 'Patient Encounters'],
        dependencies: ['Patient Demographics'],
        frequency: 'Hourly'
      }
    },
    {
      id: 5,
      name: 'Hospital Capacity',
      description: 'Connects admission, discharge, and bed data to support throughput',
      status: 'Running...',
      statusColor: 'bg-green-500',
      tablesCount: 22,
      lastUpdated: '1 min ago',
      icon: <BarChart3 className="h-5 w-5" />,
      details: {
        dataTypes: ['Admissions', 'Discharges', 'Bed Assignments', 'Unit Capacity', 'Staff Allocation'],
        dependencies: ['Labor Staffing', 'Department Configuration'],
        frequency: 'Every 5 minutes'
      }
    }
  ];

  const filteredArchetypes = archetypes.filter((archetype) =>
    archetype.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    archetype.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleExpand = (id: number) => {
    setExpandedArchetypeId(expandedArchetypeId === id ? null : id);
  };

  return {
    searchTerm,
    setSearchTerm,
    filteredArchetypes,
    expandedArchetypeId,
    toggleExpand
  };
}
