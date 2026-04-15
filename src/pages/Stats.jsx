import React from 'react';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function Stats() {
  const tasks = useSelector(state => state.tasks.tasks);
  
  const data = [
    { name: 'To Do', value: tasks.filter(t => t.status === 'todo').length },
    { name: 'Doing', value: tasks.filter(t => t.status === 'running').length },
    { name: 'Done', value: tasks.filter(t => t.status === 'completed').length }
  ].filter(d => d.value > 0);

  const COLORS = ['#94a3b8', '#3b82f6', '#10b981'];

  // Logic to show numerical values on the Pie slices
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="font-bold text-sm">
        {value}
      </text>
    );
  };

  return (
    <div className="p-8 max-w-4xl mx-auto flex flex-col items-center">
      <div className="w-full bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
        <h1 className="text-2xl font-bold text-center mb-8 dark:text-white">Task Distribution</h1>
        
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-4 text-center text-slate-500 text-sm">Numerical values represent the count of tasks per status.</p>
      </div>
    </div>
  );
}