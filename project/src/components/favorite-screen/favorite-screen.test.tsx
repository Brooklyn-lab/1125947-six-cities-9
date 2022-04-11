import { internet } from 'faker';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../const';
import { makeFakeOffers } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import FavoriteScreen from './favorite-screen';
import * as Redux from 'react-redux';

const mockFakeFavoriteOffers = makeFakeOffers();

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component FavoriteScreen', () => {
  it('should render correctly loading', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userEmail: internet.email,
      },
      DATA: {
        isFavoriteOffersLoaded: false,
        favoriteOffers: [],
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoriteScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByText('Saved listing'));
    expect(screen.getByTestId('loading-screen')).toBeInTheDocument();
  });

  it('should render correctly loading', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userEmail: internet.email,
      },
      DATA: {
        isFavoriteOffersLoaded: true,
        favoriteOffers: [],
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoriteScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByText('Saved listing'));
    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
    expect(screen.getByText(/Save properties to narrow down search or plan your future trips./i)).toBeInTheDocument();
  });

  it('should render correctly loading', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userEmail: internet.email,
      },
      DATA: {
        isFavoriteOffersLoaded: true,
        favoriteOffers: mockFakeFavoriteOffers,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoriteScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByText(/Nothing yet saved./i));
    expect(screen.queryAllByTestId('loading-screen'));
    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });
});
