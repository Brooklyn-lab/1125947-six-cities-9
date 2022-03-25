import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { changeCity } from '../../store/action';

type CityProps = {
  location: string
}

function City({ location }: CityProps): JSX.Element {
  const city = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();

  const isActiveItem = location === city;

  return (
    <li className="locations__item">
      <a
        className={`locations__item-link tabs__item ${isActiveItem ? 'tabs__item--active' : ''}`}
        onClick={() => dispatch(changeCity(location))}
        href="#"
      >
        <span>{location}</span>
      </a>
    </li>
  );
}

export default City;
