'use client';

import { SourceConnectionTile } from './source-connection-tile';
import { useSources } from '@/hooks';

export default function ConnectionOptions() {
  const { connectionOptions } = useSources();

  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      {connectionOptions.map((option, index) => (
        <SourceConnectionTile
          key={index}
          name={option.name}
          icon={option.icon}
          iconBg={option.iconBg}
          className={option.hoverBorder}
          onClick={() => console.log(`Selected ${option.name}`)}
        />
      ))}
    </div>
  );
}
