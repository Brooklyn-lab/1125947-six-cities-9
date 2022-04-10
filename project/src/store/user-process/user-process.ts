import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';
import { UserProcess } from '../../types/state';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: '',
  selectedCardId: null,
};

export const userProcess = createSlice({
  name: NameSpace.user,
  initialState,
  reducers: {
    requireAuthorization: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    getLoginName: (state, action: PayloadAction<string>) => {
      state.userEmail = action.payload;
    },
    getSelectedCardId: (state, action: PayloadAction<number | null>) => {
      state.selectedCardId = action.payload;
    },
  },
});

export const { requireAuthorization, getLoginName, getSelectedCardId } = userProcess.actions;
