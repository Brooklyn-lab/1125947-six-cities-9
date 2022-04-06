import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../const';
import { Offer } from '../types/offers';

export const loadFavoriteOffers = createAction<Offer[]>('data/loadFavoriteOffers');
export const redirectToRoute = createAction<AppRoute>('main/redirectToRoute');

