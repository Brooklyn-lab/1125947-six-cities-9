import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import HeaderNav from '../header-nav/header-nav';

type HeaderProps = {
  namePage?: string
}

function Header({ namePage }: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              data-testid="logo-link"
              className="header__logo-link"
              to={AppRoute.Main}
            >
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          {namePage ? '' : <HeaderNav />}
        </div>
      </div>
    </header>
  );
}

export default Header;

