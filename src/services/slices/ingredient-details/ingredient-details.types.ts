import { Ingredient } from '../../../components/burger-ingredient/burger-ingredient.types';

export type IngredientDetailsState = {
  currentIngredient: Ingredient;
  showModal: boolean;
};
