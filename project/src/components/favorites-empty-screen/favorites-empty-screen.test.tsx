import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import FavoritesEmptyScreen from './favorites-empty-screen';

describe('Component FavoritesEmptyScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <FavoritesEmptyScreen />
      </HistoryRouter>
    );

    const headerElement = screen.getByText('Favorites (empty)');
    const savedTextElement = screen.getByText(/Nothing yet saved/i);
    const canUseTextElement = screen.getByText(/Save properties to narrow down search or plan your future trips/i);
    expect(headerElement).toBeInTheDocument();
    expect(savedTextElement).toBeInTheDocument();
    expect(canUseTextElement).toBeInTheDocument();
  });
});
