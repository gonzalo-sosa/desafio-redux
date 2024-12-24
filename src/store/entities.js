import { combineReducers } from '@reduxjs/toolkit';
import boardsReducer from './boards.js';
import tasksReducer from './tasks.js';
import usersReducer from './users.js';

export default combineReducers({
  boards: boardsReducer,
  tasks: tasksReducer,
  users: usersReducer,
});
