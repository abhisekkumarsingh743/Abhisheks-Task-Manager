import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { PlusCircle, ListTodo, Plus } from 'lucide-react';
import TaskCard from '../components/TaskCard';
import TaskFormModal from '../components/TaskFormModal';
import { addTask, updateTaskStatus } from '../store/taskSlice';

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

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }
    dispatch(updateTaskStatus({
      taskId: draggableId,
      newStatus: destination.droppableId
    }));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <ListTodo size={28} className="text-blue-600" />
          <div>
            <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight">Task Dashboard</h1>
            <p className="text-slate-400 text-xs font-medium">Monitoring workflow and productivity</p>
          </div>
        </div>
        <button onClick={() => { setInitialStatus('todo'); setIsModalOpen(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-500/20">
          <PlusCircle size={16} /> Add New Task
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
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

              <Droppable droppableId={col.id}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`p-2.5 rounded-2xl border border-slate-200/50 flex flex-col gap-2.5 h-auto transition-colors ${snapshot.isDraggingOver ? 'bg-blue-50/50 border-blue-200' : 'bg-slate-200/30'}`}
                  >
                    {tasks.filter(t => t.status === col.id).map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={snapshot.isDragging ? 'shadow-2xl' : ''}
                          >
                            <TaskCard task={task} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    <button 
                      onClick={() => { setInitialStatus(col.id); setIsModalOpen(true); }}
                      className="w-full py-2.5 border-2 border-dashed border-slate-300 rounded-xl text-slate-400 font-bold text-[10px] flex items-center justify-center gap-2 hover:border-blue-400 hover:text-blue-500 transition-all bg-white/50"
                    >
                      <Plus size={12} /> Add Card
                    </button>
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {isModalOpen && (
        <TaskFormModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={(data) => {
            dispatch(addTask({ ...data, id: Date.now().toString(), status: data.status || initialStatus }));
            setIsModalOpen(false);
          }}
          defaultStatus={initialStatus}
        />
      )}
    </div>
  );
}