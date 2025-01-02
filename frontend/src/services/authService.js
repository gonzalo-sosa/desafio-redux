import http from './httpService';
import { jwtDecode } from 'jwt-decode';

const apiEndpoint = `${import.meta.env.PUBLIC_API_URL}/login`;
const tokenKey = 'token';

http.setJwt(getJwt());

async function login(email, password) {
  const { error, data } = await http.post(apiEndpoint, { email, password });

  if (error) {
    throw error;
  }

  const { jwt } = data;
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
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
