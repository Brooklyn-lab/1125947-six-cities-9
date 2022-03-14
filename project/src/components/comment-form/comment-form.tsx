import { ChangeEvent, FormEvent, useState } from 'react';

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

function CommentForm(): JSX.Element {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const getValueHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(evt.target.value);
  };

  const getStarsRating = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(parseInt(evt.target.value, 10));
  };

  const formSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={formSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          starsRating.map((star) => (
            <>
              <input
                className="form__rating-input visually-hidden"
                type='radio'
                name={star.name}
                id={String(star.id)}
                key={star.id}
                title={star.title}
                value={String(star.id)}
                checked={rating === star.id}
                onChange={getStarsRating}
              />
              <label htmlFor={String(star.id)} className="reviews__rating-label form__rating-label" title={star.title}>
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </>
          ))
        }
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={getValueHandler}
        value={review}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={rating === 0 || review.length === 0}>Submit</button>
      </div>
    </form>
  );
}

export default CommentForm;
