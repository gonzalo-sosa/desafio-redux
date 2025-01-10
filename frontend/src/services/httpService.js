import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../config';

axios.defaults.baseURL = config.api_url;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Interceptor para errores inesperados
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    toast.error('An unexpected error occurred.');
  }

  return Promise.reject(error);
});

// Configurar los headers por defecto
function setJwt(jwt) {
  axios.defaults.headers.common['x-auth-token'] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
