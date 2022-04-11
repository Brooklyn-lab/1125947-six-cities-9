import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchSelectedOfferAction } from '../../store/api-actions';
import HeaderScreen from '../header/header';
import LoadingScreen from '../loading-screen/loading-screen';
import Map from '../map/map';
import CardList from '../card-list/card-list';
import { getRating, toCapitalLetter } from '../../utils/utils';
import ReviewsContainer from '../reviews-container/reviews-container';
import ButtonFavorite from '../button-favorite/button-favorite';

function PropertyScreen(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { isSelectedOfferLoaded, selectedOffer, nearbyOffers } = useAppSelector(({ OFFER }) => OFFER);

  useEffect(() => {
    if (id) {
      dispatch(fetchSelectedOfferAction(id));
    }
  }, [id, dispatch]);

  const { images, isPremium, title, goods, price, host, description, rating, bedrooms, maxAdults, type, isFavorite } = selectedOffer;
  const hotelId = selectedOffer.id;

  return (
    <div className="page">
      <p className="visually-hidden">Property</p>
      {(!isSelectedOfferLoaded) ?
        <LoadingScreen />
        :
        <>
          <HeaderScreen />

          <main className="page__main page__main--property">
            <section
              data-testid="property-screen"
              className="property"
            >
              <div className="property__gallery-container container">
                <div className="property__gallery">
                  {images.map((image) => (
                    <div key={image} className="property__image-wrapper">
                      <img className="property__image" src={image} alt="Places" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="property__container container">
                <div className="property__wrapper">
                  {isPremium ?
                    <div className="property__mark">
                      <span>Premium</span>
                    </div>
                    :
                    ''}
                  <div className="property__name-wrapper">
                    <h1 className="property__name">
                      {title}
                    </h1>
                    <ButtonFavorite
                      size='Big'
                      isFavorite={isFavorite}
                      hotelId={hotelId}
                      type='Property'
                    />
                  </div>
                  <div className="property__rating rating">
                    <div className="property__stars rating__stars">
                      <span style={{ width: getRating(rating) }}></span>
                      <span className="visually-hidden">Rating</span>
                    </div>
                    <span className="property__rating-value rating__value">{rating}</span>
                  </div>
                  <ul className="property__features">
                    <li className="property__feature property__feature--entire">
                      {toCapitalLetter(type)}
                    </li>
                    <li className="property__feature property__feature--bedrooms">
                      {bedrooms} Bedrooms
                    </li>
                    <li className="property__feature property__feature--adults">
                      Max {maxAdults} adults
                    </li>
                  </ul>
                  <div className="property__price">
                    <b className="property__price-value">&euro;{price}</b>
                    <span className="property__price-text">&nbsp;night</span>
                  </div>
                  <div className="property__inside">
                    <h2 className="property__inside-title">What&apos;s inside</h2>
                    <ul className="property__inside-list">
                      {goods.map((goodsItem) => <li key={goodsItem} className="property__inside-item">{goodsItem}</li>)}
                    </ul>
                  </div>
                  <div className="property__host">
                    <h2 className="property__host-title">Meet the host</h2>
                    <div className="property__host-user user">
                      <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                        <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                      </div>
                      <span className="property__user-name">
                        {host.name}
                      </span>
                      {host.isPro ?
                        <span className="property__user-status">
                          Pro
                        </span>
                        : ''}
                    </div>
                    <div className="property__description">
                      <p className="property__text">
                        {description}
                      </p>
                    </div>
                  </div>
                  <ReviewsContainer />
                </div>
              </div>
              <Map
                location={selectedOffer.city.location}
                points={nearbyOffers}
                namePage='PropertyPage'
                selectedCard={selectedOffer}
              />
            </section>
            <div className="container">
              <section className="near-places places">
                <h2 className="near-places__title">Other places in the neighbourhood</h2>
                <CardList offers={nearbyOffers} namePage='PropertyPage' />
              </section>
            </div>
          </main>
        </>}
    </div>
  );
}

export default PropertyScreen;
