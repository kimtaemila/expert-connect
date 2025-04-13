
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface PieChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  title: string;
}

export function PieChart({ data, title }: PieChartProps) {
  return (
    <div className="w-full h-64 p-4">
      <h3 className="text-sm font-medium mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(50,50,70,0.9)', 
              borderColor: 'rgba(255,255,255,0.1)',
              borderRadius: '0.5rem',
              color: 'white'
            }} 
            formatter={(value) => [`${value}%`, 'Percentage']}
          />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}
