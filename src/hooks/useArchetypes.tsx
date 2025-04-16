import { useState, useEffect } from 'react';
import { Clock, Network, Database, Activity, BarChart3 } from 'lucide-react';
import React from 'react';
import { Archetype, ArchetypeViewModel, ArchetypeDetails } from '@/types/archetype';
import { archetypeToViewModel, entitiesToViewModels } from '@/utils/transformers';

export function useArchetypes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedArchetypeId, setExpandedArchetypeId] = useState<number | null>(null);
  const [archetypes, setArchetypes] = useState<ArchetypeViewModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch archetypes from the API
  useEffect(() => {
    async function fetchArchetypes() {
      setLoading(true);
      setError(null);
      
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/archetypes');
        // const data = await response.json();

        // For now, use static data
        const mockDbArchetypes: Archetype[] = [
          {
            id: 1,
            name: 'Labor Staffing',
            description: 'Combines staffing schedules and patient census data for labor analysis',
            type: 'forecasting',
            configParams: {
              timeFrame: 'Every 15 minutes',
              sourceMaterials: [
                'Staffing Schedules',
                'Patient Census',
                'Labor Hours',
                'Department Metrics'
              ]
            },
            status: 'active',
            createdAt: new Date('2025-01-15'),
            updatedAt: new Date('2025-04-14')
          },
          {
            id: 2,
            name: 'Inventory Management',
            description: 'Tracks supply usage and procurement records for inventory reporting',
            type: 'support',
            configParams: {
              timeFrame: 'Every 30 minutes',
              sourceMaterials: [
                'Supply Records',
                'Purchase Orders',
                'Procurement Logs',
                'Usage Metrics'
              ]
            },
            status: 'active',
            createdAt: new Date('2025-02-10'),
            updatedAt: new Date('2025-04-10')
          },
          {
            id: 3,
            name: 'Operating Room Utilization',
            description: 'Links schedules and procedure logs to analyze operating room use',
            type: 'scheduling',
            configParams: {
              timeFrame: 'Hourly',
              sourceMaterials: [
                'OR Schedules',
                'Procedure Logs',
                'Staff Assignments',
                'Equipment Usage'
              ]
            },
            status: 'inactive',
            createdAt: new Date('2025-03-05'),
            updatedAt: new Date('2025-04-05')
          }
        ];

        // Transform database models to view models
        const archetypeViewModels = entitiesToViewModels(mockDbArchetypes, archetypeToViewModel);
        setArchetypes(archetypeViewModels);
      } catch (err) {
        console.error('Failed to fetch archetypes:', err);
        setError('Failed to load archetypes. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchArchetypes();
  }, []);

  // Filter archetypes based on search term
  const filteredArchetypes = archetypes.filter(
    (archetype) =>
      archetype.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      archetype.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle expanded state
  const toggleExpand = (id: number) => {
    setExpandedArchetypeId(expandedArchetypeId === id ? null : id);
  };

  return {
    archetypes,
    filteredArchetypes,
    searchTerm,
    setSearchTerm,
    expandedArchetypeId,
    toggleExpand,
    loading,
    error
  };
}
