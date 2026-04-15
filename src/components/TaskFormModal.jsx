import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { upsertTask } from '../store/taskSlice';
import { taskSchema } from '../utils/validation';
import { X } from 'lucide-react';

export default function TaskFormModal({ isOpen, onClose, initialData }) {
  const dispatch = useDispatch();
  
  // Initialize form with validation schema and default values
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(taskSchema),
    defaultValues: initialData || { status: 'todo' }
  });

  if (!isOpen) return null;

  const onSubmit = (data) => {
    // If no deadline provided, logic in validation.js defaults to end of month
    dispatch(upsertTask({ ...data, id: initialData?.id }));
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold text-slate-800">
            {initialData ? 'Edit Task' : 'Add New Task'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          {/* Task Title Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Task Title</label>
            <input 
              {...register('title')}
              className={`w-full p-2 border rounded-lg outline-none transition ${errors.title ? 'border-red-500' : 'focus:border-blue-500'}`}
              placeholder="e.g. Start PR Campaign"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          {/* Assignee Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Assignee</label>
            <input 
              {...register('assignee')}
              className={`w-full p-2 border rounded-lg outline-none transition ${errors.assignee ? 'border-red-500' : 'focus:border-blue-500'}`}
              placeholder="Full Name"
            />
            {errors.assignee && <p className="text-red-500 text-xs mt-1">{errors.assignee.message}</p>}
          </div>

          {/* Deadline Field  */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Deadline (Optional)</label>
            <input 
              type="date"
              {...register('deadline')}
              className="w-full p-2 border rounded-lg focus:border-blue-500 outline-none"
            />
            {errors.deadline && <p className="text-red-500 text-xs mt-1">{errors.deadline.message}</p>}
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select 
              {...register('status')}
              className="w-full p-2 border rounded-lg focus:border-blue-500 outline-none bg-white"
            >
              <option value="todo">To Do</option>
              <option value="running">Doing</option>
              <option value="completed">Done</option>
            </select>
          </div>

          <div className="flex gap-3 mt-6">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              {initialData ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}