import { useState } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Offer } from '../../types/offers';
import { getRating, textToUpperCase } from '../../utils/utils';
import ButtonFavorite from '../button-favorite/button-favorite';

type FavoriteCardProp = {
  offer: Offer
}

function FavoriteCard({ offer }: FavoriteCardProp): JSX.Element {
  const { previewImage, price, rating, title, type, id, isPremium, isFavorite } = offer;

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
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place" />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
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
