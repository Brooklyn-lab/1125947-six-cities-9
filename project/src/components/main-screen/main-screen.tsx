import CardList from '../card-list/card-list';
import Map from '../map/map';
import CityList from '../citys/citys';
import { useAppSelector } from '../../hooks';
import EmptyListScreen from '../empty-list-screen/empty-list-screen';

function MainScreen(): JSX.Element {
  const { currentCity, offersInCity } = useAppSelector((state) => state);

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <CityList currentCity={currentCity.name} />
      <div className="cities">
        {(offersInCity.length === 0) ?
          <EmptyListScreen currentCity={currentCity.name} />
          :
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersInCity.length} places to stay in {currentCity.name}</b>
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
              <CardList offers={offersInCity} namePage='MainPage' />
            </section>
            <div className="cities__right-section">
              <Map location={currentCity.location} points={offersInCity} namePage='MainPage' />
            </div>
          </div>}
      </div>
    </main>
  );
}

export default MainScreen;

