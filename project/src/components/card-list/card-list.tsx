import Card from '../card/card';

function CardList(): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {[1, 2, 3, 4, 5].map((index) => <Card key={index} />)}
    </div>
  );
}

export default CardList;
