/* eslint-disable no-unused-vars */
import { createSelector } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';

const cardSlice = createSlice({
  name: 'cards',
  initialState: { list: {}, loading: false, lastFetch: null },
  reducers: {
    cardAdded: (cards, action) => {
      const card = { ...action.payload, id: Number(action.payload.id) };
      const listId = action.payload.list_id;
      cards.list[`${listId}`] ??= [];
      cards.list[`${listId}`].push(card);
    },
    cardUpdated: (cards, action) => {
      const cardId = Number(action.payload.id);
      const beforeUpdateCard = Object.values(cards.list)
        .flat()
        .find((card) => card.id === cardId);
      const listId = beforeUpdateCard.list_id;
      const card = cards.list[`${listId}`].find((card) => card.id === cardId);
      cards.list[`${listId}`] = cards.list[`${listId}`].filter(
        (card) => card.id !== cardId,
      );
      Object.assign(card, action.payload);
      cards.list[`${action.payload.list_id}`] ??= [];
      cards.list[`${action.payload.list_id}`].push(card);
    },
    cardRemoved: (cards, action) => {
      const listId = action.payload.list_id;
      cards.list = cards.list[`${listId}`].filter(
        (card) => card.id !== Number(action.payload.id),
      );
    },
    allCardsRemoved: (cards, action) => {
      cards.list = {};
    },
    allCardsRemovedFromList: (cards, action) => {
      cards.list = cards.list.filter(
        (card) => card.listId !== action.payload.listId,
      );
    },
    cardsRequested: (cards, action) => {
      cards.loading = true;
    },
    cardsRequestedFailed: (cards, action) => {
      cards.loading = false;
    },
    cardsReceived: (cards, action) => {
      if (action.payload.length !== 0) {
        const listId = action.payload[0].list_id;
        cards.list[`${listId}`] = action.payload;
      }
      cards.loading = false;
      cards.lastFetch = Date.now();
    },
  },
});

const {
  cardAdded,
  cardUpdated,
  cardRemoved,
  allCardsRemoved,
  allCardsRemovedFromList,
  cardsRequested,
  cardsRequestedFailed,
  cardsReceived,
} = cardSlice.actions;
export default cardSlice.reducer;

const url = '/cards';

export const loadCardsByListId = (listId) => (dispatch, getState) => {
  const { lastFetch } = getState().entities.cards;
  const diffInMinutes = (Date.now() - lastFetch) / 1000 / 60;
  if (diffInMinutes < 1) return;

  return dispatch(
    apiCallBegan({
      url: `${url}?list_id=${listId}`,
      method: 'get',
      onStart: cardsRequested.type,
      onSuccess: cardsReceived.type,
      onError: cardsRequestedFailed.type,
    }),
  );
};

export const addCard = (card) =>
  apiCallBegan({
    url,
    method: 'post',
    data: card,
    onSuccess: cardAdded.type,
  });

export const updateCard = (card) =>
  apiCallBegan({
    url: `${url}/${card.id}`,
    method: 'patch',
    data: card,
    onSuccess: cardUpdated.type,
  });

export const removeCard = (card) =>
  apiCallBegan({
    url: `${url}/${card.id}`,
    method: 'delete',
    data: card,
    onSuccess: cardRemoved.type,
  });

export const removeAllCards = () => (dispatch) => {
  dispatch(allCardsRemoved());
};

export const removeAllCardsFromList = (list) => (dispatch) => {
  dispatch(allCardsRemovedFromList(list));
};

export const getCards = createSelector(
  (state) => state.entities.cards,
  (cards) => Object.values(cards.list).flat(),
);

export const getCardById = (state, id) =>
  Object.values(getCards(state))
    .flat()
    .find((card) => card.id === Number(id));

export const getCardsByListId = (state, listId) =>
  state.entities.cards.list[`${listId}`] ?? [];
