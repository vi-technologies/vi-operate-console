import { Metadata } from 'next';
import { Page } from '@/components/_common/layout';
import { actionButton } from './artifacts';
import ReportTabs from './tabs';

export const metadata: Metadata = {
  title: 'Reports',
  description: 'VI Operate Console Reports'
};

export default function ReportsPage() {
  return (
    <Page title="Reports" actionButton={actionButton} variant="container">
      <ReportTabs />
    </Page>
  );
}
