import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureStore from '@/store/configureStore';
import {
  addCard,
  removeCard,
  updateCard,
  removeAllCards,
  removeAllCardsFromList,
  getCards,
  getCardsByListId,
} from '@/store/cards';

describe('CardSlice', () => {
  let store;
  let fakeAxios;

  beforeEach(async () => {
    store = configureStore();
    fakeAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    store.dispatch(removeAllCards());
  });

  const createState = (list = {}) => ({
    entities: {
      cards: {
        list,
      },
    },
  });

  it('should add a card', async () => {
    const card = { title: 'a', id: 1, list_id: 1 };
    fakeAxios.onPost('/cards').reply(200, card);

    await store.dispatch(addCard(card));

    expect(getCardsByListId(store.getState(), card.list_id)).toHaveLength(1);
    expect(getCardsByListId(store.getState(), card.list_id)).toContainEqual(
      card,
    );
  });

  it('should remove a card', async () => {
    const card = { title: 'a', id: 1, list_id: 1 };
    fakeAxios.onPost('/cards').reply(200, card);
    fakeAxios.onDelete('/cards/1').reply(200, card);

    await store.dispatch(addCard(card));
    await store.dispatch(removeCard(card));

    expect(getCardsByListId(store.getState(), card.list_id)).toHaveLength(0);
  });

  it('should update a card', async () => {
    const card = { title: 'a', id: 1 };
    const cardUpdated = { title: 'b', id: 1 };
    fakeAxios.onPost('/cards').reply(200, card);
    fakeAxios.onPatch('/cards/1').reply(200, cardUpdated);

    await store.dispatch(addCard(card));
    await store.dispatch(updateCard(cardUpdated));

    expect(getCards(store.getState())).toHaveLength(1);
    expect(getCards(store.getState())).toContainEqual(cardUpdated);
  });

  it('should remove all cards', () => {
    const card1 = { title: 'a', id: 1 };
    const card2 = { title: 'a', id: 2 };

    store.dispatch(addCard(card1));
    store.dispatch(addCard(card2));

    store.dispatch(removeAllCards());

    expect(getCards(store.getState())).toHaveLength(0);
  });

  // it('should remove all cards from a list', () => {
  //   const card1 = { title: 'a', id: 1, listId: 1 };
  //   const card2 = { title: 'a', id: 2, listId: 1 };
  //   const card3 = { title: 'a', id: 3, listId: 2 };

  //   store.dispatch(addCard(card1));
  //   store.dispatch(addCard(card2));
  //   store.dispatch(addCard(card3));

  //   store.dispatch(removeAllCardsFromList({ listId: 1 }));

  //   expect(getCards(store.getState())).toHaveLength(1);
  //   expect(getCards(store.getState())).toContainEqual(card3);
  // });

  describe('selectors', () => {
    it('should get all cards', () => {
      const state = createState({
        1: { title: 'a', id: 1 },
        2: { title: 'a', id: 2 },
      });
      const result = getCards(state);

      expect(result).toHaveLength(2);
      expect(result).toContainEqual({ title: 'a', id: 1 });
      expect(result).toContainEqual({ title: 'a', id: 2 });
    });

    it('should get cards by list id', () => {
      const card1 = { title: 'a', id: 1, list_id: 1 };
      const card2 = { title: 'a', id: 2, list_id: 1 };
      const card3 = { title: 'a', id: 3, list_id: 2 };
      const state = createState({ 1: [card1, card2], 2: [card3] });

      const result1 = getCardsByListId(state, 1);
      const result2 = getCardsByListId(state, 2);

      expect(result1).toHaveLength(2);
      expect(result1).toContainEqual(card1);
      expect(result1).toContainEqual(card2);
      expect(result2).toHaveLength(1);
      expect(result2).toContainEqual(card3);
    });
  });
});
