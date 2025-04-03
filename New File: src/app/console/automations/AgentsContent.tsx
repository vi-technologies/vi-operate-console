'use client';

import { Cpu } from 'lucide-react';
import useAgents from '@/hooks/useAgents';
import { mapCardIcon } from './mapCardIcon';
import { CardIcon } from '@/components/universal/card-icon';

export default function AgentsContent() {
  const { agents } = useAgents();
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {agents.map(mapCardIcon(<Cpu />))}
    </div>
  );
}
