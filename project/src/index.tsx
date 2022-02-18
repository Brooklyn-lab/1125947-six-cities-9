import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

// const CardInfo = {
//   placesCount: 312,
// };

ReactDOM.render(
  <React.StrictMode>
    {/* <App placesCount = {CardInfo.placesCount} /> */}
    <App />
  </React.StrictMode>,
  document.getElementById('root'));
