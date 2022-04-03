import { Offer } from '../../types/offers';
import Card from '../card/card';

type CardListProp = {
  offers: Offer[]
  namePage: 'MainPage' | 'PropertyPage'
  onHoverHandler?: (locationId: number | null) => void
}

function CardList({ offers, namePage, onHoverHandler }: CardListProp): JSX.Element {
  const isMainPage = namePage === 'MainPage';

  return (
    <div className={`${isMainPage ? 'cities__places-list tabs__content' : 'near-places__list'} places__list`}>
      {offers.map((offer) => <Card key={offer.id} offer={offer} namePage={namePage}  onHoverHandler={onHoverHandler} />)}
    </div>
  );
}

export default CardList;
