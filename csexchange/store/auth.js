import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authentication",
  initialState: {
    isAuthenticated: false,
    token: null,
    type: null,
    bilkentId: null,
  },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.type = action.payload.type;
      state.bilkentId = action.payload.bilkentId;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.type = null;
      state.bilkentId = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
