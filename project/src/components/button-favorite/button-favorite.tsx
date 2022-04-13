import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { redirectToRoute } from '../../store/action';
import { fetchSelectedOfferAction, toggleFavoriteStatusAction } from '../../store/api-actions';
import { toggleFavoriteStatusOnFavPage } from '../../store/offers-data/offers-data';

type ButtonFavoriteProps = {
  size: 'Big' | 'Small',
  isFavorite: boolean,
  hotelId: number,
  type: 'Place' | 'Property',
  favoritePage?: 'Favorite',
}

enum classNameButton {
  Property = 'property',
  Place = 'place-card',
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

function ButtonFavorite({ size, isFavorite, hotelId, type, favoritePage }: ButtonFavoriteProps): JSX.Element {
  const { authorizationStatus } = useAppSelector(({ USER }) => USER);
  const dispatch = useAppDispatch();
  const iconSize = markSize[size];
  const pageType = classNameButton[type];

  const isActiveClass = isFavorite ? `${pageType}__bookmark-button--active` : '';

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

    if (favoritePage === 'Favorite') {
      dispatch(toggleFavoriteStatusOnFavPage(hotelId));
    } else if (type === 'Property') {
      dispatch(fetchSelectedOfferAction(String(hotelId)));
    }
  };

  return (
    <button
      data-testid={`${pageType}__bookmark-button`}
      className={`${pageType}__bookmark-button button ${isActiveClass}`}
      type="button"
      onClick={toggleFavoriteStatus}
    >
      <svg
        data-testid={`${pageType}__bookmark-icon`}
        className={`${pageType}__bookmark-icon`}
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
