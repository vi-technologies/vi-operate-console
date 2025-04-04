import BigButtonTabs from '@/components/tabs/big-button-tabs';
import { useReportTabs } from '@/hooks/useReports';

export default function ReportTabs() {
  const { tabs } = useReportTabs();

  return <BigButtonTabs tabs={tabs} />;
}