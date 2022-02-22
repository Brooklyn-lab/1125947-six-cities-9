import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
// import { PropsWithChildren } from 'react';

// type PrivateRouteProps = PropsWithChildren<{
//   authorizationStatus: string,
// }>
// хотел сделать типизацию children через PropsWithChildren. Просидел часа полтора. Перечитал дважды статью по типизации children, и о дженериках. Так и не понял почему код выше не работает. Кейс такой же как в статье по типизации. У меня есть children в виде JSX, есть проп в виде строки. И почему-то выдает ошибку, хотя PropsWithChildren и отвечает за то, что children может и не быть. В чем может быть проблема, что не учитываю? или нужно обязательно в PropsWithChildren типизировать children, хотя в кейсе этого не было и это странно.

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { authorizationStatus, children } = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.SignIn} />
  );
}

export default PrivateRoute;

