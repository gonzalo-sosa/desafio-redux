import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import configureStore from '../src/store/configureStore';
import {
  addUser,
  updateUser,
  removeUser,
  removeAllUsers,
  getUsers,
  getUserById,
} from '../src/store/users';

describe('UserSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore();
  });

  afterEach(() => {
    store.dispatch(removeAllUsers());
  });

  it('should add an user', () => {
    const user = { name: 'a' };

    store.dispatch(addUser(user));

    expect(getUsers(store.getState())).toHaveLength(1);
  });

  it('should remove an user', () => {
    const user = { name: 'a', id: 1 };

    store.dispatch(addUser(user));
    store.dispatch(removeUser({ id: 1 }));

    expect(getUsers(store.getState())).toHaveLength(0);
  });

  it('should update an user', () => {
    const user = { name: 'a', id: 1 };
    const updatedUser = { ...user, name: 'b', id: 1 };

    store.dispatch(addUser(user));
    store.dispatch(updateUser(updatedUser));

    expect(getUsers(store.getState())).toContainEqual(updatedUser);
  });

  it('should remove all users', () => {
    const user1 = { name: 'a', id: 1 };
    const user2 = { name: 'a', id: 2 };

    store.dispatch(addUser(user1));
    store.dispatch(addUser(user2));

    store.dispatch(removeAllUsers());

    expect(getUsers(store.getState())).toHaveLength(0);
  });

  describe('selectors', () => {
    it('should get all users', () => {
      const user1 = { name: 'a', id: 1 };
      const user2 = { name: 'a', id: 2 };

      store.dispatch(addUser(user1));
      store.dispatch(addUser(user2));

      expect(getUsers(store.getState())).toHaveLength(2);
    });

    it('should get user by id', () => {
      const user1 = { name: 'a', id: 1 };
      const user2 = { name: 'a', id: 2 };

      store.dispatch(addUser(user1));
      store.dispatch(addUser(user2));

      expect(getUserById(store.getState(), 1)).toEqual(user1);
      expect(getUserById(store.getState(), 2)).toEqual(user2);
    });
  });
});
