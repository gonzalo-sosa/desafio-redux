import { createSelector } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

let lastId = 0;

const listSlice = createSlice({
  name: 'lists',
  initialState: { list: [] },
  reducers: {
    listAdded: (lists, action) => {
      const list = { ...action.payload, id: ++lastId };
      lists.list.push(list);
    },
    listRemoved: (lists, action) => {
      lists.list = lists.list.filter((list) => list.id !== action.payload.id);
    },
    listUpdated: (lists, action) => {
      let list = lists.list.find((list) => list.id === action.payload.id);
      Object.assign(list, action.payload);
    },
    allListsRemovedFromBoard: (lists, action) => {
      const { boardId } = action.payload;
      lists.list = lists.list.filter((list) => list.boardId !== boardId);
    },
    allListsRemoved: (lists) => {
      lists.list = [];
      lastId = 0;
    },
  },
});

const {
  listAdded,
  listRemoved,
  listUpdated,
  allListsRemovedFromBoard,
  allListsRemoved,
} = listSlice.actions;
export default listSlice.reducer;

export const getLists = createSelector(
  (state) => state.entities.lists,
  (lists) => lists.list,
);

export const getListsByBoardId = (state, boardId) =>
  getLists(state).filter((list) => list.boardId === boardId);

export const addList = (list) => (dispatch) => {
  dispatch(listAdded(list));
};

export const removeList = (list) => (dispatch) => {
  dispatch(listRemoved(list));
};

export const updateList = (list) => (dispatch) => {
  dispatch(listUpdated(list));
};

export const removeAllListsFromBoard = (list) => (dispatch) => {
  dispatch(allListsRemovedFromBoard(list));
};

export const removeAllLists = () => (dispatch) => {
  dispatch(allListsRemoved());
};
