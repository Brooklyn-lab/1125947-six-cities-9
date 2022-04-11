/* eslint-disable no-console */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, typeSort } from '../../const';
import { Offer } from '../../types/offers';
import { OffersData } from '../../types/state';

const initialState: OffersData = {
  offers: [],
  isDataLoaded: false,
  currentCity: {
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 11,
    },
    name: 'Paris',
  },
  offersInCity: [],
  sortOfferType: typeSort.Popular,
  favoriteOffers: [],
  isFavoriteOffersLoaded: false,
};

export const offersData = createSlice({
  name: NameSpace.data,
  initialState,
  reducers: {
    loadOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
    },
    changeCity: (state, action: PayloadAction<string>) => {
      state.offersInCity = [];
      state.offers.find((offer) => (offer.city.name === action.payload) ? state.currentCity = offer.city : null);
      state.offers.filter((offer) => (offer.city.name === action.payload) ? state.offersInCity.push(offer) : []);
    },
    changeSortOffersType: (state, action: PayloadAction<string>) => {
      state.sortOfferType = action.payload;

      function sortOffers(offers: Offer[], sortType: 'ASC' | 'DESC', key: keyof Pick<Offer, 'id' | 'price' | 'rating'>) {
        return offers.sort((a, b) => sortType === 'ASC' ? a[key] - b[key] : b[key] - a[key]);
      }

      switch (action.payload) {
        case typeSort.Popular:
          state.offersInCity = sortOffers(state.offersInCity, 'ASC', 'id');
          break;
        case typeSort.PriceUp:
          state.offersInCity = sortOffers(state.offersInCity, 'ASC', 'price');
          break;
        case typeSort.PriceDown:
          state.offersInCity = sortOffers(state.offersInCity, 'DESC', 'price');
          break;
        case typeSort.Rating:
          state.offersInCity = sortOffers(state.offersInCity, 'DESC', 'rating');
          break;
      }
    },
    loadFavoriteOffers: (state, action: PayloadAction<Offer[]>) => {
      state.favoriteOffers = action.payload;
      state.isFavoriteOffersLoaded = true;
    },
    toggleFavoriteStatus: (state, action: PayloadAction<Offer>) => {
      console.log(action.payload);

      state.offers = state.offers.map((offer) => offer.id === action.payload.id ? action.payload : offer);
    },
  },
});

export const { loadOffers, changeCity, changeSortOffersType, loadFavoriteOffers, toggleFavoriteStatus } = offersData.actions;
