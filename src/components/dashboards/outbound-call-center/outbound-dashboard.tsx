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
import { MetricItem } from '@/components/dashboard/metrics-display';

interface OutboundDashboardProps {
  initialData?: {
    campaignPerformance?: any[];
    agentPerformance?: any[];
    metrics?: {
      totalCalls: number;
      appointments: number;
      conversionRate: number;
      activeAgents: number;
      previousMonth?: {
        totalCalls: number;
        appointments: number;
        conversionRate: number;
        activeAgents: number;
      }
    };
  }
}

export function OutboundDashboard({ initialData }: OutboundDashboardProps) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { getDashboardData } = await import('@/lib/services/dashboard-service');
        const dashboardData = await getDashboardData('outbound-call-center');
        setData(dashboardData);
      } catch (error) {
        console.error('Error fetching outbound dashboard data:', error);
      }
    };

    if (!initialData) {
      fetchData();
    }
  }, [initialData]);

  // If still loading data, show loading state
  if (!initialData && !data) {
    return <div>Loading dashboard data...</div>;
  }

  // Use data or fallback to mock data
  const campaignPerformance = data?.campaignPerformance || [
    { name: 'Week 1', Appointments: 45, Callbacks: 32, Conversions: 18 },
    { name: 'Week 2', Appointments: 52, Callbacks: 38, Conversions: 21 },
    { name: 'Week 3', Appointments: 49, Callbacks: 35, Conversions: 20 },
    { name: 'Week 4', Appointments: 58, Callbacks: 42, Conversions: 24 },
    { name: 'Week 5', Appointments: 63, Callbacks: 48, Conversions: 27 },
    { name: 'Week 6', Appointments: 59, Callbacks: 45, Conversions: 25 },
    { name: 'Week 7', Appointments: 64, Callbacks: 50, Conversions: 29 },
    { name: 'Week 8', Appointments: 68, Callbacks: 53, Conversions: 32 }
  ];

  const agentPerformance = data?.agentPerformance || [
    { name: 'Smith', Calls: 175, Conversions: 24, Rate: 13.7 },
    { name: 'Johnson', Calls: 210, Conversions: 32, Rate: 15.2 },
    { name: 'Williams', Calls: 190, Conversions: 27, Rate: 14.2 },
    { name: 'Jones', Calls: 160, Conversions: 22, Rate: 13.8 },
    { name: 'Brown', Calls: 205, Conversions: 30, Rate: 14.6 },
    { name: 'Davis', Calls: 195, Conversions: 28, Rate: 14.4 },
    { name: 'Miller', Calls: 180, Conversions: 25, Rate: 13.9 },
    { name: 'Wilson', Calls: 215, Conversions: 33, Rate: 15.3 }
  ];

  const metrics = data?.metrics || {
    totalCalls: 8452,
    appointments: 458,
    conversionRate: 14.6,
    activeAgents: 18,
    previousMonth: {
      totalCalls: 7546,
      appointments: 424,
      conversionRate: 14.9,
      activeAgents: 16
    }
  };

  // Calculate percent changes
  const percentChange = {
    totalCalls: metrics.previousMonth ?
      ((metrics.totalCalls - metrics.previousMonth.totalCalls) / metrics.previousMonth.totalCalls * 100).toFixed(0) :
      '12',
    appointments: metrics.previousMonth ?
      ((metrics.appointments - metrics.previousMonth.appointments) / metrics.previousMonth.appointments * 100).toFixed(0) :
      '8',
    conversionRate: metrics.previousMonth ?
      ((metrics.conversionRate - metrics.previousMonth.conversionRate) / metrics.previousMonth.conversionRate * 100).toFixed(0) :
      '-2',
    activeAgents: metrics.previousMonth ?
      metrics.activeAgents - metrics.previousMonth.activeAgents :
      2
  };

  return (
    <>
      {/* Campaign Performance Metrics */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{metrics.totalCalls.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className={`text-${parseInt(percentChange.totalCalls) >= 0 ? 'green' : 'red'}-500`}>
                {parseInt(percentChange.totalCalls) >= 0 ? '↑' : '↓'} {Math.abs(parseInt(percentChange.totalCalls))}%
              </span> from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{metrics.appointments}</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className={`text-${parseInt(percentChange.appointments) >= 0 ? 'green' : 'red'}-500`}>
                {parseInt(percentChange.appointments) >= 0 ? '↑' : '↓'} {Math.abs(parseInt(percentChange.appointments))}%
              </span> from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{metrics.conversionRate}%</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className={`text-${parseInt(percentChange.conversionRate) >= 0 ? 'green' : 'red'}-500`}>
                {parseInt(percentChange.conversionRate) >= 0 ? '↑' : '↓'} {Math.abs(parseInt(percentChange.conversionRate))}%
              </span> from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{metrics.activeAgents}</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className={`text-${percentChange.activeAgents >= 0 ? 'green' : 'red'}-500`}>
                {percentChange.activeAgents >= 0 ? '↑' : '↓'} {Math.abs(percentChange.activeAgents)}
              </span> from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Performance Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-lg font-medium">Campaign Performance Trend</CardTitle>
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
            <CardTitle className="text-lg font-medium">Agent Performance</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <BarChart
              data={agentPerformance}
              bars={[
                { dataKey: 'Calls', fill: '#8884d8' }
              ]}
              height={300}
            />
            <Button variant="link" size="sm" className="mt-4 text-sm flex items-center">
              View Detailed Agent Metrics <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg font-medium">Conversion by Agent</CardTitle>
            <Target className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <BarChart
              data={agentPerformance}
              bars={[
                { dataKey: 'Rate', fill: '#52c41a', name: 'Conversion Rate (%)' }
              ]}
              height={300}
            />
            <div className="mt-4 text-sm flex justify-between">
              <div>
                <span className="text-xs text-muted-foreground">Team Average</span>
                <div className="text-lg font-medium">14.6%</div>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Top Performer</span>
                <div className="text-lg font-medium">Wilson (15.3%)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}