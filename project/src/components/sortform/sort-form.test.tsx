import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import SortForm from './sort-form';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore();

describe('Component SortForm', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SortForm />
        </HistoryRouter>
      </Provider>,
    );
    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
    expect(screen.getByText(/Price: low to high/i)).toBeInTheDocument();
    expect(screen.getByText(/Price: high to low/i)).toBeInTheDocument();
    expect(screen.getByText(/Top rated first/i)).toBeInTheDocument();
  });
});
