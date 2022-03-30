import { createReducer } from '@reduxjs/toolkit';
import { addOffers, changeCity } from './action';
import { Offer } from '../types/offers';
import { City } from '../types/offers';

interface selectedCity {
  currentCity: City,
  offersInCity: Offer[],
  offers: Offer[],
  isLoading: boolean,
}

const initialState: selectedCity = {
  currentCity: {
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 11,
    },
    name: 'Paris',
  },
  offersInCity: [],
  offers: [],
  isLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeCity, (state, action) => {
      state.offersInCity = [];
      state.offers.forEach((offer) => {
        if (offer.city.name === action.payload) {
          state.currentCity = offer.city;
          state.offersInCity.push(offer);
          state.isLoading = true;
        }
      });
    });
});

export { reducer };
