'use client';

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/_common/ui/card';
import { Button } from '@/components/_common/ui/button';
import {
  Gauge,
  LineChart,
  Users,
  Phone,
  PhoneOutgoing,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { DashboardCardList } from '@/app/console/dashboards/list';
import { getDashboardSummary } from '@/lib/services/dashboard-service';
import { PageLayout } from '@/components/_common/layout/page-layout';
import { Page } from '@/components/_common/layout';

// Metadata is defined in metadata.ts

export default function DashboardsPage() {
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        const data = await getDashboardSummary();
        if (isMounted) {
          setDashboardData(data);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        if (isMounted) {
          // Set default data even if there's an error to prevent infinite loading
          setDashboardData({ dashboards: [], recentReports: [] });
        }
      }
    };

    fetchData();
    
    // Set a fallback timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (isMounted && !dashboardData) {
        setDashboardData({ dashboards: [], recentReports: [] });
      }
    }, 3000);
    
    // Cleanup function to prevent memory leaks and state updates on unmounted components
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  if (!dashboardData) {
    return <Page title="Dashboards">Loading dashboards...</Page>;
  }

  // Convert the dashboards data to the format expected by DashboardCardList
  const dashboardCards = (dashboardData.dashboards || []).map(
    (dashboard: any) => {
      const statusVariantMap: Record<
        string,
        { variant: string; className: string }
      > = {
        active: {
          variant: 'outline',
          className: 'bg-green-50 text-green-700 border-green-200'
        },
        development: {
          variant: 'outline',
          className: 'bg-amber-50 text-amber-700 border-amber-200'
        },
        inactive: {
          variant: 'outline',
          className: 'bg-gray-50 text-gray-700 border-gray-200'
        }
      };

      const iconMap: Record<string, React.ReactNode> = {
        'inbound-call-center': <Phone className="h-5 w-5" />,
        'outbound-call-center': <PhoneOutgoing className="h-5 w-5" />,
        'agent-performance': <Users className="h-5 w-5" />,
        'workforce-management': <Calendar className="h-5 w-5" />,
        'quality-monitoring': <Gauge className="h-5 w-5" />
      };

      const statusBadge = dashboard.status
        ? {
            text:
              dashboard.status === 'active'
                ? 'Active'
                : dashboard.status === 'development'
                  ? 'In Development'
                  : 'Inactive',
            ...statusVariantMap[dashboard.status]
          }
        : undefined;

      const badgeObjects = [
        ...(dashboard.badges || []).map((badge: string) => ({
          text: badge,
          variant: 'outline' as const
        })),
        ...(statusBadge ? [statusBadge] : [])
      ];

      return {
        title: dashboard.title,
        description: dashboard.description,
        icon: iconMap[dashboard.id] || undefined,
        badges: badgeObjects,
        metrics: dashboard.metrics,
        statusIndicator: dashboard.trend
          ? {
              icon: <TrendingUp className="h-3 w-3 mr-1 text-green-500" />,
              text: (
                <div className="flex items-center">
                  <span
                    className={`text-${dashboard.trend.direction === 'up' ? 'green' : 'red'}-500 font-medium mr-1`}
                  >
                    {dashboard.trend.direction === 'up' ? '↑' : '↓'}{' '}
                    {dashboard.trend.value}
                  </span>
                  <span>{dashboard.trend.text}</span>
                </div>
              )
            }
          : dashboard.lastUpdated
            ? {
                icon: <Calendar className="h-3 w-3 mr-1" />,
                text: `Last updated ${dashboard.lastUpdated}`
              }
            : undefined,
        href: `/console/dashboards/${dashboard.id}`
      };
    }
  );

  // Format recent reports
  const recentReports = dashboardData?.recentReports || [];

  return (
    <Page
      title="Dashboards"
      actionButton={{
        label: 'Create Dashboard',
        onClick: () => console.log('Create dashboard clicked')
      }}
    >
      <DashboardCardList
        cards={dashboardCards}
        showCreateCard={true}
        createCardProps={{
          title: 'Create New Dashboard',
          description:
            'Build a custom dashboard to track specific metrics and KPIs for your call center operations'
        }}
      />

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Recent Reports</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentReports.map((report: any, index: number) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  {report.title}
                </CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm">{report.description}</div>
                <div className="mt-2 text-xs text-muted-foreground">
                  Last updated: {report.lastUpdated}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="link" size="sm" className="text-sm p-0">
                  View Report
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Page>
  );
}
