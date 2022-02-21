import MainScreen from '../main-screen/main-screen';

type PlaceCardProps = {
  placesCount: number,
}

function App({ placesCount }: PlaceCardProps): JSX.Element {
  return <MainScreen placesCount={placesCount} />;
}

export default App;
