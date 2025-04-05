import React from 'react';
import {
  ActionButtonProps,
  PageLayout
} from '@/components/_common/layout/page-layout';
import { Button } from '@/components/_common/ui/button';

export interface StandardPageProps {
  title: string;
  actionButton?: ActionButtonProps;
  variant?: 'default' | 'container' | 'full' | 'splash';
  children: React.ReactNode;
}

export function Page({
  title,
  actionButton,
  children,
  variant = 'default'
}: StandardPageProps) {
  // Splash variant - meant to be used with BackgroundComponent
  if (variant === 'splash') {
    return (
      <div className="w-full h-full">
        {children}
      </div>
    );
  }
  
  // Full variant - removes padding and lets content use full width
  if (variant === 'full') {
    return (
      <div className="w-full -m-4 sm:-mx-6 sm:py-0 md:-m-4">
        <div className="flex justify-between items-center p-4 border-b bg-background sticky top-0 z-10">
          <h1 className="text-3xl font-bold">{title}</h1>
          {actionButton && (
            <Button 
              variant={actionButton.variant || 'default'} 
              onClick={actionButton.onClick}
              {...(actionButton.href ? { asChild: true } : {})}
            >
              {actionButton.label}
            </Button>
          )}
        </div>
        <div className="w-full">
          {children}
        </div>
      </div>
    );
  }
  
  // Default and container variants - use the standard PageLayout
  return (
    <PageLayout title={title} actionButton={actionButton}>
      {variant === 'container' ? (
        <div className="container mx-auto px-0 py-6">{children}</div>
      ) : (
        children
      )}
    </PageLayout>
  );
}
