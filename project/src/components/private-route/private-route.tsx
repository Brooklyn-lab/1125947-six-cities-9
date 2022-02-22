import { Navigate, RouteProps } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { PropsWithChildren } from 'react';

type PrivatRouteProps = PropsWithChildren<{
  authorizationStatus: string
}>
// type PrivatRouteProps = RouteProps & {
//   authorizationStatus: AuthorizationStatus
//   children: JSX.Element;
// }

function PrivatRoute(props: PrivatRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.SignIn} />
  );
}

export default PrivatRoute;


import { Navigate, RouteProps } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

type PrivatRouteProps = RouteProps & {
  authorizationStatus: AuthorizationStatus
  children: JSX.Element;
}

function PrivatRoute(props: PrivatRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.SignIn} />
  );
}

export default PrivatRoute;
