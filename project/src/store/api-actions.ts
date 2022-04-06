/* eslint-disable no-console */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, AppRoute, AuthorizationStatus, LOCATIONS } from '../const';
import { errorHandle } from '../services/error-handle';
import { dropToken, saveToken } from '../services/token';
import { api, store } from '../store';
import { AuthData } from '../types/auth-data';
import { Offer } from '../types/offers';
import { Review } from '../types/review';
import { UserData } from '../types/user-data';
import { loadFavoriteOffers, redirectToRoute } from './action';
import { requireAuthorization } from './user-process/user-process';
import { loadOffers, changeCity} from './offers-data/offers-data';
import { fetchSelectedOffer, fetchReviews } from './offer-data/offer-data';

export const fetchOffersAction = createAsyncThunk(
  'data/fetchOffers',
  async () => {
    try {
      const { data } = await api.get<Offer[]>(APIRoute.Hotels);
      store.dispatch(loadOffers(data));
      store.dispatch(changeCity(LOCATIONS[0]));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchSelectedOfferAction = createAsyncThunk(
  'data/fetchSelectedOfferAction',
  async (id: string) => {
    try {
      const { data } = await api.get<Offer>(`${APIRoute.Hotels}/${id}`);
      store.dispatch(fetchSelectedOffer(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchFavoritesAction = createAsyncThunk(
  'data/fetchFavorites',
  async () => {
    try {
      const { data } = await api.get<Offer[]>(APIRoute.Favorites);
      store.dispatch(loadFavoriteOffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchReviewsAction = createAsyncThunk(
  'data/fetchReviews',
  async (id: string) => {
    try {
      const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${id}`);
      store.dispatch(fetchReviews(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const checkAuthAction = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try {
      await api.get(APIRoute.Login);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk(
  'user/login',
  async ({ login: email, password }: AuthData) => {
    try {
      const { data: { token } } = await api.post<UserData>(APIRoute.Login, { email, password });
      saveToken(token);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
      store.dispatch(redirectToRoute(AppRoute.Main));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk(
  'user/logout',
  async () => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      store.dispatch(redirectToRoute(AppRoute.SignIn));
    } catch (error) {
      errorHandle(error);
    }
  },
);
