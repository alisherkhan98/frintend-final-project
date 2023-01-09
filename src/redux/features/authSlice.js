import { createSlice } from "@reduxjs/toolkit";

// state initialization
const initialState = {
  user: null,
  isSigningIn: false,
  isSigningUp: false,
};
export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      state.user = null;
    },
    setIsSigningIn: (state, action) => {
      state.isSigningIn = action.payload;
    },
    setIsSigningUp: (state, action) => {
      state.isSigningUp = action.payload;
    },
  },
});

export const { signIn, signOut, setIsSigningIn, setIsSigningUp } =
  userSlice.actions;

export default userSlice.reducer;
