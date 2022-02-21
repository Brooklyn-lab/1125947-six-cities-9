import Card from '../card/card';

type CardListProp = {
  cardCount: number,
}

function CardList({ cardCount }: CardListProp): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {Array.from({ length: cardCount }, (element, index) => <Card key={index} />)}
    </div>
  );
}

export default CardList;
