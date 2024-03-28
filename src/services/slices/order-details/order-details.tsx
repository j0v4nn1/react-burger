import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { OrderNumberState } from './order-details.types';

const initialState: OrderNumberState = {
  orderNumber: null,
};

const orderDetails = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<number>) => {
      state.orderNumber = action.payload;
    },
    remove: (state) => {
      state.orderNumber = null;
    },
  },
});

const { actions, reducer } = orderDetails;

export default reducer;

export const { set, remove } = actions;
