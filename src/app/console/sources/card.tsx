'use client';

import React from 'react';
import { Card, CardContent } from '@/components/_common/ui/card';
import { Badge } from '@/components/_common/ui/badge';
import { Check, Clock, ChevronRight, ChevronDown } from 'lucide-react';

export interface SourceConnectionCardProps {
  id: number;
  name: string;
  type: string;
  status: 'healthy' | 'profiling' | 'error';
  icon: React.ReactNode;
  iconBg: string;
  datasets: number;
  models: number;
  expandedId: number | null;
  onToggleExpand: (id: number) => void;
  children?: React.ReactNode; // For expanded content
}

export function SourceConnectionCard({
  id,
  name,
  type,
  status,
  icon,
  iconBg,
  datasets,
  models,
  expandedId,
  onToggleExpand,
  children
}: SourceConnectionCardProps) {
  const isExpanded = expandedId === id;

  return (
    <Card className="hover:shadow-md transition-all overflow-hidden">
      <div
        className="flex items-center p-4 cursor-pointer"
        onClick={() => onToggleExpand(id)}
      >
        <div className={`h-10 w-10 rounded-full ${iconBg} flex items-center justify-center mr-4`}>
          {icon}
        </div>
        <div className="grow">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">{name}</h3>
              <div className="flex items-center mt-1">
                <Badge variant="outline" className="text-xs mr-2">{type}</Badge>
                {status === 'healthy' ? (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs px-2 py-0">
                    <Check className="h-3 w-3 mr-1" />
                    Healthy
                  </Badge>
                ) : status === 'profiling' ? (
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 text-xs px-2 py-0">
                    <Clock className="h-3 w-3 mr-1" />
                    Profiling
                  </Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-800 hover:bg-red-100 text-xs px-2 py-0">
                    <Clock className="h-3 w-3 mr-1" />
                    Error
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Datasets</div>
                <div className="font-medium">{datasets}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Models</div>
                <div className="font-medium">{models}</div>
              </div>
              {isExpanded ? (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div className="border-t px-4 py-4 bg-muted/20">
          {children}
        </div>
      )}
    </Card>
  );
}