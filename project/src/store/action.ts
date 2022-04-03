import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus } from '../const';
import { Offer } from '../types/offers';

export const changeCity = createAction<string>('main/changeCity');
export const changeSortOffersType = createAction<string>('changeSortOffersType');
export const loadOffers = createAction<Offer[]>('data/loadOffers');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const loadFavoriteOffers = createAction<Offer[]>('data/loadFavoriteOffers');
export const redirectToRoute = createAction<AppRoute>('main/redirectToRoute');
export const getLoginName = createAction<string>('data/getLoginName');

