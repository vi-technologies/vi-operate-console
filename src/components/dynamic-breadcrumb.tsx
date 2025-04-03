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
  'console': 'Dashboards',
  'reports': 'Reports',
  'automations': 'Automations',
  'archetypes': 'Archetypes',
  'sources': 'Sources',
  'inbound-call-center': 'Inbound Call Center',
  'outbound-call-center': 'Outbound Call Center',
  'agent-performance': 'Agent Performance',
  'workforce-management': 'Workforce Management',
  'quality-monitoring': 'Quality Monitoring',
  'customers': 'Customers'
};

export function DynamicBreadcrumb() {
  const pathname = usePathname();

  // Remove leading slash and split path segments
  // Ignore route groups like (dashboards)
  const pathSegments = pathname.split('/').filter(segment =>
    segment !== '' && !segment.startsWith('(') && !segment.endsWith(')')
  );

  // For root path, show only VI Operate > Console
  if (pathSegments.length === 0) {
    return (
      <Breadcrumb className="flex text-sm">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">VI Operate</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb className="flex items-center mb-2 text-sm">
      <BreadcrumbList>
        {/* Map each path segment to breadcrumb item */}
        {pathSegments.map((segment, index) => {
          const segmentPath = `/${pathSegments.slice(0, index + 1).join('/')}`;
          const isLastSegment = index === pathSegments.length - 1;
          const displayName = pathMap[segment] || segment.replace(/-/g, ' ');

          return (
            <React.Fragment key={segment}>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {isLastSegment ? (
                  <BreadcrumbPage className="capitalize">
                    {displayName}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={segmentPath} className="capitalize">
                      {displayName}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}