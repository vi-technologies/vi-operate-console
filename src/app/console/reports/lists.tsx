'use client';

import { useReports } from '@/hooks/useReports';
import { LineChart, Calendar } from 'lucide-react';
import { ReportCard, ScheduledReportCard } from '@/app/console/reports/cards';
import { useRouter } from 'next/navigation';

export function ReportsList() {
  const router = useRouter();
  const { reports } = useReports();

  const handleViewReport = (report: string) => {
    console.log(`Viewing report: ${report}`);
  };

  const handleExport = (report: string) => {
    console.log(`Exporting report: ${report}`);
  };

  return (
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
        onViewReport={() => console.log('Create new report')}
      />
    </div>
  );
}

export function ScheduledReportsList() {
  const { scheduledReports } = useReports();

  return (
    <div>
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

        <ScheduledReportCard
          title="Schedule a New Report"
          description="Set up automated report delivery to your team"
          nextDelivery="Select date"
          frequency="Choose frequency"
          icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
          className="border-dashed border-2 cursor-pointer"
        />
      </div>
    </div>
  );
}
