import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, AppRoute, AuthorizationStatus, LOCATIONS } from '../const';
import { errorHandle } from '../services/error-handle';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { Offer } from '../types/offers';
import { Review } from '../types/review';
import { UserData } from '../types/user-data';
import { redirectToRoute } from './action';
import { getLoginName, requireAuthorization } from './user-process/user-process';
import { loadOffers, changeCity, loadFavoriteOffers, toggleFavoriteStatus } from './offers-data/offers-data';
import { fetchSelectedOffer, isFormEnabled } from './offer-data/offer-data';
import { SendComment } from '../types/send-comment';
import { FavoriteStatus } from '../types/favorite-status';
import { dropEmail, getEmail, saveEmail } from '../services/user-email';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Offer[]>(APIRoute.Hotels);
      dispatch(loadOffers(data));
      dispatch(changeCity(LOCATIONS[0]));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchFavoritesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFavorites',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Offer[]>(APIRoute.Favorites);
      dispatch(loadFavoriteOffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const toggleFavoriteStatusAction = createAsyncThunk<void, FavoriteStatus, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/toggleFavoriteStatus',
  async ({ id, status }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post(`${APIRoute.Favorites}/${id}/${status}`);
      dispatch(toggleFavoriteStatus(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchSelectedOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'offer/fetchSelectedOfferAction',
  async (id, { dispatch, extra: api }) => {
    try {
      const [{ data: offer }, { data: offersNearby }, { data: comments }] = await Promise.all([
        api.get<Offer>(`${APIRoute.Hotels}/${id}`),
        api.get<Offer[]>(`${APIRoute.Hotels}/${id}/nearby`),
        api.get<Review[]>(`${APIRoute.Comments}/${id}`),
      ]);
      dispatch(fetchSelectedOffer({ offer, offersNearby, comments }));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const sendCommentAction = createAsyncThunk<void, SendComment, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/sendComment',
  async ({ id, comment, rating }, { dispatch, extra: api }) => {
    try {
      await api.post(`${APIRoute.Comments}/${id}`, { comment, rating });
      dispatch(isFormEnabled(false));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoute.Login);
      const login = getEmail();
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(getLoginName(login));
    } catch (error) {
      errorHandle(error);
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    try {
      const { data: { token } } = await api.post<UserData>(APIRoute.Login, { email, password });
      saveToken(token);
      saveEmail(email);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(redirectToRoute(AppRoute.Main));
      dispatch(getLoginName(email));
    } catch (error) {
      errorHandle(error);
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      dropEmail();
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      dispatch(redirectToRoute(AppRoute.SignIn));
    } catch (error) {
      errorHandle(error);
    }
  },
);
