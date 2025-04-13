
import { useEffect, useRef } from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface LineChartProps {
  data: any[];
  lines: {
    key: string;
    color: string;
    name: string;
  }[];
  xAxisKey: string;
  title: string;
}

export function LineChart({ data, lines, xAxisKey, title }: LineChartProps) {
  return (
    <div className="w-full h-64 p-4">
      <h3 className="text-sm font-medium mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey={xAxisKey} 
            tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.7)' }} 
          />
          <YAxis tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.7)' }} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(50,50,70,0.9)', 
              borderColor: 'rgba(255,255,255,0.1)',
              borderRadius: '0.5rem',
              color: 'white'
            }} 
          />
          <Legend />
          {lines.map((line, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={line.key}
              name={line.name}
              stroke={line.color}
              strokeWidth={2}
              dot={{ r: 2 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
