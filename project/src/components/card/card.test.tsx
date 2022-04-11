import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { makeFakeOffer } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import Card from './card';

const mockFakeOffer = makeFakeOffer();

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({
  USER: { authorizationStatus: AuthorizationStatus.Auth },
  DATA: mockFakeOffer,
});

describe('Component Card', () => {
  it('should render correctly MainPage Card', () => {
    const namePage = 'MainPage';

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Card offer={mockFakeOffer} namePage={namePage} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('cities__place-card')).toBeInTheDocument();
    expect(screen.getByTestId('cities-places__image-wrapper')).toBeInTheDocument();
    expect(screen.getByText(mockFakeOffer.title)).toBeInTheDocument();
  });

  it('should render correctly PropertyPage Card', () => {
    const namePage = 'PropertyPage';

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Card offer={mockFakeOffer} namePage={namePage} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('near__place-card')).toBeInTheDocument();
    expect(screen.getByTestId('near-places__image-wrapper')).toBeInTheDocument();
    expect(screen.getByText(mockFakeOffer.title)).toBeInTheDocument();
  });

  it('should render correctly routing on click link image', () => {
    const namePage = 'MainPage';
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
                <Card offer={mockFakeOffer} namePage={namePage} />
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
    const namePage = 'MainPage';
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
                <Card offer={mockFakeOffer} namePage={namePage} />
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
