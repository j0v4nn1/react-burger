import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { WebsocketHistoryState, HistoryMessages } from './index.types';
import { Token } from '../../../types';

const initialState: WebsocketHistoryState = {
  loading: true,
  websocketState: 'closed',
  connectionStarted: false,
  wsConnected: false,
  messages: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0,
  },
  error: undefined,
};

const websocketHistoryOrders = createSlice({
  name: 'websocketHistoryOrders',
  initialState,
  reducers: {
    connectionStart: (state, action: PayloadAction<{ accessToken: Token }>) => {
      state.connectionStarted = true;
    },
    connectionSuccess: (state, action: PayloadAction<'closed' | 'open'>) => {
      state.loading = false;
      state.wsConnected = true;
      state.websocketState = action.payload;
    },
    getMessages: (state, action: PayloadAction<HistoryMessages>) => {
      state.messages = action.payload;
    },
    connectionError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    connectionClose: (state) => {
      state.loading = true;
      state.wsConnected = false;
      state.websocketState = 'closed';
      state.connectionStarted = false;
    },
  },
});

const { actions, reducer } = websocketHistoryOrders;
export default reducer;
export const { connectionStart, connectionSuccess, getMessages, connectionError, connectionClose } = actions;
