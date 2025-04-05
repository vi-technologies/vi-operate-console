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
  AlertTriangle,
  ArrowRight,
  Calendar,
  LineChart as LineChartIcon,
  BarChart as BarChartIcon,
  TrendingUp,
  Users
} from 'lucide-react';
import {
  LineChart,
  BarChart,
  ScatterChart,
  CalendarHeatmap
} from '@/components/charts';
import { InsightAlert } from '@/components/dashboards/insight-alert';
import { PageLayout } from '@/components/_common/layout/page-layout';

interface InboundDashboardProps {
  initialData?: {
    callVolumeData?: any[];
    staffingRequirements?: any[];
    quarterlyVolume?: any[];
    historicalCallData?: any;
    weekDemand?: any[];
    calendarData?: any[];
  };
}

export function InboundDashboard({ initialData }: InboundDashboardProps) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { getDashboardData } = await import(
          '@/lib/services/dashboard-service'
        );
        const dashboardData = await getDashboardData('inbound-call-center');
        setData(dashboardData);
      } catch (error) {
        console.error('Error fetching inbound dashboard data:', error);
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
  const callVolumeData = data?.callVolumeData || [
    {
      name: 'Jan',
      General: 1100,
      Appointment: 850,
      Technical: 600,
      Billing: 450
    },
    {
      name: 'Feb',
      General: 1200,
      Appointment: 900,
      Technical: 550,
      Billing: 500
    },
    {
      name: 'Mar',
      General: 1300,
      Appointment: 950,
      Technical: 650,
      Billing: 550
    },
    {
      name: 'Apr',
      General: 1250,
      Appointment: 1000,
      Technical: 700,
      Billing: 500
    },
    {
      name: 'May',
      General: 1400,
      Appointment: 1100,
      Technical: 750,
      Billing: 600
    },
    {
      name: 'Jun',
      General: 1500,
      Appointment: 1200,
      Technical: 800,
      Billing: 650
    },
    {
      name: 'Jul',
      General: 1600,
      Appointment: 1300,
      Technical: 850,
      Billing: 700
    },
    {
      name: 'Aug',
      General: 1700,
      Appointment: 1400,
      Technical: 900,
      Billing: 750
    },
    {
      name: 'Sep',
      General: 1600,
      Appointment: 1300,
      Technical: 850,
      Billing: 700
    },
    {
      name: 'Oct',
      General: 1500,
      Appointment: 1200,
      Technical: 800,
      Billing: 650
    },
    {
      name: 'Nov',
      General: 1400,
      Appointment: 1100,
      Technical: 750,
      Billing: 600
    },
    {
      name: 'Dec',
      General: 1300,
      Appointment: 1000,
      Technical: 700,
      Billing: 550
    }
  ];

  const staffingRequirements = data?.staffingRequirements || [
    { name: 'Jan', Current: 32, Projected: 32 },
    { name: 'Feb', Current: 32, Projected: 34 },
    { name: 'Mar', Current: 32, Projected: 35 },
    { name: 'Apr', Current: 32, Projected: 36 },
    { name: 'May', Current: 32, Projected: 38 },
    { name: 'Jun', Current: 32, Projected: 40 },
    { name: 'Jul', Current: 32, Projected: 45 },
    { name: 'Aug', Current: 32, Projected: 48 },
    { name: 'Sep', Current: 32, Projected: 46 },
    { name: 'Oct', Current: 32, Projected: 42 },
    { name: 'Nov', Current: 32, Projected: 38 },
    { name: 'Dec', Current: 32, Projected: 36 }
  ];

  const quarterlyVolume = data?.quarterlyVolume || [
    {
      name: 'Q1',
      General: 3600,
      Appointment: 2700,
      Technical: 1800,
      Billing: 1500
    },
    {
      name: 'Q2',
      General: 4150,
      Appointment: 3300,
      Technical: 2250,
      Billing: 1750
    },
    {
      name: 'Q3',
      General: 4900,
      Appointment: 4000,
      Technical: 2600,
      Billing: 2150
    },
    {
      name: 'Q4',
      General: 4200,
      Appointment: 3300,
      Technical: 2250,
      Billing: 1800
    }
  ];

  const historicalCallData = data?.historicalCallData || {
    weekday: {
      name: 'Weekday',
      color: '#1890ff',
      points: Array.from({ length: 30 }, (_, i) => ({
        x: 8 + Math.random() * 8,
        y: 80 + Math.random() * 50
      }))
    },
    saturday: {
      name: 'Saturday',
      color: '#52c41a',
      points: Array.from({ length: 15 }, (_, i) => ({
        x: 8 + Math.random() * 6,
        y: 50 + Math.random() * 40
      }))
    },
    holiday: {
      name: 'Sunday/Holiday',
      color: '#f5222d',
      points: Array.from({ length: 15 }, (_, i) => ({
        x: 10 + Math.random() * 4,
        y: 30 + Math.random() * 30
      }))
    }
  };

  const weekDemand = data?.weekDemand || [
    { name: 'Mon', 'Call Volume': 120, 'Service Level': 92 },
    { name: 'Tue', 'Call Volume': 110, 'Service Level': 95 },
    { name: 'Wed', 'Call Volume': 105, 'Service Level': 96 },
    { name: 'Thu', 'Call Volume': 100, 'Service Level': 97 },
    { name: 'Fri', 'Call Volume': 115, 'Service Level': 94 },
    { name: 'Sat', 'Call Volume': 80, 'Service Level': 98 },
    { name: 'Sun', 'Call Volume': 60, 'Service Level': 99 }
  ];

  const calendarData =
    data?.calendarData ||
    Array.from({ length: 180 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return {
        date: date.toISOString().split('T')[0],
        value: 10 + Math.floor(Math.random() * 90)
      };
    });

  return (
    <>
      {/* Insight Alert Section */}
      <InsightAlert
        title="Potential labor demand increase in 3 months"
        message="Our predictive model has detected a potential 25% increase in call volume starting in July, based on historical patterns and upcoming marketing campaigns. This will require adjusting staffing levels."
        icon={<AlertTriangle />}
        severity="warning"
        primaryActionLabel="See Recommendations"
        secondaryActionLabel="Ignore"
      />

      {/* Labor Case Volume Reports */}
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-4">Labor Case Volume Reports</h2>
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg font-medium">
              Monthly Call Volume by Type
            </CardTitle>
            <LineChartIcon className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <LineChart
              data={callVolumeData}
              lines={[
                {
                  dataKey: 'General',
                  stroke: '#1890ff',
                  name: 'General Inquiries'
                },
                {
                  dataKey: 'Appointment',
                  stroke: '#52c41a',
                  name: 'Appointment Scheduling'
                },
                {
                  dataKey: 'Technical',
                  stroke: '#fa8c16',
                  name: 'Technical Support'
                },
                {
                  dataKey: 'Billing',
                  stroke: '#f5222d',
                  name: 'Billing Questions'
                }
              ]}
              height={300}
            />
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg font-medium">
                Staffing Requirements
              </CardTitle>
              <Users className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <LineChart
                data={staffingRequirements}
                lines={[
                  {
                    dataKey: 'Current',
                    stroke: '#8884d8',
                    name: 'Current Staff'
                  },
                  {
                    dataKey: 'Projected',
                    stroke: '#f5222d',
                    name: 'Projected Need'
                  }
                ]}
                height={280}
              />
              <div className="mt-4 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-muted-foreground">
                      Current FTEs
                    </span>
                    <div className="text-lg font-medium">32 agents</div>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">
                      Projected Peak
                    </span>
                    <div className="text-lg font-medium flex items-center">
                      48 agents{' '}
                      <span className="text-red-500 text-sm ml-2">(+50%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg font-medium">
                Quarterly Volume Forecast
              </CardTitle>
              <BarChartIcon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <BarChart
                data={quarterlyVolume}
                bars={[
                  {
                    dataKey: 'General',
                    fill: '#1890ff',
                    name: 'General Inquiries'
                  },
                  {
                    dataKey: 'Appointment',
                    fill: '#52c41a',
                    name: 'Appointment Scheduling'
                  },
                  {
                    dataKey: 'Technical',
                    fill: '#fa8c16',
                    name: 'Technical Support'
                  },
                  {
                    dataKey: 'Billing',
                    fill: '#f5222d',
                    name: 'Billing Questions'
                  }
                ]}
                stackId="stack"
                height={280}
              />
              <div className="mt-4 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-muted-foreground">
                      Highest Call Volume Quarter
                    </span>
                    <div className="text-lg font-medium">Q3 (Jul-Sep)</div>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">
                      Total Annual Calls
                    </span>
                    <div className="text-lg font-medium">28,350 calls</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Historical Data Reports */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Historical Data Reports</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg font-medium">
                Historical Inbound Call Trends
              </CardTitle>
              <LineChartIcon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <ScatterChart
                data={[
                  historicalCallData.weekday,
                  historicalCallData.saturday,
                  historicalCallData.holiday
                ]}
                height={280}
                xAxisName="Hour of Day"
                yAxisName="Call Volume"
              />
              <div className="mt-4 text-sm">
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <span className="text-xs text-muted-foreground">
                      Peak Time
                    </span>
                    <div className="text-base font-medium">10am - 2pm</div>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">
                      Weekday Avg
                    </span>
                    <div className="text-base font-medium">105 calls/hr</div>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">
                      Weekend Avg
                    </span>
                    <div className="text-base font-medium">70 calls/hr</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg font-medium">
                Average Week Demand
              </CardTitle>
              <BarChartIcon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <BarChart
                data={weekDemand}
                bars={[{ dataKey: 'Call Volume', fill: '#1890ff' }]}
                height={280}
              />
              <div className="mt-4 text-sm">
                <div className="flex justify-between gap-2">
                  <div>
                    <span className="text-xs text-muted-foreground">
                      Busiest Day
                    </span>
                    <div className="text-base font-medium">Monday</div>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">
                      Slowest Day
                    </span>
                    <div className="text-base font-medium">Sunday</div>
                  </div>
                  <Button
                    variant="link"
                    size="sm"
                    className="text-sm flex items-center"
                  >
                    Drill Down <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg font-medium">
              Calendar Year Heat Map
            </CardTitle>
            <Calendar className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CalendarHeatmap
              data={calendarData}
              colorScale={[
                '#e6f7ff',
                '#bae7ff',
                '#91d5ff',
                '#69c0ff',
                '#40a9ff',
                '#1890ff',
                '#096dd9'
              ]}
              height={230}
            />
            <div className="mt-4 text-sm flex justify-between">
              <div>
                <span className="text-xs text-muted-foreground">
                  Seasonal Pattern
                </span>
                <div className="text-base font-medium">
                  Summer peak with December holiday spike
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-sm flex items-center"
              >
                Export Data <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
