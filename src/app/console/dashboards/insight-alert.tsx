'use client';

import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/_common/ui/card';
import { Badge } from '@/components/_common/ui/badge';
import { Button } from '@/components/_common/ui/button';
import { InsightAlertProps } from '@/types/charts';

export function InsightAlert({
  title,
  message,
  icon,
  severity = 'warning',
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
    error: {
      border: 'border-red-500',
      bg: 'bg-red-50 dark:bg-red-950/10',
      title: 'text-red-800 dark:text-red-400',
      text: 'text-red-700 dark:text-red-300',
      badge: 'border-red-500 text-red-700 dark:text-red-400',
      primaryButton: 'bg-red-600 hover:bg-red-700 text-white',
      secondaryButton: 'border-red-500 text-red-700 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-950/50'
    },
    success: {
      border: 'border-green-500',
      bg: 'bg-green-50 dark:bg-green-950/10',
      title: 'text-green-800 dark:text-green-400',
      text: 'text-green-700 dark:text-green-300',
      badge: 'border-green-500 text-green-700 dark:text-green-400',
      primaryButton: 'bg-green-600 hover:bg-green-700 text-white',
      secondaryButton: 'border-green-500 text-green-700 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-950/50'
    }
  };

  const colors = colorMap[severity] || colorMap.warning;
  const badgeText = severity.charAt(0).toUpperCase() + severity.slice(1);

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