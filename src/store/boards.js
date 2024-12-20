import { createSelector } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';

let lastId = 0;

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
      let { id } = board;
      board = { ...board, ...action.payload, id };
    },
    boardRemoved: (boards, action) => {
      boards.list = boards.list.filter(
        (board) => board.id !== action.payload.id,
      );
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
  boardsReceived,
  boardsRequested,
  boardsRequestedFailed,
} = boardSlice.actions;
export default boardSlice.reducer;

export const getBoards = createSelector(
  (state) => state.boards,
  (boards) => boards.list,
);

export const loadBoards = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;

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

const url = '/boards';

export const addBoard = (board) =>
  apiCallBegan({
    url: '/boards',
    method: 'post',
    data: board,
    onSuccess: boardAdded.type,
  });

export const updateBoard = (id, board) =>
  apiCallBegan({
    url: `/boards/${id}`,
    method: 'patch',
    data: board,
    onSuccess: boardUpdated.type,
  });

export const removeBoard = (id) =>
  apiCallBegan({
    url: `/boards/${id}`,
    method: 'delete',
    data: { id },
    onSuccess: boardRemoved.type,
  });