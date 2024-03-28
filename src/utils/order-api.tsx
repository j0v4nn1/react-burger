import checkResponse from './check-response';
import { GET_ORDER_NUMBER_URL } from '../constants';
import { Token } from '../types';

async function getOrderNumber(ingredientsList: string[], accessToken: Token) {
  if (accessToken) {
    const res = await fetch(GET_ORDER_NUMBER_URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        authorization: accessToken,
      },
      body: JSON.stringify({
        ingredients: ingredientsList,
      }),
    });
    return await checkResponse(res);
  }
}

export default getOrderNumber;
