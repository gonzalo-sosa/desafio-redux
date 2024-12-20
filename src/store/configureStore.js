import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer.js';
import api from './middleware/api.js';

export default function () {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api),
  });
}
