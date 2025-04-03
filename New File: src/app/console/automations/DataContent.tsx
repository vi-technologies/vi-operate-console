'use client';

import { Link2 } from 'lucide-react';
import { CardIcon } from '@/components/universal/card-icon';

export default function DataContent() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <CardIcon title="Real-Time Call Center Metrics" icon={<Link2 />}>
        Live stream of call center performance metrics
        <div className="mt-2 text-xs text-muted-foreground">Status: Active</div>
      </CardIcon>
      <CardIcon title="Epic Scheduling Integration" icon={<Link2 />}>
        Continuous sync with Epic Scheduling System
        <div className="mt-2 text-xs text-muted-foreground">Status: Active</div>
      </CardIcon>
      <CardIcon title="Agent Activity Monitor" icon={<Link2 />}>
        Real-time monitoring of agent activity and status
        <div className="mt-2 text-xs text-muted-foreground">Status: Paused</div>
      </CardIcon>
    </div>
  );
}
