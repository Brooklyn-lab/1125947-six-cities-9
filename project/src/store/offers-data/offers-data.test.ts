import { typeSort } from '../../const';
import { OffersData } from '../../types/state';
import { makeFakeCurrentCity, makeFakeOffers } from '../../utils/mocks';
import { changeSortOffersType, offersData, loadOffers, loadFavoriteOffers } from './offers-data';
// import { changeCity } from './offers-data';


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
      })
  });

  // it('should update changeCity when changeCity changes', () => {
  //   const newCurrentCity = makeFakeOffers();
  //   const newOffersInCity = mockOffers;

  //   expect(offersData.reducer(state, changeCity('Amsterdam')))
  //     .toEqual({
  //       offers: [],
  //       isDataLoaded: false,
  //       currentCity: newCurrentCity,
  //       offersInCity: newOffersInCity,
  //       sortOfferType: typeSort.Popular,
  //       favoriteOffers: [],
  //       isFavoriteOffersLoaded: false,
  //     })
  // });

  it('should update sortOfferType when change type', () => {
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

  it('should update sortOfferType when change type', () => {
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

  it('should update sortOfferType when change type', () => {
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

  it('should update sortOfferType when change type', () => {
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
      })
  });
});
