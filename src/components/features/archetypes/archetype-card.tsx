'use client';

import React from 'react';
import { Card } from '@/components/_common/ui/card';
import { Button } from '@/components/_common/ui/button';
import { Database, Clock, ChevronDown, ChevronRight } from 'lucide-react';

export interface ArchetypeDetailsProps {
  dataTypes: string[];
  dependencies: string[];
  frequency: string;
}

export interface ArchetypeCardProps {
  id: number;
  name: string;
  description: string;
  status: string;
  statusColor: string;
  tablesCount: number;
  lastUpdated: string;
  icon: React.ReactNode;
  details: ArchetypeDetailsProps;
  expandedId: number | null;
  onToggleExpand: (id: number) => void;
}

export function ArchetypeCard({
  id,
  name,
  description,
  status,
  statusColor,
  tablesCount,
  lastUpdated,
  icon,
  details,
  expandedId,
  onToggleExpand
}: ArchetypeCardProps) {
  const isExpanded = expandedId === id;

  return (
    <Card className="overflow-hidden">
      <div
        className="p-6 cursor-pointer"
        onClick={() => onToggleExpand(id)}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center">
              <h3 className="text-lg font-medium">{name}</h3>
              <div className={`ml-3 ${statusColor} text-white text-xs px-2 py-0.5 rounded-full`}>
                {status}
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {description}
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-semibold">{tablesCount}</div>
              <div className="text-xs text-gray-500">Tables</div>
            </div>
            <div className="text-sm text-gray-500 min-w-[80px] text-right">
              Updated {lastUpdated}
            </div>
            {isExpanded ?
              <ChevronDown className="h-5 w-5 text-gray-400" /> :
              <ChevronRight className="h-5 w-5 text-gray-400" />
            }
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="px-6 pb-6 pt-2 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Data Tables</h4>
              <ul className="text-sm space-y-1">
                {details.dataTypes.map((dataType, index) => (
                  <li key={index} className="flex items-center">
                    <Database className="h-3.5 w-3.5 text-gray-400 mr-2" />
                    {dataType}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Dependencies</h4>
              <div className="text-sm mb-4">
                {details.dependencies.join(', ')}
              </div>

              <h4 className="font-medium mb-2">Update Frequency</h4>
              <div className="text-sm flex items-center">
                <Clock className="h-3.5 w-3.5 text-gray-400 mr-2" />
                {details.frequency}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
            <Button variant="outline" size="sm" className="mr-2">Edit</Button>
            {status === 'Paused' ? (
              <Button size="sm">Resume</Button>
            ) : (
              <Button size="sm" variant="outline" className="bg-gray-50">Pause</Button>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}