import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IngredientDetailsState } from './ingredient-details.types';
import { Ingredient } from '../../../components/burger-ingredient/burger-ingredient.types';

const initialState: IngredientDetailsState = {
  currentIngredient: {
    _id: '',
    name: '',
    type: '',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: '',
    image_mobile: '',
    image_large: '',
    __v: 0,
  },
  showModal: false,
};

const ingredientDetails = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Ingredient>) => {
      state.currentIngredient = action.payload;
    },
    remove: (state) => {
      state.currentIngredient = {
        _id: '',
        name: '',
        type: '',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: '',
        image_mobile: '',
        image_large: '',
        __v: 0,
      };
    },
    setShowModal: (state, action: PayloadAction<boolean>) => {
      state.showModal = action.payload;
    },
  },
});

const { actions, reducer } = ingredientDetails;
export default reducer;
export const { set, remove, setShowModal } = actions;
