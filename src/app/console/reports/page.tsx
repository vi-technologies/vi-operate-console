'use client';

import React from 'react';
import { PageLayout } from '@/components/layout/page-layout';
import { ReportCard, ScheduledReportCard } from '@/components/features/reporting';
import { LineChart, PieChart, BarChart, Calendar } from 'lucide-react';

export default function ReportsPage() {
  // Data that would typically come from an API
  const reports = [
    {
      title: 'Historical Call Center Usage',
      description: 'Detailed analysis of historical call center metrics and trends',
      badges: ['Last 90 Days', 'Tabular'],
      lastUpdated: '2 days ago',
      icon: <LineChart className="h-5 w-5 text-muted-foreground" />
    },
    {
      title: 'Labor Forecast for Inbound',
      description: 'Projected staffing needs based on forecast models and call volume predictions',
      badges: ['Next 14 Days', 'Chart + Table'],
      lastUpdated: 'Today',
      icon: <BarChart className="h-5 w-5 text-muted-foreground" />
    },
    {
      title: 'Agent Performance Analytics',
      description: 'Individual and team performance metrics with benchmarking',
      badges: ['Current Month', 'Dashboard'],
      lastUpdated: 'Yesterday',
      icon: <PieChart className="h-5 w-5 text-muted-foreground" />
    }
  ];

  const scheduledReports = [
    {
      title: 'Weekly Performance Summary',
      description: 'Sent every Monday to management team',
      nextDelivery: 'Monday, 8:00 AM',
      frequency: 'Weekly',
      icon: <Calendar className="h-4 w-4 text-muted-foreground" />
    },
    {
      title: 'Daily Forecast vs Actual',
      description: 'Sent daily to operations team',
      nextDelivery: 'Tomorrow, 6:00 AM',
      frequency: 'Daily',
      icon: <Calendar className="h-4 w-4 text-muted-foreground" />
    },
    {
      title: 'Monthly Executive Summary',
      description: 'Sent on the 1st of each month to executive team',
      nextDelivery: 'Dec 1, 7:00 AM',
      frequency: 'Monthly',
      icon: <Calendar className="h-4 w-4 text-muted-foreground" />
    }
  ];

  const handleViewReport = (report: string) => {
    console.log(`Viewing report: ${report}`);
  };

  const handleExport = (report: string) => {
    console.log(`Exporting report: ${report}`);
  };

  return (
    <PageLayout
      title="Reports"
      actionButton={{
        label: "Create Report",
        onClick: () => console.log("Create report clicked")
      }}
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report, index) => (
          <ReportCard
            key={index}
            title={report.title}
            description={report.description}
            badges={report.badges}
            lastUpdated={report.lastUpdated}
            icon={report.icon}
            onViewReport={() => handleViewReport(report.title)}
            onExport={() => handleExport(report.title)}
          />
        ))}
        
        <ReportCard
          title="Create New Report"
          description="Build a custom report to analyze specific metrics and timeframes"
          icon={<LineChart className="h-5 w-5 text-muted-foreground" />}
          className="border-dashed border-2 cursor-pointer"
          onViewReport={() => console.log("Create new report")}
        />
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Scheduled Reports</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {scheduledReports.map((report, index) => (
            <ScheduledReportCard
              key={index}
              title={report.title}
              description={report.description}
              nextDelivery={report.nextDelivery}
              frequency={report.frequency}
              icon={report.icon}
            />
          ))}
        </div>
      </div>
    </PageLayout>
  );
}