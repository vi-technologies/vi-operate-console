'use client';

import { Metadata } from 'next';
import { StandardPage } from '@/components/common/StandardPage';
import { InboundDashboard } from '@/components/dashboards/inbound-call-center/inbound-dashboard';
import { getDashboardData } from '@/lib/services/dashboard-service';

// Metadata is defined in metadata.ts

export default function InboundCallCenterPage() {
  return (
    <StandardPage
      title="Labor Forecast"
      actionButton={{
        label: "Generate New Forecast",
        onClick: () => {}
      }}
    >
      <InboundDashboard />
    </StandardPage>
  );
}
