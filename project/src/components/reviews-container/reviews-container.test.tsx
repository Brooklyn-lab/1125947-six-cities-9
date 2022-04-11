import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../const';
import { makeFakeOffer } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import ReviewsContainer from './reviews-container';

const mockStore = configureMockStore();
const mockOffer = makeFakeOffer();
const history = createMemoryHistory();

describe('Component ReviewsContainer', () => {
  it('should render correctly when Auth', () => {
    const store = mockStore({
      OFFER: {
        selectedOffer: mockOffer,
        isSelectedOfferLoaded: false,
        reviews: [],
        nearbyOffers: [],
        isFormDisabled: false,
      },
      USER: { authorizationStatus: AuthorizationStatus.Auth },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewsContainer />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Your review/i)).toBeInTheDocument();
  });

  it('should render correctly when NoAuth', () => {
    const store = mockStore({
      OFFER: {
        selectedOffer: mockOffer,
        isSelectedOfferLoaded: false,
        reviews: [],
        nearbyOffers: [],
        isFormDisabled: false,
      },
      USER: { authorizationStatus: AuthorizationStatus.NoAuth },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewsContainer />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByText(/Your review/i)).not.toBeInTheDocument();
  });

  it('should render correctly when selectedOffer lenght =< 0', () => {
    const store = mockStore({
      OFFER: {
        selectedOffer: [],
        isSelectedOfferLoaded: false,
        reviews: [],
        nearbyOffers: [],
        isFormDisabled: false,
      },
      USER: { authorizationStatus: AuthorizationStatus.Auth },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewsContainer />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByText(/Reviews/i)).not.toBeInTheDocument();
  });
});
