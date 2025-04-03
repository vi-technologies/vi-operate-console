'use client';

import { Layers } from 'lucide-react';
import { CardIcon } from '@/components/universal/card-icon';

export default function EventsContent() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <CardIcon title="Agent Knowledge Assistance" icon={<Layers />}>
        Triggered when agents need knowledge support
        <div className="mt-2 text-xs text-muted-foreground">
          Trigger: Chat/Voice Pattern Match
        </div>
      </CardIcon>
      <CardIcon title="Call Volume Spike Alert" icon={<Layers />}>
        Triggered when call volume exceeds forecast by 20%
        <div className="mt-2 text-xs text-muted-foreground">
          Trigger: Metric Threshold
        </div>
      </CardIcon>
      <CardIcon title="Schedule Conflict Resolution" icon={<Layers />}>
        Triggered when schedule conflicts are detected
        <div className="mt-2 text-xs text-muted-foreground">
          Trigger: Data Validation Error
        </div>
      </CardIcon>
    </div>
  );
}
