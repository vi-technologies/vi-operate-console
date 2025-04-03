'use client';

import { Cog } from 'lucide-react';
import { CardIcon } from '@/components/universal/card-icon';

export default function ApiContent() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <CardIcon
        title="Forecast Data API"
        icon={<Cog />}
        children="Exposes forecast data to external systems. Endpoint: /api/forecasts"
      />
      <CardIcon
        title="Schedule API"
        icon={<Cog />}
        children="Allows external systems to access and update schedules. Endpoint: /api/schedules"
      />
      <CardIcon
        title="Metrics Webhook"
        icon={<Cog />}
        children="Pushes real-time metrics to external dashboards. Webhook: Configurable"
      />
    </div>
  );
}
