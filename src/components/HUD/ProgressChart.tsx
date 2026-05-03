'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const data = [
  { day: 'MON', value: 4000 },
  { day: 'TUE', value: 6000 },
  { day: 'WED', value: 5500 },
  { day: 'THU', value: 8000 },
  { day: 'FRI', value: 7500 },
  { day: 'SAT', value: 9000 },
  { day: 'SUN', value: 11000 },
];

export default function ProgressChart() {
  return (
    <div className="w-full h-[250px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e1b4b" vertical={false} />
          <XAxis 
            dataKey="day" 
            stroke="#64748b" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false}
            dy={10}
          />
          <YAxis hide />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0c0816', borderColor: '#a855f7', borderRadius: '8px' }}
            itemStyle={{ color: '#a855f7' }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#a855f7" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorValue)" 
            dot={{ fill: '#a855f7', strokeWidth: 2, r: 4, stroke: '#fff' }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
