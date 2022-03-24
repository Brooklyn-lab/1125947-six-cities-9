import { Offer } from '../../types/offers';
import Card from '../card/card';

type CardListProp = {
  offers: Offer[],
  namePage: 'MainPage' | 'PropertyPage'
}

enum CardListContainer {
  MainPage = 'cities__places-list tabs__content',
  PropertyPage = 'near-places__list',
}

function CardList({ offers, namePage }: CardListProp): JSX.Element {
  const currentClassName = CardListContainer[namePage];

  return (
    <div className={`${currentClassName} places__list`}>
      {offers.map((offer) => <Card key={offer.id} offer={offer} namePage={namePage} />)}
    </div>
  );
}

export default CardList;
