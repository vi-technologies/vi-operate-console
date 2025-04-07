'use client';

import { Metadata } from 'next';
import { Page } from '@/components/_common/layout/page';
import { InboundDashboard } from '@/app/console/dashboards/inbound-call-center/inbound-dashboard';
import { getDashboardData } from '@/lib/services/dashboard-service';

// Metadata is defined in metadata.ts

export default function InboundCallCenterPage() {
  return (
    <Page
      title="Labor Forecast"
      actionButton={{
        label: 'Generate New Forecast',
        onClick: () => {}
      }}
    >
      <InboundDashboard />
    </Page>
  );
}
