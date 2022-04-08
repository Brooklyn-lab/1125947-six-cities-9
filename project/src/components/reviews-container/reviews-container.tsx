import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchReviewsAction } from '../../store/api-actions';
import CommentForm from '../comment-form/comment-form';
import Reviews from '../reviews/reviews';

function ReviewsContainer(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const { reviews } = useAppSelector(({ OFFER }) => OFFER);
  const { authorizationStatus } = useAppSelector(({ USER }) => USER);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchReviewsAction(id));
    }
  }, [id, dispatch]);

  return (
    <section className="property__reviews reviews">
      {(reviews.length !== 0) ?
        <>
          <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
          <Reviews reviews={reviews} />
        </>
        : ''}
      {(authorizationStatus === AuthorizationStatus.Auth) ?
        <CommentForm />
        : ''}
    </section>
  );
}

export default ReviewsContainer;
