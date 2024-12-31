import { createAction } from '@reduxjs/toolkit';

export const logout = createAction('auth/Logout');
export const login = createAction('auth/Login');
export const register = createAction('auth/Register');
export const checkToken = createAction('auth/CheckToken');
