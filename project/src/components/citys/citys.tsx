import { LOCATIONS } from '../../const';
import { useAppDispatch } from '../../hooks';
import { changeCity } from '../../store/action';

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
            LOCATIONS.map((locationItem) => (
              <li className="locations__item"
                key={locationItem}
                onClick={() => {
                  dispatch(changeCity(locationItem));
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
