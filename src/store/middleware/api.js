/* eslint-disable no-unused-vars */
import * as apiActions from '../api.js';
import * as toastActions from '../toast.js';

const api =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    if (action.type !== apiActions.apiCallBegan.type) return next(action);

    const { url, method, data, onStart, onSuccess, onError } = action.payload;

    if (onStart) dispatch({ type: onStart });

    next(action);

    const responses = {
      get: {
        data: [
          { id: 1, title: 'Board 1' },
          { id: 2, title: 'Board 2' },
        ],
      },
      post: {
        data,
      },
      patch: {
        data,
      },
      delete: {
        data,
      },
    };

    const getData = (method) => responses[method];

    try {
      const response = await Promise.resolve(getData(method));
      // const response = await axios.request({
      //   baseURL: 'http://localhost:9001/api',
      //   url,
      //   method,
      //   data,
      // });

      // General
      dispatch(apiActions.apiCallSuccess(response.data));

      // Specific
      if (onSuccess) {
        dispatch({ type: onSuccess, payload: response.data });
        dispatch(toastActions.notifyToast({ message: 'Success' }));
      }
    } catch (error) {
      // General
      dispatch(apiActions.apiCallFailed(error.message));

      // Specific
      if (onError) {
        dispatch({ type: onError, payload: error.message });
        dispatch(toastActions.notifyErrorToast({ message: error.message }));
      }
    }
  };

export default api;
