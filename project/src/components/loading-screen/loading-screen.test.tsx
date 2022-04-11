import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import LoadingScreen from './loading-screen';

const history = createMemoryHistory();

describe('Component LoadingScreen', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <LoadingScreen />
      </HistoryRouter>,
    );

    expect(screen.getByTestId('loading-screen')).toBeInTheDocument();
  });
});
