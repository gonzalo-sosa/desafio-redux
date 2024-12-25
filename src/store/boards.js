/* eslint-disable no-unused-vars */
import { createSelector } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';
import moment from 'moment';

let lastId = 2;

const boardSlice = createSlice({
  name: 'boards',
  initialState: { list: [], loading: false, lastFetch: null },
  reducers: {
    boardAdded: (boards, action) => {
      const board = { ...action.payload, id: ++lastId };
      boards.list.push(board);
    },
    boardUpdated: (boards, action) => {
      let board = boards.list.find((board) => board.id === action.payload.id);
      Object.assign(board, action.payload);
    },
    boardRemoved: (boards, action) => {
      boards.list = boards.list.filter(
        (board) => board.id !== action.payload.id,
      );
    },
    allBoardsRemovedFromUser: (boards, action) => {
      boards.list = boards.list.filter(
        (board) => board.userId !== action.payload.id,
      );
    },
    allBoardsRemoved: (boards, action) => {
      boards.list = [];
      lastId = 0;
    },
    boardsRequested: (boards, action) => {
      boards.loading = true;
    },
    boardsReceived: (boards, action) => {
      boards.list = action.payload;
      boards.loading = false;
      boards.lastFetch = Date.now();
    },
    boardsRequestedFailed: (boards, action) => {
      boards.loading = false;
    },
  },
});

const {
  boardAdded,
  boardUpdated,
  boardRemoved,
  allBoardsRemovedFromUser,
  allBoardsRemoved,
  boardsReceived,
  boardsRequested,
  boardsRequestedFailed,
} = boardSlice.actions;
export default boardSlice.reducer;

const url = '/boards';

export const loadBoards = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.boards;

  if (lastFetch) {
    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
    if (diffInMinutes < 10) return;
  }

  return dispatch(
    apiCallBegan({
      url,
      method: 'get',
      onStart: boardsRequested.type,
      onSuccess: boardsReceived.type,
      onError: boardsRequestedFailed.type,
    }),
  );
};

export const addBoard = (board) => (dispatch) => {
  dispatch(boardAdded(board));
};

/*
apiCallBegan({
  url,
  method: 'post',
  data: board,
  onSuccess: boardAdded.type,
});
*/

export const updateBoard = (board) => (dispatch) => {
  dispatch(boardUpdated(board));
};

/*
apiCallBegan({
    url: `${url}/${id}`,
    method: 'patch',
    data: board,
    onSuccess: boardUpdated.type,
});
*/

export const removeBoard = (id) => (dispatch) => {
  dispatch(boardRemoved({ id }));
};

/*
apiCallBegan({
    url: `${url}/${id}`,
    method: 'delete',
    data: { id },
    onSuccess: boardRemoved.type,
});
*/

export const removeAllBoardsFromUser = (id) => (dispatch) => {
  dispatch(allBoardsRemovedFromUser({ id }));
};

export const removeAllBoards = () => (dispatch) => {
  dispatch(allBoardsRemoved());
};

export const getBoards = createSelector(
  (state) => state.entities.boards,
  (boards) => boards.list,
);

export const getBoardsByUserId = (state, userId) =>
  getBoards(state).filter((board) => board.userId === userId);
