/* eslint-disable no-unused-vars */
import { createSelector } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

let lastId = 0;

const userSlice = createSlice({
  name: 'users',
  initialState: { list: [] },
  reducers: {
    userAdded: (users, action) => {
      users.list.push({ ...action.payload, id: ++lastId });
    },
    userRemoved: (users, action) => {
      users.list = users.list.filter((user) => user.id !== action.payload.id);
    },
    userUpdated: (users, action) => {
      let user = users.list.find((user) => user.id === action.payload.id);
      Object.assign(user, action.payload);
    },
    allUsersRemoved: (users, action) => {
      users.list = [];
      lastId = 0;
    },
  },
});

const { userAdded, userRemoved, userUpdated, allUsersRemoved } =
  userSlice.actions;
export default userSlice.reducer;

export const getUsers = createSelector(
  (state) => state.entities.users,
  (users) => users.list,
);

export const getUserById = (state, id) =>
  getUsers(state).find((user) => user.id === id);

export const addUser = (user) => (dispatch) => {
  dispatch(userAdded(user));
};

export const removeUser = (user) => (dispatch) => {
  dispatch(userRemoved(user));
};

export const updateUser = (user) => (dispatch) => {
  dispatch(userUpdated(user));
};

export const removeAllUsers = () => (dispatch) => {
  dispatch(allUsersRemoved());
};
