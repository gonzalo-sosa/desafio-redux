import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL = import.meta.env.PUBLIC_API_URL;

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
