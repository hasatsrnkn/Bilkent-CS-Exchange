import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  token: null,
  type: null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.type = action.payload.type;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.type = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
