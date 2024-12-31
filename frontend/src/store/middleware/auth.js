import { jwtDecode } from 'jwt-decode';
import * as actions from '../auth.js';

const TOKEN_KEY = 'jwt-token';

const auth = (store) => (next) => (action) => {
  switch (action.type) {
    case actions.logout.type:
      localStorage.removeItem(TOKEN_KEY);
      break;
    case actions.login.type:
      localStorage.setItem(TOKEN_KEY, action.payload.token);
      break;
    case actions.register.type:
      localStorage.setItem(TOKEN_KEY, action.payload.token);
      break;
    case actions.checkToken.type: {
      let token = localStorage.getItem(TOKEN_KEY);
      token ??= jwtDecode(token);

      if (token) {
        store.dispatch(actions.login({ token }));
      }
      break;
    }
    default:
      break;
  }
  return next(action);
};

export default auth;
