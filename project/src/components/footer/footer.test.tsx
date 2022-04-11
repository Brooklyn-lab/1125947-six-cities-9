import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import HistoryRouter from '../history-route/history-route';
import Footer from './footer';

const history = createMemoryHistory();

describe('Component: Footer', () => {
  it('should navigation to main page if user click it', () => {
    history.push('/footer');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<h1>Main page</h1>}
          />
          <Route
            path='/footer'
            element={<Footer />}
          />
        </Routes>
      </HistoryRouter>
    );

    fireEvent.click(screen.getByRole('link'));

    expect(history.location.pathname).toBe('/');
    expect(screen.getByText('Main page')).toBeInTheDocument();
  });
});
