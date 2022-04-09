import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Offer } from '../../types/offers';
import { SelectedOffer } from '../../types/selected-offer';
import { OfferData } from '../../types/state';

const initialState: OfferData = {
  selectedOffer: {} as Offer,
  isSelectedOfferLoaded: false,
  reviews: [],
  nearbyOffers: [],
  isFormDisabled: false,
};

export const offerData = createSlice({
  name: NameSpace.offer,
  initialState,
  reducers: {
    fetchSelectedOffer: (state, action: PayloadAction<SelectedOffer>) => {
      state.selectedOffer = action.payload.offer;
      state.nearbyOffers = action.payload.offersNearby;
      state.reviews = action.payload.comments;
      state.isSelectedOfferLoaded = true;
    },
    isFormEnabled: (state, action: PayloadAction<boolean>) => {
      state.isFormDisabled = action.payload;
    },
  },
});

export const { fetchSelectedOffer, isFormEnabled } = offerData.actions;
