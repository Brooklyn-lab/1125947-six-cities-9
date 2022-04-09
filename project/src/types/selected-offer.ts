import { Offer } from './offers';
import { Review } from './review';

export type SelectedOffer = {
  offer: Offer,
  offersNearby: Offer[],
  comments: Review[]
};
