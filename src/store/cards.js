/* eslint-disable no-unused-vars */
import { createSelector } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

let lastId = 0;

const cardSlice = createSlice({
  name: 'cards',
  initialState: { list: [] },
  reducers: {
    cardAdded: (cards, action) => {
      const card = { ...action.payload, id: ++lastId };
      cards.list.push(card);
    },
    cardUpdated: (cards, action) => {
      let card = cards.list.find((card) => card.id === action.payload.id);
      Object.assign(card, action.payload);
    },
    cardRemoved: (cards, action) => {
      cards.list = cards.list.filter((card) => card.id !== action.payload.id);
    },
    allCardsRemoved: (cards, action) => {
      cards.list = [];
      lastId = 0;
    },
    allCardsRemovedFromList: (cards, action) => {
      cards.list = cards.list.filter(
        (card) => card.listId !== action.payload.listId,
      );
    },
  },
});

const {
  cardAdded,
  cardUpdated,
  cardRemoved,
  allCardsRemoved,
  allCardsRemovedFromList,
} = cardSlice.actions;
export default cardSlice.reducer;

export const addCard = (card) => (dispatch) => {
  dispatch(cardAdded(card));
};

export const updateCard = (card) => (dispatch) => {
  dispatch(cardUpdated(card));
};

export const removeCard = (card) => (dispatch) => {
  dispatch(cardRemoved(card));
};

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
  getCards(state).filter((card) => card.listId === listId);
