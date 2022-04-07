import { useAppSelector } from '../../hooks';
import Footer from '../footer/footer';
import Header from '../header/header';
import FavoriteCard from '../favorite-card/favorite-card';

function FavoriteScreen() {
  const { favoriteOffers } = useAppSelector(({ DATA }) => DATA);

  return (
    <>
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {
                favoriteOffers.map((offer) => (
                  <li key={offer.id} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{offer.city.name}</span>
                        </a>
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
        </div>
      </main>

      <Footer />
    </>
  );
}

export default FavoriteScreen;
