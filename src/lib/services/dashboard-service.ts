import { db } from '@/lib/db';

export interface DashboardData {
  callVolumeData?: any[];
  staffingRequirements?: any[];
  quarterlyVolume?: any[];
  historicalCallData?: any;
  weekDemand?: any[];
  calendarData?: any[];
}

/**
 * Fetch dashboard summary data
 */
export async function getDashboardSummary() {
  try {
    // In a real application, this would fetch from a database
    // For now, we'll return mock data
    return {
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
        },
        // Additional dashboards...
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
  } catch (error) {
    console.error('Error fetching dashboard summary:', error);
    throw new Error('Failed to fetch dashboard summary');
  }
}

/**
 * Fetch dashboard data for a specific dashboard
 */
export async function getDashboardData(dashboardId: string): Promise<DashboardData> {
  try {
    // In a real application, this would fetch from a database
    // For now, we'll return different mock data based on the dashboard ID
    
    if (dashboardId === 'inbound-call-center') {
      return {
        callVolumeData: [
          { name: 'Jan', General: 1100, Appointment: 850, Technical: 600, Billing: 450 },
          { name: 'Feb', General: 1200, Appointment: 900, Technical: 550, Billing: 500 },
          { name: 'Mar', General: 1300, Appointment: 950, Technical: 650, Billing: 550 },
          { name: 'Apr', General: 1250, Appointment: 1000, Technical: 700, Billing: 500 },
          { name: 'May', General: 1400, Appointment: 1100, Technical: 750, Billing: 600 },
          { name: 'Jun', General: 1500, Appointment: 1200, Technical: 800, Billing: 650 },
          { name: 'Jul', General: 1600, Appointment: 1300, Technical: 850, Billing: 700 },
          { name: 'Aug', General: 1700, Appointment: 1400, Technical: 900, Billing: 750 },
          { name: 'Sep', General: 1600, Appointment: 1300, Technical: 850, Billing: 700 },
          { name: 'Oct', General: 1500, Appointment: 1200, Technical: 800, Billing: 650 },
          { name: 'Nov', General: 1400, Appointment: 1100, Technical: 750, Billing: 600 },
          { name: 'Dec', General: 1300, Appointment: 1000, Technical: 700, Billing: 550 }
        ],
        // Additional data...
      };
    }
    
    if (dashboardId === 'outbound-call-center') {
      // Outbound call center specific data
      return {
        campaignPerformance: [
          { name: 'Week 1', Appointments: 45, Callbacks: 32, Conversions: 18 },
          { name: 'Week 2', Appointments: 52, Callbacks: 38, Conversions: 21 },
          { name: 'Week 3', Appointments: 49, Callbacks: 35, Conversions: 20 },
          { name: 'Week 4', Appointments: 58, Callbacks: 42, Conversions: 24 },
          { name: 'Week 5', Appointments: 63, Callbacks: 48, Conversions: 27 },
          { name: 'Week 6', Appointments: 59, Callbacks: 45, Conversions: 25 },
          { name: 'Week 7', Appointments: 64, Callbacks: 50, Conversions: 29 },
          { name: 'Week 8', Appointments: 68, Callbacks: 53, Conversions: 32 }
        ],
        agentPerformance: [
          { name: 'Smith', Calls: 175, Conversions: 24, Rate: 13.7 },
          { name: 'Johnson', Calls: 210, Conversions: 32, Rate: 15.2 },
          { name: 'Williams', Calls: 190, Conversions: 27, Rate: 14.2 },
          { name: 'Jones', Calls: 160, Conversions: 22, Rate: 13.8 },
          { name: 'Brown', Calls: 205, Conversions: 30, Rate: 14.6 },
          { name: 'Davis', Calls: 195, Conversions: 28, Rate: 14.4 },
          { name: 'Miller', Calls: 180, Conversions: 25, Rate: 13.9 },
          { name: 'Wilson', Calls: 215, Conversions: 33, Rate: 15.3 }
        ],
        metrics: {
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
        }
      };
    }
    
    // Default fallback
    return {};
  } catch (error) {
    console.error(`Error fetching data for dashboard ${dashboardId}:`, error);
    throw new Error(`Failed to fetch data for dashboard ${dashboardId}`);
  }
}