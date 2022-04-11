import ClipLoader from 'react-spinners/DotLoader';

const styleLoaderWrapper = {
  'display': 'flex',
  'alignItems': 'center',
  'justifyContent': 'center',
  'minHeight': '100vh',
  'width': '100%',
};

function LoadingScreen(): JSX.Element {
  return (
    <div
      data-testid="loading-screen"
      style={styleLoaderWrapper}
    >
      <ClipLoader color={'#3667D7'} loading size={60} />
    </div>
  );
}

export default LoadingScreen;
