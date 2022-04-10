import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { makeFakeReview } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import Reviews from './reviews';

const mockFakeReviews = makeFakeReview();

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore();

describe('Component Reviews', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Reviews reviews={mockFakeReviews} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('reviews__list')).toBeInTheDocument();
  });
});
