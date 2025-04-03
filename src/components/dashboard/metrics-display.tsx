'use client';

import React from 'react';

export interface MetricProps {
  label: string;
  value: string | number;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value?: string | number;
  };
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export interface MetricsDisplayProps {
  metrics: MetricProps[];
  columns?: 1 | 2 | 3 | 4;
  className?: string;
  containerClassName?: string;
}

export function MetricItem({ label, value, trend, size = 'md', className = '' }: MetricProps) {
  const sizeClasses = {
    sm: {
      container: 'p-1.5',
      label: 'text-xs',
      value: 'text-base font-medium',
      trend: 'text-xs'
    },
    md: {
      container: 'p-2',
      label: 'text-xs',
      value: 'text-lg font-medium',
      trend: 'text-sm'
    },
    lg: {
      container: 'p-3',
      label: 'text-sm',
      value: 'text-xl font-semibold',
      trend: 'text-sm'
    }
  };

  const trendColor = trend ? {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: 'text-gray-500'
  }[trend.direction] : '';

  const classes = sizeClasses[size];

  return (
    <div className={`bg-muted rounded ${classes.container} text-center ${className}`}>
      <div className={`text-muted-foreground ${classes.label}`}>{label}</div>
      <div className={classes.value}>
        {value}
        {trend && trend.value && (
          <span className={`ml-2 ${trendColor} ${classes.trend}`}>
            {trend.direction === 'up' ? '↑' : trend.direction === 'down' ? '↓' : '→'} 
            {trend.value}
          </span>
        )}
      </div>
    </div>
  );
}

export function MetricsDisplay({ 
  metrics, 
  columns = 3,
  className = '',
  containerClassName = '' 
}: MetricsDisplayProps) {
  return (
    <div className={`grid grid-cols-${columns} gap-2 ${containerClassName}`}>
      {metrics.map((metric, index) => (
        <MetricItem 
          key={index} 
          label={metric.label} 
          value={metric.value} 
          trend={metric.trend}
          size={metric.size}
          className={className}
        />
      ))}
    </div>
  );
}