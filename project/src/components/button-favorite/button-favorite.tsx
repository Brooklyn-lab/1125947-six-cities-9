import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { redirectToRoute } from '../../store/action';
import { toggleFavoriteStatusAction } from '../../store/api-actions';

type ButtonFavoriteProps = {
  size: 'Big' | 'Small',
  isFavorite: boolean,
  hotelId: number,
  type: 'Place' | 'Property'
}

const markSize = {
  Small: {
    with: '18',
    height: '19',
  },
  Big: {
    with: '31',
    height: '33',
  },
};

const classNameButton = {
  Property: {
    Active: 'property__bookmark-button property__bookmark-button--active button',
    Normal: 'property__bookmark-button button',
    Icon: 'property__bookmark-icon',
  },
  Place: {
    Active: 'place-card__bookmark-button place-card__bookmark-button--active button',
    Normal: 'place-card__bookmark-button button',
    Icon: 'place-card__bookmark-icon',
  },
};

function ButtonFavorite({ size, isFavorite, hotelId, type }: ButtonFavoriteProps): JSX.Element {
  const { authorizationStatus } = useAppSelector(({ USER }) => USER);
  const dispatch = useAppDispatch();
  const iconSize = markSize[size];
  const className = classNameButton[type];

  const toggleFavoriteStatus = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      const favoriteData = {
        id: hotelId,
        status: Number(!isFavorite),
      };

      dispatch(toggleFavoriteStatusAction(favoriteData));
    } else {
      dispatch(redirectToRoute(AppRoute.SignIn));
    }
  };

  return (
    <button
      className={`${isFavorite ? className.Active : className.Normal}`}
      type="button"
      onClick={toggleFavoriteStatus}
    >
      <svg
        className={className.Icon}
        width={iconSize.with}
        height={iconSize.height}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default ButtonFavorite;
