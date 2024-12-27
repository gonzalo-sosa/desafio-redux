import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import configureStore from '@/store/configureStore';
import {
  addCard,
  removeCard,
  updateCard,
  removeAllCards,
  removeAllCardsFromTask,
  getCards,
  getCardsByTaskId,
} from '@/store/cards';

describe('CardSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore();
  });

  afterEach(() => {
    store.dispatch(removeAllCards());
  });

  it('should add a card', () => {
    const card = { title: 'a', id: 1 };

    store.dispatch(addCard(card));

    expect(getCards(store.getState())).toHaveLength(1);
    expect(getCards(store.getState())).toContainEqual(card);
  });

  it('should remove a card', () => {
    const card = { title: 'a', id: 1 };

    store.dispatch(addCard(card));
    store.dispatch(removeCard(card));

    expect(getCards(store.getState())).toHaveLength(0);
  });

  it('should update a card', () => {
    const card = { title: 'a', id: 1 };
    const cardUpdated = { title: 'b', id: 1 };

    store.dispatch(addCard(card));
    store.dispatch(updateCard(cardUpdated));

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

  it('should remove all cards from a list', () => {
    const card1 = { title: 'a', id: 1, taskId: 1 };
    const card2 = { title: 'a', id: 2, taskId: 1 };
    const card3 = { title: 'a', id: 3, taskId: 2 };

    store.dispatch(addCard(card1));
    store.dispatch(addCard(card2));
    store.dispatch(addCard(card3));

    store.dispatch(removeAllCardsFromTask({ taskId: 1 }));

    expect(getCards(store.getState())).toHaveLength(1);
    expect(getCards(store.getState())).toContainEqual(card3);
  });

  describe('selectors', () => {
    it('should get all cards', () => {
      const card1 = { title: 'a', id: 1 };
      const card2 = { title: 'a', id: 2 };

      store.dispatch(addCard(card1));
      store.dispatch(addCard(card2));

      expect(getCards(store.getState())).toHaveLength(2);
      expect(getCards(store.getState())).toContainEqual(card1);
      expect(getCards(store.getState())).toContainEqual(card2);
    });

    it('should get cards by list id', () => {
      const card1 = { title: 'a', id: 1, taskId: 1 };
      const card2 = { title: 'a', id: 2, taskId: 1 };
      const card3 = { title: 'a', id: 3, taskId: 2 };

      store.dispatch(addCard(card1));
      store.dispatch(addCard(card2));
      store.dispatch(addCard(card3));

      expect(getCardsByTaskId(store.getState(), 1)).toHaveLength(2);
      expect(getCardsByTaskId(store.getState(), 1)).toContainEqual(card1);
      expect(getCardsByTaskId(store.getState(), 1)).toContainEqual(card2);
      expect(getCardsByTaskId(store.getState(), 2)).toHaveLength(1);
      expect(getCardsByTaskId(store.getState(), 2)).toContainEqual(card3);
    });
  });
});
