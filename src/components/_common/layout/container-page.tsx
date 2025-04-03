import React from 'react';
import { Page } from '@/components/_common/layout/page';

export interface StandardPageProps {
  title: string;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
  children: React.ReactNode;
}

export function ContainerPage({ title, actionButton, children }: StandardPageProps) {
  return (
    <Page title={title} actionButton={actionButton}>
      <div className="container mx-auto px-0 py-6">
        {children}
      </div>
    </Page>
  );
}
