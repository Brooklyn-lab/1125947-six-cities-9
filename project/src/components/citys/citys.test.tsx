import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { makeFakeCurrentCity } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import CityList from './citys';

const mockFakeCurrentCity = makeFakeCurrentCity();

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({
  DATA: { currentCity: mockFakeCurrentCity },
});

describe('Component CityList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CityList />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('tabs')).toBeInTheDocument();
    expect(screen.getByTestId('locations__list')).toBeInTheDocument();
  });
});
