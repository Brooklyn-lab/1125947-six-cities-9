import { datatype } from 'faker';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../services/api';
import { State } from '../types/state';
import { APIRoute } from '../const';
import { checkAuthAction, fetchFavoritesAction, fetchOffersAction, fetchSelectedOfferAction, loginAction, sendCommentAction, toggleFavoriteStatusAction } from './api-actions';
// import { logoutAction } from './api-actions';
import { getLoginName, requireAuthorization } from './user-process/user-process';
import { AuthData } from '../types/auth-data';
import { redirectToRoute } from './action';
import { makeFakeOffers } from '../utils/mocks';
import { changeCity, loadFavoriteOffers, loadOffers } from './offers-data/offers-data';
import { fetchSelectedOffer } from './offer-data/offer-data';
// import { isFormEnabled } from './offer-data/offer-data';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should dispatch Load_Offers when GET /hotels', async () => {
    const mockOffers = [makeFakeOffers()];
    mockAPI
      .onGet(APIRoute.Hotels)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchOffersAction());

    const action = store.getActions().map(({ type }) => type);
    expect(action).toContain(loadOffers.toString());
    expect(action).toContain(changeCity.toString());
  });

  it('should dispatch Load_Favorite_Offers when GET /favorites', async () => {
    mockAPI
      .onGet(APIRoute.Favorites)
      .reply(200, []);

    const store = mockStore();

    await store.dispatch(fetchFavoritesAction());

    const action = store.getActions().map(({ type }) => type);
    expect(action).toContain(loadFavoriteOffers.toString());
  });

  it('should dispatch Toggle_Favorite_Status when POST /favorites', async () => {
    const status = {
      id: 1,
      status: 1
    }

    mockAPI
      .onPost(`${APIRoute.Favorites}/${status.id}/${status.status}`)
      .reply(200, []);

    const store = mockStore();

    await store.dispatch(toggleFavoriteStatusAction(status));
    store.getActions().map(({ type }) => type);
  })

  it('should dispatch Load_Selected_Offer when GET /hotels', async () => {
    const store = mockStore();
    const hotelId = 3;
    mockAPI
      .onGet(`${APIRoute.Hotels}/${hotelId}`)
      .reply(200, {})
      .onGet(`${APIRoute.Hotels}/${hotelId}/nearby`)
      .reply(200, {})
      .onGet(`${APIRoute.Comments}/${hotelId}`)
      .reply(200, {});

    await store.dispatch(fetchSelectedOfferAction('3'));

    const action = store.getActions().map(({ type }) => type);
    expect(action).toContain(fetchSelectedOffer.toString());
  });

  it('should dispatch Send_Comment when POST /comments', async () => {
    const state = {
      id: '2',
      comment: datatype.string(),
      rating: 4,
    }
    const hotelId = 3;
    mockAPI
      .onPost(`${APIRoute.Comments}/${hotelId}`)
      .reply(200, []);

    const store = mockStore();
    await store.dispatch(sendCommentAction(state));
    store.getActions().map(({ type }) => type);
  });

  it('should authorization status is «auth» when server return 200', async () => {
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    const store = mockStore();

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toContain(requireAuthorization.toString());
  });

  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = { login: 'test@test.ua', password: '123456' };
    const store = mockStore();
    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, { token: 'secret' });

    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const action = store.getActions().map(({ type }) => type);

    expect(action).toContain(requireAuthorization.toString());
    expect(action).toContain(redirectToRoute.toString());
    expect(action).toContain(getLoginName.toString());
    expect(Storage.prototype.setItem).toBeCalledTimes(2);
    expect(Storage.prototype.setItem).toBeCalledWith('guess-cities-token', 'secret');
  });

  // it('should dispatch Logout when Delete /logout', async () => {
  //   mockAPI
  //     .onDelete(APIRoute.Logout)
  //     .reply(204);

  //   const store = mockStore();
  //   Storage.prototype.removeItem = jest.fn();

  //   await store.dispatch(logoutAction());

  //   const actions = store.getActions().map(({ type }) => type);

  //   expect(actions).toContain(requireAuthorization.toString());
  //   expect(actions).toContain(redirectToRoute.toString());
  //   expect(Storage.prototype.removeItem).toBeCalledTimes(1);
  //   expect(Storage.prototype.removeItem).toBeCalledWith('guess-melody-token');
  //   expect(Storage.prototype.removeItem).toBeCalledWith('user-email');
  // });
});
