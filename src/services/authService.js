import http from './httpService';
import { jwtDecode } from 'jwt-decode';

const apiEndpoint = `${import.meta.env.REACT_APP_API_URL}/auth`;
const tokenKey = 'token';

http.setJwt(getJwt());

async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
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
  } catch (error) {
    console.log(error);
    return null;
  }
}

function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
