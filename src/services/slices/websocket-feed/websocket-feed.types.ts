import { Order } from '../../../types';

export type Messages = {
  readonly success: boolean;
  readonly orders: Order[];
  readonly total: number;
  readonly totalToday: number;
};

export interface IWebsocketFeedState {
  readonly loading: boolean;
  readonly websocketState: 'closed' | 'open';
  readonly connectionStarted: boolean;
  readonly wsConnected: boolean;
  readonly messages: Messages;
  readonly error: string | undefined;
}
