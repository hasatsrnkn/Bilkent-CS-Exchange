import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import loadingReducer from "./loading";

const store = configureStore({
  reducer: {
    auth: authReducer,
    loading: loadingReducer,
  },
});

export default store;
