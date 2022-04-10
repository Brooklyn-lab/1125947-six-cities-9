import { datatype } from 'faker';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import ButtonFavorite from './button-favorite';
import { AuthorizationStatus } from '../../const';
import * as Redux from 'react-redux';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({
  USER: { authorizationStatus: AuthorizationStatus.Auth },
});

describe('Component FavoriteCard', () => {
  it('should render correctly Place button', () => {
    const size = 'Big',
      isFavorite = datatype.boolean(),
      hotelId = datatype.number(),
      type = 'Place';

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ButtonFavorite
            size={size}
            isFavorite={isFavorite}
            hotelId={hotelId}
            type={type}
          />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('place-card__bookmark-button')).toBeInTheDocument();
    expect(screen.getByTestId('place-card__bookmark-icon')).toBeInTheDocument();
  });

  it('should render correctly Property button', () => {
    const size = 'Big',
      isFavorite = datatype.boolean(),
      hotelId = datatype.number(),
      type = 'Property';

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ButtonFavorite
            size={size}
            isFavorite={isFavorite}
            hotelId={hotelId}
            type={type}
          />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('property__bookmark-button')).toBeInTheDocument();
    expect(screen.getByTestId('property__bookmark-icon')).toBeInTheDocument();
  });

  it('should use useDispatch when click button', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const size = 'Big',
      isFavorite = datatype.boolean(),
      hotelId = datatype.number(),
      type = 'Property';

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ButtonFavorite
            size={size}
            isFavorite={isFavorite}
            hotelId={hotelId}
            type={type}
          />
        </HistoryRouter>
      </Provider>,
    );

    fireEvent.click(screen.getByRole('button'));
    expect(useDispatch).toBeCalledTimes(1);
  });
});
