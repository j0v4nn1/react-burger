import { ConstructorIngredient } from '../burger-constructor/burger-constructor.types';

export type BurgerConstructorComponent = {
  ingredient: ConstructorIngredient;
  index: number;
};

export type DragItem = {
  index: number;
  id: string;
  type: string;
};
