'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/_common/ui/button';

export type ActionButtonProps = {
  label: string;
  onClick?: () => void;
  href?: string;
  variant?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'outline'
    | 'ghost'
    | 'link';
};

export interface PageLayoutProps {
  title: string;
  description?: string;
  actionButton?: ActionButtonProps;
  children: React.ReactNode;
  className?: string;
}

export function PageLayout({
  title,
  description,
  actionButton,
  children,
  className = ''
}: PageLayoutProps) {
  const router = useRouter();

  const handleClick = () => {
    if (actionButton?.onClick) {
      actionButton.onClick();
    } else if (actionButton?.href) {
      router.push(actionButton.href);
    }
  };

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-1">{description}</p>
          )}
        </div>

        {actionButton && (
          <Button
            variant={actionButton.variant || 'default'}
            onClick={handleClick}
            {...(actionButton.href ? { asChild: true } : {})}
          >
            {actionButton.label}
            {/* {actionButton.href ? (
              <a href={actionButton.href}>{actionButton.label}</a>
            ) : (
              actionButton.label
            )} */}
          </Button>
        )}
      </div>

      {children}
    </div>
  );
}
