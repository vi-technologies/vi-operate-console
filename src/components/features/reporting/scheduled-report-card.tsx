'use client';

import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';

export interface ScheduledReportCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  nextDelivery: string;
  frequency: string;
  className?: string;
}

export function ScheduledReportCard({
  title,
  description,
  icon,
  nextDelivery,
  frequency,
  className = ''
}: ScheduledReportCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-sm">{description}</div>
        <div className="mt-2 text-xs text-muted-foreground flex justify-between">
          <div>Next delivery: {nextDelivery}</div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{frequency}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}