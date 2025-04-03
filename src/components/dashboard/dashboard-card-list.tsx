'use client';

import React from 'react';
import { DashboardCard, DashboardCardProps } from './dashboard-card';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/_common/ui/card';
import { Button } from '@/components/_common/ui/button';
import { Plus } from 'lucide-react';

export interface CreateDashboardCardProps {
  title: string;
  description: string;
  onClick?: () => void;
}

export function CreateDashboardCard({ title, description, onClick }: CreateDashboardCardProps) {
  return (
    <Card className="border-dashed border-2 cursor-pointer hover:shadow-md transition-all flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <Plus className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="pb-4 flex-grow">
        <div className="text-sm text-muted-foreground">
          {description}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" onClick={onClick}>
          <Plus className="h-4 w-4 mr-2" /> Create Dashboard
        </Button>
      </CardFooter>
    </Card>
  );
}

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
    <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-${columns} ${className}`}>
      {cards.map((card, index) => (
        <DashboardCard key={index} {...card} />
      ))}

      {showCreateCard && createCardProps && (
        <CreateDashboardCard {...createCardProps} />
      )}
    </div>
  );
}