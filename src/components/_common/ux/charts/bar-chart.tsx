'use client';

import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { BarChartProps, DataPoint } from '@/types/charts';

export function BarChart({
  data,
  bars,
  xAxisDataKey = 'name',
  height = 300,
  stackId,
  showGrid = true,
  showLegend = true
}: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}
      >
        {showGrid && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis 
          dataKey={xAxisDataKey} 
          tick={{ fontSize: 12 }}
        />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'white', 
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '12px'
          }} 
        />
        {showLegend && <Legend wrapperStyle={{ fontSize: '12px', marginTop: '10px' }} />}
        {bars.map((bar, index) => (
          <Bar
            key={index}
            dataKey={bar.dataKey}
            fill={bar.fill}
            name={bar.name || bar.dataKey}
            stackId={stackId}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}