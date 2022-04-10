import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { sendCommentAction } from '../../store/api-actions';
import { isFormEnabled } from '../../store/offer-data/offer-data';

const starsRating = [
  {
    id: 5,
    title: 'terribly',
    name: 'star-1',
  },
  {
    id: 4,
    title: 'badly',
    name: 'star-2',
  },
  {
    id: 3,
    title: 'not bad',
    name: 'star-3',
  },
  {
    id: 2,
    title: 'good',
    name: 'star-4',
  },
  {
    id: 1,
    title: 'perfect',
    name: 'star-5',
  },
];

const MAX_LENGTH_COMMENT = 300;
const MIN_LENGTH_COMMENT = 50;

function CommentForm(): JSX.Element {
  const { selectedOffer, isFormDisabled } = useAppSelector(({ OFFER }) => OFFER);
  const dispatch = useAppDispatch();

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const isButtonDisabled = (rating === 0 || comment.length < MIN_LENGTH_COMMENT || comment.length > MAX_LENGTH_COMMENT || isFormDisabled);

  const getValueHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };

  const getStarsRating = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(parseInt(evt.target.value, 10));
  };

  const formSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const id = String(selectedOffer.id);
    dispatch(sendCommentAction({ id, comment, rating }));
    setComment('');
    setRating(0);
    dispatch(isFormEnabled(true));
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={formSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          starsRating.map((star) => (
            <Fragment key={star.id}>
              <input
                className="form__rating-input visually-hidden"
                type='radio'
                name={star.name}
                id={String(star.id)}
                title={star.title}
                value={String(star.id)}
                checked={rating === star.id}
                onChange={getStarsRating}
                disabled={isFormDisabled}
              />
              <label htmlFor={String(star.id)} className="reviews__rating-label form__rating-label" title={star.title}>
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          ))
        }
      </div>
      <textarea
        data-testid="review"
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={getValueHandler}
        value={comment}
        disabled={isFormDisabled}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isButtonDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
