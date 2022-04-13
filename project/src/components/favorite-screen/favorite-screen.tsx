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
import { Offer } from '../../types/offers';

function FavoriteScreen() {
  const { favoriteOffers, isFavoriteOffersLoaded } = useAppSelector(({ DATA }) => DATA);
  const dispatch = useAppDispatch();

  const favoriteLenght = (favoriteOffers.length === 0);

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  if (!isFavoriteOffersLoaded) {
    return (<LoadingScreen />);
  }

  const sortedOffers = favoriteOffers.reduce((acc: { [cityName: string]: Offer[] }, offer: Offer) => {
    const cityName = offer.city.name;
    if (!acc[cityName]) {
      acc[cityName] = [];
    }
    acc[cityName].push(offer);
    return acc;
  }, {});
  const locationsData = Object.keys(sortedOffers).sort()
    .map((cityName: string) => ({ cityName, offers: sortedOffers[cityName] }));

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
                    locationsData.map((location) => (
                      <li key={location.cityName} className="favorites__locations-items">
                        <div className="favorites__locations locations locations--current">
                          <div className="locations__item">
                            <Link className="locations__item-link" to={AppRoute.Main}>
                              <span>{location.cityName}</span>
                            </Link>
                          </div>
                        </div>
                        <div className="favorites__places">
                          {location.offers.map((offer) => (
                            <FavoriteCard key={offer.id} offer={offer} />
                          ))}
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
