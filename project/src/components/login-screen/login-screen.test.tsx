import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import LoginScreen from './login-screen';
import * as Redux from 'react-redux';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../const';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const store = mockStore({
  USER: { authorizationStatus: AuthorizationStatus.Auth },
});

describe('Component LoginScreen', () => {
  it('should render correctly when not Offers', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LoginScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/email/i)).toBeInTheDocument();
    expect(screen.getByTestId(/password/i)).toBeInTheDocument();
    expect(screen.getByTestId(/login-title/i)).toBeInTheDocument();
    expect(screen.getByTestId(/login-button/i)).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('locations__item-link'));
  });
});
