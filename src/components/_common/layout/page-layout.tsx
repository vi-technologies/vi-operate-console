'use client';

import React from 'react';
import { Button } from '@/components/_common/ui/button';

export interface PageLayoutProps {
  title: string;
  description?: string;
  actionButton?: {
    label: string;
    onClick?: () => void;
    href?: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';
  };
  children: React.ReactNode;
  className?: string;
}

export function PageLayout({
  title,
  description,
  actionButton,
  children,
  className = ''
}: PageLayoutProps) {
  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-1">{description}</p>
          )}
        </div>

        {actionButton && (
          <Button
            variant={actionButton.variant || 'default'}
            onClick={actionButton.onClick}
            {...(actionButton.href ? { asChild: true } : {})}
          >
            {actionButton.href ? (
              <a href={actionButton.href}>{actionButton.label}</a>
            ) : (
              actionButton.label
            )}
          </Button>
        )}
      </div>

      {children}
    </div>
  );
}