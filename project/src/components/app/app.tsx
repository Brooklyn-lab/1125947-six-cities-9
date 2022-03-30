import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addOffers, changeCity } from '../../store/action';
import { Offer } from '../../types/offers';
import FavoriteScreen from '../favorite-screen/favorite-screen';
import LoginScreen from '../login-screen/login-screen';
import MainScreen from '../main-screen/main-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import PropertyScreen from '../property-screen/property-screen';

type AppProps = {
  favoriteOffers: Offer[]
  offers: Offer[]
}

function App({ favoriteOffers, offers }: AppProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { currentCity } = useAppSelector((state) => state);

  useEffect(() => {
    dispatch(addOffers(offers));
  }, [offers, dispatch]);

  useEffect(() => {
    dispatch(changeCity(currentCity.name));
  }, [dispatch, currentCity.name]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainScreen />}
        />
        <Route
          path={AppRoute.SignIn}
          element={<LoginScreen />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <FavoriteScreen favoriteOffers={favoriteOffers} />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Room}
          element={<PropertyScreen />}
        />
        <Route
          path='*'
          element={<NotFoundScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
