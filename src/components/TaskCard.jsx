import { Calendar, User, Hash } from 'lucide-react';

export default function TaskCard({ task }) {
  return (
    <div className="bg-white p-3.5 rounded-xl border border-slate-200 task-card-shadow hover:border-blue-400 transition-all cursor-pointer group">
      <h3 className="font-bold text-xs text-slate-800 mb-2 group-hover:text-blue-600 transition-colors leading-tight">
        {task.title}
      </h3>
      
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-[9px] text-slate-500">
          <User size={11} className="text-slate-400" /> 
          <span className="font-medium text-slate-400 uppercase">Assignee:</span>
          <span className="text-slate-700 font-bold">{task.assignee}</span>
        </div>
        <div className="flex items-center gap-2 text-[9px] text-slate-500">
          <Calendar size={11} className="text-slate-400" /> 
          <span className="font-medium text-slate-400 uppercase">Due Date:</span>
          <span className="text-slate-700 font-bold">{task.deadline}</span>
        </div>
      </div>
      
      <div className="mt-3 pt-2.5 border-t border-slate-50 flex justify-between items-center">
        <div className="flex items-center gap-1 text-[8px] font-mono text-slate-400 uppercase">
          <Hash size={8} /> {task.id?.slice(-4)}
        </div>
        <div className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
          task.status === 'completed' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
        }`}>
          {task.status}
        </div>
      </div>
    </div>
  );
}