import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { updateTaskStatus } from '../store/taskSlice';
import TaskCard from '../components/TaskCard';
import TaskFormModal from '../components/TaskFormModal';
import { Plus, LayoutGrid } from 'lucide-react';

const COLUMNS = [
  { id: 'todo', title: 'To Do', accent: 'border-t-slate-400' },
  { id: 'running', title: 'In Progress', accent: 'border-t-blue-500' },
  { id: 'completed', title: 'Completed', accent: 'border-t-emerald-500' }
];

export default function Dashboard() {
  const tasks = useSelector(state => state.tasks.tasks);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTask, setActiveTask] = useState(null);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    dispatch(updateTaskStatus({
      taskId: result.draggableId,
      newStatus: result.destination.droppableId
    }));
  };

  const handleOpenModal = (task = null, status = 'todo') => {
    setActiveTask(task ? task : { status });
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 sm:p-8 max-w-[1600px] mx-auto">
      <header className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-white flex items-center gap-3">
            <LayoutGrid className="text-blue-600" /> Dashboard
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Track and organize your project sprints</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-500/30 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <Plus size={20} /> Create New Task
        </button>
      </header>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 custom-scrollbar">
          {COLUMNS.map(col => (
            <Droppable key={col.id} droppableId={col.id}>
              {(provided, snapshot) => (
                <div 
                  {...provided.droppableProps} 
                  ref={provided.innerRef}
                  className={`flex flex-col rounded-3xl p-5 border-t-4 ${col.accent} bg-slate-200/40 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 transition-colors ${snapshot.isDraggingOver ? 'ring-2 ring-blue-500/20 bg-slate-200/60 dark:bg-slate-800/60' : ''}`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest text-xs">{col.title}</h2>
                    <span className="bg-white dark:bg-slate-800 text-slate-500 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                      {tasks.filter(t => t.status === col.id).length}
                    </span>
                  </div>

                  <div className="space-y-4 flex-1">
                    {tasks.filter(t => t.status === col.id).map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => handleOpenModal(task)}
                          >
                            <TaskCard task={task} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>

                  <button 
                    onClick={() => handleOpenModal(null, col.id)}
                    className="mt-6 w-full py-3 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500 font-bold text-sm hover:border-blue-400 hover:text-blue-500 transition-all"
                  >
                    + Add Card
                  </button>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      <TaskFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialData={activeTask} 
      />
    </div>
  );
}