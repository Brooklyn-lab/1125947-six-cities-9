import { createReducer } from '@reduxjs/toolkit';
import { addOffers, changeCity } from './action';
import { offers } from '../mocks/offers';
import { LOCATION } from '../const';
import { Offer } from '../types/offers';

interface currentOffers {
  currentCity: string,
  currentOffers: Offer[],
  offers: Offer[],
}

const initialState: currentOffers = {
  currentCity: LOCATION[0],
  currentOffers: [],
  offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(addOffers, (state) => {
      state.currentOffers = [];
      state.offers.find((offer) => {
        if (offer.city.name === state.currentCity) {
          state.currentOffers.push(offer);
        }
      });
    });
});

export { reducer };
