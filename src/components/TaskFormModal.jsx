import React from 'react';
import { useForm } from 'react-hook-form';
import { X, Clock, Layers } from 'lucide-react';

export default function TaskFormModal({ isOpen, onClose, onSubmit, defaultStatus }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { status: defaultStatus || 'todo' }
  });

  const onFormSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 border border-slate-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Create Task</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          {/* Title Field */}
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5 ml-1">Task Title</label>
            <input 
              {...register("title", { required: true, maxLength: 20 })}
              placeholder="e.g. Start PR Campaign"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all font-semibold text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Status Field [New] */}
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5 ml-1">Status</label>
              <div className="relative">
                <select 
                  {...register("status")}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none font-bold text-xs appearance-none bg-white"
                >
                  <option value="todo">To Do</option>
                  <option value="running">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <Layers size={14} className="absolute right-3 top-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Time Field [New] */}
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5 ml-1">Time</label>
              <div className="relative">
                <input 
                  type="time"
                  {...register("time", { required: true })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none font-bold text-xs"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Assignee Field */}
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5 ml-1">Assignee</label>
              <input 
                {...register("assignee", { required: true })}
                placeholder="Name"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none font-bold text-xs"
              />
            </div>

            {/* Date Field */}
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5 ml-1">Due Date</label>
              <input 
                type="date"
                {...register("deadline", { required: true })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none font-bold text-xs"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-black transition-all active:scale-[0.98] mt-4 uppercase text-xs tracking-widest"
          >
            Create Task Entry
          </button>
        </form>
      </div>
    </div>
  );
}