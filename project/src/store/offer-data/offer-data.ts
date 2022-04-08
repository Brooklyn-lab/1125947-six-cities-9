import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Offer } from '../../types/offers';
import { Review } from '../../types/review';
import { OfferData } from '../../types/state';

const initialState: OfferData = {
  selectedOffer: {
    bedrooms: 0,
    city: {
      location: {
        latitude: 0,
        longitude: 0,
        zoom: 0,
      },
      name: '',
    },
    description: '',
    goods: [''],
    host: {
      avatarUrl: '',
      id: 0,
      isPro: false,
      name: '',
    },
    id: 0,
    images: [''],
    isFavorite: false,
    isPremium: false,
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 0,
    },
    maxAdults: 0,
    previewImage: '',
    price: 0,
    rating: 0,
    title: '',
    type: '',
  },
  isSelectedOfferLoaded: false,
  reviews: [],
  nearbyOffers: [],
  isFormDisabled: false,
};

export const offerData = createSlice({
  name: NameSpace.offer,
  initialState,
  reducers: {
    fetchSelectedOffer: (state, action: PayloadAction<Offer>) => {
      state.selectedOffer = action.payload;
      state.isSelectedOfferLoaded = true;
    },
    fetchReviews: (state, action: PayloadAction<Review[]>) => {
      state.reviews = action.payload;
    },
    fetchNearbyOffers: (state, action: PayloadAction<Offer[]>) => {
      state.nearbyOffers = [];
      state.nearbyOffers = action.payload;
    },
    isFormEnabled: (state, action: PayloadAction<boolean>) => {
      state.isFormDisabled = action.payload;
    },
  },
});

export const { fetchSelectedOffer, fetchReviews, fetchNearbyOffers, isFormEnabled } = offerData.actions;
