import CardList from '../card-list/card-list';
import Map from '../map/map';
import CityList from '../citys/citys';
import { useAppSelector } from '../../hooks';
import EmptyListScreen from '../empty-list-screen/empty-list-screen';
import SortForm from '../sortform/sort-form';
import { useEffect, useState } from 'react';
import { Offer } from '../../types/offers';
import Header from '../header/header';

function MainScreen(): JSX.Element {
  const { currentCity, offersInCity } = useAppSelector(({DATA}) => DATA);
  const { selectedCardId } = useAppSelector(({ USER }) => USER);
  const [selectedCard, setSelectedCard] = useState<Offer | null>(null);

  useEffect(() => {
    const foundCard = offersInCity.find((offer) => offer.id === selectedCardId);
    setSelectedCard(foundCard || null);
  }, [selectedCardId, offersInCity]);

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CityList />
        <div className="cities">
          {(offersInCity.length === 0) ?
            <EmptyListScreen currentCity={currentCity.name} />
            :
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offersInCity.length} places to stay in {currentCity.name}</b>
                <SortForm />
                <CardList offers={offersInCity} namePage='MainPage' />
              </section>
              <div className="cities__right-section">
                <Map location={currentCity.location} points={offersInCity} namePage='MainPage' selectedCard={selectedCard} />
              </div>
            </div>}
        </div>
      </main>
    </div>
  );
}

export default MainScreen;

