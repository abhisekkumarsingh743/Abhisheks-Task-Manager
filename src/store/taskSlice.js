import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [
      { id: '1', title: 'Start PR Campaign', assignee: 'Abhishek', deadline: '2026-04-30', time: '10:00', status: 'todo' },
      { id: '2', title: 'Promote Latest Offer', assignee: 'Team', deadline: '2026-04-30', time: '14:30', status: 'running' },
      { id: '3', title: 'Modify Privacy Policy', assignee: 'Legal', deadline: '2026-04-30', time: '09:00', status: 'completed' }
    ]
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTaskStatus: (state, action) => {
      const { taskId, newStatus } = action.payload;
      const task = state.tasks.find(t => t.id === taskId);
      if (task) {
        task.status = newStatus;
      }
    }
  }
});

export const { addTask, updateTaskStatus } = taskSlice.actions;
export default taskSlice.reducer;