import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureStore from '@/store/configureStore';
import {
  addUser,
  updateUser,
  removeUser,
  removeAllUsers,
  getUsers,
  getUserById,
} from '@/store/users';

describe('UserSlice', () => {
  let store;
  let fakeAxios;

  beforeEach(async () => {
    store = configureStore();
    fakeAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    store.dispatch(removeAllUsers());
  });

  const createState = (list = []) => ({
    entities: {
      users: {
        list,
      },
    },
  });

  it('should add an user', async () => {
    const user = { name: 'a' };
    fakeAxios.onPost('/users').reply(200, user);

    await store.dispatch(addUser(user));

    expect(getUsers(store.getState())).toHaveLength(1);
  });

  it('should remove an user', async () => {
    const user = { name: 'a', id: 1 };
    fakeAxios.onDelete('/users/1').reply(200);

    await store.dispatch(addUser(user));
    await store.dispatch(removeUser({ id: 1 }));

    expect(getUsers(store.getState())).toHaveLength(0);
  });

  it('should update an user', async () => {
    const user = { name: 'a', id: 1 };
    const updatedUser = { ...user, name: 'b' };
    fakeAxios.onPost('/users').reply(200, user);
    fakeAxios.onPatch('/users/1').reply(200, updatedUser);

    await store.dispatch(addUser(user));
    await store.dispatch(updateUser(updatedUser));

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
      const state = createState([
        { name: 'a', id: 1 },
        { name: 'b', id: 2 },
        { name: 'c', id: 3 },
      ]);

      const result = getUsers(state);

      expect(result).toHaveLength(3);
    });

    it('should get user by id', () => {
      const state = createState([
        { name: 'a', id: 1 },
        { name: 'b', id: 2 },
      ]);

      const result = getUserById(state, 1);

      expect(result).toEqual({ name: 'a', id: 1 });
    });
  });
});
