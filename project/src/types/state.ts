import { AuthorizationStatus } from '../const';
import { store } from '../store/index';
import { City, Offer } from './offers';
import { Review } from './review';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
  userEmail: string,
};

export type OffersData = {
  offers: Offer[],
  isDataLoaded: boolean,
  currentCity: City,
  offersInCity: Offer[],
  sortOfferType: string,
};

export type OfferData = {
  selectedOffer: Offer,
  isSelectedOfferLoaded: boolean,
  reviews: Review[],
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
