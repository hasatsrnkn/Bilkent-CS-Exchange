import { createSlice } from "@reduxjs/toolkit";

const initialLoadingState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState: initialLoadingState,
  reducers: {
    setIsLoading(state) {
      state.isLoading = true;
    },
    setIsNotLoading(state) {
      state.isLoading = false;
    },
  },
});

export const loadingActions = loadingSlice.actions;

export default loadingSlice.reducer;