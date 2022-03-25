import { createAction } from '@reduxjs/toolkit';

export const changeCity = createAction<string>('main/changeCity');
export const addOffers = createAction('main/addOffers');


