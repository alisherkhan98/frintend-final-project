import { createSlice } from "@reduxjs/toolkit";

// state initialization
const initialState = {
  cart: [],
  totalAmount: 0,
};
export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    addItem: (state, action) => {
      let itemIndex;
      state.totalAmount++;
      const isInCart = state.cart.find((item, index) => {
        itemIndex = index;
        return item.id === action.payload.id;
      });
      if (!isInCart) {
        state.cart.push({
          ...action.payload,
          amount: 1,
        });
      } else {
        state.cart[itemIndex].amount++;
      }
    },
    getTotalAmount: (state) => {
      state.totalAmount = state.cart.reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount,
        0
      );
    },
  },
});

export const { addItem, getTotalAmount } = shopSlice.actions;

export default shopSlice.reducer;
