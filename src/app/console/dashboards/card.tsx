'use client';

import React from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/_common/ui/card';
import { Badge } from '@/components/_common/ui/badge';
import { Button } from '@/components/_common/ui/button';
import { Plus } from 'lucide-react';

export interface CreateDashboardCardProps {
  title: string;
  description: string;
  onClick?: () => void;
}

export interface DashboardCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  badges?: Array<{
    text: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
    className?: string;
  }>;
  metrics?: Array<{
    label: string;
    value: string | number;
  }>;
  statusIndicator?: {
    icon?: React.ReactNode;
    text: string | React.ReactNode;
    className?: string;
  };
  footer?: React.ReactNode;
  href?: string;
  className?: string;
}

export function CreateDashboardCard({
  title,
  description,
  onClick
}: CreateDashboardCardProps) {
  return (
    <Card className="border-dashed border-2 cursor-pointer hover:shadow-md transition-all flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <Plus className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="pb-4 grow">
        <div className="text-sm text-muted-foreground">{description}</div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={onClick}
        >
          <Plus className="h-4 w-4 mr-2" /> Create Dashboard
        </Button>
      </CardFooter>
    </Card>
  );
}

export function DashboardCard({
  title,
  description,
  icon,
  badges,
  metrics,
  statusIndicator,
  footer,
  href,
  className = ''
}: DashboardCardProps) {
  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (href) {
      return (
        <Link href={href} className="block">
          <Card
            className={`hover:shadow-md transition-all h-full ${className}`}
          >
            {children}
          </Card>
        </Link>
      );
    }
    return <Card className={`h-full ${className}`}>{children}</Card>;
  };

  return (
    <CardWrapper>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div>
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          {badges && badges.length > 0 && (
            <div className="flex gap-2 mt-1">
              {badges.map((badge, index) => (
                <Badge
                  key={index}
                  variant={badge.variant || 'outline'}
                  className={badge.className}
                >
                  {badge.text}
                </Badge>
              ))}
            </div>
          )}
        </div>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent className="pb-4">
        {description && (
          <div className="text-sm text-muted-foreground mb-3">
            {description}
          </div>
        )}
        {metrics && metrics.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-muted rounded p-2 text-center">
                <div className="text-xs text-muted-foreground">
                  {metric.label}
                </div>
                <div className="text-lg font-medium">{metric.value}</div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      {(footer || statusIndicator) && (
        <CardFooter>
          {statusIndicator ? (
            <div
              className={`flex items-center text-xs text-muted-foreground ${statusIndicator.className || ''}`}
            >
              {statusIndicator.icon && (
                <span className="mr-1">{statusIndicator.icon}</span>
              )}
              <span>{statusIndicator.text}</span>
            </div>
          ) : (
            footer
          )}
        </CardFooter>
      )}
    </CardWrapper>
  );
}
