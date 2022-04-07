/* eslint-disable no-console */

import { createSlice } from '@reduxjs/toolkit';
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
    requireAuthorization: (state, action) => {
      state.authorizationStatus = action.payload;
    },
    getLoginName: (state, action) => {
      state.userEmail = action.payload;
    },
    getSelectedCardId: (state, action) => {
      state.selectedCardId = action.payload;
    },
  },
});

export const { requireAuthorization, getLoginName, getSelectedCardId } = userProcess.actions;
