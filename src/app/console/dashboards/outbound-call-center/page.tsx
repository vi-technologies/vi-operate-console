'use client';

import { Metadata } from 'next';
import { PageLayout } from '@/components/_common/layout/page-layout';
import { OutboundDashboard } from '@/components/dashboards/outbound-call-center/outbound-dashboard';
import { getDashboardData } from '@/lib/services/dashboard-service';

// Metadata is defined in metadata.ts

export default function OutboundCallCenterPage() {
  return (
    <PageLayout
      title="Outbound Campaign Performance"
      actionButton={{
        label: "Run New Campaign",
        onClick: () => { }
      }}
    >
      <OutboundDashboard />
    </PageLayout>
  );
}