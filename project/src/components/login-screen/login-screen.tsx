import { SyntheticEvent, useEffect, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, LOCATIONS } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { redirectToRoute } from '../../store/action';
import { loginAction } from '../../store/api-actions';
import { changeCity } from '../../store/offers-data/offers-data';
import { getLoginName } from '../../store/user-process/user-process';
import { getRandomInt } from '../../utils/utils';
import Header from '../header/header';
import { toast } from 'react-toastify';

const passwordWarningText = 'Password should contain minimum one letter and one number';

export const validatePassword = (password: string) => password.match(/[A-Za-z]/) !== null && password.match(/[0-9]/) !== null;

function LoginScreen(): JSX.Element {
  const [city, setCity] = useState('');
  const randomCityName = () => LOCATIONS[getRandomInt(0, LOCATIONS.length - 1)];
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(({ USER }) => USER.authorizationStatus);

  useLayoutEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Main));
    }
  }, [dispatch, authorizationStatus]);

  useEffect(() => {
    setCity(randomCityName());
  }, [city]);

  const handleSubmit = (evt: SyntheticEvent) => {
    evt.preventDefault();

    if (evt.target instanceof HTMLFormElement) {
      const formData = new FormData(evt.target);
      const authData = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      };
      dispatch(getLoginName(authData.email));
      validatePassword(authData.password) ? dispatch(loginAction(authData)) : toast.warn(passwordWarningText);
    }
  };

  return (
    <>
      <Header namePage='LoginPage' />

      <div className="page page--gray page--login">
        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1
                data-testid="login-title"
                className="login__title"
              >
                Sign in
              </h1>
              <form
                onSubmit={handleSubmit}
                className="login__form form"
                action="#"
                method="post"
              >
                <div className="login__input-wrapper form__input-wrapper">
                  <label
                    data-testid="email"
                    className="visually-hidden"
                  >
                    E-mail
                  </label>
                  <input
                    className="login__input form__input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label
                    data-testid="password"
                    className="visually-hidden"
                  >
                    Password
                  </label>
                  <input
                    className="login__input form__input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    title={passwordWarningText}
                    required
                  />
                </div>
                <button
                  data-testid="login-button"
                  className="login__submit form__submit button"
                  type="submit"
                >
                  Sign in
                </button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <Link
                  data-testid="locations__item-link"
                  className="locations__item-link"
                  to={AppRoute.Main}
                  onClick={() => dispatch(changeCity(city))}
                >
                  <span>{city}</span>
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

export default LoginScreen;
