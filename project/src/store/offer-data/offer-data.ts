/* eslint-disable no-console */

import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
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
};

export const offerData = createSlice({
  name: NameSpace.offer,
  initialState,
  reducers: {
    fetchSelectedOffer: (state, action) => {
      state.selectedOffer = action.payload;
      state.isSelectedOfferLoaded = true;
    },
    fetchReviews: (state, action) => {
      state.reviews = action.payload;
      console.log(action.payload);
    },
  },
});

export const { fetchSelectedOffer, fetchReviews } = offerData.actions;
