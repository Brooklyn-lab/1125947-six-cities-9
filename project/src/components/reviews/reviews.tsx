import { Review } from '../../types/review';
import { getRating } from '../../utils/utils';
import dayjs from 'dayjs';

type ReviewsProps = {
  reviews: Review[]
}

function Reviews({ reviews }: ReviewsProps): JSX.Element {
  return (
    <ul
      data-testid='reviews__list'
      className="reviews__list"
    >
      {reviews.map((review) => {
        const { id, comment, user, rating, date } = review;

        return (
          <li className="reviews__item" key={id}>
            <div className="reviews__user user">
              <div className="reviews__avatar-wrapper user__avatar-wrapper">
                <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
              </div>
              <span
                className="reviews__user-name"
              >
                {user.name}
              </span>
            </div>
            <div className="reviews__info">
              <div className="reviews__rating rating">
                <div className="reviews__stars rating__stars">
                  <span style={{ 'width': getRating(rating) }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
              </div>
              <p className="reviews__text">
                {comment}
              </p>
              <time className="reviews__time" dateTime={dayjs(date).format('YYYY-MM-DD')}>{dayjs(date).format('MMMM YYYY')}</time>
            </div>
          </li>);
      })}
    </ul>
  );
}

export default Reviews;
