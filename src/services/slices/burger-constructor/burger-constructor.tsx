import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { AppDispatch } from '../../store';
import { BurgerConstructorState, DragAndHoverIndex } from './burger-constructor.types';
import { ConstructorIngredient } from '../../../components/burger-constructor/burger-constructor.types';

export const setIngredient = (ingredient: ConstructorIngredient) => {
  return function (dispatch: AppDispatch) {
    const uniqueId = uuidv4();

    if (ingredient.type === 'bun') {
      dispatch(addBun({ ...ingredient, uniqueId }));
    } else {
      dispatch(addIngredient({ ...ingredient, uniqueId }));
    }
  };
};

const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: [],
};

const burgerConstructor = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<ConstructorIngredient>) => {
      state.bun = action.payload;
    },
    addIngredient: (state, action: PayloadAction<ConstructorIngredient>) => {
      state.ingredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter((ingredient) => {
        return ingredient.uniqueId !== action.payload;
      });
    },
    removeAllIngredients: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    reOrder: (state, action: PayloadAction<DragAndHoverIndex>) => {
      const { dragIndex, hoverIndex } = action.payload;
      const dragIngredient = state.ingredients[dragIndex];
      state.ingredients[dragIndex] = state.ingredients[hoverIndex];
      state.ingredients[hoverIndex] = dragIngredient;
    },
  },
});

const { actions, reducer } = burgerConstructor;

export default reducer;

export const { addBun, addIngredient, removeIngredient, removeAllIngredients, reOrder } = actions;
