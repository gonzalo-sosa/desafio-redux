import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
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
  let fakeAxios;

  beforeEach(async () => {
    store = configureStore();
    fakeAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    store.dispatch(removeAllLists());
  });

  const createState = (list = []) => ({
    entities: {
      lists: {
        list,
      },
    },
  });

  it('should add a list to the lists', async () => {
    const list = { title: 'a', id: 1 };
    fakeAxios.onPost('/lists').reply(200, list);

    await store.dispatch(addList(list));

    expect(getLists(store.getState())).toHaveLength(1);
    expect(getLists(store.getState())).toContainEqual(list);
  });

  it('should remove a list from the list', async () => {
    const list = { title: 'a', id: 1 };
    fakeAxios.onDelete('/lists/1').reply(200);

    await store.dispatch(addList(list));
    await store.dispatch(removeList({ id: 1 }));

    expect(getLists(store.getState())).toHaveLength(0);
  });

  it('should update a list', async () => {
    const list = { title: 'a', id: 1 };
    const updatedList = { title: 'b', id: 1 };
    fakeAxios.onPost('/lists').reply(200, list);
    fakeAxios.onPatch('/lists/1').reply(200, updatedList);

    await store.dispatch(addList(list));
    await store.dispatch(updateList(updatedList));

    expect(getLists(store.getState())).toHaveLength(1);
    expect(getLists(store.getState())).toContainEqual(updatedList);
  });

  // it('should remove all list by board id', async () => {
  //   const list1 = { title: 'a', id: 1, boardId: 1 };
  //   const list2 = { title: 'a', id: 2, boardId: 1 };
  //   const list3 = { title: 'a', id: 3, boardId: 2 };

  //   fakeAxios.onPost('/lists/1').reply(200);
  //   fakeAxios.onPost('/lists/2').reply(200);
  //   fakeAxios.onPost('/lists/3').reply(200);

  //   await store.dispatch(addList(list1));
  //   await store.dispatch(addList(list2));
  //   await store.dispatch(addList(list3));

  //   await store.dispatch(removeAllListsFromBoard({ boardId: 1 }));

  //   expect(getLists(store.getState())).toHaveLength(1);
  //   expect(getLists(store.getState())).toContainEqual(List3);
  // });

  // it('should remove all lists', () => {
  //   const List1 = { title: 'a', id: 1 };
  //   const List2 = { title: 'a', id: 2 };

  //   store.dispatch(addList(List1));
  //   store.dispatch(addList(List2));

  //   store.dispatch(removeAllLists());

  //   expect(getLists(store.getState())).toHaveLength(0);
  // });

  describe('selectors', () => {
    it('should get all lists', () => {
      const List1 = { title: 'a', id: 1 };
      const List2 = { title: 'a', id: 2 };
      const state = createState([List1, List2]);

      const result = getLists(state);

      expect(result).toHaveLength(2);
      expect(result).toContainEqual(List1);
      expect(result).toContainEqual(List2);
    });

    it('should filter lists by board id', () => {
      const List1 = { title: 'a', id: 1, board_id: 1 };
      const List2 = { title: 'a', id: 2, board_id: 2 };
      const state = createState([List1, List2]);

      const result1 = getListsByBoardId(state, 1);
      const result2 = getListsByBoardId(state, 2);

      expect(result1).toHaveLength(1);
      expect(result1).toContainEqual(List1);
      expect(result2).toHaveLength(1);
      expect(result2).toContainEqual(List2);
    });
  });
});
