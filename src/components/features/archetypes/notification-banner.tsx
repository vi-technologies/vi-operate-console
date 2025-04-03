'use client';

import React from 'react';
import { Button } from '@/components/_common/ui/button';
import { Bell, RefreshCw } from 'lucide-react';

export interface NotificationBannerProps {
  message: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  variant?: 'info' | 'warning' | 'success';
  className?: string;
}

export function NotificationBanner({
  message,
  icon = <Bell />,
  actionLabel = 'Refresh',
  onAction,
  variant = 'info',
  className = ''
}: NotificationBannerProps) {
  const variantStyles = {
    info: 'bg-blue-50 border-l-4 border-blue-500',
    warning: 'bg-amber-50 border-l-4 border-amber-500',
    success: 'bg-green-50 border-l-4 border-green-500'
  };

  const iconStyles = {
    info: 'text-blue-500',
    warning: 'text-amber-500',
    success: 'text-green-500'
  };

  return (
    <div className={`${variantStyles[variant]} p-4 flex items-center justify-between mb-2 ${className}`}>
      <div className="flex items-center">
        <span className={`h-5 w-5 ${iconStyles[variant]} mr-2`}>{icon}</span>
        <span>{message}</span>
      </div>
      {onAction && (
        <Button variant="ghost" size="sm" className="ml-2" onClick={onAction}>
          <RefreshCw className="h-4 w-4 mr-1" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
}