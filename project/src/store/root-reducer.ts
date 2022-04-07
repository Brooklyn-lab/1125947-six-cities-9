import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { offerData } from './offer-data/offer-data';
import { offersData } from './offers-data/offers-data';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.data]: offersData.reducer,
  [NameSpace.user]: userProcess.reducer,
  [NameSpace.offer]: offerData.reducer,
});
