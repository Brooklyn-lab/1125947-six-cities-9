import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Footer from '../footer/footer';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="page page--favorites-empty">

      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">404</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">404. Page not found</b>
              <Link
                data-testid="goHome-link"
                to={AppRoute.Main}
              >
                Go home
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default NotFoundScreen;
