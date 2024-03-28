import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getIngredients from '../../../utils/burger-api';
import { BurgerIngredientsState } from './burger-ingredients.types';
import { IngredientsData } from '../../../types';
export const fetchIngredients = createAsyncThunk<IngredientsData>('ingredients/fetchIngredients', async () => {
  return await getIngredients();
});

const initialState: BurgerIngredientsState = {
  loading: true,
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredients: [],
};

const burgerIngredients = createSlice({
  name: 'burgerIngredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.ingredientsRequest = true;
    });
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload.data;
      state.loading = false;
    });
    builder.addCase(fetchIngredients.rejected, (state) => {
      state.loading = false;
      state.ingredientsFailed = true;
      state.ingredientsRequest = false;
    });
    builder.addDefaultCase(() => {});
  },
});

const { reducer } = burgerIngredients;

export default reducer;
