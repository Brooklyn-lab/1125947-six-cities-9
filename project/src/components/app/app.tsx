import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import FavoriteScreen from '../favorite-screen/favorite-screen';
import LoginScreen from '../login-screen/login-screen';
import MainScreen from '../main-screen/main-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import PropertyScreen from '../property-screen/property-screen';

type AppProps = {
  placesCount: number,
  cardCount: number
}

function App({ placesCount, cardCount }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainScreen placesCount={placesCount} cardCount={cardCount} />}
        />
        <Route
          path={AppRoute.SignIn}
          element={<LoginScreen />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <FavoriteScreen />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Room}
          element={
            <PropertyScreen />
          }
        >
          <Route
            path=':id'
            element={
              <PropertyScreen />
            }
          />
        </Route>
        <Route
          path='*'
          element={<NotFoundScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
