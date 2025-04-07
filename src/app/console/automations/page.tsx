import { Metadata } from 'next';
import { Page } from '@/components/_common/layout';
import { actionButton } from './artifacts';
import AutomationTabs from './tabs';

export const metadata: Metadata = {
  title: 'Automations',
  description: 'VI Operate Console Automations'
};

export default function AutomationsPage() {
  return (
    <Page title="Automations" actionButton={actionButton} variant="container">
      <AutomationTabs />
    </Page>
  );
}
