import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { favoriteOffers } from './mocks/favoriteOffers';
import { store } from './store';
import { offers } from './mocks/offers';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        favoriteOffers={favoriteOffers}
        offers={offers}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
