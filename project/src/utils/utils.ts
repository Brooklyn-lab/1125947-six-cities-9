import { Offer } from '../types/offers';

type SortType = {
  offers: Offer[]
  sortType: string
}

export const getRating = ((rating: number) => `${rating * 100 / 5}%`);

export const textToUpperCase = ((text: string) => text[0].toUpperCase() + text.slice(1, text.length - 1));

export function getListCity(offers: Offer[]) {
  const allCities = offers.map((offer) => (offer.city.name));
  const listCity = Array.from(new Set(allCities));

  return listCity;
}

export const getMonth = ((date: Date) => `${date.toLocaleString('EN', { month: 'long' })} ${date.getFullYear()}`);

export const sortOffersUp = (({ offers, sortType }: SortType): Offer[] => {
  const sortOffers = offers.sort((offerA, offerB) => (offerA.sortType - offerB[`${sortType}`]));

  return sortOffers;
});