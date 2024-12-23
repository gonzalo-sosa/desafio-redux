/* eslint-disable no-unused-vars */
import { toast } from 'react-toastify';
import * as actions from '../toast.js';

const toastMiddleware = (store) => (next) => (action) => {
  if (action.type === actions.notifyErrorToast.type) {
    toast.error(action.payload.message);
  }
  if (action.type === actions.notifyToast.type) {
    toast(action.payload.message);
  }
  return next(action);
};

export default toastMiddleware;
