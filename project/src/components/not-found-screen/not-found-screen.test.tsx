import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import NotFoundScreen from './not-found-screen';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const store = mockStore();

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <NotFoundScreen />
      </HistoryRouter>,
    );

    const headerElement = screen.getByText('404. Page not found');
    const linkElement = screen.getByText('Go home');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });

  it('should render correctly routing on click link title', () => {
    history.push('/fake');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Main}
              element={<h1>Main page</h1>}
            />
            <Route
              path='*'
              element={
                <NotFoundScreen />
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByText(/Main page/i)).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('goHome-link'));
    expect(screen.getByText(/Main page/i)).toBeInTheDocument();
  });
});
