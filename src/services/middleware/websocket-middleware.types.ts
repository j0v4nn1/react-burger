import { WS_FEED_ACTIONS, WS_HISTORY_ORDERS_ACTIONS } from '../../constants';
export type WsActions = typeof WS_FEED_ACTIONS | typeof WS_HISTORY_ORDERS_ACTIONS;
