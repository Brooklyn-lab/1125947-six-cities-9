import { useState } from 'react';
import { LOCATIONS } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity } from '../../store/offers-data/offers-data';

function CityList(): JSX.Element {
  const { currentCity } = useAppSelector(({ DATA }) => DATA);
  const dispatch = useAppDispatch();
  const [activeLocation, setActiveLocation] = useState(currentCity.name);

  return (
    <div data-testid="tabs" className="tabs">
      <section className="locations container">
        <ul data-testid="locations__list" className="locations__list tabs__list">
          {
            LOCATIONS.map((locationItem) => (
              <li className="locations__item"
                key={locationItem}
                onClick={() => {
                  dispatch(changeCity(locationItem));
                  setActiveLocation(locationItem);
                }}
              >
                <div className={`locations__item-link tabs__item ${(activeLocation === locationItem) ? 'tabs__item--active' : ' '}`}>
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
