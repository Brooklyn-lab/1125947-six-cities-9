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
import { redirectToRoute } from './action';
import { getLoginName, requireAuthorization } from './user-process/user-process';
import { loadOffers, changeCity, loadFavoriteOffers } from './offers-data/offers-data';
import { fetchSelectedOffer, fetchReviews, fetchNearbyOffers, isFormEnabled } from './offer-data/offer-data';
import { SendComment } from '../types/send-comment';
import { FavoriteStatus } from '../types/favorite-status';
import { dropEmail, getEmail, saveEmail } from '../services/user-email';

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
  'offer/fetchSelectedOfferAction',
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

export const toggleFavoriteStatusAction = createAsyncThunk(
  'data/toggleFavoriteStatus',
  async ({ id, status }: FavoriteStatus) => {
    try {
      const { data } = await api.post(`${APIRoute.Favorites}/${id}/${status}`);
      console.log(data);
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchReviewsAction = createAsyncThunk(
  'offer/fetchReviews',
  async (id: string) => {
    try {
      const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${id}`);
      store.dispatch(fetchReviews(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const sendCommentAction = createAsyncThunk(
  'user/sendComment',
  async ({ id, comment, rating }: SendComment) => {
    try {
      await api.post(`${APIRoute.Comments}/${id}`, { comment, rating });
      store.dispatch(isFormEnabled(false));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchNearbyOffersAction = createAsyncThunk(
  'offer/fetchNearbyOffers',
  async (id: string) => {
    try {
      const { data } = await api.get<Offer[]>(`${APIRoute.Hotels}/${id}/nearby`);
      store.dispatch(fetchNearbyOffers(data));
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
      const login = getEmail();
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
      store.dispatch(getLoginName(login));
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
      saveEmail(email);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
      store.dispatch(redirectToRoute(AppRoute.Main));
      store.dispatch(getLoginName(email));
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
      dropEmail();
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      store.dispatch(redirectToRoute(AppRoute.SignIn));
    } catch (error) {
      errorHandle(error);
    }
  },
);
