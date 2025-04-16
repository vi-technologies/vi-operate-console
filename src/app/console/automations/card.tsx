'use client';

import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/_common/ui/card';
import { AutomationCardProps } from '@/types/automation';

export function AutomationCard({
  title,
  description,
  icon,
  additionalInfo,
  onClick,
  className = ''
}: AutomationCardProps) {
  return (
    <Card
      className={`${onClick ? 'cursor-pointer hover:shadow-md transition-all' : ''} ${className}`}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-sm">{description}</div>
        {additionalInfo && (
          <div className="mt-2 text-xs text-muted-foreground">{additionalInfo}</div>
        )}
      </CardContent>
    </Card>
  );
}