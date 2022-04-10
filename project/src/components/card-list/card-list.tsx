import { Offer } from '../../types/offers';
import Card from '../card/card';

type CardListProp = {
  offers: Offer[]
  namePage: 'MainPage' | 'PropertyPage'
}

function CardList({ offers, namePage }: CardListProp): JSX.Element {
  const isMainPage = namePage === 'MainPage';
  const currentPageClasses = isMainPage ? 'cities__places-list tabs__content' : 'near-places__list';

  return (
    <div
      data-testid={`${currentPageClasses}`}
      className={`${currentPageClasses} places__list`}
    >
      {offers.map((offer) => <Card key={offer.id} offer={offer} namePage={namePage} />)}
    </div>
  );
}

export default CardList;
