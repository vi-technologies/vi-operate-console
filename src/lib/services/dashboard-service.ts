import { db } from '@/lib/db';
import { inboundCallCenterMockData } from '@/lib/mock-data/inbound-call-center';
import { outboundCallCenterMockData } from '@/lib/mock-data/outbound-call-center';
import { 
  DashboardData, 
  DashboardSummary, 
  RecentReport, 
  DashboardSummaryResponse 
} from '@/types/dashboard';

const dashboardSummaryMockData: DashboardSummaryResponse = {
  dashboards: [
    {
      id: 'inbound-call-center',
      title: 'Inbound Call Center',
      description: 'Comprehensive view of inbound call center operations, staffing forecasts, and KPIs',
      metrics: [
        { label: 'Volume', value: 1243 },
        { label: 'Service Level', value: '92%' },
        { label: 'Agents', value: 32 }
      ],
      status: 'active',
      badges: ['Labor Forecast'],
      trend: {
        direction: 'up',
        value: '12%',
        text: 'increased call volume projected'
      }
    },
    {
      id: 'outbound-call-center',
      title: 'Outbound Call Center',
      description: 'Track outbound campaign performance, agent productivity, and conversion rates',
      metrics: [
        { label: 'Calls', value: 876 },
        { label: 'Conversion', value: '14%' },
        { label: 'Agents', value: 18 }
      ],
      status: 'active',
      badges: ['Campaign Metrics'],
      lastUpdated: new Date().toISOString()
    }
  ],
  recentReports: [
    {
      id: 'historical-call-center',
      title: 'Historical Call Center Usage',
      description: 'Detailed analysis of call metrics and patterns over the past 12 months',
      lastUpdated: '2 days ago'
    },
    {
      id: 'labor-forecast-q3',
      title: 'Labor Forecast for Q3',
      description: 'Projected staffing needs for Q3 based on seasonal forecast models',
      lastUpdated: 'Today'
    },
    {
      id: 'agent-performance',
      title: 'Agent Performance Summary',
      description: 'Summary of agent performance metrics, adherence, and quality scores',
      lastUpdated: 'Yesterday'
    }
  ]
};

export async function getDashboardSummary(): Promise<DashboardSummaryResponse> {
  try {
    // In a real application, this would fetch from a database
    return dashboardSummaryMockData;
  } catch (error) {
    console.error('Error fetching dashboard summary:', error);
    throw new Error('Failed to fetch dashboard summary');
  }
}

export async function getDashboardData(dashboardId: string): Promise<DashboardData> {
  try {
    // In a real application, this would fetch from a database
    // For now, we'll return different mock data based on the dashboard ID
    
    if (dashboardId === 'inbound-call-center') {
      return inboundCallCenterMockData;
    }
    
    if (dashboardId === 'outbound-call-center') {
      return outboundCallCenterMockData;
    }
    
    // Default fallback
    return {};
  } catch (error) {
    console.error(`Error fetching data for dashboard ${dashboardId}:`, error);
    throw new Error(`Failed to fetch data for dashboard ${dashboardId}`);
  }
}
