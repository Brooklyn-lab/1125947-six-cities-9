import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import browserHistory from './browser-history';
import App from './components/app/app';
import HistoryRouter from './components/history-route/history-route';
import { store } from './store';
import { checkAuthAction, fetchOffersAction } from './store/api-actions';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
