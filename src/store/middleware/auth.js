/* eslint-disable no-unused-vars */
import { createAction } from '@reduxjs/toolkit';

export const logout = createAction('auth/Logout');
export const login = createAction('auth/Login');
export const register = createAction('auth/Register');

export const logoutMiddleware = (store) => (next) => (action) => {
  if (action.type === logout.type) {
    localStorage.removeItem('jwt-token');
  }
  return next(action);
};

export const authMiddleware = (store) => (next) => (action) => {
  if (action.type === login.type || action.type === register.type) {
    localStorage.setItem('jwt-token', action.payload.token);
  }
  return next(action);
};

// export const checkAuth = () => (dispatch) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     dispatch(login(token));
//   }
// };
