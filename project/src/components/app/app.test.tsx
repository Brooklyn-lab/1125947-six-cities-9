import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import App from './app';
import { AppRoute, AuthorizationStatus, typeSort } from '../../const';
import { makeFakeCurrentCity, makeFakeOffer } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import * as Redux from 'react-redux';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const mockOffer = makeFakeOffer();
const mockCurrentCity = makeFakeCurrentCity();

const store = mockStore({
  DATA: {
    offers: [],
    isDataLoaded: true,
    currentCity: mockCurrentCity,
    offersInCity: [],
    sortOfferType: typeSort.Popular,
    favoriteOffers: [],
    isFavoriteOffersLoaded: true,
  },
  USER: {
    authorizationStatus: AuthorizationStatus.Auth,
    userEmail: '',
    selectedCardId: null,
  },
  OFFER: {
    selectedOffer: mockOffer,
    isSelectedOfferLoaded: false,
    reviews: [],
    nearbyOffers: [],
    isFormDisabled: false,
  },
});

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application routing', () => {
  it('should render "MainScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
  });

  it('should render "LoginScreen" when user navigate to "/login"', () => {
    history.push(AppRoute.SignIn);

    render(fakeApp);

    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it('should render "FavoriteScreen" when user navigate to "/favorites"', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    history.push(AppRoute.Favorites);

    render(fakeApp);

    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
  });

  it('should render "PropertyScreen" when user navigate to "/offer/:id"', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    history.push(`${AppRoute.Room}1`);

    render(fakeApp);
    expect(screen.getByText(/Property/i)).toBeInTheDocument();
    expect(useDispatch).toBeCalledTimes(1);
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Go home')).toBeInTheDocument();
  });
});
