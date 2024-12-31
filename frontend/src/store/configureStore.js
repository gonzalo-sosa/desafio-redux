import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer.js';
import api from './middleware/api.js';
// import auth from './middleware/auth.js';
import toast from './middleware/toast.js';

export default function () {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api, toast),
  });
}
