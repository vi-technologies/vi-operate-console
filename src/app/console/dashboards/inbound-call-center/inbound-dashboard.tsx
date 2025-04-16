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
} from '@/components/_common/ux/charts';
import { InsightAlert } from '@/app/console/dashboards/insight-alert';
import { PageLayout } from '@/components/_common/layout/page-layout';
import { DashboardData } from '@/types/dashboard';
import { inboundCallCenterMockData } from '@/lib/mock-data';
import { 
  CallVolumeDataPoint, 
  StaffingRequirement, 
  QuarterlyVolumeData 
} from '@/types/charts';

interface InboundDashboardProps {
  initialData?: DashboardData;
}

export function InboundDashboard({ initialData }: InboundDashboardProps) {
  const [dashboardData, setDashboardData] = useState<DashboardData | undefined>(
    initialData
  );
  const [isLoading, setIsLoading] = useState(!initialData);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { getDashboardData } = await import(
          '@/lib/services/dashboard-service'
        );
        const fetchedData = await getDashboardData('inbound-call-center');
        setDashboardData(fetchedData);
      } catch (error) {
        console.error('Error fetching inbound dashboard data:', error);
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

  const data = dashboardData || inboundCallCenterMockData;

  const {
    callVolumeData,
    staffingRequirements,
    quarterlyVolume,
    historicalCallData,
    weekDemand,
    calendarData
  } = data;

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
