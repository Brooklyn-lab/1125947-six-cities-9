import { offerData } from './offer-data';
import { fetchSelectedOffer, isFormEnabled } from './offer-data';
import { OfferData } from '../../types/state';
import { makeFakeOffer, makeFakeOffers, makeFakeReview } from '../../utils/mocks';
import { SelectedOffer } from '../../types/selected-offer';

const mockOffer = makeFakeOffer();
const mockOffers = makeFakeOffers();
const mockReviews = makeFakeReview();

const state: OfferData = {
  selectedOffer: mockOffer,
  isSelectedOfferLoaded: false,
  reviews: [],
  nearbyOffers: [],
  isFormDisabled: false,
};

const selectOfferData: SelectedOffer = {
  offer: mockOffer,
  offersNearby: mockOffers,
  comments: mockReviews,
};

describe('Router: offerData', () => {
  it('should update selectedOffer to selectedOffer', () => {
    expect(offerData.reducer(state, fetchSelectedOffer(selectOfferData)))
      .toEqual({
        selectedOffer: selectOfferData.offer,
        isSelectedOfferLoaded: true,
        reviews: selectOfferData.comments,
        nearbyOffers: selectOfferData.offersNearby,
        isFormDisabled: false,
      });
  });

  it('if received "true" should be changed to "true"', () => {
    expect(offerData.reducer(state, isFormEnabled(true)))
      .toEqual({
        selectedOffer: mockOffer,
        isSelectedOfferLoaded: false,
        reviews: [],
        nearbyOffers: [],
        isFormDisabled: true,
      });
  });

  it('if received "false" should be changed to "false"', () => {
    expect(offerData.reducer(state, isFormEnabled(false)))
      .toEqual({
        selectedOffer: mockOffer,
        isSelectedOfferLoaded: false,
        reviews: [],
        nearbyOffers: [],
        isFormDisabled: false,
      });
  });
});
