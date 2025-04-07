import { BarChart, Calendar, FileBarChart, LineChart, PieChart } from 'lucide-react';
import React from 'react';

// Create a function to generate the icon data
const createIconData = (Icon: any, size: 'sm' | 'md' = 'md') => ({
  type: Icon.name,
  props: {
    className: size === 'sm' ? "h-4 w-4 text-muted-foreground" : "h-5 w-5 text-muted-foreground"
  }
});

export const reportsMockData = [
  {
    title: 'Historical Call Center Usage',
    description: 'Detailed analysis of historical call center metrics and trends',
    badges: ['Last 90 Days', 'Tabular'],
    lastUpdated: '2 days ago',
    icon: createIconData(LineChart)
  },
  {
    title: 'Labor Forecast for Inbound',
    description: 'Projected staffing needs based on forecast models and call volume predictions',
    badges: ['Next 14 Days', 'Chart + Table'],
    lastUpdated: 'Today',
    icon: createIconData(BarChart)
  },
  {
    title: 'Agent Performance Analytics',
    description: 'Individual and team performance metrics with benchmarking',
    badges: ['Current Month', 'Dashboard'],
    lastUpdated: 'Yesterday',
    icon: createIconData(PieChart)
  }
];

export const scheduledReportsMockData = [
  {
    title: 'Weekly Performance Summary',
    description: 'Sent every Monday to management team',
    nextDelivery: 'Monday, 8:00 AM',
    frequency: 'Weekly',
    icon: createIconData(Calendar, 'sm')
  },
  {
    title: 'Daily Forecast vs Actual',
    description: 'Sent daily to operations team',
    nextDelivery: 'Tomorrow, 6:00 AM',
    frequency: 'Daily',
    icon: createIconData(Calendar, 'sm')
  },
  {
    title: 'Monthly Executive Summary',
    description: 'Sent on the 1st of each month to executive team',
    nextDelivery: 'Dec 1, 7:00 AM',
    frequency: 'Monthly',
    icon: createIconData(Calendar, 'sm')
  }
];

export const reportTabsMockData = [
  {
    icon: FileBarChart,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    hover: 'hover:border-blue-600',
    name: 'Reports',
    value: 'reports'
  },
  {
    icon: Calendar,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    hover: 'hover:border-purple-200',
    name: 'Scheduled Reports',
    value: 'scheduled'
  }
];
