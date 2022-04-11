import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../const';
import HistoryRouter from '../history-route/history-route';
import HeaderNav from './header-nav';
import { internet } from 'faker';
import { Route, Routes } from 'react-router-dom';
import * as Redux from 'react-redux';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component HeaderNav', () => {
  it('should render HeaderNav', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userEmail: internet.email,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HeaderNav />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sign in/i)).not.toBeInTheDocument();
  });

  it('should render Auth HeaderNav', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userEmail: internet.email,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.SignIn}
              element={
                <h1>Login screen</h1>
              }
            />
            <Route
              path='*'
              element={
                <HeaderNav />
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('signOut-link'));
    expect(useDispatch).toBeCalledTimes(1);
  });

  it('should render NoAuth HeaderNav', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userEmail: internet.email,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HeaderNav />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sign out/i)).not.toBeInTheDocument();
  });

  it('should render Unknown HeaderNav', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Unknown,
        userEmail: internet.email,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HeaderNav />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sign out/i)).not.toBeInTheDocument();
  });
});
