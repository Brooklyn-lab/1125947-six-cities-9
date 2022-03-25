import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { favoriteOffers } from './mocks/favoriteOffers';
import { store } from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        favoriteOffers={favoriteOffers}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
