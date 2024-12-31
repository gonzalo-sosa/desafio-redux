import { describe, it, expect, beforeEach, afterEach } from 'vitest';
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

  beforeEach(() => {
    store = configureStore();
  });

  afterEach(() => {
    store.dispatch(removeAllBoards());
  });

  it('should add a board', () => {
    const board = { name: 'a', id: 1 };

    store.dispatch(addBoard(board));

    expect(getBoards(store.getState())).toHaveLength(1);
    expect(getBoards(store.getState())).toContainEqual(board);
  });

  it('should remove a board', () => {
    const board = { name: 'a', id: 1 };

    store.dispatch(addBoard(board));
    store.dispatch(removeBoard(1));

    expect(getBoards(store.getState())).toHaveLength(0);
    expect(getBoards(store.getState())).not.toContainEqual(board);
  });

  it('should update a board', () => {
    const board = { name: 'a', id: 1 };
    const boardUpdated = { name: 'b', id: 1 };

    store.dispatch(addBoard(board));
    store.dispatch(updateBoard(boardUpdated));

    expect(getBoards(store.getState())).toHaveLength(1);
    expect(getBoards(store.getState())).toContainEqual({ ...board, name: 'b' });
  });

  it('should remove all boards', () => {
    const board1 = { name: 'a', id: 1 };
    const board2 = { name: 'a', id: 2 };

    store.dispatch(addBoard(board1));
    store.dispatch(addBoard(board2));

    store.dispatch(removeAllBoards());

    expect(getBoards(store.getState())).toHaveLength(0);
  });

  it('should remove all boards from a user', () => {
    const board1 = { name: 'a', id: 1, userId: 1 };
    const board2 = { name: 'a', id: 2, userId: 1 };
    const board3 = { name: 'a', id: 3, userId: 2 };

    store.dispatch(addBoard(board1));
    store.dispatch(addBoard(board2));
    store.dispatch(addBoard(board3));

    store.dispatch(removeAllBoardsFromUser(1));

    expect(getBoards(store.getState())).toHaveLength(1);
    expect(getBoards(store.getState())).toContainEqual(board3);
  });

  describe('selectores', () => {
    it('should get board by id', () => {
      const board1 = { name: 'a', id: 1 };
      const board2 = { name: 'b', id: 2 };

      store.dispatch(addBoard(board1));
      store.dispatch(addBoard(board2));

      expect(getBoardById(store.getState(), 1)).toEqual(board1);
      expect(getBoardById(store.getState(), 2)).toEqual(board2);
    });

    it('should get all boards', () => {
      const board1 = { name: 'a', id: 1 };
      const board2 = { name: 'a', id: 2 };

      store.dispatch(addBoard(board1));
      store.dispatch(addBoard(board2));

      expect(getBoards(store.getState())).toHaveLength(2);
      expect(getBoards(store.getState())).toContainEqual(board1);
      expect(getBoards(store.getState())).toContainEqual(board2);
    });

    it('should get all boards by user id', () => {
      const board1 = { name: 'a', id: 1, userId: 1 };
      const board2 = { name: 'a', id: 2, userId: 1 };
      const board3 = { name: 'a', id: 3, userId: 2 };

      store.dispatch(addBoard(board1));
      store.dispatch(addBoard(board2));
      store.dispatch(addBoard(board3));

      expect(getBoardsByUserId(store.getState(), 1)).toHaveLength(2);
      expect(getBoardsByUserId(store.getState(), 1)).toContainEqual(board1);
      expect(getBoardsByUserId(store.getState(), 1)).toContainEqual(board2);

      expect(getBoardsByUserId(store.getState(), 2)).toHaveLength(1);
      expect(getBoardsByUserId(store.getState(), 2)).toContainEqual(board3);
    });
  });
});
