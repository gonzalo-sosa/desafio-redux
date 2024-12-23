/* eslint-disable no-unused-vars */
import { toast } from 'react-toastify';

export const toastMiddleware = (store) => (next) => (action) => {
  if (action.type === 'error') toast.error(action.payload.message);
  else return next(action);
};
