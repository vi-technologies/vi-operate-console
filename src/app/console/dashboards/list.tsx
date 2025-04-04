'use client';

import React from 'react';
import {
  CreateDashboardCard,
  CreateDashboardCardProps,
  DashboardCard,
  DashboardCardProps
} from './card';

export interface DashboardCardListProps {
  cards: DashboardCardProps[];
  className?: string;
  showCreateCard?: boolean;
  createCardProps?: CreateDashboardCardProps;
  columns?: 1 | 2 | 3 | 4;
}

export function DashboardCardList({
  cards,
  className = '',
  showCreateCard = false,
  createCardProps,
  columns = 3
}: DashboardCardListProps) {
  return (
    <div
      className={`grid gap-6 md:grid-cols-2 lg:grid-cols-${columns} ${className}`}
    >
      {cards.map((card, index) => (
        <DashboardCard key={index} {...card} />
      ))}

      {showCreateCard && createCardProps && (
        <CreateDashboardCard {...createCardProps} />
      )}
    </div>
  );
}
