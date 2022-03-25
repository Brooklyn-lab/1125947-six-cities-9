import { Offer } from '../../types/offers';
import Card from '../card/card';

type CardListProp = {
  offers: Offer[],
  namePage: 'MainPage' | 'PropertyPage'
}

function CardList({ offers, namePage }: CardListProp): JSX.Element {
  const isMainPage = namePage === 'MainPage';

  return (
    <div className={`${isMainPage ? 'cities__places-list tabs__content' : 'near-places__list'} places__list`}>
      {offers.map((offer) => <Card key={offer.id} offer={offer} namePage={namePage} />)}
    </div>
  );
}

export default CardList;
