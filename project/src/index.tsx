import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { offers } from './mocks/offers';
import { favoriteOffers } from './mocks/favoriteOffers';

const CardInfo = {
  placesCount: 312,
};

ReactDOM.render(
  <React.StrictMode>
    <App
      placesCount={CardInfo.placesCount}
      offers={offers}
      favoriteOffers={favoriteOffers}
    />
  </React.StrictMode>,
  document.getElementById('root'));
