import { typeSort } from '../../const';
import { OffersData } from '../../types/state';
import { makeFakeCurrentCity, makeFakeOffers } from '../../utils/mocks';
import { changeSortOffersType, offersData, loadOffers, loadFavoriteOffers } from './offers-data';
import { changeCity } from './offers-data';

const mockCurrentCity = makeFakeCurrentCity();
const mockOffers = makeFakeOffers();

const state: OffersData = {
  offers: [],
  isDataLoaded: false,
  currentCity: mockCurrentCity,
  offersInCity: [],
  sortOfferType: typeSort.Popular,
  favoriteOffers: [],
  isFavoriteOffersLoaded: false,
};

describe('Reducer: OffersData', () => {
  it('should update offers by set offers', () => {
    expect(offersData.reducer(state, loadOffers(mockOffers)))
      .toEqual({
        offers: mockOffers,
        isDataLoaded: true,
        currentCity: mockCurrentCity,
        offersInCity: [],
        sortOfferType: typeSort.Popular,
        favoriteOffers: [],
        isFavoriteOffersLoaded: false,
      });
  });

  it('should update changeCity when changeCity changes', () => {
    const stateData: OffersData = {
      offers: [],
      isDataLoaded: false,
      currentCity: {
        location: {
          latitude: 50.123456789,
          longitude: 5.123456789,
          zoom: 10,
        },
        name: 'Amsterdam',
      },
      offersInCity: [],
      sortOfferType: typeSort.Popular,
      favoriteOffers: [],
      isFavoriteOffersLoaded: false,
    };

    expect(offersData.reducer(stateData, changeCity('Amsterdam')))
      .toEqual({
        offers: [],
        isDataLoaded: false,
        currentCity: {
          location: {
            latitude: 50.123456789,
            longitude: 5.123456789,
            zoom: 10,
          },
          name: 'Amsterdam',
        },
        offersInCity: [],
        sortOfferType: typeSort.Popular,
        favoriteOffers: [],
        isFavoriteOffersLoaded: false,
      });
  });

  it('should update sortOfferType when change type popular', () => {
    expect(offersData.reducer(state, changeSortOffersType('Popular')))
      .toEqual({
        offers: [],
        isDataLoaded: false,
        currentCity: mockCurrentCity,
        offersInCity: [],
        sortOfferType: typeSort.Popular,
        favoriteOffers: [],
        isFavoriteOffersLoaded: false,
      });
  });

  it('should update sortOfferType when change type priceUp', () => {
    expect(offersData.reducer(state, changeSortOffersType('Price: low to high')))
      .toEqual({
        offers: [],
        isDataLoaded: false,
        currentCity: mockCurrentCity,
        offersInCity: [],
        sortOfferType: typeSort.PriceUp,
        favoriteOffers: [],
        isFavoriteOffersLoaded: false,
      });
  });

  it('should update sortOfferType when change type priceDown', () => {
    expect(offersData.reducer(state, changeSortOffersType('Price: high to low')))
      .toEqual({
        offers: [],
        isDataLoaded: false,
        currentCity: mockCurrentCity,
        offersInCity: [],
        sortOfferType: typeSort.PriceDown,
        favoriteOffers: [],
        isFavoriteOffersLoaded: false,
      });
  });

  it('should update sortOfferType when change type rating', () => {
    expect(offersData.reducer(state, changeSortOffersType('Top rated first')))
      .toEqual({
        offers: [],
        isDataLoaded: false,
        currentCity: mockCurrentCity,
        offersInCity: [],
        sortOfferType: typeSort.Rating,
        favoriteOffers: [],
        isFavoriteOffersLoaded: false,
      });
  });

  it('should update favoriteOffers by set favoriteOffers', () => {
    expect(offersData.reducer(state, loadFavoriteOffers(mockOffers)))
      .toEqual({
        offers: [],
        isDataLoaded: false,
        currentCity: mockCurrentCity,
        offersInCity: [],
        sortOfferType: typeSort.Popular,
        favoriteOffers: mockOffers,
        isFavoriteOffersLoaded: true,
      });
  });
});
