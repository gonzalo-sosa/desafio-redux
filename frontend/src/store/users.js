/* eslint-disable no-unused-vars */
import { createSelector } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';
import moment from 'moment';

const userSlice = createSlice({
  name: 'users',
  initialState: { list: [], loading: false, lastFetch: null },
  reducers: {
    userAdded: (users, action) => {
      users.list.push({
        ...action.payload,
        id: Number(action.payload.id),
      });
    },
    userRemoved: (users, action) => {
      users.list = users.list.filter(
        (user) => user.id !== Number(action.payload.id),
      );
    },
    userUpdated: (users, action) => {
      let user = users.list.find(
        (user) => user.id === Number(action.payload.id),
      );
      Object.assign(user, action.payload);
    },
    allUsersRemoved: (users, action) => {
      users.list = [];
    },
    usersRequested: (users, action) => {
      users.loading = true;
    },
    usersRequestedFailed: (users, action) => {
      users.loading = false;
    },
    usersReceived: (users, action) => {
      users.list = action.payload.users;
      users.loading = false;
      users.lastFetch = Date.now();
    },
  },
});

const {
  userAdded,
  userRemoved,
  userUpdated,
  allUsersRemoved,
  usersRequested,
  usersRequestedFailed,
  usersReceived,
} = userSlice.actions;
export default userSlice.reducer;

export const getUsers = createSelector(
  (state) => state.entities.users,
  (users) => users.list,
);

export const getUserById = (state, id) =>
  getUsers(state).find((user) => user.id === id);

export const loadUsers = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.users;

  if (lastFetch) {
    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
    if (diffInMinutes < 10) return;
  }

  dispatch(
    apiCallBegan({
      url: '/users',
      method: 'get',
      onStart: usersRequested.type,
      onSuccess: usersReceived.type,
      onError: usersRequestedFailed.type,
    }),
  );
};

export const addUser = (user) =>
  apiCallBegan({
    url: '/users',
    method: 'post',
    data: user,
    onSuccess: userAdded.type,
  });

export const removeUser = (user) =>
  apiCallBegan({
    url: `/users/${user.id}`,
    method: 'delete',
    data: user,
    onSuccess: userRemoved.type,
  });

export const updateUser = (user) =>
  apiCallBegan({
    url: `/users/${user.id}`,
    method: 'patch',
    data: user,
    onSuccess: userUpdated.type,
  });

export const removeAllUsers = () => (dispatch) => {
  dispatch(allUsersRemoved());
};
