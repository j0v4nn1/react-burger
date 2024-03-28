import { AppDispatch } from '../services/store';
import { Ingredient } from '../components/burger-ingredient/burger-ingredient.types';
export type Token = string | null;

export type AuthData = (
  dispatch: AppDispatch,
  refreshToken: string,
  accessToken: string,
  name: string,
  email: string
) => void;

export type Order = {
  _id: string;
  ingredients: string[];
  status: 'done' | 'pending' | null;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};
export type IngredientsData = {
  success: boolean;
  data: Ingredient[];
};
