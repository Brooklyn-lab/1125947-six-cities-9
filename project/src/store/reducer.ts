import { createReducer } from '@reduxjs/toolkit';
import { loadFavoriteOffers } from './action';
import { Offer } from '../types/offers';
import { Review } from '../types/review';

interface InitialState {
  favoriteOffers: Offer[],
  reviews: Review[],
}

const initialState: InitialState = {
  favoriteOffers: [],
  reviews: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadFavoriteOffers, (state, action) => {
      state.favoriteOffers = action.payload;
    })
});

export { reducer };
