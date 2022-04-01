import { createReducer } from '@reduxjs/toolkit';
import { addOffers, changeCity, changeSortOffersType } from './action';
import { Offer } from '../types/offers';
import { City } from '../types/offers';
import { typeSort } from '../const';

interface InitialState {
  currentCity: City,
  offersInCity: Offer[],
  offers: Offer[],
  sortOfferType: string,
}

const initialState: InitialState = {
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
  sortOfferType: typeSort.Popular,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeCity, (state, action) => {
      state.offersInCity = [];
      state.offers.find((offer) => (offer.city.name === action.payload) ? state.currentCity = offer.city : null);
      state.offers.filter((offer) => (offer.city.name === action.payload) ? state.offersInCity.push(offer) : []);
    })
    .addCase(changeSortOffersType, (state, action) => {
      state.sortOfferType = action.payload;

      switch (action.payload) {
        case typeSort.Popular:
          state.offersInCity = state.offersInCity.sort((offerA, offerB) => (offerA.id - offerB.id));
          break;
        case typeSort.PriceUp:
          state.offersInCity = state.offersInCity.sort((offerA, offerB) => (offerA.price - offerB.price));
          break;
        case typeSort.PriceDown:
          state.offersInCity = state.offersInCity.sort((offerA, offerB) => (offerB.price - offerA.price));
          break;
        case typeSort.Rating:
          state.offersInCity = state.offersInCity.sort((offerA, offerB) => (offerB.rating - offerA.rating));
          break;
      }
    });
});

export { reducer };
