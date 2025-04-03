'use client';

import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface InsightAlertProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
  severity?: 'info' | 'warning' | 'critical';
  badgeText?: string;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
}

export function InsightAlert({
  title,
  message,
  icon,
  severity = 'warning',
  badgeText = 'Insight Alert',
  primaryActionLabel,
  secondaryActionLabel,
  onPrimaryAction,
  onSecondaryAction
}: InsightAlertProps) {
  const colorMap = {
    info: {
      border: 'border-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-950/10',
      title: 'text-blue-800 dark:text-blue-400',
      text: 'text-blue-700 dark:text-blue-300',
      badge: 'border-blue-500 text-blue-700 dark:text-blue-400',
      primaryButton: 'bg-blue-600 hover:bg-blue-700 text-white',
      secondaryButton: 'border-blue-500 text-blue-700 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-950/50'
    },
    warning: {
      border: 'border-amber-500',
      bg: 'bg-amber-50 dark:bg-amber-950/10',
      title: 'text-amber-800 dark:text-amber-400',
      text: 'text-amber-700 dark:text-amber-300',
      badge: 'border-amber-500 text-amber-700 dark:text-amber-400',
      primaryButton: 'bg-amber-600 hover:bg-amber-700 text-white',
      secondaryButton: 'border-amber-500 text-amber-700 hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-amber-950/50'
    },
    critical: {
      border: 'border-red-500',
      bg: 'bg-red-50 dark:bg-red-950/10',
      title: 'text-red-800 dark:text-red-400',
      text: 'text-red-700 dark:text-red-300',
      badge: 'border-red-500 text-red-700 dark:text-red-400',
      primaryButton: 'bg-red-600 hover:bg-red-700 text-white',
      secondaryButton: 'border-red-500 text-red-700 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-950/50'
    }
  };
  
  const colors = colorMap[severity];

  return (
    <Card className={`${colors.border} ${colors.bg}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className={`${colors.title} text-lg font-medium flex items-center gap-2`}>
          {icon && <span className="h-5 w-5">{icon}</span>}
          {title}
        </CardTitle>
        <Badge variant="outline" className={colors.badge}>
          {badgeText}
        </Badge>
      </CardHeader>
      <CardContent className="pb-3">
        <div className={`text-sm ${colors.text}`}>
          {message}
        </div>
      </CardContent>
      {(primaryActionLabel || secondaryActionLabel) && (
        <CardFooter className="flex justify-end gap-3 pt-0">
          {secondaryActionLabel && (
            <Button 
              variant="outline" 
              size="sm" 
              className={colors.secondaryButton}
              onClick={onSecondaryAction}
            >
              {secondaryActionLabel}
            </Button>
          )}
          {primaryActionLabel && (
            <Button 
              size="sm" 
              className={colors.primaryButton}
              onClick={onPrimaryAction}
            >
              {primaryActionLabel}
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}