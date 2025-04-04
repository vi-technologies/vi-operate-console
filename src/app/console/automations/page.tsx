import { Page } from '@/common/layout';
import AutomationTabs from './tabs';
import actionButton from './action-button';

export default function AutomationsPage() {
  return (
    <Page title="Automations" actionButton={actionButton}>
      <AutomationTabs />
    </Page>
  );
}
