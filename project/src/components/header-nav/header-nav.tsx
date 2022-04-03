import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../const';
import { logoutAction } from '../../store/api-actions';
import { Link } from 'react-router-dom';

function HeaderNav(): JSX.Element {
  const { authorizationStatus, userEmail } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  return (
    <nav className="header__nav">
      {(authorizationStatus === AuthorizationStatus.Auth) ?
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <a className="header__nav-link header__nav-link--profile" href="#">
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
              <span className="header__user-name user__name">{userEmail}</span>
            </a>
          </li>
          <li className="header__nav-item">
            <Link
              className="header__nav-link"
              to={AppRoute.SignIn}
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(logoutAction());
              }}
            >
              <span className="header__signout">Sign out</span>
            </Link>
          </li>
        </ul>
        :
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to={AppRoute.SignIn}>
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        </ul>}
    </nav>
  );
}

export default HeaderNav;
