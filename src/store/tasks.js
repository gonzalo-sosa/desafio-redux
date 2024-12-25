import { createSelector } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

let lastId = 0;

const taskSlice = createSlice({
  name: 'tasks',
  initialState: { list: [] },
  reducers: {
    taskAdded: (tasks, action) => {
      const task = { ...action.payload, id: ++lastId };
      tasks.list.push(task);
    },
    taskRemoved: (tasks, action) => {
      tasks.list = tasks.list.filter((task) => task.id !== action.payload.id);
    },
    taskUpdated: (tasks, action) => {
      let task = tasks.list.find((task) => task.id === action.payload.id);
      Object.assign(task, action.payload);
    },
    allTasksRemovedFromBoard: (tasks, action) => {
      const { boardId } = action.payload;
      tasks.list = tasks.list.filter((task) => task.boardId !== boardId);
    },
    allTasksRemoved: (tasks) => {
      tasks.list = [];
      lastId = 0;
    },
  },
});

const {
  taskAdded,
  taskRemoved,
  taskUpdated,
  allTasksRemovedFromBoard,
  allTasksRemoved,
} = taskSlice.actions;
export default taskSlice.reducer;

export const getTasks = createSelector(
  (state) => state.entities.tasks,
  (tasks) => tasks.list,
);

export const getTasksByBoardId = (state, boardId) =>
  getTasks(state).filter((task) => task.boardId === boardId);

export const addTask = (task) => (dispatch) => {
  dispatch(taskAdded(task));
};

export const removeTask = (task) => (dispatch) => {
  dispatch(taskRemoved(task));
};

export const updateTask = (task) => (dispatch) => {
  dispatch(taskUpdated(task));
};

export const removeAllTasksFromBoard = (task) => (dispatch) => {
  dispatch(allTasksRemovedFromBoard(task));
};

export const removeAllTasks = () => (dispatch) => {
  dispatch(allTasksRemoved());
};
