'use client';

import React from 'react';
import { CalendarHeatmapProps, CalendarDataPoint } from '@/types/charts';

export function CalendarHeatmap({
  data,
  colorScale = [
    '#e6f7ff',
    '#bae7ff',
    '#91d5ff',
    '#69c0ff',
    '#40a9ff',
    '#1890ff',
    '#096dd9',
    '#0050b3',
    '#003a8c',
    '#002766'
  ],
  height = 200,
  width = '100%'
}: CalendarHeatmapProps) {
  // Group data by month and day
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Find min and max values for color scaling
  const values = data.map((d) => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  // Function to determine color based on value
  const getColor = (value: number) => {
    if (value === 0) return '#f0f0f0';

    const normalizedValue = (value - minValue) / (maxValue - minValue);
    const colorIndex = Math.min(
      Math.floor(normalizedValue * colorScale.length),
      colorScale.length - 1
    );
    return colorScale[colorIndex];
  };

  return (
    <div style={{ width, height, overflow: 'auto' }}>
      <div className="flex flex-col">
        <div className="flex items-center mb-2">
          <div className="w-12"></div>
          {months.map((month, index) => (
            <div
              key={index}
              className="text-xs text-muted-foreground"
              style={{
                width: `calc((100% - 48px) / 12)`,
                textAlign: 'center'
              }}
            >
              {month}
            </div>
          ))}
        </div>

        {daysOfWeek.map((day, dayIndex) => (
          <div key={dayIndex} className="flex items-center mb-1">
            <div className="w-12 text-xs text-muted-foreground">{day}</div>
            <div className="flex flex-1">
              {months.map((_, monthIndex) => {
                // Find data point for this day/month
                const matchingData = data.find((d) => {
                  const date = new Date(d.date);
                  return (
                    date.getDay() === dayIndex && date.getMonth() === monthIndex
                  );
                });

                const value = matchingData ? matchingData.value : 0;
                const color = getColor(value);

                return (
                  <div
                    key={`${dayIndex}-${monthIndex}`}
                    style={{
                      backgroundColor: color,
                      width: `calc((100% - 48px) / 12)`,
                      height: '20px',
                      marginRight: '1px',
                      borderRadius: '2px'
                    }}
                    title={
                      matchingData
                        ? `${matchingData.date}: ${matchingData.value}`
                        : 'No data'
                    }
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-4">
        <div className="text-xs text-muted-foreground">Low</div>
        <div className="flex">
          {colorScale.map((color, i) => (
            <div
              key={i}
              style={{
                backgroundColor: color,
                width: '15px',
                height: '15px',
                marginRight: '1px'
              }}
            />
          ))}
        </div>
        <div className="text-xs text-muted-foreground">High</div>
      </div>
    </div>
  );
}
