import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { getSelectedCardId } from '../../store/user-process/user-process';
import { Offer } from '../../types/offers';
import { getRating, textToUpperCase } from '../../utils/utils';
import ButtonFavorite from '../button-favorite/button-favorite';

type CardProp = {
  offer: Offer
  namePage: 'MainPage' | 'PropertyPage'
}

enum CurrentPageData {
  'MainPage' = 'cities',
  'PropertyPage' = 'near'
}

function Card({ offer, namePage }: CardProp): JSX.Element {
  const { previewImage, price, rating, title, type, id, isPremium, isFavorite } = offer;
  const dispatch = useAppDispatch();

  const сurrentPage = CurrentPageData[namePage];
  const isMainPage = namePage === 'MainPage';

  const onMouseEnterHandler = () => {
    if (isMainPage) {
      dispatch(getSelectedCardId(id));
    }
  };

  const onMouseLeaveHandler = () => {
    if (isMainPage) {
      dispatch(getSelectedCardId(null));
    }
  };

  return (
    <article
      className={`${сurrentPage}__place-card place-card`}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      {
        isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className={`${сurrentPage}-places__image-wrapper place-card__image-wrapper`} >
        <Link to={generatePath(AppRoute.Room, { id: String(id) })}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <ButtonFavorite
            size='Small'
            hotelId={id}
            isFavorite={isFavorite}
            type='Place'
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: getRating(rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={generatePath(AppRoute.Room, { id: String(id) })}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{textToUpperCase(type)}</p>
      </div>
    </article>
  );
}

export default Card;
