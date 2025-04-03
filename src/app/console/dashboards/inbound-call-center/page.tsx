'use client';

import { Metadata } from 'next';
import { PageLayout } from '@/components/layout/page-layout';
import { InboundDashboard } from '@/components/dashboards/inbound-call-center/inbound-dashboard';
import { getDashboardData } from '@/lib/services/dashboard-service';

// Metadata is defined in metadata.ts

export default function InboundCallCenterPage() {
  return (
    <PageLayout
      title="Labor Forecast"
      actionButton={{
        label: "Generate New Forecast",
        onClick: () => {}
      }}
    >
      <InboundDashboard />
    </PageLayout>
  );
}