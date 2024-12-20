import { createSlice } from '@reduxjs/toolkit';

let lastId = 0;

const taskSlice = createSlice({
  name: 'tasks',
  initialState: { list: [] },
  reducers: {
    addTask: (tasks, action) => {
      const task = { ...action.payload, id: ++lastId };
      tasks.list.push(task);
    },
    removeTask: (tasks, action) => {
      tasks.list = tasks.list.filter((task) => task.id !== action.payload.id);
    },
    addTaskToBoard: (tasks, action) => {
      const { boardId, taskId } = action.payload;
      const task = tasks.list.find((task) => task.id === taskId);
      task.boardId = boardId;
    },
  },
});

export const { addTask, removeTask } = taskSlice.actions;
export default taskSlice.reducer;
