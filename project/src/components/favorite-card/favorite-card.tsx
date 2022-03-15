import { useState } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Offer } from '../../types/offers';
import { getRating, textToUpperCase } from '../../utils/utils';

type FavoriteCardProp = {
  offer: Offer
}

function FavoriteCard({ offer }: FavoriteCardProp): JSX.Element {
  const { previewImage, price, rating, title, type, id, isPremium } = offer;

  const [activeCard, setActiveCard] = useState(0);

  const onMouseEnterHandler = () => {
    setActiveCard(id);
  };

  return (
    <article className="favorites__card place-card" onMouseEnter={onMouseEnterHandler}>
      {
        isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={generatePath(AppRoute.Room, { id: String(activeCard) })}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: getRating(rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={generatePath(AppRoute.Room, { id: String(activeCard) })}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{textToUpperCase(type)}</p>
      </div>
    </article>
  );
}

export default FavoriteCard;
