import { Offer } from '../../types/offers';
import Card from '../card/card';

type CardListProp = {
  offers: Offer[]
}

function CardList({ offers }: CardListProp): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <Card key={offer.id} offer={offer} />)}
    </div>
  );
}

export default CardList;
