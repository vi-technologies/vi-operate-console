'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import { seededRandom } from '@/lib/utils/random';
import { cn } from '@/lib/utils';
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent
} from '@/components/_common/ui/hover-card';
import { BarChart } from '@/components/_common/ux/charts/bar-chart';
import { LineChart } from '@/components/_common/ux/charts/line-chart';
import { ScatterChart } from '@/components/_common/ux/charts/scatter-chart';
import { CalendarHeatmap } from '@/components/_common/ux/charts/calendar-heatmap';
import { Activity, BarChart3, LineChart as LineChartIcon, ScatterChart as ScatterChartIcon, Calendar } from 'lucide-react';

export function InteractiveBackground({ className }: { className?: string }) {
  const [initialized, setInitialized] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeElement, setActiveElement] = useState<number | null>(null);

  // Generate chart data
  const generateChartData = (seed: number, length: number) => {
    const random = seededRandom(seed);
    return Array.from({ length }).map((_, i) => ({
      name: `Day ${i + 1}`,
      value: Math.floor(random() * 100),
      users: Math.floor(random() * 1000),
      sessions: Math.floor(random() * 2000),
      revenue: Math.floor(random() * 5000),
    }));
  };

  const generateScatterData = (seed: number) => {
    const random = seededRandom(seed);
    return {
      name: "Dataset",
      color: "#8b5cf6",
      points: Array.from({ length: 20 }).map((_, i) => ({
        x: Math.floor(random() * 100),
        y: Math.floor(random() * 100),
        z: Math.floor(random() * 50),
      }))
    };
  };

  const generateCalendarData = (seed: number) => {
    const random = seededRandom(seed);
    const today = new Date();
    
    return Array.from({ length: 60 }).map((_, i) => {
      const date = new Date();
      date.setDate(today.getDate() - i);
      return {
        date: date.toISOString().split('T')[0],
        value: Math.floor(random() * 10)
      };
    });
  };

  const interactiveElements = useMemo(() => {
    const random = seededRandom(654321);

    const chartTypes = [
      {
        type: 'bar',
        title: 'User Activity',
        description: 'Daily active users over the last 7 days',
        icon: BarChart3,
        data: generateChartData(111222, 7),
        bars: [
          { dataKey: 'value', fill: '#8b5cf6', name: 'Users' }
        ]
      },
      {
        type: 'line',
        title: 'Revenue Trends',
        description: 'Revenue performance over the last 14 days',
        icon: LineChartIcon,
        data: generateChartData(222333, 14),
        lines: [
          { dataKey: 'revenue', stroke: '#8b5cf6', name: 'Revenue' }
        ]
      },
      {
        type: 'scatter',
        title: 'User Engagement',
        description: 'Correlation between session time and actions',
        icon: ScatterChartIcon,
        data: [generateScatterData(333444)]
      },
      {
        type: 'calendar',
        title: 'Contribution Activity',
        description: 'Daily contribution activity over the last 60 days',
        icon: Calendar,
        data: generateCalendarData(444555)
      },
      {
        type: 'bar',
        title: 'Platform Metrics',
        description: 'Key performance indicators across platforms',
        icon: Activity,
        data: generateChartData(555666, 5),
        bars: [
          { dataKey: 'users', fill: '#8b5cf6', name: 'Users' },
          { dataKey: 'sessions', fill: '#a78bfa', name: 'Sessions' }
        ]
      }
    ];

    return Array.from({ length: 5 }).map((_, i) => {
      // Position elements in different areas of the screen
      let x, y;
      if (i === 0) { // Top left
        x = 15;
        y = 15;
      } else if (i === 1) { // Top right
        x = 85;
        y = 15;
      } else if (i === 2) { // Center
        x = 50;
        y = 50;
      } else if (i === 3) { // Bottom left
        x = 15;
        y = 85;
      } else { // Bottom right
        x = 85;
        y = 85;
      }

      const chartInfo = chartTypes[i];
      const IconComponent = chartInfo.icon;

      return {
        x,
        y,
        size: 200,
        color: `rgba(${Math.floor(random() * 100 + 100)}, ${Math.floor(random() * 50 + 50)}, ${Math.floor(random() * 200 + 50)}, 0.15)`,
        chartType: chartInfo.type,
        chartData: chartInfo.data,
        chartConfig: chartInfo.type === 'bar' ? chartInfo.bars : 
                    chartInfo.type === 'line' ? chartInfo.lines : 
                    undefined,
        content: (
          <div className="w-full h-full flex items-center justify-center">
            {chartInfo.type === 'bar' && (
              <BarChart 
                data={chartInfo.data} 
                bars={chartInfo.bars} 
                height={150} 
                xAxisDataKey="name"
              />
            )}
            {chartInfo.type === 'line' && (
              <LineChart 
                data={chartInfo.data} 
                lines={chartInfo.lines} 
                height={150} 
                xAxisDataKey="name"
                showGrid={false}
              />
            )}
            {chartInfo.type === 'scatter' && (
              <ScatterChart 
                data={chartInfo.data} 
                height={150} 
                showGrid={false}
                showLegend={false}
              />
            )}
            {chartInfo.type === 'calendar' && (
              <CalendarHeatmap 
                data={chartInfo.data} 
                height={150} 
                width="100%"
                colorScale={['#f3f4f6', '#c4b5fd', '#a78bfa', '#8b5cf6']}
              />
            )}
          </div>
        ),
        hoverContent: (
          <div className="p-4">
            <div className="flex items-center mb-2">
              <IconComponent className="w-5 h-5 mr-2 text-primary" />
              <h3 className="text-lg font-medium">{chartInfo.title}</h3>
            </div>
            <p className="text-sm text-white/70 mb-3">
              {chartInfo.description}
            </p>
            <div className="mt-2 flex gap-2">
              <button className="px-3 py-1 bg-primary/20 rounded-md text-sm hover:bg-primary/30 transition-colors">
                View Details
              </button>
              <button className="px-3 py-1 bg-primary/20 rounded-md text-sm hover:bg-primary/30 transition-colors">
                Export Data
              </button>
            </div>
          </div>
        )
      };
    });
  }, []);

  useEffect(() => {
    setInitialized(true);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(`absolute inset-0 overflow-hidden ${!initialized ? 'opacity-0' : 'opacity-100'}`, className)}
      style={{ transition: 'opacity 0.5s ease-in' }}
    >
      {/* Interactive elements */}
      {interactiveElements.map((elem, i) => {
        const isActive = activeElement === i;
        
        return (
          <HoverCard key={`interactive-${i}`} openDelay={100} closeDelay={300}>
            <HoverCardTrigger asChild>
              <div
                className="absolute flex items-center justify-center text-white font-medium overflow-hidden"
                style={{
                  width: `${elem.size}px`,
                  height: `${elem.size}px`,
                  left: `${elem.x}%`,
                  top: `${elem.y}%`,
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: elem.color,
                  borderRadius: '12px',
                  opacity: isActive ? 0.95 : 0.7,
                  boxShadow: isActive ? '0 0 30px rgba(139, 92, 246, 0.5)' : '0 0 20px rgba(139, 92, 246, 0.3)',
                  transition: 'opacity 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
                  cursor: 'pointer',
                  zIndex: 10,
                  transform: isActive ? 'translate(-50%, -50%) scale(1.05)' : 'translate(-50%, -50%) scale(1)'
                }}
                onMouseEnter={() => setActiveElement(i)}
                onMouseLeave={() => setActiveElement(null)}
              >
                <div className="relative z-10 w-full h-full p-2">
                  {elem.content}
                </div>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="bg-gray-900/95 border-gray-700 text-white w-80">
              {elem.hoverContent}
            </HoverCardContent>
          </HoverCard>
        );
      })}
    </div>
  );
}
