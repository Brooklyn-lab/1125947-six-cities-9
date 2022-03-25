import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { changeCity } from './action';
import { offers } from '../mocks/offers';

const initialState = {
  city: 'Amsterdam',
  offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action: PayloadAction<string>) => {
      console.log(state, action.payload);
    });
});

export { reducer };
