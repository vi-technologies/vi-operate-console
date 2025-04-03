'use client';

import { useRouter } from 'next/navigation';
import { Flower } from 'lucide-react';
import useWorkflows from '@/hooks/useWorkflows';
import { mapCardIcon } from './mapCardIcon';
import { CardIcon } from '@/components/universal/card-icon';

export default function Workflows() {
  const router = useRouter();
  const { workflows } = useWorkflows();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {workflows.map(mapCardIcon(<Flower />))}
      <CardIcon
        title="Create New Workflow"
        icon={<Flower />}
        onClick={() => router.push('/console/automations/create')}
        className="border-dashed border-2 cursor-pointer hover:shadow-md transition-all"
      >
        Build a custom workflow to automate your processes
      </CardIcon>
    </div>
  );
}
