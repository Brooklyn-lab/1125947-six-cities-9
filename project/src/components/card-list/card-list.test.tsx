import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../const';
import { makeFakeOffers } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import CardList from './card-list';

const mockFakeOffers = makeFakeOffers();

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({
  USER: { authorizationStatus: AuthorizationStatus.Auth },
  DATA: mockFakeOffers,
});

describe('Component CardList', () => {
  it('should render correctly MainPage CardList', () => {
    const namePage = 'MainPage';

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CardList offers={mockFakeOffers} namePage={namePage} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('cities__places-list tabs__content')).toBeInTheDocument();
  });

  it('should render correctly PropertyPage CardList', () => {
    const namePage = 'PropertyPage';

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CardList offers={mockFakeOffers} namePage={namePage} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('near-places__list')).toBeInTheDocument();
  });
});
