import { createSelector } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';
import moment from 'moment';

const listSlice = createSlice({
  name: 'lists',
  initialState: { list: [], loading: false, lastFetch: null },
  reducers: {
    listAdded: (lists, action) => {
      const list = { ...action.payload, id: Number(action.payload.id) };
      lists.list.push(list);
    },
    listRemoved: (lists, action) => {
      lists.list = lists.list.filter(
        (list) => list.id !== Number(action.payload.id),
      );
    },
    listUpdated: (lists, action) => {
      let list = lists.list.find(
        (list) => list.id === Number(action.payload.id),
      );
      Object.assign(list, action.payload);
    },
    allListsRemovedFromBoard: (lists, action) => {
      const { boardId } = action.payload;
      lists.list = lists.list.filter(
        (list) => list.board_id !== Number(boardId),
      );
    },
    allListsRemoved: (lists) => {
      lists.list = [];
    },
    listsRequested: (lists) => {
      lists.loading = true;
    },
    listsReceived: (lists, action) => {
      lists.list = action.payload.lists;
      lists.loading = false;
      lists.lastFetch = Date.now();
    },
    listsRequestFailed: (lists) => {
      lists.loading = false;
    },
  },
});

const {
  listAdded,
  listRemoved,
  listUpdated,
  allListsRemovedFromBoard,
  allListsRemoved,
  listsRequested,
  listsReceived,
  listsRequestFailed,
} = listSlice.actions;
export default listSlice.reducer;

export const getLists = createSelector(
  (state) => state.entities.lists,
  (lists) => lists.list,
);

export const getListsByBoardId = (state, boardId) =>
  getLists(state).filter((list) => list.board_id === boardId);

const url = '/lists';

export const loadLists = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.lists;

  if (lastFetch) {
    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
    if (diffInMinutes < 10) return;
  }

  return dispatch(
    apiCallBegan({
      url,
      method: 'get',
      onStart: listsRequested.type,
      onSuccess: listsReceived.type,
      onError: listsRequestFailed.type,
    }),
  );
};

export const addList = (list) =>
  apiCallBegan({
    url,
    method: 'post',
    data: list,
    onSuccess: listAdded.type,
  });

export const removeList = (list) =>
  apiCallBegan({
    url: `${url}/${list.id}`,
    method: 'delete',
    data: list,
    onSuccess: listRemoved.type,
  });

export const updateList = (list) =>
  apiCallBegan({
    url: `${url}/${list.id}`,
    method: 'patch',
    data: list,
    onSuccess: listUpdated.type,
  });

export const removeAllListsFromBoard = (list) => (dispatch) => {
  dispatch(allListsRemovedFromBoard(list));
};

export const removeAllLists = () => (dispatch) => {
  dispatch(allListsRemoved());
};
