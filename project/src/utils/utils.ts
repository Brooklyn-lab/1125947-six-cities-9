import { Offer } from '../types/offers';
import { MONTHS } from '../const';

export const getRating = ((rating: number) => `${rating * 100 / 5}%`);

export const textToUpperCase = ((text: string) => text[0].toUpperCase() + text.slice(1, text.length - 1));

export function getListCity(offers: Offer[]) {
  const allCities = offers.map((offer) => (offer.city.name));
  const listCity = Array.from(new Set(allCities));

  return listCity;
}

export const getMonth = ((date: string) => {
  const month = Number(date.slice(5, 7));
  let currentDate = '';

  MONTHS.map((item, index) => {
    if ((month - 1) === index) {
      currentDate = item;
    }
  });

  return `${currentDate} ${date.slice(0, 4)}`;
});
