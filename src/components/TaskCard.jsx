import { Calendar, User, Hash, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../store/taskSlice';

export default function TaskCard({ task }) {
  const dispatch = useDispatch();

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-blue-500 transition-all relative group">
      <button 
        onClick={() => dispatch(deleteTask(task.id))}
        className="absolute top-3 right-3 text-slate-300 hover:text-red-500 transition-colors"
      >
        <Trash2 size={14} />
      </button>

      <h3 className="font-bold text-sm text-slate-800 mb-3 uppercase leading-tight pr-6">{task.title}</h3>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-[10px] text-slate-500">
          <User size={12} className="text-slate-400" />
          <span className="font-bold">Assignee:</span> {task.assignee}
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-500">
          <Calendar size={12} className="text-slate-400" />
          <span className="font-bold">Due Date:</span> {task.deadline}
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-slate-50 flex justify-between items-center">
        <span className="text-[9px] text-slate-300 font-mono"># {task.id.slice(-4)}</span>
        <div className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter ${
          task.status === 'completed' ? 'bg-green-50 text-green-600' : 
          task.status === 'running' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-600'
        }`}>
          {task.status}
        </div>
      </div>
    </div>
  );
}