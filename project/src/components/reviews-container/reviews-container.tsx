/* eslint-disable no-console */

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchReviewsAction } from '../../store/api-actions';
import CommentForm from '../comment-form/comment-form';
import LoadingScreen from '../loading-screen/login-screen';
import ReviewsList from '../reviews-list/reviews-list';

function ReviewsContainer(): JSX.Element {
  const { id } = useParams();
  const { reviews, isSelectedOfferLoaded } = useAppSelector(({ OFFER }) => OFFER);
  const { authorizationStatus } = useAppSelector(({ USER }) => USER);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchReviewsAction(String(id)));
  }, [id]);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      {(!isSelectedOfferLoaded) ?
        <LoadingScreen />
        :
        <ReviewsList reviews={reviews} />}
      {(authorizationStatus === AuthorizationStatus.Auth) ?
        <CommentForm />
        : ''}
    </section>
  );
}

export default ReviewsContainer;
