'use client';

import { Calendar } from 'lucide-react';
import { CardIcon } from '@/components/universal/card-icon';

export default function CronContent() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <CardIcon
        title="Daily Forecast Update"
        icon={<Calendar />}
        children="Runs at 1 AM daily to update forecasts. Schedule: 0 1 * * *"
      />
      <CardIcon
        title="Weekly Schedule Generation"
        icon={<Calendar />}
        children="Runs every Monday at 2 AM to create weekly schedules. Schedule: 0 2 * * 1"
      />
      <CardIcon
        title="Data Cleanup Job"
        icon={<Calendar />}
        children="Archives old data and cleans up temporary storage. Schedule: 0 3 * * 0"
      />
    </div>
  );
}
