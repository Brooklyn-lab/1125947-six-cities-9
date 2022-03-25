import CardList from '../card-list/card-list';
import Map from '../map/map';
import CityList from '../citys/citys';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Offer } from '../../types/offers';
import { useEffect, useState } from 'react';
import EmptyListScreen from '../empty-list-screen/empty-list-screen';
import { addOffers } from '../../store/action';

function MainScreen(): JSX.Element {
  const { currentCity, currentOffers } = useAppSelector((state) => state);
  const [selectedPoint, setSelectedPoint] = useState<Offer | undefined>(undefined);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(addOffers());
  }, []);

  const offersInCity = currentOffers.filter((offer) => offer.city.name === currentCity);

  const hoverCarOnList = (placeId: number) => {
    let currentPoint;

    if (placeId !== -1) {
      const currentIndex = offersInCity.findIndex((place) => place.id === placeId);
      const { title } = offersInCity[currentIndex];
      currentPoint = offersInCity.find((place) => place.title === title);
    }

    setSelectedPoint(currentPoint);
  };

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <CityList currentCity={currentCity} />
      {
        (offersInCity.length === 0) ?
          <EmptyListScreen currentCity={currentCity} />
          :
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offersInCity.length} places to stay in {currentCity}</b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex={0}>
                    Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                    <li className="places__option" tabIndex={0}>Price: low to high</li>
                    <li className="places__option" tabIndex={0}>Price: high to low</li>
                    <li className="places__option" tabIndex={0}>Top rated first</li>
                  </ul>
                </form>
                <CardList offers={offersInCity} hoverCarOnList={hoverCarOnList} namePage='MainPage' />
              </section>
              <div className="cities__right-section">
                <Map location={currentOffers[0].city.location} points={offersInCity} selectedPoint={selectedPoint} namePage='MainPage' />
              </div>
            </div>
          </div>
      }
    </main>
  );
}

export default MainScreen;

