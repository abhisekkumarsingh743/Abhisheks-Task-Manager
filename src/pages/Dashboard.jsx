import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PlusCircle, ListTodo, Plus } from 'lucide-react';
import TaskCard from '../components/TaskCard';
import TaskFormModal from '../components/TaskFormModal';
import { addTask } from '../store/taskSlice';

const COLUMNS = [
  { id: 'todo', title: 'To Do', color: 'bg-slate-400' },
  { id: 'running', title: 'In Progress', color: 'bg-blue-500' },
  { id: 'completed', title: 'Completed', color: 'bg-green-500' }
];

export default function Dashboard() {
  const tasks = useSelector(state => state.tasks.tasks);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialStatus, setInitialStatus] = useState('todo');

  const handleOpenModal = (status = 'todo') => {
    setInitialStatus(status);
    setIsModalOpen(true);
  };

  const handleCreateTask = (data) => {
    const newTask = {
      ...data,
      id: Date.now().toString(),
      status: initialStatus
    };
    dispatch(addTask(newTask));
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <ListTodo size={28} className="text-blue-600" />
          <div>
            <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight">Task Dashboard</h1>
            <p className="text-slate-400 text-xs font-medium">Monitoring workflow and productivity</p>
          </div>
        </div>
        <button 
          onClick={() => handleOpenModal('todo')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
        >
          <PlusCircle size={16} /> Add New Task
        </button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {COLUMNS.map(col => (
          <div key={col.id} className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${col.color}`} />
                <h2 className="font-bold uppercase tracking-widest text-[10px] text-slate-500">{col.title}</h2>
              </div>
              <span className="bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-[10px] font-bold">
                {tasks.filter(t => t.status === col.id).length}
              </span>
            </div>

            {/* Flexible Height Container */}
            <div className="bg-slate-200/30 p-2.5 rounded-2xl border border-slate-200/50 flex flex-col gap-2.5 h-auto">
              {tasks.filter(t => t.status === col.id).map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
              
              <button 
                onClick={() => handleOpenModal(col.id)}
                className="w-full py-2.5 border-2 border-dashed border-slate-300 rounded-xl text-slate-400 font-bold text-[10px] flex items-center justify-center gap-2 hover:border-blue-400 hover:text-blue-500 transition-all bg-white/50"
              >
                <Plus size={12} /> Add Card
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <TaskFormModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleCreateTask}
          defaultStatus={initialStatus}
        />
      )}
    </div>
  );
}