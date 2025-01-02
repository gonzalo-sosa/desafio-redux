/* eslint-disable no-unused-vars */
import { createSelector } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';

const cardSlice = createSlice({
  name: 'cards',
  initialState: { list: [], loading: false, lastFetch: null },
  reducers: {
    cardAdded: (cards, action) => {
      const card = { ...action.payload, id: Number(action.payload.id) };
      cards.list.push(card);
    },
    cardUpdated: (cards, action) => {
      let card = cards.list.find(
        (card) => card.id === Number(action.payload.id),
      );
      Object.assign(card, action.payload);
    },
    cardRemoved: (cards, action) => {
      cards.list = cards.list.filter(
        (card) => card.id !== Number(action.payload.card.id),
      );
    },
    allCardsRemoved: (cards, action) => {
      cards.list = [];
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
      cards.list = action.payload;
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

export const loadCards = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.cards;
  const diffInMinutes = (Date.now() - lastFetch) / 1000 / 60;
  if (diffInMinutes < 1) return;

  return dispatch(
    apiCallBegan({
      url,
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
  (cards) => cards.list,
);

export const getCardsByListId = (state, listId) =>
  getCards(state).filter((card) => card.list_id === Number(listId));
