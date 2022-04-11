import { internet } from 'faker';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthorizationStatus, typeSort } from '../../const';
import { makeFakeCurrentCity } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import MainScreen from './main-screen';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const mockCurrentCity = makeFakeCurrentCity();

describe('Component MainScreen', () => {
  it('should render correctly when not Offers', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userEmail: internet.email,
      },
      DATA: {
        offers: [],
        isDataLoaded: false,
        currentCity: mockCurrentCity,
        offersInCity: [],
        sortOfferType: typeSort.Popular,
        favoriteOffers: [],
        isFavoriteOffersLoaded: false,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByTestId('logo-link')).toBeInTheDocument();
  });
});
