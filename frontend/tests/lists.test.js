import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import {
  addList,
  removeList,
  updateList,
  removeAllLists,
  getLists,
  getListsByBoardId,
  removeAllListsFromBoard,
} from '@/store/lists';
import configureStore from '@/store/configureStore';

describe('ListSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore();
  });

  afterEach(() => {
    store.dispatch(removeAllLists());
  });

  it('should add a list to the list', () => {
    const list = { title: 'a' };
    const savedList = { ...list, id: 1 };

    store.dispatch(addList(list));

    expect(getLists(store.getState())).toHaveLength(1);
    expect(getLists(store.getState())).toContainEqual(savedList);
  });

  it('should remove a list from the list', () => {
    const list = { title: 'a', id: 1 };

    store.dispatch(addList(list));
    store.dispatch(removeList({ id: 1 }));

    expect(getLists(store.getState())).toHaveLength(0);
  });

  it('should update a list', () => {
    const list = { title: 'a', id: 1 };
    const updatedList = { title: 'b', id: 1 };

    store.dispatch(addList(list));
    store.dispatch(updateList(updatedList));

    expect(getLists(store.getState())).toHaveLength(1);
    expect(getLists(store.getState())).toContainEqual(updatedList);
  });

  it('should remove all list by board id', () => {
    const List1 = { title: 'a', id: 1, boardId: 1 };
    const List2 = { title: 'a', id: 2, boardId: 1 };
    const List3 = { title: 'a', id: 3, boardId: 2 };

    store.dispatch(addList(List1));
    store.dispatch(addList(List2));
    store.dispatch(addList(List3));

    store.dispatch(removeAllListsFromBoard({ boardId: 1 }));

    expect(getLists(store.getState())).toHaveLength(1);
    expect(getLists(store.getState())).toContainEqual(List3);
  });

  it('should remove all lists', () => {
    const List1 = { title: 'a', id: 1 };
    const List2 = { title: 'a', id: 2 };

    store.dispatch(addList(List1));
    store.dispatch(addList(List2));

    store.dispatch(removeAllLists());

    expect(getLists(store.getState())).toHaveLength(0);
  });

  describe('selectors', () => {
    it('should get all lists', () => {
      const List1 = { title: 'a', id: 1 };
      const List2 = { title: 'a', id: 2 };

      store.dispatch(addList(List1));
      store.dispatch(addList(List2));

      expect(getLists(store.getState())).toHaveLength(2);
    });

    it('should filter lists by board id', () => {
      const List1 = { title: 'a', id: 1, boardId: 1 };
      const List2 = { title: 'a', id: 2, boardId: 2 };

      store.dispatch(addList(List1));
      store.dispatch(addList(List2));

      expect(getListsByBoardId(store.getState(), 1)).toHaveLength(1);
      expect(getListsByBoardId(store.getState(), 2)).toHaveLength(1);
    });
  });
});
