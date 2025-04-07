import BigButtonTabs from '@/components/_common/ux/tabs/big-button-tabs';
import { useAutomationTabs } from '@/hooks/useAutomations';

export default function AutomationTabs() {
  const { tabs } = useAutomationTabs();

  return <BigButtonTabs tabs={tabs} />;
}
