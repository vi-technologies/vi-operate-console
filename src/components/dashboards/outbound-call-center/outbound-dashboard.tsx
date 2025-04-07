'use client';

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/_common/ui/card';
import {
  LineChart as LineChartIcon,
  BarChart as BarChartIcon,
  ArrowRight,
  Users,
  Target
} from 'lucide-react';
import { Button } from '@/components/_common/ui/button';
import { LineChart, BarChart } from '@/components/charts';
import { MetricItem } from '@/components/dashboards/metrics-display';
import { DashboardData } from '@/lib/services/dashboard-service';
import { outboundCallCenterMockData } from '@/lib/mock-data';

interface OutboundDashboardProps {
  initialData?: DashboardData;
}

export function OutboundDashboard({ initialData }: OutboundDashboardProps) {
  const [dashboardData, setDashboardData] = useState<DashboardData | undefined>(initialData);
  const [isLoading, setIsLoading] = useState(!initialData);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { getDashboardData } = await import('@/lib/services/dashboard-service');
        const fetchedData = await getDashboardData('outbound-call-center');
        setDashboardData(fetchedData);
      } catch (error) {
        console.error('Error fetching outbound dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!initialData) {
      fetchDashboardData();
    }
  }, [initialData]);

  if (isLoading) {
    return <div>Loading dashboard data...</div>;
  }

  const data = dashboardData || outboundCallCenterMockData;
  
  const { campaignPerformance, agentPerformance, metrics } = data;
  
  const calculatePercentChange = (current: number, previous: number) => {
    return ((current - previous) / previous * 100).toFixed(0);
  };

  const percentChange = {
    totalCalls: metrics?.previousMonth
      ? calculatePercentChange(metrics.totalCalls, metrics.previousMonth.totalCalls)
      : '12',
    appointments: metrics?.previousMonth
      ? calculatePercentChange(metrics.appointments, metrics.previousMonth.appointments)
      : '8',
    conversionRate: metrics?.previousMonth
      ? calculatePercentChange(metrics.conversionRate, metrics.previousMonth.conversionRate)
      : '-2',
    activeAgents: metrics?.previousMonth
      ? metrics.activeAgents - metrics.previousMonth.activeAgents
      : 2
  };

  return (
    <>
      {/* Campaign Performance Metrics */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Calls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {metrics.totalCalls.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              <span
                className={`text-${parseInt(percentChange.totalCalls) >= 0 ? 'green' : 'red'}-500`}
              >
                {parseInt(percentChange.totalCalls) >= 0 ? '↑' : '↓'}{' '}
                {Math.abs(parseInt(percentChange.totalCalls))}%
              </span>{' '}
              from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{metrics.appointments}</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span
                className={`text-${parseInt(percentChange.appointments) >= 0 ? 'green' : 'red'}-500`}
              >
                {parseInt(percentChange.appointments) >= 0 ? '↑' : '↓'}{' '}
                {Math.abs(parseInt(percentChange.appointments))}%
              </span>{' '}
              from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{metrics.conversionRate}%</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span
                className={`text-${parseInt(percentChange.conversionRate) >= 0 ? 'green' : 'red'}-500`}
              >
                {parseInt(percentChange.conversionRate) >= 0 ? '↑' : '↓'}{' '}
                {Math.abs(parseInt(percentChange.conversionRate))}%
              </span>{' '}
              from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Agents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{metrics.activeAgents}</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span
                className={`text-${percentChange.activeAgents >= 0 ? 'green' : 'red'}-500`}
              >
                {percentChange.activeAgents >= 0 ? '↑' : '↓'}{' '}
                {Math.abs(percentChange.activeAgents)}
              </span>{' '}
              from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Performance Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-lg font-medium">
            Campaign Performance Trend
          </CardTitle>
          <LineChartIcon className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <LineChart
            data={campaignPerformance}
            lines={[
              { dataKey: 'Appointments', stroke: '#1890ff' },
              { dataKey: 'Callbacks', stroke: '#faad14' },
              { dataKey: 'Conversions', stroke: '#52c41a' }
            ]}
            height={300}
          />
        </CardContent>
      </Card>

      {/* Agent Performance */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg font-medium">
              Agent Performance
            </CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <BarChart
              data={agentPerformance}
              bars={[{ dataKey: 'Calls', fill: '#8884d8' }]}
              height={300}
            />
            <Button
              variant="link"
              size="sm"
              className="mt-4 text-sm flex items-center"
            >
              View Detailed Agent Metrics{' '}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg font-medium">
              Conversion by Agent
            </CardTitle>
            <Target className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <BarChart
              data={agentPerformance}
              bars={[
                {
                  dataKey: 'Rate',
                  fill: '#52c41a',
                  name: 'Conversion Rate (%)'
                }
              ]}
              height={300}
            />
            <div className="mt-4 text-sm flex justify-between">
              <div>
                <span className="text-xs text-muted-foreground">
                  Team Average
                </span>
                <div className="text-lg font-medium">14.6%</div>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">
                  Top Performer
                </span>
                <div className="text-lg font-medium">Wilson (15.3%)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
