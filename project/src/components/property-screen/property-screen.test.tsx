import { internet } from 'faker';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../const';
import { makeFakeOffer, makeFakeOffers, makeFakeReview } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import PropertyScreen from './property-screen';

const mockFakenearbyOffers = makeFakeOffers();
const mockFakeSelectedOffer = makeFakeOffer();
const mockFakeReviews = makeFakeReview();

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component PropertyScreen', () => {
  it('should render correctly', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userEmail: internet.email,
      },
      OFFER: {
        isSelectedOfferLoaded: false,
        selectedOffer: [],
        nearbyOffers: [],
        reviews: [],
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PropertyScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Property/i)).toBeInTheDocument();
    expect(screen.getByTestId('loading-screen')).toBeInTheDocument();
  });

  it('should render correctly loading', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userEmail: internet.email,
      },
      OFFER: {
        isSelectedOfferLoaded: true,
        selectedOffer: mockFakeSelectedOffer,
        nearbyOffers: mockFakenearbyOffers,
        reviews: mockFakeReviews,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PropertyScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Property/i)).toBeInTheDocument();
  });
});
