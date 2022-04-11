import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import LoginScreen from './login-screen';
import * as Redux from 'react-redux';

const history = createMemoryHistory();

describe('Component LoginScreen', () => {
  it('should render correctly when not Offers', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <HistoryRouter history={history}>
        <LoginScreen />
      </HistoryRouter>,
    );

    expect(screen.getByTestId(/email/i)).toBeInTheDocument();
    expect(screen.getByTestId(/password/i)).toBeInTheDocument();
    expect(screen.getByTestId(/login-title/i)).toBeInTheDocument();
    expect(screen.getByTestId(/login-button/i)).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('locations__item-link'));
  });
});
