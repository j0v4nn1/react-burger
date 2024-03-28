import { Ingredient } from '../../../components/burger-ingredient/burger-ingredient.types';
export type BurgerIngredientsState = {
  loading: boolean;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  ingredients: Ingredient[];
};
