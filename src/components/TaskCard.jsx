import { Calendar, User, ChevronRight } from 'lucide-react';

export default function TaskCard({ task }) {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-900/20 hover:-translate-y-1 transition-all group cursor-pointer">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-slate-800 dark:text-slate-100 font-bold leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {task.title}
        </h3>
        <ChevronRight size={16} className="text-slate-300 dark:text-slate-600 group-hover:text-blue-500" />
      </div>
      
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
          <User size={14} className="text-blue-500/70" />
          <span className="text-xs font-medium">{task.assignee}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
          <Calendar size={14} className="text-emerald-500/70" />
          <span className="text-xs font-medium">{task.deadline}</span>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-slate-50 dark:border-slate-700/50 flex justify-end">
        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
          task.status === 'completed' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' :
          task.status === 'running' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
          'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
        }`}>
          {task.status === 'running' ? 'Active' : task.status}
        </span>
      </div>
    </div>
  );
}