/* eslint-disable no-unused-vars */
import * as apiActions from '../api.js';
import axios from 'axios';

const api =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    if (action.type !== apiActions.apiCallBegan.type) return next(action);

    const { url, method, data, onStart, onSuccess, onError } = action.payload;

    if (onStart) dispatch({ type: onStart });

    next(action);

    try {
      const response = await axios.request({
        baseURL: 'http://localhost:1234',
        url,
        method,
        data,
      });

      // General
      dispatch(apiActions.apiCallSuccess(response.data));

      // Specific
      if (onSuccess) {
        dispatch({ type: onSuccess, payload: response.data });
      }
    } catch (error) {
      // General
      dispatch(apiActions.apiCallFailed(error.message));

      // Specific
      if (onError) {
        dispatch({ type: onError, payload: error.message });
      }
    }
  };

export default api;
