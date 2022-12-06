import { createSlice } from "@reduxjs/toolkit";

// state initialization
const initialState = {
  cart: [],
};
export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    addItem: (state, action) => {
      let itemIndex;
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
  },
});

export const { addItem } = shopSlice.actions;

export default shopSlice.reducer;
