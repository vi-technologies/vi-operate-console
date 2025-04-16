'use client';

import { useState, useEffect } from 'react';
import { sourcesConnectionsMockData, connectionOptionsMockData } from '@/lib/mock-data';
import * as LucideIcons from 'lucide-react';
import React from 'react';
import { Source, SourceViewModel, ConnectionOption } from '@/types/source';
import { IconData } from '@/types/common';
import { sourceToViewModel, entitiesToViewModels } from '@/utils/transformers';
import { validateSources } from '@/utils/validators';

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

export function useSources() {
  const [sources, setSources] = useState<SourceViewModel[]>([]);
  const [connectionOptions, setConnectionOptions] = useState<ConnectionOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch sources from the API
  useEffect(() => {
    async function fetchSources() {
      setLoading(true);
      setError(null);
      
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/sources');
        // const data = await response.json();
        
        // For now, simulate API data that needs validation
        const mockApiData = [
          {
            id: 1,
            name: 'Call Center CRM',
            description: 'Primary call center customer relationship management system',
            type: 'callCenter',
            connectionConfig: {
              apiKey: 'abc123',
              endpoint: 'https://api.callcenter.example.com',
              refreshInterval: 15
            },
            status: 'active',
            lastSyncAt: new Date('2025-04-14T10:30:00'),
            createdAt: new Date('2025-01-10'),
            updatedAt: new Date('2025-04-14')
          },
          {
            id: 2,
            name: 'Workforce Management',
            description: 'Staff scheduling and time tracking system',
            type: 'wfm',
            connectionConfig: {
              apiKey: 'xyz789',
              endpoint: 'https://api.wfm.example.com',
              refreshInterval: 30
            },
            status: 'active',
            lastSyncAt: new Date('2025-04-15T08:15:00'),
            createdAt: new Date('2025-02-05'),
            updatedAt: new Date('2025-04-15')
          }
        ];
        
        // Validate the API response data
        const validatedSources = validateSources(mockApiData);
        
        // Transform database models to view models
        const sourceViewModels = entitiesToViewModels(validatedSources, sourceToViewModel);
        setSources(sourceViewModels);
        
        // Process connection options
        const options = connectionOptionsMockData.map(option => ({
          ...option,
          icon: renderIcon(option.icon)
        }));
        setConnectionOptions(options);
      } catch (err) {
        console.error('Failed to fetch sources:', err);
        setError('Failed to load data sources. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchSources();
  }, []);

  return {
    sources,
    connectionOptions,
    loading,
    error
  };
}
