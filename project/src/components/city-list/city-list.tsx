import City from '../city/city';

type CityListProps = {
  locations: string[]
}

function CityList({ locations }: CityListProps): JSX.Element {
  return (
    <ul className="locations__list tabs__list">
      {
        locations.map((location) => (
          <City key={location} location={location} />
        ))
      }
    </ul>
  );
}

export default CityList;
