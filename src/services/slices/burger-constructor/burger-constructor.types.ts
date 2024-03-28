import { Ingredient } from '../../../components/burger-ingredient/burger-ingredient.types';
import { ConstructorIngredient } from '../../../components/burger-constructor/burger-constructor.types';
export type BurgerConstructorState = {
  bun: null | Ingredient;
  ingredients: ConstructorIngredient[];
};

export type DragAndHoverIndex = {
  dragIndex: number;
  hoverIndex: number;
};
