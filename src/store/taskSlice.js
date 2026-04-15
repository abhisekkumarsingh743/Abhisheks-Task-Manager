import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [
      { id: '1', title: 'Start PR Campaign', assignee: 'Abhishek', deadline: '2026-04-30', status: 'todo' },
      { id: '2', title: 'Promote Latest Offer', assignee: 'Team', deadline: '2026-04-30', status: 'running' },
      { id: '3', title: 'Modify Privacy Policy', assignee: 'Legal', deadline: '2026-04-30', status: 'completed' }
    ]
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    // Add delete/edit reducers here if needed
  }
});

export const { addTask } = taskSlice.actions;
export default taskSlice.reducer;