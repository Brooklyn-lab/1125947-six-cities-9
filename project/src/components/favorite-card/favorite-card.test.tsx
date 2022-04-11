import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { makeFakeOffer } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import FavoriteCard from './favorite-card';

const mockFakeOffer = makeFakeOffer();

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({
  USER: { authorizationStatus: AuthorizationStatus.Auth },
  DATA: mockFakeOffer,
});

describe('Component FavoriteCard', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoriteCard offer={mockFakeOffer} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('favorites__card')).toBeInTheDocument();
    expect(screen.getByTestId('place-card__image')).toBeInTheDocument();
    expect(screen.getByTestId('place-card__price-value')).toBeInTheDocument();
    expect(screen.getByText(mockFakeOffer.title)).toBeInTheDocument();
  });

  it('should render correctly routing on click link image', () => {
    history.push('/fake');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Room}
              element={<h1>Offer page</h1>}
            />
            <Route
              path='*'
              element={
                <FavoriteCard offer={mockFakeOffer} />
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByText(/Offer page/i)).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('image-link'));
    expect(screen.getByText(/Offer page/i)).toBeInTheDocument();
  });

  it('should render correctly routing on click link title', () => {
    history.push('/fake');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Room}
              element={<h1>Offer page</h1>}
            />
            <Route
              path='*'
              element={
                <FavoriteCard offer={mockFakeOffer} />
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByText(/Offer page/i)).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('title-link'));
    expect(screen.getByText(/Offer page/i)).toBeInTheDocument();
  });
});
