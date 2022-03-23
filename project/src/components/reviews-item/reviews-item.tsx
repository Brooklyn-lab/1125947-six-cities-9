import { Reviews } from '../../types/reviews';
import { getRating, getMonth } from '../../utils/utils';

type ReviewsItemProps = {
  review: Reviews
}

function ReviewsItem({ review }: ReviewsItemProps): JSX.Element {

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={review.avatar} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {review.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ 'width': getRating(review.rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time" dateTime={review.date}>{getMonth(review.date)}</time>
      </div>
    </li>
  );
}

export default ReviewsItem;
