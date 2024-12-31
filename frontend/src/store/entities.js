import { combineReducers } from '@reduxjs/toolkit';
import usersReducer from './users.js';
import boardsReducer from './boards.js';
import listsReducer from './lists.js';
import cardsReducer from './cards.js';

export default combineReducers({
  users: usersReducer,
  boards: boardsReducer,
  lists: listsReducer,
  cards: cardsReducer,
});
