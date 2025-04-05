'use client';

import React from 'react';
import { Card, CardContent, CardTitle } from '@/components/_common/ui/card';

export interface SourceConnectionTileProps {
  name: string;
  icon: React.ReactNode;
  iconBg: string;
  onClick?: () => void;
  className?: string;
}

export function SourceConnectionTile({
  name,
  icon,
  iconBg,
  onClick,
  className = ''
}: SourceConnectionTileProps) {
  return (
    <Card
      className={`hover:shadow-md transition-all cursor-pointer border-2 hover:border-${iconBg.replace('bg-', '')} ${className}`}
      onClick={onClick}
    >
      <CardContent className="flex flex-col items-center justify-center py-6">
        <div
          className={`h-24 w-24 rounded-full ${iconBg} flex items-center justify-center mb-3`}
        >
          {icon}
        </div>
        <CardTitle className="text-center text-sm font-medium">
          {name}
        </CardTitle>
      </CardContent>
    </Card>
  );
}
