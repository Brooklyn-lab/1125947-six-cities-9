import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSortOffersType, getLoginName, loadFavoriteOffers, loadOffers, requireAuthorization } from './action';
import { Offer } from '../types/offers';
import { City } from '../types/offers';
import { AuthorizationStatus, typeSort } from '../const';

interface InitialState {
  currentCity: City,
  offersInCity: Offer[],
  offers: Offer[],
  favoriteOffers: Offer[],
  sortOfferType: string,
  authorizationStatus: string,
  isDataLoaded: boolean,
  userEmail: string,
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
  favoriteOffers: [],
  sortOfferType: typeSort.Popular,
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  userEmail: '',
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(loadFavoriteOffers, (state, action) => {
      state.favoriteOffers = action.payload;
    })
    .addCase(changeCity, (state, action) => {
      state.offersInCity = [];
      state.offers.find((offer) => (offer.city.name === action.payload) ? state.currentCity = offer.city : null);
      state.offers.filter((offer) => (offer.city.name === action.payload) ? state.offersInCity.push(offer) : []);
    })
    .addCase(changeSortOffersType, (state, action) => {
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
    })
    .addCase(getLoginName, (state, action) => {
      state.userEmail = action.payload;
    });
});

export { reducer };
