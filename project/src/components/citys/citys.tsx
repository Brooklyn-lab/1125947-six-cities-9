import { useState } from 'react';
import { LOCATIONS } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity } from '../../store/action';

function CityList(): JSX.Element {
  const currentCity = useAppSelector((state) => state.currentCity);
  const dispatch = useAppDispatch();
  const [activeLocation, setActiveLocation] = useState(currentCity.name);

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
