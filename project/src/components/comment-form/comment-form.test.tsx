import { configureMockStore } from '@jedmao/redux-mock-store';
import { datatype } from 'faker';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { makeFakeOffer } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import CommentForm from './comment-form';

const mockFakeOffer = makeFakeOffer();

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({
  OFFER: {
    selectedOffer: mockFakeOffer,
    isFormDisabled: datatype.boolean(),
  },
});

describe('Component CommentForm', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CommentForm />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('review')).toBeInTheDocument();
    expect(screen.getByLabelText(/Your review/i)).toBeInTheDocument();
  });
});
