'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/_common/ui/breadcrumb';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

// Map paths to human-readable names
const pathMap: Record<string, string> = {
  '': 'Dashboard',
  console: 'Dashboards',
  reports: 'Reports',
  automations: 'Automations',
  archetypes: 'Archetypes',
  sources: 'Sources',
  'inbound-call-center': 'Inbound Call Center',
  'outbound-call-center': 'Outbound Call Center',
  'agent-performance': 'Agent Performance',
  'workforce-management': 'Workforce Management',
  'quality-monitoring': 'Quality Monitoring',
  customers: 'Customers'
};

export function DynamicBreadcrumb() {
  const pathname = usePathname();
  const rawSegments = pathname
    .split('/')
    .filter(
      (segment) =>
        segment !== '' && !segment.startsWith('(') && !segment.endsWith(')')
    );

  // Base breadcrumbs: VI Operate > Console
  const baseCrumbs = [
    { name: 'VI Operate', href: '/' },
    { name: 'Console', href: '/console' }
  ];

  let additionalSegments = [...rawSegments];
  if (additionalSegments[0] === 'console') {
    additionalSegments = additionalSegments.slice(1);
  }

  const crumbs = [...baseCrumbs];
  let accumulatedPath = '/console';
  additionalSegments.forEach((segment) => {
    accumulatedPath += `/${segment}`;
    const displayName = pathMap[segment] || segment.replace(/-/g, ' ');
    crumbs.push({ name: displayName, href: accumulatedPath });
  });

  return (
    <Breadcrumb className="flex items-center text-sm">
      <BreadcrumbList>
        {crumbs.map((crumb, index) => (
          <React.Fragment key={crumb.href}>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {index === crumbs.length - 1 ? (
                <BreadcrumbPage className="capitalize">
                  {crumb.name}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={crumb.href} className="capitalize">
                    {crumb.name}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
