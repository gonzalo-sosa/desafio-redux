/* eslint-disable no-unused-vars */
import { jwtDecode } from 'jwt-decode';
import * as actions from '../auth.js';

const TOKEN_KEY = 'jwt-token';

export const logout = (store) => (next) => (action) => {
  if (action.type === actions.logout.type) {
    localStorage.removeItem(TOKEN_KEY);
  }
  return next(action);
};

export const login = (store) => (next) => (action) => {
  if (action.type === actions.login.type) {
    localStorage.setItem(TOKEN_KEY, action.payload.token);
  }
  return next(action);
};

export const register = (store) => (next) => (action) => {
  if (action.type === actions.register.type) {
    localStorage.setItem(TOKEN_KEY, action.payload.token);
  }
  return next(action);
};

export const checkToken =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type !== actions.checkToken.type) return next(action);

    let token = localStorage.getItem(TOKEN_KEY);
    token ??= jwtDecode(token);

    if (token) {
      dispatch(actions.login({ token }));
    }
    return next(action);
  };
