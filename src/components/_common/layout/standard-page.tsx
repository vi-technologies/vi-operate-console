import React from 'react';
import { PageLayout } from '@/components/_common/layout/page-layout';

export interface StandardPageProps {
  title: string;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
  children: React.ReactNode;
}

export function StandardPage({ title, actionButton, children }: StandardPageProps) {
  return (
    <PageLayout title={title} actionButton={actionButton}>
      <div className="container mx-auto px-4 py-6">
        {children}
      </div>
    </PageLayout>
  );
}
