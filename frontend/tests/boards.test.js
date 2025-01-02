import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureStore from '@/store/configureStore';
import {
  addBoard,
  updateBoard,
  removeBoard,
  removeAllBoards,
  removeAllBoardsFromUser,
  getBoards,
  getBoardById,
  getBoardsByUserId,
} from '@/store/boards';

describe('BoardSlice', () => {
  let store;
  let fakeAxios;

  beforeEach(async () => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });

  afterEach(() => {
    store.dispatch(removeAllBoards());
  });

  const createState = (list = []) => ({
    entities: {
      boards: {
        list,
      },
    },
  });

  it('should add a board', async () => {
    const board = { name: 'a', id: 1 };
    fakeAxios.onPost('/boards').reply(200, board);

    await store.dispatch(addBoard(board));

    expect(getBoards(store.getState())).toHaveLength(1);
    expect(getBoards(store.getState())).toContainEqual(board);
  });

  it('should remove a board', async () => {
    const board = { name: 'a', id: 1 };
    fakeAxios.onDelete('/boards/1').reply(200);

    await store.dispatch(addBoard(board));
    await store.dispatch(removeBoard(1));

    expect(getBoards(store.getState())).toHaveLength(0);
    expect(getBoards(store.getState())).not.toContainEqual(board);
  });

  it('should update a board', async () => {
    const board = { name: 'a', id: 1 };
    const boardUpdated = { name: 'b', id: 1 };
    fakeAxios.onPost('/boards').reply(200, board);
    fakeAxios.onPatch('/boards/1').reply(200, boardUpdated);

    await store.dispatch(addBoard(board));
    await store.dispatch(updateBoard(boardUpdated));

    expect(getBoards(store.getState())).toHaveLength(1);
    expect(getBoards(store.getState())).toContainEqual({ ...board, name: 'b' });
  });

  // it('should remove all boards', () => {
  //   const board1 = { name: 'a', id: 1 };
  //   const board2 = { name: 'a', id: 2 };

  //   store.dispatch(addBoard(board1));
  //   store.dispatch(addBoard(board2));

  //   store.dispatch(removeAllBoards());

  //   expect(getBoards(store.getState())).toHaveLength(0);
  // });

  // it('should remove all boards from a user', () => {
  //   const board1 = { name: 'a', id: 1, userId: 1 };
  //   const board2 = { name: 'a', id: 2, userId: 1 };
  //   const board3 = { name: 'a', id: 3, userId: 2 };

  //   store.dispatch(addBoard(board1));
  //   store.dispatch(addBoard(board2));
  //   store.dispatch(addBoard(board3));

  //   store.dispatch(removeAllBoardsFromUser(1));

  //   expect(getBoards(store.getState())).toHaveLength(1);
  //   expect(getBoards(store.getState())).toContainEqual(board3);
  // });

  describe('selectores', () => {
    it('should get board by id', () => {
      const board1 = { name: 'a', id: 1 };
      const board2 = { name: 'b', id: 2 };
      const state = createState([board1, board2]);

      const result1 = getBoardById(state, 1);
      const result2 = getBoardById(state, 2);

      expect(result1).toEqual(board1);
      expect(result2).toEqual(board2);
    });

    it('should get all boards', () => {
      const board1 = { name: 'a', id: 1 };
      const board2 = { name: 'a', id: 2 };
      const state = createState([board1, board2]);

      const result = getBoards(state);

      expect(result).toHaveLength(2);
      expect(result).toContainEqual(board1);
      expect(result).toContainEqual(board2);
    });

    it('should get all boards by user id', () => {
      const board1 = { name: 'a', id: 1, userId: 1 };
      const board2 = { name: 'a', id: 2, userId: 1 };
      const board3 = { name: 'a', id: 3, userId: 2 };
      const state = createState([board1, board2, board3]);

      const result1 = getBoardsByUserId(state, 1);
      const result2 = getBoardsByUserId(state, 2);

      expect(result1).toHaveLength(2);
      expect(result1).toContainEqual(board1);
      expect(result1).toContainEqual(board2);
      expect(result2).toHaveLength(1);
      expect(result2).toContainEqual(board3);
    });
  });
});
