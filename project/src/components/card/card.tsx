import { useState } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Offer } from '../../types/offers';
import { getRating, textToUpperCase } from '../../utils/utils';

type CardProp = {
  offer: Offer
  hoverCarOnList?: (placeId: number) => void
  namePage: 'MainPage' | 'PropertyPage'
}

function Card({ offer, hoverCarOnList, namePage }: CardProp): JSX.Element {
  const { previewImage, price, rating, title, type, id, isPremium } = offer;
  const [mouseOver, setMouseOver] = useState(-1);

  const isMainPage = namePage === 'MainPage';

  const mouseOverHandler = () => {
    setMouseOver(id);
    if (hoverCarOnList) {
      hoverCarOnList(id);
    }
  };
  const mouseOutHandler = () => {
    setMouseOver(-1);
    if (hoverCarOnList) {
      hoverCarOnList(-1);
    }
  };

  return (
    <article className={`${isMainPage ? 'cities__place-card' : 'near-places__card'} place-card`} onMouseOver={mouseOverHandler} onMouseOut={mouseOutHandler}>
      {
        isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className={`${isMainPage ? 'cities-places__image-wrapper' : 'near-places__image-wrapper'} place-card__image-wrapper`} >
        <Link to={generatePath(AppRoute.Room, { id: String(mouseOver) })}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: getRating(rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={generatePath(AppRoute.Room, { id: String(mouseOver) })}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{textToUpperCase(type)}</p>
      </div>
    </article>
  );
}

export default Card;
