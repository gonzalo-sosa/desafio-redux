import { combineReducers } from '@reduxjs/toolkit';
import usersReducer from './users.js';
import boardsReducer from './boards.js';
import tasksReducer from './tasks.js';
import cardsReducer from './cards.js';

export default combineReducers({
  users: usersReducer,
  boards: boardsReducer,
  tasks: tasksReducer,
  cards: cardsReducer,
});
