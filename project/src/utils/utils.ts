import { Offer } from '../types/offers';

export const getRating = ((rating: number) => `${rating * 100 / 5}%`);

export const textToUpperCase = ((text: string) => text[0].toUpperCase() + text.slice(1, text.length - 1));

export function getListCity(offers: Offer[]) {
  const allCities = offers.map((offer) => (offer.city.name));
  const listCity = Array.from(new Set(allCities));

  return listCity;
}

export const toCapitalLetter = ((word: string) => `${word[0].toUpperCase()}${word.slice(1, word.length)}`);
