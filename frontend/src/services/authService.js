// import config from '../config';
import http from './httpService';
import { jwtDecode } from 'jwt-decode';

const tokenKey = 'token';

http.setJwt(getJwt());

function register(user) {
  return http.post('/register', {
    email: user.email,
    password: user.password,
  });
}

async function login(email, password) {
  const { data } = await http.post('/login', { email, password });

  const jwt = data.jwt;
  localStorage.setItem(tokenKey, jwt);
}

function logout() {
  localStorage.removeItem(tokenKey);
}

function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return null;
  }
}

function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  register,
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
