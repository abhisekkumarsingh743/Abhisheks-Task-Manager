import React from 'react';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function Stats() {
  const tasks = useSelector(state => state.tasks.tasks);
  
  const data = [
    { name: 'To Do', value: tasks.filter(t => t.status === 'todo').length },
    { name: 'In Progress', value: tasks.filter(t => t.status === 'running').length },
    { name: 'Completed', value: tasks.filter(t => t.status === 'completed').length }
  ];

  const COLORS = ['#94a3b8', '#3b82f6', '#10b981'];

  return (
    <div className="p-8 max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[80vh]">
      <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800 w-full">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-slate-800 dark:text-white">Task Analytics</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Current status distribution of all project tasks </p>
        </div>

        <div className="h-[450px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={100}
                outerRadius={160}
                paddingAngle={10}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={10} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '15px' }} 
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}