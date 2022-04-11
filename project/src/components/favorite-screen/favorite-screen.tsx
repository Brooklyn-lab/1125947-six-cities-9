import { useAppDispatch, useAppSelector } from '../../hooks';
import Footer from '../footer/footer';
import Header from '../header/header';
import FavoriteCard from '../favorite-card/favorite-card';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useEffect } from 'react';
import { fetchFavoritesAction } from '../../store/api-actions';
import FavoritesEmptyScreen from '../favorites-empty-screen/favorites-empty-screen';
import LoadingScreen from '../loading-screen/loading-screen';

function FavoriteScreen() {
  const { favoriteOffers, isFavoriteOffersLoaded } = useAppSelector(({ DATA }) => DATA);
  const dispatch = useAppDispatch();

  const favoriteLenght = (favoriteOffers.length === 0);

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  });

  if (!isFavoriteOffersLoaded) {
    return (<LoadingScreen />);
  }

  return (
    <div className={`page ${favoriteLenght ? 'page--favorites-empty' : ''}`}>
      <Header />

      <main className={`page__main page__main--favorites ${favoriteLenght ? 'page__main--favorites-empty' : ''}`}>
        <div className="page__favorites-container container">
          {
            favoriteLenght ?
              <FavoritesEmptyScreen />
              :
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {
                    favoriteOffers.map((offer) => (
                      <li key={offer.id} className="favorites__locations-items">
                        <div className="favorites__locations locations locations--current">
                          <div className="locations__item">
                            <Link className="locations__item-link" to={AppRoute.Main}>
                              <span>{offer.city.name}</span>
                            </Link>
                          </div>
                        </div>
                        <div className="favorites__places">
                          <FavoriteCard key={offer.id} offer={offer} />
                        </div>
                      </li>
                    ))
                  }
                </ul>
              </section>
          }
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default FavoriteScreen;
