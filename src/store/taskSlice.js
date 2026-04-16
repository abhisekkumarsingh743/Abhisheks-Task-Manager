import { configureStore, createSlice } from '@reduxjs/toolkit';

// --- Hard-coded Defaults ---
const defaultTasks = [
  { id: '1', title: 'Start PR Campaign', assignee: 'Abhishek', deadline: '2026-04-30', status: 'todo' },
  { id: '2', title: 'Promote Latest Offer', assignee: 'Team', deadline: '2026-04-30', status: 'running' },
  { id: '3', title: 'Modify Privacy Policy', assignee: 'Legal', deadline: '2026-04-30', status: 'completed' }
];

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('abhishek_tasks');
    return serializedState ? JSON.parse(serializedState) : defaultTasks;
  } catch (e) {
    return defaultTasks;
  }
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState: { tasks: loadState() },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },
    updateTaskStatus: (state, action) => {
      const { taskId, newStatus } = action.payload;
      const task = state.tasks.find(t => t.id === taskId);
      if (task) task.status = newStatus;
    }
  }
});

const persistenceMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  localStorage.setItem('abhishek_tasks', JSON.stringify(state.tasks.tasks));
  return result;
};

export const store = configureStore({
  reducer: { tasks: taskSlice.reducer },
  middleware: (getDefault) => getDefault().concat(persistenceMiddleware)
});

export const { addTask, deleteTask, updateTaskStatus } = taskSlice.actions;