import React from 'react';
import { PageLayout } from '@/components/_common/layout/page-layout';

export interface StandardPageProps {
  title: string;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
  variant?: 'default' | 'container';
  children: React.ReactNode;
}

export function Page({ title, actionButton, children, variant }: StandardPageProps) {
  return (
    <PageLayout title={title} actionButton={actionButton}>
      {variant === 'container' ? (
        <div className="container mx-auto px-0 py-6">
          {children}
        </div>
      ) : children}
    </PageLayout>
  )
}
