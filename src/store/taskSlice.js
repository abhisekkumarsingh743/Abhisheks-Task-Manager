import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [
    { id: '1', title: 'Start PR Campaign', assignee: 'Abhishek', status: 'todo', deadline: '2026-04-30' },
    { id: '2', title: 'Promote Latest Offer', assignee: 'Team', status: 'running', deadline: '2026-04-30' },
    { id: '3', title: 'Modify Privacy Policy', assignee: 'Legal', status: 'completed', deadline: '2026-04-30' }
  ],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // Action to add or update task data
    upsertTask: (state, action) => {
      const index = state.tasks.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      } else {
        state.tasks.push({ ...action.payload, id: Date.now().toString() });
      }
    },
    // Action to handle drag and drop status updates
    updateTaskStatus: (state, action) => {
      const { taskId, newStatus } = action.payload;
      const task = state.tasks.find(t => t.id === taskId);
      if (task) task.status = newStatus;
    }
  }
});

export const { upsertTask, updateTaskStatus } = taskSlice.actions;
export default taskSlice.reducer;