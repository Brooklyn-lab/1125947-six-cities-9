import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import CommentForm from '../comment-form/comment-form';
import Reviews from '../reviews/reviews';

function ReviewsContainer(): JSX.Element {
  const { reviews } = useAppSelector(({ OFFER }) => OFFER);
  const { authorizationStatus } = useAppSelector(({ USER }) => USER);

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
