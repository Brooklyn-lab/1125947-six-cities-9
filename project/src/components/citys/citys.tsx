import { LOCATION } from '../../const';
import { useAppDispatch } from '../../hooks';
import { changeCity, addOffers } from '../../store/action';

type CityListProps = {
  currentCity: string
}

function CityList({ currentCity }: CityListProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            LOCATION.map((locationItem) => (
              <li className="locations__item"
                key={locationItem}
                onClick={() => {
                  dispatch(changeCity(locationItem));
                  dispatch(addOffers());
                }}
              >
                <div className={`locations__item-link tabs__item ${(currentCity === locationItem) ? 'tabs__item--active' : ' '}`}>
                  <span>{locationItem}</span>
                </div>
              </li>
            ))
          }
        </ul>
      </section>
    </div>
  );
}

export default CityList;
