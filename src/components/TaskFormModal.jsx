import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { upsertTask } from '../store/taskSlice';
import { X } from 'lucide-react';

const schema = yup.object({
  title: yup.string().required('Title is required').max(15, 'Max 15 characters'),
  assignee: yup.string().required('Assignee is required').max(20, 'Max 20 characters').matches(/^[a-zA-Z0-9 ]*$/, 'No special characters allowed'),
  deadline: yup.string().optional(),
  status: yup.string().oneOf(['todo', 'running', 'completed']).required()
}).required();

export default function TaskFormModal({ isOpen, onClose, initialData }) {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    values: initialData || { status: 'todo' }
  });

  if (!isOpen) return null;

  const onSubmit = (data) => {
    // Logic for Deadline: Use last date of current month if not provided
    if (!data.deadline) {
      const now = new Date();
      data.deadline = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
    }
    dispatch(upsertTask({ ...data, id: initialData?.id }));
    onClose();
    reset();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl border dark:border-slate-800">
        <div className="flex justify-between items-center p-6 border-b dark:border-slate-800">
          <h2 className="text-xl font-bold dark:text-white">{initialData?.id ? 'Edit Task' : 'New Task'}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1 dark:text-slate-300">Task Title</label>
            <input {...register('title')} className="w-full p-2 rounded-lg border dark:bg-slate-800 dark:border-slate-700" />
            <p className="text-red-500 text-xs mt-1">{errors.title?.message}</p>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1 dark:text-slate-300">Assignee</label>
            <input {...register('assignee')} className="w-full p-2 rounded-lg border dark:bg-slate-800 dark:border-slate-700" />
            <p className="text-red-500 text-xs mt-1">{errors.assignee?.message}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1 dark:text-slate-300">Deadline</label>
              <input type="date" {...register('deadline')} className="w-full p-2 rounded-lg border dark:bg-slate-800 dark:border-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1 dark:text-slate-300">Status</label>
              <select {...register('status')} className="w-full p-2 rounded-lg border dark:bg-slate-800 dark:border-slate-700">
                <option value="todo">To Do</option>
                <option value="running">Doing</option>
                <option value="completed">Done</option>
              </select>
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition">
            Save Task
          </button>
        </form>
      </div>
    </div>
  );
}