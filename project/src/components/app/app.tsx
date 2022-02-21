import MainScreen from '../main-screen/main-screen';

type AppProps = {
  placesCount: number,
  cardCount: number
}

function App({ placesCount, cardCount }: AppProps): JSX.Element {
  return <MainScreen placesCount={placesCount} cardCount={cardCount} />;
}

export default App;
