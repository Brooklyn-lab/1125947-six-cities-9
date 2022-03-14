import { Offer } from '../../types/offers';
import FavoriteCard from '../favorite-card/favorite-card';

type FavoriteListProp = {
  favoriteOffers: Offer[]
}

function FavoriteList({ favoriteOffers }: FavoriteListProp): JSX.Element {
  return (
    <>
      {
        favoriteOffers.map((offer) => (
          <FavoriteCard key={offer.id} offer={offer} />
        ))
      }
    </>
  );
}

export default FavoriteList;
