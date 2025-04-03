'use client';

import { Metadata } from 'next';
import { Page } from '@/components/_common/layout/page';
import { OutboundDashboard } from '@/components/dashboards/outbound-call-center/outbound-dashboard';
import { getDashboardData } from '@/lib/services/dashboard-service';

// Metadata is defined in metadata.ts

export default function OutboundCallCenterPage() {
  return (
    <Page
      title="Outbound Campaign Performance"
      actionButton={{
        label: "Run New Campaign",
        onClick: () => { }
      }}
    >
      <OutboundDashboard />
    </Page>
  );
}