import React, { cloneElement, isValidElement } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/_common/ui/card';

export interface AutomationCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function CardIcon({
  title,
  icon,
  children: children,
  onClick,
  className
}: AutomationCardProps) {
  const processedIcon = isValidElement(icon)
    ? cloneElement(icon as React.ReactElement<{ className?: string }>, {
        className:
          // TODO - simplify this logic
          `h-4 w-4 text-muted-foreground ${(icon as React.ReactElement<{ className?: string }>)?.props?.className || ''}`.trim()
      })
    : icon;

  return (
    <Card onClick={onClick} className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {processedIcon}
      </CardHeader>
      <CardContent className="text-sm">{children}</CardContent>
    </Card>
  );
}

export default CardIcon;
