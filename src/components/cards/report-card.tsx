'use client';

import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/_common/ui/card';
import { Badge } from '@/components/_common/ui/badge';
import { Button } from '@/components/_common/ui/button';
import { Download } from 'lucide-react';

export interface ReportCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  badges?: string[];
  lastUpdated?: string;
  onViewReport?: () => void;
  onExport?: () => void;
  className?: string;
}

export function ReportCard({
  title,
  description,
  icon,
  badges = [],
  lastUpdated,
  onViewReport,
  onExport,
  className = ''
}: ReportCardProps) {
  return (
    <Card className={`hover:shadow-md transition-all ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div>
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          {badges.length > 0 && (
            <div className="mt-1 flex gap-2">
              {badges.map((badge, index) => (
                <Badge key={index} variant="outline">{badge}</Badge>
              ))}
            </div>
          )}
        </div>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent className="pb-4">
        <div className="text-sm text-muted-foreground mb-2">
          {description}
        </div>
        {lastUpdated && (
          <div className="flex justify-between items-center text-xs text-muted-foreground mt-3">
            <div>Last updated: {lastUpdated}</div>
            {onExport && (
              <div
                className="flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors"
                onClick={onExport}
              >
                <Download className="h-3 w-3" />
                <span>Export</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
      {onViewReport && (
        <CardFooter>
          <Button variant="link" size="sm" className="text-sm p-0" onClick={onViewReport}>
            View Report
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}