import { actionButton } from './artifacts';
import { Metadata } from 'next';
import { Page } from '@/components/_common/layout';
import SourcesPageClient from './page-client';

export const metadata: Metadata = {
  title: 'Data Sources',
  description: 'Add, manage and monitor your data source connections'
};

export default function SourcesPage() {
  return (
    <Page
      title="Add A New Source"
      actionButton={actionButton}
      variant="container"
    >
      <SourcesPageClient />
    </Page>
  );
}
