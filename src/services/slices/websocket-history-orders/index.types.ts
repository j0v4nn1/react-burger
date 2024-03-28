import { Order } from '../../../types';

export type HistoryMessages = {
  readonly success: boolean;
  readonly orders: Order[];
  readonly total: number;
  readonly totalToday: number;
};

export type WebsocketHistoryState = {
  readonly loading: boolean;
  readonly websocketState: 'closed' | 'open';
  readonly connectionStarted: boolean;
  readonly wsConnected: boolean;
  readonly messages: HistoryMessages;
  readonly error: string | undefined;
};
