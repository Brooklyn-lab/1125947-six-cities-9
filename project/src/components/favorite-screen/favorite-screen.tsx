// import { useAppSelector } from '../../hooks';
// import { getListCity } from '../../utils/utils';
// import FavoriteList from '../favorite-list/favorite-list';
import Footer from '../footer/footer';
import Header from '../header/header';

function FavoriteScreen() {
  // const { favoriteOffers } = useAppSelector((state) => state);

  // const listCity = getListCity(favoriteOffers);

  // const favoritesCity = listCity.map((city) => {
  //   const places = favoriteOffers.filter((offer) => offer.city.name === city);
  //   return { city, places };
  // });

  return (
    <>
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {/* {
                favoritesCity.map((offer) => (
                  <li key={offer.city} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{offer.city}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      <FavoriteList favoriteOffers={offer.places} />
                    </div>
                  </li>
                ))
              } */}
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default FavoriteScreen;
