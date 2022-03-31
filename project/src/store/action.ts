import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offers';

export const changeCity = createAction<string>('main/changeCity');
export const addOffers = createAction<Offer[]>('main/addOffers');
export const changeSortOffersType = createAction<string>('changeSortOffersType');


