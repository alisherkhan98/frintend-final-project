import { createSlice } from "@reduxjs/toolkit";

// state initialization
const initialState = {
  cart: [],
  isCheckingOut: false,
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
    removeItem: (state, action) => {
      let itemIndex = state.cart.findIndex(
        (item) => item.id == action.payload.id
      );
      if (state.cart[itemIndex].amount > 1) {
        state.cart[itemIndex].amount--;
      } else {
        state.cart = state.cart.filter((item) => item.id != action.payload.id);
      }
    },
    removeAll: (state, action) => {
      state.cart = state.cart.filter((item) => item.id != action.payload.id);
    },
    clearCart: (state) => {
      state.cart = [];
    },
    setInitialCart: (state, action) => {
      state.cart = action.payload;
    },
    startCheckout: (state) => {
      state.isCheckingOut = true;
    },
    stopCheckout: (state) => {
      state.isCheckingOut = false;
    },
  },
});

export const {
  addItem,
  removeAll,
  removeItem,
  clearCart,
  setInitialCart,
  startCheckout,
  stopCheckout,
} = shopSlice.actions;

export default shopSlice.reducer;
