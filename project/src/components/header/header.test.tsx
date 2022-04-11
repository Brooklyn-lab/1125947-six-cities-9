import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import HistoryRouter from '../history-route/history-route';
import Header from './header';
import { internet } from 'faker';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component Header', () => {
  it('should render correctly routing on click link', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userEmail: internet.email,
      },
    });
    history.push('/fake')

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Main}
              element={<h1>Maine page</h1>}
            />
            <Route
              path='*'
              element={<Header />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/Maine page/i)).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('logo-link'));
    expect(screen.getByText(/Maine page/i)).toBeInTheDocument();
  });

  it('should render correctly Header on LogineScreen', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userEmail: internet.email,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header namePage='LoginPage' />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/Sign in/i)).not.toBeInTheDocument();
  });

  it('should render correctly Header not LogineScreen', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userEmail: internet.email,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sign in/i)).not.toBeInTheDocument();
  });
});
