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
    userDeleted: (users, action) => {
      users.list = users.list.filter((user) => user.id !== action.payload.id);
    },
    userUpdated: (users, action) => {
      let user = users.list.find((user) => user.id === action.payload.id);
      Object.assign(user, action.payload);
    },
  },
});

const { userAdded, userDeleted, userUpdated } = userSlice.actions;
export default userSlice.reducer;

export const getUsers = createSelector(
  (state) => state.entities.users,
  (users) => users.list,
);

export const addUser = (user) => (dispatch) => {
  dispatch(userAdded(user));
};

export const removeUser = (user) => (dispatch) => {
  dispatch(userDeleted(user));
};

export const updateUser = (user) => (dispatch) => {
  dispatch(userUpdated(user));
};
