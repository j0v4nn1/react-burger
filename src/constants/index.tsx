import {
  connectionSuccess as connectionSuccessFeed,
  connectionError as connectionErrorFeed,
  getMessages as getMessagesFeed,
} from '../services/slices/websocket-feed/websocket-feed';
import {
  connectionSuccess as connectionSuccessHistoryOrder,
  connectionError as connectionErrorHistoryOrder,
  getMessages as getMessagesHistoryOrder,
} from '../services/slices/websocket-history-orders';

export const GET_INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients';
export const GET_ORDER_NUMBER_URL = 'https://norma.nomoreparties.space/api/orders';
export const REGISTRATION_URL = 'https://norma.nomoreparties.space/api/auth/register';
export const AUTHORIZATION_URL = 'https://norma.nomoreparties.space/api/auth/login';
export const LOGOUT_URL = 'https://norma.nomoreparties.space/api/auth/logout';
export const REFRESH_TOKEN_URL = 'https://norma.nomoreparties.space/api/auth/token';
export const PROFILE_URL = 'https://norma.nomoreparties.space/api/auth/user';
export const RESET_PASSWORD_URL = 'https://norma.nomoreparties.space/api/password-reset';
export const SET_NEW_PASSWORD_URL = 'https://norma.nomoreparties.space/api/password-reset/reset';
export const DEFAULT_HEADERS = { 'Content-type': 'application/json' };
export const WS_ALL_ORDERS_LIST = 'wss://norma.nomoreparties.space/orders/all';
export const WS_HISTORY_ORDERS_LIST = 'wss://norma.nomoreparties.space/orders';
export const INGREDIENT_TYPE = 'ingredient';
export const BURGER_CONSRTUCTOR_INGREDIENT_TYPE = 'burgerConstructorIngredient';
export const PATH_CONSTRUCTOR_PAGE = '/';
export const PATH_LOGIN_PAGE = '/login';
export const PATH_REGISTER_PAGE = '/register';
export const PATH_FORGOT_PASSWORD_PAGE = '/forgot-password';
export const PATH_RESET_PASSWORD_PAGE = '/reset-password';
export const PATH_PROFILE_PAGE = '/profile';
export const PATH_PROFILE_PAGE_ROUTES = PATH_PROFILE_PAGE + '/*';
export const PATH_ORDERS = 'orders';
export const PATH_ORDERS_ID = '/orders/:id';
export const PATH_PROFILE_ORDERS = '/profile/orders';
export const PATH_INGREDIENTS_ID = 'ingredients/:id';
export const PATH_FEED = '/feed';
export const PATH_FEED_ID = '/feed/:id';
export const WS_FEED_ACTIONS = {
  connectionStart: 'websocketFeed/connectionStart',
  connectionSuccess: connectionSuccessFeed,
  getMessages: getMessagesFeed,
  connectionError: connectionErrorFeed,
  connectionClose: 'websocketFeed/connectionClose',
};
export const WS_HISTORY_ORDERS_ACTIONS = {
  connectionStart: 'websocketHistoryOrders/connectionStart',
  connectionSuccess: connectionSuccessHistoryOrder,
  getMessages: getMessagesHistoryOrder,
  connectionError: connectionErrorHistoryOrder,
  connectionClose: 'websocketHistoryOrders/connectionClose',
};
