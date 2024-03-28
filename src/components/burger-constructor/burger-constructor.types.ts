import { Ingredient } from '../burger-ingredient/burger-ingredient.types';

export interface ConstructorIngredient extends Ingredient {
  uniqueId: string;
}

export type OrderData = {
  name: string;
  order: {
    createdAt: string;
    ingredients: Ingredient[];
    name: string;
    number: number;
    owner: {
      createdAt: string;
      email: string;
      name: string;
      updatedAt: string;
    };
    price: number;
    status: 'done' | 'pending';
    updatedAt: string;
    _id: string;
  };
  success: boolean;
};
