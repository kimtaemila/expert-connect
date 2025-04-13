
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BarChartProps {
  data: any[];
  xAxisKey: string;
  barKey: string;
  barColor: string;
  title: string;
}

export function BarChart({ data, xAxisKey, barKey, barColor, title }: BarChartProps) {
  return (
    <div className="w-full h-64 p-4">
      <h3 className="text-sm font-medium mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
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
          <Bar dataKey={barKey} fill={barColor} radius={[4, 4, 0, 0]} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
