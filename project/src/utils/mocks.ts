import { datatype, internet, lorem, address, random } from 'faker';
import { City, Offer } from '../types/offers';
import { Review } from '../types/review';

const AMOUNT = 3;

export const makeFakeOffers = (amount = AMOUNT): Offer[] => Array.from(Array(amount), () => ({
  bedrooms: datatype.number(),
  city: {
    location: {
      latitude: datatype.float(),
      longitude: datatype.float(),
      zoom: datatype.number(),
    },
    name: address.city(),
  },
  description: lorem.sentence(),
  goods: Array.from(Array(4), () => datatype.string()),
  host: {
    avatarUrl: internet.avatar(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: internet.userName(),
  },
  id: datatype.number(),
  images: Array.from(Array(6), () => internet.avatar()),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: {
    latitude: datatype.float(),
    longitude: datatype.float(),
    zoom: datatype.number(),
  },
  maxAdults: datatype.number(),
  previewImage: internet.avatar(),
  price: datatype.number(),
  rating: datatype.float(),
  title: lorem.sentence(),
  type: datatype.string(),
}));

export const makeFakeOffer = (): Offer => ({
  bedrooms: datatype.number(),
  city: {
    location: {
      latitude: datatype.float(),
      longitude: datatype.float(),
      zoom: datatype.number(),
    },
    name: address.city(),
  },
  description: lorem.sentence(),
  goods: Array.from(Array(4), () => datatype.string()),
  host: {
    avatarUrl: internet.avatar(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: internet.userName(),
  },
  id: datatype.number(),
  images: Array.from(Array(6), () => internet.avatar()),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: {
    latitude: datatype.float(),
    longitude: datatype.float(),
    zoom: datatype.number(),
  },
  maxAdults: datatype.number(),
  previewImage: internet.avatar(),
  price: datatype.number(),
  rating: datatype.float(),
  title: lorem.sentence(),
  type: datatype.string(),
});

export const makeFakeCurrentCity = (): City => ({
  location: {
    latitude: datatype.float(),
    longitude: datatype.float(),
    zoom: datatype.number(),
  },
  name: address.city(),
});

export const makeFakeReview = (amount = AMOUNT): Review[] => Array.from(Array(amount), () => ({
  comment: datatype.string(),
  date: datatype.string(),
  id: datatype.number(),
  rating: datatype.number(),
  user: {
    avatarUrl: internet.avatar(),
    id: datatype.number(),
    isPro: random.boolean(),
    name: internet.userName(),
  }
}));

export const makeFakeSelectedOffer = {

}