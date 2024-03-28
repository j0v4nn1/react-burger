import checkResponse from './check-response';
import { GET_INGREDIENTS_URL } from '../constants';
import { IngredientsData } from '../types';

const getIngredients = async (): Promise<IngredientsData> => {
  const res = await fetch(GET_INGREDIENTS_URL);
  return await checkResponse(res);
};

export default getIngredients;
