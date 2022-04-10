import { AuthorizationStatus } from '../../const';
import { userProcess } from './user-process';
import { requireAuthorization, getLoginName, getSelectedCardId } from './user-process';

describe('Reducer: userProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Unknown,
        userEmail: '',
        selectedCardId: null,
      });
  });

  it('should update authorizationStatus to "AUTH"', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userEmail: '',
      selectedCardId: null,
    };

    expect(userProcess.reducer(state, requireAuthorization(AuthorizationStatus.Auth)))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        userEmail: '',
        selectedCardId: null,
      });
  });

  it('should update authorizationStatus to "NO_AUTH"', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Auth,
      userEmail: '',
      selectedCardId: null,
    };

    expect(userProcess.reducer(state, requireAuthorization(AuthorizationStatus.NoAuth)))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        userEmail: '',
        selectedCardId: null,
      });
  });

  it('should update userEmail to the one entered by the user', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userEmail: '',
      selectedCardId: null,
    };

    expect(userProcess.reducer(state, getLoginName('EMAIL')))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Unknown,
        userEmail: 'EMAIL',
        selectedCardId: null,
      });
  });

  it('should update selectedCardId when hovering over the card', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userEmail: '',
      selectedCardId: null,
    };

    expect(userProcess.reducer(state, getSelectedCardId(1)))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Unknown,
        userEmail: '',
        selectedCardId: 1,
      });
  });
});
