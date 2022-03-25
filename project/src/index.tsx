import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { offers } from './mocks/offers';
import { favoriteOffers } from './mocks/favoriteOffers';
import { store } from './store';

const CardInfo = {
  placesCount: 312,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        placesCount={CardInfo.placesCount}
        offers={offers}
        favoriteOffers={favoriteOffers}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
