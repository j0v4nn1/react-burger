import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Messages, IWebsocketFeedState } from './websocket-feed.types';

const initialState: IWebsocketFeedState = {
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

const websocketFeed = createSlice({
  name: 'websocketFeed',
  initialState,
  reducers: {
    connectionStart: (state) => {
      state.connectionStarted = true;
    },
    connectionSuccess: (state, action: PayloadAction<'closed' | 'open'>) => {
      state.loading = false;
      state.wsConnected = true;
      state.websocketState = action.payload;
    },
    getMessages: (state, action: PayloadAction<Messages>) => {
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

const { actions, reducer } = websocketFeed;
export default reducer;
export const { connectionStart, connectionSuccess, getMessages, connectionError, connectionClose } = actions;
