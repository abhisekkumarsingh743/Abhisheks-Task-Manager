import React from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';

export default function TaskFormModal({ isOpen, onClose, onSubmit, defaultStatus }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { status: defaultStatus }
  });

  const onFormSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 border border-slate-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-slate-900 uppercase">Create Task</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
          <div>
            <label className="block text-xs font-black uppercase text-slate-400 mb-2">Task Title</label>
            <input 
              {...register("title", { required: true, maxLength: 15 })}
              placeholder="e.g. Start PR Campaign"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-slate-400 mb-2">Assignee</label>
            <input 
              {...register("assignee", { required: true })}
              placeholder="e.g. Abhishek"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-slate-400 mb-2">Due Date</label>
            <input 
              type="date"
              {...register("deadline", { required: true })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none font-medium"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-slate-800 transition-all active:scale-[0.98] mt-4"
          >
            Create Task Entry
          </button>
        </form>
      </div>
    </div>
  );
}