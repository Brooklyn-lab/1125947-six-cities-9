import { useState } from 'react';
import { typeSort } from '../../const';
import { useAppDispatch } from '../../hooks';
import { changeSortOffersType } from '../../store/action';

function SortForm(): JSX.Element {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [activeType, setActiveType] = useState(typeSort.Popular);
  const dispatch = useAppDispatch();

  return (
    <form className="places__sorting" action="#" method="get" onClick={() => setIsOptionsOpen(!isOptionsOpen)}>
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOptionsOpen ? 'places__options--opened' : ' '}`}>
        {Object.values(typeSort).map((type) => (
          <li
            key={type}
            className={`places__option ${type === activeType ? 'places__option--active' : ' '}`}
            tabIndex={0}
            onClick={() => {
              dispatch(changeSortOffersType(type));
              setActiveType(type);
            }}
          >
            {type}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortForm;
