'use client';

import React from 'react';
import {
  ScatterChart as RechartsScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line
} from 'recharts';

interface DataPoint {
  x: number;
  y: number;
  name?: string;
}

interface ScatterChartProps {
  data: {
    name: string;
    color: string;
    points: DataPoint[];
  }[];
  height?: number;
  showTrendLine?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  xAxisName?: string;
  yAxisName?: string;
}

export function ScatterChart({
  data,
  height = 300,
  showTrendLine = true,
  showGrid = true,
  showLegend = true,
  xAxisName = 'X',
  yAxisName = 'Y'
}: ScatterChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsScatterChart
        margin={{
          top: 10,
          right: 30,
          left: 10,
          bottom: 10
        }}
      >
        {showGrid && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis 
          dataKey="x" 
          type="number" 
          name={xAxisName} 
          tick={{ fontSize: 12 }}
          label={{ 
            value: xAxisName, 
            position: 'insideBottomRight', 
            offset: -5,
            fontSize: 12
          }}
        />
        <YAxis 
          dataKey="y" 
          type="number" 
          name={yAxisName} 
          tick={{ fontSize: 12 }}
          label={{ 
            value: yAxisName, 
            angle: -90, 
            position: 'insideLeft',
            fontSize: 12
          }}
        />
        <Tooltip 
          cursor={{ strokeDasharray: '3 3' }}
          formatter={(value, name) => [value, name]}
          contentStyle={{ 
            backgroundColor: 'white', 
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '12px'
          }}
        />
        {showLegend && <Legend wrapperStyle={{ fontSize: '12px', marginTop: '10px' }} />}
        
        {data.map((series, index) => (
          <Scatter 
            key={index} 
            name={series.name} 
            data={series.points} 
            fill={series.color} 
          />
        ))}
      </RechartsScatterChart>
    </ResponsiveContainer>
  );
}